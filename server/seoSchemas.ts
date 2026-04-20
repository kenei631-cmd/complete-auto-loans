/**
 * seoSchemas.ts — Server-side JSON-LD injection
 *
 * Maps every route to its structured data schemas so Googlebot sees them
 * in the raw HTML response without needing to execute JavaScript.
 *
 * The injectSchemas() middleware reads the route from the request URL,
 * looks up the matching schemas, and injects them into the HTML <head>
 * before the page is served.
 *
 * Usage: call injectSchemas(app) in server/_core/index.ts before serveStatic()
 */

import type { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = "https://completeautoloans.com";
const ORG_NAME = "Complete Auto Loans";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/logo_white_text_b1a4b277.png";
const GBP_RATING = 5.0;
const GBP_REVIEW_COUNT = 238;

// ── Schema builders (server-side, no React deps) ─────────────────────────────

function webPage(title: string, description: string, url: string, dateModified = "2026-04-01") {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${BASE_URL}${url}/`,
    dateModified,
    publisher: { "@type": "Organization", name: ORG_NAME, logo: { "@type": "ImageObject", url: LOGO_URL } },
  };
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}/`,
    })),
  };
}

function aggregateRating(name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GBP_RATING,
      reviewCount: GBP_REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

function financialProduct(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    description,
    url: `${BASE_URL}${url}/`,
    provider: { "@type": "Organization", name: ORG_NAME, url: BASE_URL },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

function article(title: string, description: string, url: string, datePublished: string, dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${url}/`,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: ORG_NAME, url: BASE_URL },
    publisher: { "@type": "Organization", name: ORG_NAME, logo: { "@type": "ImageObject", url: LOGO_URL } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${url}/` },
  };
}

function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-425-761-8500",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: ["https://www.facebook.com/completeautoloans"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GBP_RATING,
      reviewCount: GBP_REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ── Route → schemas map ───────────────────────────────────────────────────────

type SchemaMap = Record<string, object[]>;

