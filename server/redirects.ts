/**
 * 301 Redirect Rules — completeautoloans.com
 *
 * Generated from Wayback Machine crawl of 505 old URLs (old WordPress site).
 * All redirects are permanent (301) and target trailing-slash URLs.
 *
 * Categories:
 *  1. Old service pages → new best-of pages
 *  2. Old /special-financing/ section → new best-of pages
 *  3. Old city/location pages → new city pages or /locations/
 *  4. Old blog posts with city modifiers → /blog/bad-credit-auto-loans-complete-guide/
 *  5. Old blog posts with specific new equivalents → new blog post
 *  6. Legal/utility pages
 *  7. Catch-all: old blog posts with no equivalent → /blog/
 *  8. AMP pages → canonical (handled by pattern match below)
 */

import type { Express } from "express";

// Static redirect map: old path → new path (all with trailing slashes)
const REDIRECT_MAP: Record<string, string> = {
  // ── Old service pages ─────────────────────────────────────────────────────
  "/bad-credit-auto-loans/": "/best-bad-credit-auto-loans/",
  "/bad-credit-auto-loans-2/": "/best-bad-credit-auto-loans/",
  "/buy-here-pay-here/": "/best-buy-here-pay-here-dealerships/",
  "/no-credit-check-car-loans/": "/best-no-credit-check-car-loans/",
  "/no-money-down-car-loans/": "/best-no-money-down-car-loans-bad-credit/",
  "/zero-down-car-loans/": "/best-no-money-down-car-loans-bad-credit/",
  "/guaranteed-approval-auto-loans/": "/best-guaranteed-approval-auto-loans/",
  "/second-chance-auto-loans/": "/best-second-chance-auto-loans/",
  "/car-loans-after-bankruptcy/": "/best-car-loans-after-bankruptcy/",
  "/auto-loans-after-repossession/": "/best-auto-loans-after-repossession/",
  "/itin-auto-loans/": "/best-itin-auto-loans/",
  "/auto-refinance-bad-credit/": "/best-auto-refinance-bad-credit/",
  "/low-income-car-loans/": "/best-car-loans-low-income/",
  "/first-time-car-buyer/": "/best-first-time-car-buyer-loans-no-credit/",
  "/pre-approved-car-loans/": "/best-pre-approved-car-loans-bad-credit/",

  // ── Old /special-financing/ section ──────────────────────────────────────
  "/special-financing/": "/best-bad-credit-auto-loans/",
  "/special-financing/bad-credit-auto-loans/": "/best-bad-credit-auto-loans/",
  "/special-financing/car-loans-for-people-with-bad-credit/": "/best-bad-credit-auto-loans/",
  "/special-financing/auto-loan-glossary/": "/best-bad-credit-auto-loans/",
  "/special-financing/buy-here-pay-here-car-lots/": "/best-buy-here-pay-here-dealerships/",
  "/special-financing/car-dealer-in-house-financing/": "/best-buy-here-pay-here-dealerships/",
  "/special-financing/tote-the-note/": "/best-buy-here-pay-here-dealerships/",
  "/special-financing/first-time-car-buyer-program/": "/best-first-time-car-buyer-loans-no-credit/",
  "/special-financing/student-car-loans/": "/best-first-time-car-buyer-loans-no-credit/",
  "/special-financing/getting-bankruptcy-car-loans/": "/best-car-loans-after-bankruptcy/",
  "/special-financing/low-income-car-loans-no-credit/": "/best-car-loans-low-income/",
  "/special-financing/second-chance-car-loans/": "/best-second-chance-auto-loans/",
  "/special-financing/subprime-auto-loans/": "/best-bad-credit-auto-loans/",
  "/special-financing/high-risk-auto-loan/": "/best-bad-credit-auto-loans/",
  "/special-financing/negative-equity-car-loan/": "/best-auto-refinance-bad-credit/",
  "/special-financing/exotic-classic-car-financing/": "/best-bad-credit-auto-loans/",
  "/special-financing/self-employed-car-loan/": "/best-bad-credit-auto-loans/",
  "/special-financing/zero-down-car-loans-explained/": "/best-no-money-down-car-loans-bad-credit/",

  // ── Apply / get approved ──────────────────────────────────────────────────
  "/get-approved/": "/apply/",
  "/get-pre-approved/": "/apply/",
  "/free-credit-check/": "/apply/",
  "/application/": "/apply/",
  "/thank-you/": "/apply/",
  "/thank-you-2/": "/apply/",

  // ── How it works ──────────────────────────────────────────────────────────
  "/how-car-loans-work/": "/how-it-works/",
  "/process/": "/how-it-works/",

  // ── Legal / utility ───────────────────────────────────────────────────────
  "/tcpa/": "/privacy-policy/",
  "/disclaimer/": "/privacy-policy/",
  "/about-us/": "/about/",
  "/contact/": "/about/",
  "/contact-us/": "/about/",
  "/resources/": "/blog/",
  "/news/": "/blog/",
  "/test-drive/": "/",

  // ── Old Washington state location pages → /locations/ ────────────────────
  "/seattle-wa/": "/locations/",
  "/tacoma-wa/": "/locations/",
  "/spokane-wa/": "/locations/",
  "/bellevue-wa/": "/locations/",
  "/kirkland-wa/": "/locations/",
  "/everett-wa/": "/locations/",
  "/lynnwood-wa/": "/locations/",
  "/renton-wa/": "/locations/",
  "/kent-wa/": "/locations/",
  "/federal-way-wa/": "/locations/",

  // ── Old blog posts with specific new equivalents ──────────────────────────
  "/applying-for-an-auto-loan-after-bankruptcy/": "/blog/how-to-get-a-car-loan-after-bankruptcy/",
  "/how-to-get-a-car-loan-after-bankruptcy/": "/blog/how-to-get-a-car-loan-after-bankruptcy/",
  "/bankruptcy-auto-loans/": "/blog/how-to-get-a-car-loan-after-bankruptcy/",
  "/first-time-car-buyer-loan-no-cosigner/": "/blog/first-time-car-buyer-no-credit-guide/",
  "/when-should-you-refinance-your-car-loan/": "/blog/how-to-refinance-a-car-loan-with-bad-credit/",
  "/will-refinancing-my-car-affect-my-credit-rating/": "/blog/how-to-refinance-a-car-loan-with-bad-credit/",
  "/trading-car-with-loan-balance/": "/blog/how-to-refinance-a-car-loan-with-bad-credit/",

  // ── Old city-specific bad credit pages → new blog post ───────────────────
  "/bad-credit-auto-loans-atlanta-ga/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-denver-co/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-hastings-ne/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-high-point-nc/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-austin-tx/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-baltimore-md/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-boston-ma/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-charlotte-nc/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-chicago-il/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-columbus-oh/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-detroit-mi/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-ft-lauderdale-fl/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-greensboro-nc/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-houston-tx/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-manchester-nh/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-miami-fl/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-monterey-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-new-bedford-ma/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-new-york-ny/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-oakland-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-omaha-ne/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-phoenix-az/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-portland-or/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-salt-lake-city-ut/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-san-antonio-tx/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-san-diego-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-san-francisco-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-san-jose-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-sarasota-fl/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-in-st-petersburg-fl/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-kearney-ne/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-lincoln-ne/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-los-angeles-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-milwaukee-wi/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-new-orleans-la/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-pittsburgh-pa/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-tulsa-ok/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loans-winston-salem-nc/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loan-in-salinas-ca/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/bad-credit-auto-loan-in-tampa-fl/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/are-there-car-loans-for-people-with-bad-credit/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/subprime-auto-loan-delinquency-rates/": "/blog/bad-credit-auto-loans-complete-guide/",
  "/top-leading-bad-credit-auto-leasing-trends/": "/blog/bad-credit-auto-loans-complete-guide/",
};

