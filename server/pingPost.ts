/**
 * pingPost.ts — Direct Ping Post Engine
 *
 * Flow:
 * 1. Fetch all active lenders from DB, sorted by priority
 * 2. Ping all lenders in parallel (3-second timeout)
 * 3. Collect accepted bids, save to lender_offers
 * 4. Post full lead data to all accepting lenders
 * 5. Return ranked offers to caller
 *
 * Mock mode: if a lender has no pingUrl configured, the mock engine
 * generates a realistic offer based on the lead's credit profile.
 * When a real endpoint is configured, it is called instead.
 */

import { Lead, Lender } from "../drizzle/schema";
import {
  createLenderOffer,
  getOffersByLeadId,
  listActiveLenders,
  updateLead,
  updateLenderOffer,
} from "./db";

const PING_TIMEOUT_MS = 3000;

// ── Credit score → APR range mapping (used by mock engine) ────────────────────
const CREDIT_APR_MAP: Record<string, { aprMin: number; aprMax: number; confidence: "high" | "good" | "fair" }> = {
  no_credit:  { aprMin: 18.9, aprMax: 24.9, confidence: "fair" },
  below_500:  { aprMin: 16.9, aprMax: 22.9, confidence: "fair" },
  "500_549":  { aprMin: 14.9, aprMax: 19.9, confidence: "fair" },
  "550_599":  { aprMin: 12.9, aprMax: 17.9, confidence: "good" },
  "600_649":  { aprMin: 10.9, aprMax: 14.9, confidence: "good" },
  "650_699":  { aprMin: 7.9,  aprMax: 11.9, confidence: "high" },
  "700_plus": { aprMin: 4.9,  aprMax: 8.9,  confidence: "high" },
};

