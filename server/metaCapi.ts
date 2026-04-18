/**
 * Meta Conversions API (CAPI) helper
 *
 * Sends server-side events to Meta to complement the browser pixel.
 * Deduplication is handled via the `eventId` field — the same ID must be
 * passed to both `fbq('track', ..., { eventID })` on the client and here.
 *
 * Events used:
 *  - PageView   : fired by browser pixel only (no server-side needed)
 *  - Lead       : fired by browser pixel + CAPI (deduplicated)
 *  - Purchase   : fired by CAPI only when a lead is sold to a lender
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import { ENV } from "./_core/env";
import crypto from "crypto";

const CAPI_URL = "https://graph.facebook.com/v19.0";

/** Hash a PII value with SHA-256 as required by Meta */
function hashPii(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string; // _fbp cookie value
  fbc?: string; // _fbc cookie value
}

export interface CapiEventOptions {
  eventName: "Lead" | "Purchase" | "CompleteRegistration" | "PageView";
  eventId: string; // unique ID for deduplication with browser pixel
  eventSourceUrl: string;
  userData: CapiUserData;
  customData?: {
    currency?: string;
    value?: number;
    contentName?: string;
    contentCategory?: string;
    leadType?: string;
  };
  actionSource?: "website" | "email" | "app" | "phone_call" | "system_generated" | "other";
}

export async function sendCapiEvent(options: CapiEventOptions): Promise<{ success: boolean; error?: string }> {
  const pixelId = ENV.metaPixelId;
  const accessToken = ENV.metaCapiToken;

  if (!pixelId || !accessToken) {
    console.warn("[CAPI] META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set — skipping event");
    return { success: false, error: "CAPI credentials not configured" };
  }

  const { eventName, eventId, eventSourceUrl, userData, customData, actionSource = "website" } = options;

  // Build hashed user_data object
  const hashedUserData: Record<string, string | string[]> = {};
  if (userData.email) hashedUserData.em = [hashPii(userData.email)];
  if (userData.phone) hashedUserData.ph = [hashPii(userData.phone.replace(/\D/g, ""))];
  if (userData.firstName) hashedUserData.fn = [hashPii(userData.firstName)];
  if (userData.lastName) hashedUserData.ln = [hashPii(userData.lastName)];
  if (userData.city) hashedUserData.ct = [hashPii(userData.city)];
  if (userData.state) hashedUserData.st = [hashPii(userData.state.toLowerCase())];
  if (userData.zip) hashedUserData.zp = [hashPii(userData.zip)];
  if (userData.clientIpAddress) hashedUserData.client_ip_address = userData.clientIpAddress;
  if (userData.clientUserAgent) hashedUserData.client_user_agent = userData.clientUserAgent;
  if (userData.fbp) hashedUserData.fbp = userData.fbp;
  if (userData.fbc) hashedUserData.fbc = userData.fbc;

  const event: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: eventSourceUrl,
    action_source: actionSource,
    user_data: hashedUserData,
  };

  if (customData && Object.keys(customData).length > 0) {
    event.custom_data = customData;
  }

  const payload = {
    data: [event],
    // test_event_code: "TEST12345", // uncomment during testing in Events Manager
  };

  try {
    const res = await fetch(`${CAPI_URL}/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as { events_received?: number; error?: { message: string } };

    if (!res.ok || json.error) {
      console.error("[CAPI] Error sending event:", json.error?.message ?? res.statusText);
      return { success: false, error: json.error?.message ?? res.statusText };
    }

    console.log(`[CAPI] ${eventName} sent (events_received: ${json.events_received})`);
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[CAPI] Network error:", msg);
    return { success: false, error: msg };
  }
}
