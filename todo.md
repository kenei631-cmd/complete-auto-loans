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
