# Complete Auto Loans — TODO

## Lead Engine & Form

- [x] Upgrade project to full-stack (web-db-user) with backend server + Postgres
- [x] Database schema: leads, lenders, lender_offers, users tables
- [x] Ping Post engine (server/pingPost.ts) with mock lender support
- [x] tRPC leads router: savePartial, submit, getOffers, selectOffer, adminList
- [x] tRPC lenders router: list, get, create, update (admin-protected)
- [x] Apply form wired to savePartial (step 3→4) and submit (step 4 contact)
- [x] Apply form: loading states, error display, redirect to /offers/:token
- [x] Offer Results page (/offers/:token) with ranked lender cards and loading state
- [x] Admin Panel (/admin) with lender management and lead list
- [x] Vitest tests for leads and lenders routers (8 tests passing)
- [ ] Wire real lender API endpoints (replace mock in pingPost.ts when lender agreements signed) — READY: add endpoint + apiKey to lenders table in Admin Panel
- [x] Add zip→state lookup (zipToState.ts covers all 50 states + DC)
- [x] Add TrustedForm script to index.html for TCPA compliance certificate capture (cert URL captured on submit)
- [x] Add PostHog step-by-step funnel analytics to Apply form (trackStep helper, events: apply_step_1/2/3_completed, apply_form_submitted)
- [x] Add GHL webhook for abandonment recovery (fires on savePartial when abandonedAtStep is set; requires GHL_ABANDONMENT_WEBHOOK_URL secret)
- [x] Add owner notification on new lead submission (notifyOwner called in submit procedure)

## SEO / AEO Improvements (completed in prior sessions)

- [x] FAQ expansion: all 12 national Best-Of pages have 7-8 answer-first questions
- [x] SpeakableSchema added to all 93 pages (national + city)
- [x] "What to Expect" timeline section added to all 13 national pages
- [x] "Soft Pull vs Hard Pull" explainer section added to all 13 national pages
- [x] Interactive LoanCalculator component added to Apply page and all 13 national pages
- [x] Organization sameAs fixed (real Facebook URL only, Twitter removed)
- [x] GeoCoordinates added to all 90 city pages (service + hub)
- [x] aggregateRating (238 Facebook reviews, 5.0) added to all 90 city pages
- [x] GBP review count updated to 238 (Facebook)

## Content / Growth (pending)

- [x] Blog infrastructure: /blog index page, /blog/:slug post page, nav wiring, sitemap update
- [x] Blog article 1: "What Credit Score Do You Need to Buy a Car?" (/blog/what-credit-score-do-you-need-to-buy-a-car)
- [x] Blog article 2: "How to Get a Car Loan After Bankruptcy" (/blog/how-to-get-a-car-loan-after-bankruptcy)
- [x] Blog article 3: "Can I Get a Car Loan with a 500 Credit Score?" (/blog/car-loan-with-500-credit-score)
- [x] Blog article 4: "Buy Here Pay Here vs Traditional Auto Loans" (/blog/buy-here-pay-here-vs-traditional-auto-loans)
- [x] Blog article 5: "How to Get Approved for a Car Loan with No Credit History" (/blog/car-loan-no-credit-history)
- [x] About / Team page (/about) with founder story, Everett WA address, E-E-A-T schema, nav wiring
- [ ] Refinance Bad Credit national pillar + 10 city pages
- [ ] Submit all URLs to Google Search Console + RapidURL Indexer
- [ ] Sticky mobile CTA bar on Best-Of pages

## Meta Ads & Tracking

- [x] Meta Pixel base code added to index.html (Pixel ID: 26436395032721578, fires PageView on all pages)
- [x] Meta CAPI server-side helper (server/metaCapi.ts) with SHA-256 PII hashing and deduplication
- [x] CAPI Lead event fires on form submission (server-side + browser-side, deduplicated via token as eventID)
- [x] META_PIXEL_ID and META_CAPI_ACCESS_TOKEN stored as environment secrets
- [x] Add CAPI Purchase event webhook endpoint (fires when lead is sold to lender — needed for value optimization)
- [ ] Create Meta Ads campaign (Objective: Leads, Budget: $30-50/day, Advantage+ Audience)
- [ ] Verify pixel events in Meta Events Manager (check PageView + Lead firing correctly)
- [x] Add leadSoldAt and saleValue columns to leads table schema
- [x] Build /api/webhooks/lead-purchased endpoint with HMAC verification and CAPI Purchase event
- [x] Write vitest tests for the webhook endpoint (7 tests, all passing)

## Admin Panel Improvements

- [x] Admin Test Ping tool: form to fire a live ping to a single lender without creating a real lead
- [x] Lead management: Mark as Test + Delete buttons on leads in admin panel
- [x] isTest column added to leads schema (DB migrated)
- [x] Mega menu hover gap bug fix (useRef timer + paddingTop bridge in Layout.tsx)

## Security Hardening

- [x] Add express-rate-limit to public lead submission and webhook endpoints
- [x] Reduce body parser limit from 50 MB to 1 MB (API) / 20 MB (storage proxy)
- [x] Add Helmet middleware for HTTP security headers
- [x] Migrate all admin procedures from manual adminOnly() to adminProcedure middleware
- [x] Add .max() length limits to all public Zod string inputs
- [x] Add ProtectedAdminRoute wrapper in App.tsx for route-level guard
- [x] Cap adminList pagination at 200 rows max