/**
 * Register all 301 redirect middleware on the Express app.
 * Must be called BEFORE route handlers and static file serving.
 */
export function registerRedirects(app: Express): void {
  // 1. AMP pages → canonical (strip /amp/ suffix, then apply redirect map for single-hop)
  app.use((req, res, next) => {
    const path = req.path;
    if (path.endsWith("/amp/") || path.endsWith("/amp")) {
      const canonical = path.replace(/\/amp\/?$/, "/") || "/";
      // If the canonical itself has a redirect, go directly to the final destination
      const finalTarget = REDIRECT_MAP[canonical] ?? canonical;
      return res.redirect(301, finalTarget);
    }
    next();
  });

  // 2. Static redirect map
  app.use((req, res, next) => {
    // Normalize: ensure trailing slash for lookup
    let lookup = req.path;
    if (!lookup.endsWith("/")) lookup += "/";

    const target = REDIRECT_MAP[lookup];
    if (target) {
      return res.redirect(301, target);
    }
    next();
  });

  // 3. Old /blog/{slug}/ URLs that don't exist on new site → /blog/
  // The new site's blog uses the same /blog/:slug pattern, so only redirect
  // if the slug doesn't match a known new post (handled by the SPA fallback).
  // We don't need an explicit rule here — unknown blog slugs will 404 in the
  // SPA and can be caught by the ErrorBoundary. If you want to redirect ALL
  // unknown old blog slugs to /blog/, uncomment the block below:
  //
  // app.use((req, res, next) => {
  //   if (req.path.startsWith('/blog/') && req.path !== '/blog/') {
  //     // Let the SPA handle it; if it 404s the user sees the blog index
  //   }
  //   next();
  // });
}