function buildSchemaMap(): SchemaMap {
  const map: SchemaMap = {};

  // Homepage
  map["/"] = [
    organization(),
    webPage("Complete Auto Loans — Bad Credit Auto Loans | Get Approved Today",
      "Get approved for a bad credit auto loan today. Complete Auto Loans matches you with 500+ lenders. No minimum credit score. Soft credit check only.", "/"),
    breadcrumb([{ name: "Home", path: "/" }]),
  ];

  // Apply page
  map["/apply"] = [
    webPage("Apply for a Bad Credit Auto Loan — Complete Auto Loans",
      "Apply for a bad credit auto loan in 2 minutes. No hard credit pull. Get matched with 500+ lenders instantly.", "/apply"),
    breadcrumb([{ name: "Home", path: "/" }, { name: "Apply", path: "/apply" }]),
  ];

  // How It Works
  map["/how-it-works"] = [
    webPage("How It Works — Complete Auto Loans",
      "See how Complete Auto Loans matches you with the best bad credit auto loan lenders in 3 simple steps.", "/how-it-works"),
    breadcrumb([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]),
  ];

  // About
  map["/about"] = [
    organization(),
    webPage("About Complete Auto Loans — Bad Credit Auto Loan Experts",
      "Complete Auto Loans is based in Everett, WA. We help borrowers with bad credit, no credit, and past bankruptcies get approved for auto loans.", "/about"),
    breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
  ];

  // Blog index
  map["/blog"] = [
    webPage("Auto Loan Blog — Complete Auto Loans",
      "Expert guides on bad credit auto loans, refinancing, and car buying for borrowers with challenging credit histories.", "/blog"),
    breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
  ];

  // Locations
  map["/locations"] = [
    webPage("Auto Loan Locations — Complete Auto Loans",
      "Find bad credit auto loan lenders near you. Complete Auto Loans serves borrowers in Phoenix, Dallas, Chicago, and 50+ cities nationwide.", "/locations"),
    breadcrumb([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]),
  ];

  // ── Best-Of Pages ──────────────────────────────────────────────────────────
  const bestOf = [
    { path: "/best-bad-credit-auto-loans", title: "Best Bad Credit Auto Loans of 2026 — Reviewed & Ranked", desc: "Compare the best bad credit auto loans of 2026. We reviewed 40+ lenders to find options for scores under 600. No minimum credit score required." },
    { path: "/best-buy-here-pay-here-dealerships", title: "Best Buy Here Pay Here Dealerships of 2026 — Reviewed & Ranked", desc: "Find the best buy here pay here dealerships of 2026. In-house financing with guaranteed approval for deep subprime borrowers. No minimum credit score." },
    { path: "/best-no-money-down-car-loans-bad-credit", title: "Best No Money Down Car Loans for Bad Credit (2026) — Reviewed", desc: "Compare the best $0 down car loans for bad credit in 2026. Get approved with no down payment even with a low credit score. 500+ lender network." },
    { path: "/best-guaranteed-approval-auto-loans", title: "Best Guaranteed Approval Auto Loans of 2026 — Reviewed & Ranked", desc: "Find the best guaranteed approval auto loans of 2026. Get pre-approved regardless of credit score. Compare lenders with near-100% approval rates." },
    { path: "/best-pre-approved-car-loans-bad-credit", title: "Best Pre-Approved Car Loans for Bad Credit (2026) — Reviewed", desc: "Get pre-approved for a car loan with bad credit in 2026. Compare lenders offering soft-pull pre-approval with no impact to your credit score." },
    { path: "/best-no-credit-check-car-loans", title: "Best No Credit Check Car Loans of 2026 — Reviewed & Ranked", desc: "Compare the best no credit check car loans of 2026. Get approved without a hard credit inquiry. Ideal for rebuilding credit or first-time buyers." },
    { path: "/best-first-time-car-buyer-loans-no-credit", title: "Best Car Loans for First-Time Buyers with No Credit (2026) — Reviewed", desc: "Find the best auto loans for first-time buyers with no credit history in 2026. No co-signer required. Compare lenders that specialize in new borrowers." },
    { path: "/best-car-loans-after-bankruptcy", title: "Best Car Loans After Bankruptcy of 2026 — Reviewed & Ranked", desc: "Compare the best auto loans after bankruptcy in 2026. Get approved after Chapter 7 or Chapter 13. Lenders that work with discharged and active BK." },
    { path: "/best-auto-loans-after-repossession", title: "Best Auto Loans After Repossession of 2026 — Reviewed & Ranked", desc: "Find the best auto loans after a repossession in 2026. Get approved even with a recent repo on your record. Compare lenders with second-chance programs." },
    { path: "/best-second-chance-auto-loans", title: "Best Second Chance Auto Loans of 2026 — Reviewed & Ranked", desc: "Compare the best second chance auto loans of 2026. Designed for borrowers with past credit problems. Get a fresh start with lenders that look beyond your score." },
    { path: "/best-itin-auto-loans", title: "Best ITIN Auto Loans of 2026 — Reviewed & Ranked", desc: "Compare the best ITIN auto loans of 2026. Get approved without a Social Security number using your Individual Taxpayer Identification Number." },
    { path: "/best-auto-refinance-bad-credit", title: "Best Auto Refinance Loans for Bad Credit (2026) — Reviewed & Ranked", desc: "Find the best auto refinance options for bad credit in 2026. Lower your monthly payment or interest rate even with a score under 600." },
    { path: "/best-car-loans-low-income", title: "Best Car Loans for Low Income Borrowers of 2026 — Reviewed", desc: "Compare the best car loans for low income borrowers in 2026. Get approved with income as low as $1,200/month. No minimum credit score required." },
  ];

  for (const p of bestOf) {
    const pageName = p.title.split(" — ")[0];
    map[p.path] = [
      financialProduct(p.title, p.desc, p.path),
      aggregateRating(pageName),
      breadcrumb([{ name: "Home", path: "/" }, { name: pageName, path: p.path }]),
    ];
  }

  // ── Blog Posts ─────────────────────────────────────────────────────────────
  const blogs = [
    { slug: "what-credit-score-do-you-need-to-buy-a-car", title: "What Credit Score Do You Need to Buy a Car?", desc: "Find out exactly what credit score you need to buy a car in 2026. See how your score affects your rate and which lenders approve scores under 600.", pub: "2025-09-01", mod: "2026-04-01" },
    { slug: "how-to-get-a-car-loan-after-bankruptcy", title: "How to Get a Car Loan After Bankruptcy", desc: "Yes, you can get a car loan after bankruptcy. Learn how Chapter 7 and Chapter 13 affect your options and which lenders approve discharged borrowers.", pub: "2025-09-15", mod: "2026-04-01" },
    { slug: "car-loan-with-500-credit-score", title: "Can I Get a Car Loan with a 500 Credit Score?", desc: "Yes — you can get a car loan with a 500 credit score. See which lenders approve scores under 550 and what rates to expect.", pub: "2025-10-01", mod: "2026-04-01" },
    { slug: "buy-here-pay-here-vs-traditional-auto-loans", title: "Buy Here Pay Here vs. Traditional Auto Loans: Which Is Right for You?", desc: "Compare buy here pay here dealerships vs traditional auto loans. See the real differences in rates, approval odds, and total cost.", pub: "2025-10-15", mod: "2026-04-01" },
    { slug: "car-loan-no-credit-history", title: "How to Get Approved for a Car Loan with No Credit History", desc: "No credit history? You can still get approved for a car loan. Learn which lenders specialize in first-time buyers with no credit score.", pub: "2025-11-01", mod: "2026-04-01" },
    { slug: "car-loan-480-credit-score", title: "How to Get a Car Loan with a 480 Credit Score", desc: "A 480 credit score can still get you approved for a car loan. Learn which lenders approve deep subprime borrowers and what to expect.", pub: "2025-11-15", mod: "2026-04-01" },
    { slug: "chapter-7-bankruptcy-car-loan", title: "Getting a Car Loan After Chapter 7 Bankruptcy", desc: "You can get a car loan the day your Chapter 7 bankruptcy is discharged. Learn which lenders specialize in post-bankruptcy auto financing.", pub: "2025-12-01", mod: "2026-04-01" },
    { slug: "how-to-refinance-bad-credit-auto-loan", title: "How to Refinance a Bad Credit Auto Loan", desc: "Refinancing a bad credit auto loan can save you $50–$150/month and thousands in interest. Learn when and how to refinance with a low credit score.", pub: "2025-12-15", mod: "2026-04-01" },
    { slug: "itin-auto-loans-no-ssn", title: "How to Get a Car Loan with an ITIN (No Social Security Number)", desc: "You can get a car loan with an ITIN instead of a Social Security number. Learn which lenders accept ITIN and what documents you need.", pub: "2026-01-01", mod: "2026-04-01" },
    { slug: "no-money-down-car-loan-guide", title: "No Money Down Car Loans: What You Need to Know Before You Apply", desc: "No money down car loans are possible even with bad credit. Learn the real requirements, risks, and which lenders offer $0 down financing.", pub: "2026-01-15", mod: "2026-04-01" },
  ];

  for (const b of blogs) {
    const url = `/blog/${b.slug}`;
    map[url] = [
      article(b.title, b.desc, url, b.pub, b.mod),
      breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: b.title, path: url }]),
    ];
  }

  return map;
}

