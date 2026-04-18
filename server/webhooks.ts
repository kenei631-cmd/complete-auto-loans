/**
 * webhooks.ts
 *
 * Express router for inbound webhooks from lender networks.
 *
 * POST /api/webhooks/lead-purchased
 * ─────────────────────────────────
 * Called by a lender (or your internal system) when a lead has been
 * purchased/accepted. This endpoint:
 *
 *  1. Verifies the HMAC-SHA256 signature (X-Webhook-Signature header)
 *  2. Looks up the lead by token
 *  3. Updates the lead status to "sold" and records saleValue / soldToLenderId
 *  4. Fires a CAPI Purchase event to Meta with the lead's hashed PII
 *
 * Signature verification:
 *   HMAC-SHA256(WEBHOOK_SECRET, rawBody)  →  hex digest
 *   Header: X-Webhook-Signature: sha256=<hex>
 *
 * Example payload:
 *   {
 *     "token": "lead-uuid-here",
 *     "saleValue": 25.00,
 *     "lenderId": 3,
 *     "currency": "USD"
 *   }
 */

import { Router, Request, Response } from "express";
import crypto from "crypto";
import { getLeadByToken, updateLead } from "./db";
import { sendCapiEvent } from "./metaCapi";
import { ENV } from "./_core/env";

export const webhookRouter = Router();

// ── helpers ──────────────────────────────────────────────────────────────────

function verifySignature(rawBody: string, signatureHeader: string | undefined, secret: string): boolean {
  if (!signatureHeader) return false;
  const expected = `sha256=${crypto.createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected));
  } catch {
    return false;
  }
}

// ── POST /api/webhooks/lead-purchased ────────────────────────────────────────

webhookRouter.post("/lead-purchased", async (req: Request, res: Response) => {
  const secret = ENV.webhookSecret;

  // If a secret is configured, verify the signature
  if (secret) {
    const rawBody = JSON.stringify(req.body);
    const sig = req.headers["x-webhook-signature"] as string | undefined;
    if (!verifySignature(rawBody, sig, secret)) {
      console.warn("[Webhook] Invalid signature on /lead-purchased");
      res.status(401).json({ error: "Invalid signature" });
      return;
    }
  }

  const { token, saleValue, lenderId, currency = "USD" } = req.body as {
    token?: string;
    saleValue?: number;
    lenderId?: number;
    currency?: string;
  };

  if (!token) {
    res.status(400).json({ error: "token is required" });
    return;
  }

  // Look up the lead
  let lead;
  try {
    lead = await getLeadByToken(token);
  } catch (err) {
    console.error("[Webhook] DB error looking up lead:", err);
    res.status(500).json({ error: "Database error" });
    return;
  }

  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  if (lead.status === "sold") {
    // Idempotent — already processed
    res.status(200).json({ ok: true, message: "Already processed" });
    return;
  }

  // Update lead record
  try {
    await updateLead(lead.id, {
      status: "sold",
      leadSoldAt: new Date(),
      saleValue: saleValue != null ? String(saleValue) : undefined,
      soldToLenderId: lenderId ?? undefined,
    });
  } catch (err) {
    console.error("[Webhook] Failed to update lead:", err);
    res.status(500).json({ error: "Failed to update lead" });
    return;
  }

  // Fire CAPI Purchase event
  const capiResult = await sendCapiEvent({
    eventName: "Purchase",
    eventId: `purchase-${token}`,
    eventSourceUrl: `https://completeautoloans.com/offers/${token}`,
    userData: {
      email: lead.email ?? undefined,
      phone: lead.phone ?? undefined,
      firstName: lead.firstName ?? undefined,
      lastName: lead.lastName ?? undefined,
      state: lead.state ?? undefined,
      zip: lead.zipCode ?? undefined,
      clientIpAddress: lead.ipAddress ?? undefined,
      clientUserAgent: lead.userAgent ?? undefined,
    },
    customData: {
      currency,
      value: saleValue ?? 0,
      contentName: "Auto Loan Lead",
      contentCategory: "auto_loan",
    },
    actionSource: "website",
  });

  console.log(`[Webhook] lead-purchased processed: token=${token} saleValue=${saleValue} capiOk=${capiResult.success}`);

  res.status(200).json({
    ok: true,
    capiSent: capiResult.success,
    capiError: capiResult.error ?? null,
  });
});
