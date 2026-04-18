/**
 * Tests for the /api/webhooks/lead-purchased endpoint
 *
 * These tests verify:
 *  1. Signature verification (valid, invalid, missing)
 *  2. Missing token returns 400
 *  3. Unknown token returns 404
 *  4. Idempotency — already-sold leads return 200 without re-processing
 *  5. Successful purchase updates lead status and fires CAPI
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import crypto from "crypto";

// ── Mock dependencies before importing the router ────────────────────────────

vi.mock("./db", () => ({
  getLeadByToken: vi.fn(),
  updateLead: vi.fn(),
}));

vi.mock("./metaCapi", () => ({
  sendCapiEvent: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./_core/env", () => ({
  ENV: {
    webhookSecret: "test-secret-abc123",
    metaPixelId: "12345678901234567",
    metaCapiToken: "test-token",
  },
}));

import { webhookRouter } from "./webhooks";
import { getLeadByToken, updateLead } from "./db";
import { sendCapiEvent } from "./metaCapi";

// ── Test app setup ────────────────────────────────────────────────────────────

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/webhooks", webhookRouter);
  return app;
}

function makeSignature(body: object, secret: string): string {
  return `sha256=${crypto.createHmac("sha256", secret).update(JSON.stringify(body)).digest("hex")}`;
}

const mockLead = {
  id: 1,
  token: "abc-token-123",
  status: "submitted",
  email: "test@example.com",
  phone: "2065551234",
  firstName: "John",
  lastName: "Doe",
  state: "WA",
  zipCode: "98201",
  ipAddress: "1.2.3.4",
  userAgent: "Mozilla/5.0",
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/webhooks/lead-purchased", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when signature is missing", async () => {
    const app = buildApp();
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .send({ token: "abc-token-123", saleValue: 25 });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid signature");
  });

  it("returns 401 when signature is wrong", async () => {
    const app = buildApp();
    const body = { token: "abc-token-123", saleValue: 25 };
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", "sha256=badhash")
      .send(body);
    expect(res.status).toBe(401);
  });

  it("returns 400 when token is missing", async () => {
    const app = buildApp();
    const body = { saleValue: 25 };
    const sig = makeSignature(body, "test-secret-abc123");
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", sig)
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("token is required");
  });

  it("returns 404 when lead is not found", async () => {
    vi.mocked(getLeadByToken).mockResolvedValue(null);
    const app = buildApp();
    const body = { token: "unknown-token", saleValue: 25 };
    const sig = makeSignature(body, "test-secret-abc123");
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", sig)
      .send(body);
    expect(res.status).toBe(404);
  });

  it("returns 200 idempotently when lead is already sold", async () => {
    vi.mocked(getLeadByToken).mockResolvedValue({ ...mockLead, status: "sold" } as any);
    const app = buildApp();
    const body = { token: "abc-token-123", saleValue: 25 };
    const sig = makeSignature(body, "test-secret-abc123");
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", sig)
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Already processed");
    expect(updateLead).not.toHaveBeenCalled();
  });

  it("updates lead to sold and fires CAPI Purchase event on success", async () => {
    vi.mocked(getLeadByToken).mockResolvedValue(mockLead as any);
    vi.mocked(updateLead).mockResolvedValue(undefined as any);
    vi.mocked(sendCapiEvent).mockResolvedValue({ success: true });

    const app = buildApp();
    const body = { token: "abc-token-123", saleValue: 28.50, lenderId: 3 };
    const sig = makeSignature(body, "test-secret-abc123");
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", sig)
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.capiSent).toBe(true);

    // Verify lead was updated to sold
    expect(updateLead).toHaveBeenCalledWith(1, expect.objectContaining({
      status: "sold",
      saleValue: "28.5",
      soldToLenderId: 3,
    }));

    // Verify CAPI Purchase event was fired
    expect(sendCapiEvent).toHaveBeenCalledWith(expect.objectContaining({
      eventName: "Purchase",
      eventId: "purchase-abc-token-123",
      customData: expect.objectContaining({
        currency: "USD",
        value: 28.50,
        contentName: "Auto Loan Lead",
      }),
    }));
  });

  it("still returns 200 even if CAPI fails (non-blocking)", async () => {
    vi.mocked(getLeadByToken).mockResolvedValue(mockLead as any);
    vi.mocked(updateLead).mockResolvedValue(undefined as any);
    vi.mocked(sendCapiEvent).mockResolvedValue({ success: false, error: "Network error" });

    const app = buildApp();
    const body = { token: "abc-token-123", saleValue: 20 };
    const sig = makeSignature(body, "test-secret-abc123");
    const res = await request(app)
      .post("/api/webhooks/lead-purchased")
      .set("x-webhook-signature", sig)
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.capiSent).toBe(false);
    expect(res.body.capiError).toBe("Network error");
  });
});