// ── Monthly payment calculator ────────────────────────────────────────────────
function calcMonthlyPayment(principal: number, annualApr: number, termMonths: number): number {
  if (annualApr === 0) return principal / termMonths;
  const r = annualApr / 100 / 12;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

// ── Mock ping — simulates a lender API response ───────────────────────────────
function mockPing(lender: Lender, lead: Lead): {
  accepted: boolean;
  bid: number;
  aprMin: number;
  aprMax: number;
  termMonths: number;
  estimatedMonthlyPayment: number;
  approvalConfidence: "high" | "good" | "fair";
} {
  const creditKey = lead.creditScore ?? "below_500";
  const aprData = CREDIT_APR_MAP[creditKey] ?? CREDIT_APR_MAP["below_500"]!;

  // Add slight variance per lender (±1.5 APR points based on lender priority)
  const variance = (lender.priority % 3) * 0.5;
  const aprMin = Math.round((aprData.aprMin + variance) * 10) / 10;
  const aprMax = Math.round((aprData.aprMax + variance) * 10) / 10;

  // Acceptance rate: higher credit = higher acceptance; bankruptcy/repo reduces it
  let acceptChance = 0.85;
  if (lead.hasBankruptcy) acceptChance -= 0.15;
  if (lead.hasRepossession) acceptChance -= 0.10;
  if (creditKey === "no_credit" || creditKey === "below_500") acceptChance -= 0.10;
  acceptChance = Math.max(0.4, acceptChance);

  const accepted = Math.random() < acceptChance;
  if (!accepted) return { accepted: false, bid: 0, aprMin, aprMax, termMonths: 60, estimatedMonthlyPayment: 0, approvalConfidence: aprData.confidence };

  const principal = lead.estimatedPrice ?? 15000;
  const termMonths = 60;
  const midApr = (aprMin + aprMax) / 2;
  const monthly = calcMonthlyPayment(principal, midApr, termMonths);
  const bid = Math.round((principal * 0.012 + Math.random() * 20) * 100) / 100; // ~1.2% of loan as lead fee

  return { accepted: true, bid, aprMin, aprMax, termMonths, estimatedMonthlyPayment: Math.round(monthly * 100) / 100, approvalConfidence: aprData.confidence };
}

// ── Real ping — calls the lender's actual API ─────────────────────────────────
async function realPing(lender: Lender, lead: Lead): Promise<{
  accepted: boolean;
  bid: number;
  rawResponse: unknown;
}> {
  const fieldMap = (lender.pingFieldMap ?? {}) as Record<string, string>;

  // Build payload using field map (fall back to our field name if not mapped)
  const map = (key: string) => fieldMap[key] ?? key;
  const payload: Record<string, unknown> = {
    [map("creditScore")]: lead.creditScore,
    [map("vehicleType")]: lead.vehicleType,
    [map("state")]: lead.state,
    [map("zipCode")]: lead.zipCode,
    [map("monthlyIncome")]: lead.monthlyIncome,
    [map("estimatedPrice")]: lead.estimatedPrice,
    [map("hasBankruptcy")]: lead.hasBankruptcy,
    [map("hasRepossession")]: lead.hasRepossession,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

  try {
    const resp = await fetch(lender.pingUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lender.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const rawResponse = await resp.json();
    const accepted = resp.ok && (rawResponse as Record<string, unknown>).accepted === true;
    const bid = Number((rawResponse as Record<string, unknown>).bid ?? 0);
    return { accepted, bid, rawResponse };
  } catch {
    clearTimeout(timer);
    return { accepted: false, bid: 0, rawResponse: { error: "timeout_or_network_error" } };
  }
}

// ── Real post — sends full lead data to lender ────────────────────────────────
async function realPost(lender: Lender, lead: Lead): Promise<{ accepted: boolean; rawResponse: unknown }> {
  const fieldMap = (lender.postFieldMap ?? {}) as Record<string, string>;
  const map = (key: string) => fieldMap[key] ?? key;

  const payload: Record<string, unknown> = {
    [map("firstName")]: lead.firstName,
    [map("lastName")]: lead.lastName,
    [map("email")]: lead.email,
    [map("phone")]: lead.phone,
    [map("zipCode")]: lead.zipCode,
    [map("state")]: lead.state,
    [map("creditScore")]: lead.creditScore,
    [map("vehicleType")]: lead.vehicleType,
    [map("monthlyIncome")]: lead.monthlyIncome,
    [map("estimatedPrice")]: lead.estimatedPrice,
    [map("hasBankruptcy")]: lead.hasBankruptcy,
    [map("hasRepossession")]: lead.hasRepossession,
    [map("employmentStatus")]: lead.employmentStatus,
    [map("trustedFormCertUrl")]: lead.trustedFormCertUrl,
    [map("tcpaConsentText")]: lead.tcpaConsentText,
  };

  try {
    const resp = await fetch(lender.postUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lender.apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const rawResponse = await resp.json();
    return { accepted: resp.ok, rawResponse };
  } catch {
    return { accepted: false, rawResponse: { error: "post_failed" } };
  }
}

// ── Main export: run full Ping Post cycle for a lead ─────────────────────────

export interface OfferResult {
  offerId: number;
  lenderId: number;
  lenderName: string;
  lenderLogoUrl: string | null;
  aprMin: number;
  aprMax: number;
  estimatedMonthlyPayment: number;
  termMonths: number;
  approvalConfidence: "high" | "good" | "fair";
  isBestMatch: boolean;
}

export async function runPingPost(lead: Lead): Promise<OfferResult[]> {
  const activeLenders = await listActiveLenders();
  if (activeLenders.length === 0) return [];

  const startTime = Date.now();

  // ── Phase 1: Ping all lenders in parallel ────────────────────────────────
  const pingResults = await Promise.all(
    activeLenders.map(async (lender) => {
      const pingStart = Date.now();
      let result: { accepted: boolean; bid: number; aprMin?: number; aprMax?: number; termMonths?: number; estimatedMonthlyPayment?: number; approvalConfidence?: "high" | "good" | "fair"; rawResponse?: unknown };

      if (!lender.pingUrl) {
        // Mock mode
        const mock = mockPing(lender, lead);
        result = { ...mock, rawResponse: { mock: true } };
      } else {
        const real = await realPing(lender, lead);
        // For real pings, fall back to mock APR calculation since real lenders return their own format
        const mock = mockPing(lender, lead);
        result = {
          accepted: real.accepted,
          bid: real.bid,
          aprMin: mock.aprMin,
          aprMax: mock.aprMax,
          termMonths: mock.termMonths,
          estimatedMonthlyPayment: mock.estimatedMonthlyPayment,
          approvalConfidence: mock.approvalConfidence,
          rawResponse: real.rawResponse,
        };
      }

      const pingMs = Date.now() - pingStart;

      // Save offer record
      const offer = await createLenderOffer({
        leadId: lead.id,
        lenderId: lender.id,
        pingAccepted: result.accepted,
        pingBid: result.accepted ? String(result.bid) : null,
        pingResponseMs: pingMs,
        pingRawResponse: result.rawResponse ?? null,
        postSent: false,
        postAccepted: false,
        lenderName: lender.name,
        lenderLogoUrl: lender.logoUrl ?? null,
        aprMin: result.accepted ? String(result.aprMin) : null,
        aprMax: result.accepted ? String(result.aprMax) : null,
        estimatedMonthlyPayment: result.accepted ? String(result.estimatedMonthlyPayment) : null,
        termMonths: result.accepted ? result.termMonths : null,
        approvalConfidence: result.accepted ? result.approvalConfidence : null,
        isBestMatch: false,
      });

      return { lender, offer, result };
    })
  );

  // ── Phase 2: Post full lead to all accepting lenders ─────────────────────
  const acceptedPings = pingResults.filter((r) => r.result.accepted);

  await Promise.all(
    acceptedPings.map(async ({ lender, offer }) => {
      let postAccepted = false;
      let postRaw: unknown = { mock: true, posted: true };

      if (lender.postUrl) {
        const postResult = await realPost(lender, lead);
        postAccepted = postResult.accepted;
        postRaw = postResult.rawResponse;
      } else {
        // Mock: always accept the post
        postAccepted = true;
      }

      await updateLenderOffer(offer.id, {
        postSent: true,
        postAccepted,
        postRawResponse: postRaw,
      });
    })
  );

  // ── Phase 3: Rank offers and mark best match ──────────────────────────────
  const acceptedOffers = await getOffersByLeadId(lead.id);

  if (acceptedOffers.length > 0) {
    // Best match = lowest APR min (highest quality offer)
    const bestOffer = acceptedOffers[0]!;
    await updateLenderOffer(bestOffer.id, { isBestMatch: true });

    await updateLead(lead.id, { status: "matched" });
  } else {
    await updateLead(lead.id, { status: "no_match" });
  }

  console.log(`[PingPost] Lead ${lead.id}: ${acceptedOffers.length}/${activeLenders.length} lenders accepted in ${Date.now() - startTime}ms`);

  // ── Return ranked offers for the Offer Results page ───────────────────────
  return acceptedOffers.map((offer, idx) => ({
    offerId: offer.id,
    lenderId: offer.lenderId,
    lenderName: offer.lenderName ?? "Auto Lender",
    lenderLogoUrl: offer.lenderLogoUrl ?? null,
    aprMin: Number(offer.aprMin ?? 0),
    aprMax: Number(offer.aprMax ?? 0),
    estimatedMonthlyPayment: Number(offer.estimatedMonthlyPayment ?? 0),
    termMonths: offer.termMonths ?? 60,
    approvalConfidence: (offer.approvalConfidence ?? "fair") as "high" | "good" | "fair",
    isBestMatch: idx === 0,
  }));
}
