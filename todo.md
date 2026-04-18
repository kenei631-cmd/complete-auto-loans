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
- [ ] Wire real lender API endpoints (replace mock in pingPost.ts when lender agreements signed)
- [ ] Add zip→state lookup (currently hardcoded "TX" in Apply.tsx handleSubmit)
- [ ] Add TrustedForm script to Apply page for TCPA compliance certificate capture
- [ ] Add PostHog step-by-step funnel analytics to Apply form
- [ ] Add GHL webhook for abandonment recovery (partial lead at step 3)
- [ ] Add owner notification email on new lead submission

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

- [ ] Blog section: 5-10 AEO-optimized articles at /blog/[slug]/
- [ ] Refinance Bad Credit national pillar + 10 city pages
- [ ] About / Team page for E-E-A-T
- [ ] Submit all URLs to Google Search Console + RapidURL Indexer
- [ ] Sticky mobile CTA bar on Best-Of pages
