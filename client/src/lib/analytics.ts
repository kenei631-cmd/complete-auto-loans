/**
 * analytics.ts — PostHog initialization and event helpers.
 *
 * To activate:
 * 1. Sign up at posthog.com (free up to 1M events/month)
 * 2. Get your Project API Key from Settings → Project → API Key
 * 3. Add VITE_POSTHOG_KEY=phc_XXXXXXXX to your environment secrets
 *
 * PostHog will be silently disabled if VITE_POSTHOG_KEY is not set,
 * so the app works in dev/staging without any configuration.
 */
import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key || initialized) return;

  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST as string | undefined ?? "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false, // Manual event capture only — keeps data clean
  });

  initialized = true;
}

/**
 * Track a named event with optional properties.
 * Safe to call even if PostHog is not initialized.
 */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

/**
 * Identify a user after form submission (optional, for lead tracking).
 */
export function identifyLead(email: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.identify(email, { email, ...properties });
}