const SCHEMA_MAP = buildSchemaMap();

// ── Middleware ────────────────────────────────────────────────────────────────

/**
 * Reads the built index.html, injects JSON-LD for the matching route into
 * <head>, and sends the modified HTML. Falls back to the original file if
 * no schema is found for the route.
 */
export function injectSchemas(app: Express) {
  // Only run in production — dev uses Vite's transform pipeline
  if (process.env.NODE_ENV !== "production") return;

  const distPath = path.resolve(import.meta.dirname, "public");

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    // Only intercept HTML requests (not assets)
    const accept = req.headers.accept ?? "";
    if (!accept.includes("text/html")) return next();

    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return next();

    // Normalize path: strip trailing slash for lookup (except root)
    // IMPORTANT: use req.originalUrl (not req.path) because app.use("*") sets
    // req.path = "/" for all routes — originalUrl preserves the actual URL path.
    let pathname = req.originalUrl.split("?")[0];
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    const schemas = SCHEMA_MAP[pathname];
    if (!schemas || schemas.length === 0) return next();

    try {
      let html = fs.readFileSync(indexPath, "utf-8");

      // Build the JSON-LD script tags
      const scriptTags = schemas
        .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
        .join("\n    ");

      // Inject before </head>
      html = html.replace("</head>", `    ${scriptTags}\n  </head>`);

      res
        .status(200)
        .set({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        })
        .end(html);
    } catch {
      next();
    }
  });
}
