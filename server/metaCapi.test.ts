/**
 * metaCapi.test.ts
 * Validates the Meta CAPI helper:
 * - Gracefully skips when credentials are not set
 * - Sends a valid test event to Meta's CAPI endpoint when credentials are present
 * - Correctly hashes PII fields
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── helpers ──────────────────────────────────────────────────────────────────

/** SHA-256 hash of a lowercase-trimmed string (mirrors metaCapi.ts) */
async function sha256(value: string): Promise<string> {
  const { createHash } = await import("crypto");
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

// ── unit tests (no network) ───────────────────────────────────────────────────

describe("sendCapiEvent — unit (mocked fetch)", () => {
  let originalFetch: typeof globalThis.fetch;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  });

  it("returns success:false and logs a warning when credentials are missing", async () => {
    delete process.env.META_PIXEL_ID;
    delete process.env.META_CAPI_ACCESS_TOKEN;

    // Re-import after env change
    const { sendCapiEvent } = await import("./metaCapi");

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await sendCapiEvent({
      eventName: "Lead",
      eventId: "test-event-id-001",
      eventSourceUrl: "https://completeautoloans.com/apply",
      userData: { email: "test@example.com" },
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
    warnSpy.mockRestore();
  });

  it("sends a POST to the correct CAPI endpoint with hashed PII", async () => {
    process.env.META_PIXEL_ID = "12345678901234";
    process.env.META_CAPI_ACCESS_TOKEN = "test_token_abc";

    const capturedRequests: { url: string; body: unknown }[] = [];

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: RequestInit) => {
      capturedRequests.push({ url, body: JSON.parse(init.body as string) });
      return {
        ok: true,
        json: async () => ({ events_received: 1 }),
      } as Response;
    });

    // Re-import after env change
    vi.resetModules();
    const { sendCapiEvent } = await import("./metaCapi");

    const result = await sendCapiEvent({
      eventName: "Lead",
      eventId: "test-event-id-002",
      eventSourceUrl: "https://completeautoloans.com/apply",
      userData: {
        email: "john@example.com",
        phone: "5551234567",
        firstName: "John",
        lastName: "Doe",
        state: "WA",
        zip: "98201",
      },
      customData: { contentName: "Auto Loan Application", contentCategory: "auto_loan" },
    });

    expect(result.success).toBe(true);
    expect(capturedRequests).toHaveLength(1);

    const req = capturedRequests[0];
    expect(req.url).toContain("12345678901234/events");
    expect(req.url).toContain("test_token_abc");

    const event = (req.body as { data: unknown[] }).data[0] as Record<string, unknown>;
    expect(event.event_name).toBe("Lead");
    expect(event.event_id).toBe("test-event-id-002");
    expect(event.action_source).toBe("website");

    const ud = event.user_data as Record<string, unknown>;
    // Email should be hashed
    const expectedEmailHash = await sha256("john@example.com");
    expect((ud.em as string[])[0]).toBe(expectedEmailHash);

    // Phone should be hashed (digits only)
    const expectedPhoneHash = await sha256("5551234567");
    expect((ud.ph as string[])[0]).toBe(expectedPhoneHash);
  });

  it("returns success:false and logs error on non-ok response", async () => {
    process.env.META_PIXEL_ID = "12345678901234";
    process.env.META_CAPI_ACCESS_TOKEN = "bad_token";

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
      json: async () => ({ error: { message: "Invalid access token" } }),
    } as Response);

    vi.resetModules();
    const { sendCapiEvent } = await import("./metaCapi");

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await sendCapiEvent({
      eventName: "Purchase",
      eventId: "test-event-id-003",
      eventSourceUrl: "https://completeautoloans.com/offers/abc",
      userData: { email: "buyer@example.com" },
      customData: { currency: "USD", value: 25 },
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Invalid access token/i);
    errorSpy.mockRestore();
  });
});