## Admin URL Security

- [x] Rename /admin route to non-guessable URL with random suffix (/portal-avs6pzsw)
- [x] Update ProtectedAdminRoute reference in App.tsx
- [x] Save new admin URL to ADMIN_URL.md for reference

## Review Count Update

- [x] Replace all "11 Google Reviews" / "11 reviews" references with "238 Facebook Reviews" (5.0 rating) across all pages, schema, and components

## UX Fixes

- [x] Fix SPA scroll-to-top: page does not scroll to top on route change

## Header / Nav

- [x] Increase logo size in main navigation header — 56px → 72px, header height 4.25rem → 5rem

## Analytics / Tracking

- [x] Add Google Tag Manager (GTM-WVRC2F7) head snippet and body noscript fallback to index.html

## SEO Content Expansion

### Blog — New Articles (2000+ words each)
- [x] New blog: "How to Get a Car Loan with a 480 Credit Score" (/blog/car-loan-480-credit-score)
- [x] New blog: "What Happens to Your Car Loan After Chapter 7 Bankruptcy" (/blog/chapter-7-bankruptcy-car-loan)
- [x] New blog: "How to Refinance a Bad Credit Auto Loan" (/blog/how-to-refinance-bad-credit-auto-loan)
- [x] New blog: "ITIN Auto Loans: How to Buy a Car Without a Social Security Number" (/blog/itin-auto-loans-no-ssn)
- [x] New blog: "No Money Down Car Loan Guide" (/blog/no-money-down-car-loan-guide)
- [x] Register all 5 new blog posts in blogPosts.ts and blogContent.ts
- [x] Add all 8 missing blog URLs + editorial-standards to sitemap.xml (120 URLs total)

### Blog — Expand Existing Posts (500 words → 2000+ words)
- [x] Expand: "What Credit Score Do You Need to Buy a Car?" to 2000+ words
- [x] Expand: "How to Get a Car Loan After Bankruptcy" to 2000+ words
- [x] Expand: "Can I Get a Car Loan with a 500 Credit Score?" to 2000+ words
- [x] Expand: "Buy Here Pay Here vs. Traditional Auto Loans" to 2000+ words
- [x] Expand: "How to Get Approved for a Car Loan with No Credit History" to 2000+ words

### City Pages — Unique Local Data
- [x] Add state-specific auto loan laws, title fees, and average used car prices to all 80 city pages (cityLocalData.ts + CityServicePageTemplate update)
- [x] 16 city entries covering all 10 cities (Phoenix AZ, Dallas TX, Chicago IL, San Antonio TX, Fort Worth TX, Charlotte NC, Colorado Springs CO, Columbus OH, Detroit MI, Tulsa OK)

### E-E-A-T Signals
- [x] Create /editorial-standards page with ranking methodology, data sources, and advertiser disclosure
- [x] Add Editorial Standards link to footer
- [x] Add editorial-standards to sitemap.xml
- [ ] Add author bylines to all blog posts (name, title, credentials) — future enhancement
- [ ] Add "Sources & Methodology" section to best-of pages — future enhancement

## Lender Link Fixes

- [x] Fix all lender ctaHref URLs from /apply to real external lender websites (51 fixes across 13 best-of pages)
- [x] Fix LenderCard.tsx to use <a target="_blank" rel="noopener noreferrer"> for external URLs
- [x] Fix non-featured lender "Visit website" button — was a dead <button>, now a real clickable <a> link

## Technical SEO Fixes

- [x] Server-side HTML metadata injection (seoMeta.ts) — rewrites title, meta description, canonical, og:* and twitter:* for all 122 pages before serving to Googlebot

- [x] Fix #1: Server-side JSON-LD injection per route (structured data in raw HTML for Googlebot)
- [x] Fix #2: HTML cache-control header (controlled by Manus platform proxy — cannot be changed in app code)
- [x] Fix #3: Per-page OG images for all best-of and blog pages (23 images generated, all 13 best-of pages + 10 blog posts wired)
- [x] Fix #4: LCP hero image preload hint in index.html (fetchpriority=high)
- [x] Fix #5: X-Robots-Tag: noindex on all /api/* routes

## Netlify Deployment (SEO Fix)

- [x] Create netlify.toml with /api/* proxy to api.completeautoloans.com and SPA fallback
- [x] Add build:netlify script (vite build + inject-meta.mjs for per-page metadata)
- [x] Add CORS headers to Express server for completeautoloans.com origin
- [ ] Export project to GitHub (Settings → GitHub in Manus Management UI)
- [ ] Create Netlify account and connect GitHub repo
- [ ] Set environment variables in Netlify (VITE_* vars)
- [ ] Add api.completeautoloans.com custom domain to Manus project
- [ ] Update DNS: completeautoloans.com → Netlify, api.completeautoloans.com → Manus
- [ ] Verify view-source:https://completeautoloans.com/best-bad-credit-auto-loans/ shows correct title
