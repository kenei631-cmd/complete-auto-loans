/**
 * seoMeta.ts — Server-side HTML metadata injection
 *
 * This middleware rewrites <title>, <meta name="description">, <link rel="canonical">,
 * and all <meta property="og:*"> / <meta name="twitter:*"> tags in the raw HTML
 * response for every URL, so Googlebot sees unique, correct metadata without
 * needing to execute JavaScript.
 *
 * The React useSEO() hook still runs client-side for SPA navigation — this file
 * ensures the FIRST HTML response (what crawlers see) is already correct.
 *
 * Usage: call injectMeta(app) in server/_core/index.ts before serveStatic()
 */

import type { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = "https://completeautoloans.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;
const SITE_NAME = "Complete Auto Loans";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

// ── Page metadata map ─────────────────────────────────────────────────────────
// Keys are URL paths WITHOUT trailing slash (we strip it for lookup).
// Every entry here gets unique <title>, <meta description>, canonical, and OG tags.

function buildMetaMap(): Record<string, PageMeta> {
  const map: Record<string, PageMeta> = {};

  // ── Core pages ──────────────────────────────────────────────────────────────
  map["/"] = {
    title: "Complete Auto Loans — Bad Credit Auto Loans | Get Approved Today",
    description: "Get approved for a bad credit auto loan today. Complete Auto Loans matches you with 500+ lenders. No minimum credit score. Soft credit check only.",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/hero_premium-3w25pnkm7XPeSZaaGkqMXo.webp",
  };
  map["/apply"] = {
    title: "Apply for a Bad Credit Auto Loan | Complete Auto Loans",
    description: "Apply for a bad credit auto loan in 2 minutes. Answer 4 quick questions and get matched with 500+ lenders. No hard credit pull. Same-day approval available.",
  };
  map["/how-it-works"] = {
    title: "How It Works — Get a Bad Credit Auto Loan in 3 Steps | Complete Auto Loans",
    description: "Learn how Complete Auto Loans works. Answer 4 questions, get matched with 500+ lenders, and drive away approved — often same day. No hard credit pull.",
  };
  map["/about"] = {
    title: "About Complete Auto Loans — Bad Credit Auto Loan Network | Everett, WA",
    description: "Complete Auto Loans is based in Everett, WA. We help borrowers with bad credit, no credit, and past bankruptcies get approved for auto loans since 2009.",
  };
  map["/blog"] = {
    title: "Auto Loan Blog — Bad Credit Car Financing Guides | Complete Auto Loans",
    description: "Expert guides on bad credit auto loans, refinancing, and car buying for borrowers with challenging credit histories.",
  };
  map["/locations"] = {
    title: "Bad Credit Auto Loans by City | Complete Auto Loans Locations",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in your city. Complete Auto Loans serves 10 major U.S. markets.",
  };
  map["/editorial-standards"] = {
    title: "Editorial Standards & Methodology | Complete Auto Loans",
    description: "Learn how Complete Auto Loans researches, ranks, and reviews auto loan lenders. Our editorial process, data sources, and advertiser disclosure.",
  };
  map["/privacy-policy"] = {
    title: "Privacy Policy | Complete Auto Loans",
    description: "Read the Complete Auto Loans privacy policy. Learn how we collect, use, and protect your personal information when you apply for auto loan matching.",
  };
  map["/terms-of-service"] = {
    title: "Terms of Service | Complete Auto Loans",
    description: "Read the Complete Auto Loans terms of service. Understand your rights and responsibilities when using our auto loan matching and comparison service.",
  };

  // ── Best-Of pages ───────────────────────────────────────────────────────────
  const bestOf: Array<PageMeta & { path: string }> = [
    {
      path: "/best-bad-credit-auto-loans",
      title: "Best Bad Credit Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best bad credit auto loans of 2026. We reviewed 40+ lenders to find options for scores under 600. No minimum credit score required.",
      ogImage: "/manus-storage/best-bad-credit-auto-loans_og_73f14a9e.jpg",
    },
    {
      path: "/best-buy-here-pay-here-dealerships",
      title: "Best Buy Here Pay Here Dealerships of 2026 — Reviewed & Ranked",
      description: "Find the best buy here pay here dealerships of 2026. In-house financing with guaranteed approval for deep subprime borrowers. No minimum credit score.",
      ogImage: "/manus-storage/best-buy-here-pay-here-dealerships_og_86eaec5d.jpg",
    },
    {
      path: "/best-no-money-down-car-loans-bad-credit",
      title: "Best No Money Down Car Loans for Bad Credit (2026) — Reviewed",
      description: "Compare the best $0 down car loans for bad credit in 2026. Get approved with no down payment even with a low credit score. 500+ lender network.",
      ogImage: "/manus-storage/best-no-money-down-car-loans-bad-credit_og_56188913.jpg",
    },
    {
      path: "/best-guaranteed-approval-auto-loans",
      title: "Best Guaranteed Approval Auto Loans of 2026 — Reviewed & Ranked",
      description: "Find the best guaranteed approval auto loans of 2026. Get pre-approved regardless of credit score. Compare lenders with near-100% approval rates.",
      ogImage: "/manus-storage/best-guaranteed-approval-auto-loans_og_5ceb9cd4.jpg",
    },
    {
      path: "/best-pre-approved-car-loans-bad-credit",
      title: "Best Pre-Approved Car Loans for Bad Credit (2026) — Reviewed",
      description: "Get pre-approved for a car loan with bad credit in 2026. Compare lenders offering soft-pull pre-approval with no impact to your credit score.",
      ogImage: "/manus-storage/best-pre-approved-car-loans-bad-credit_og_2728c824.jpg",
    },
    {
      path: "/best-no-credit-check-car-loans",
      title: "Best No Credit Check Car Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best no credit check car loans of 2026. Get approved without a hard credit inquiry. Ideal for rebuilding credit or first-time buyers.",
      ogImage: "/manus-storage/best-no-credit-check-car-loans_og_44ab7170.jpg",
    },
    {
      path: "/best-first-time-car-buyer-loans-no-credit",
      title: "Best Car Loans for First-Time Buyers with No Credit (2026) — Reviewed",
      description: "Find the best auto loans for first-time buyers with no credit history in 2026. No co-signer required. Compare lenders that specialize in new borrowers.",
      ogImage: "/manus-storage/best-first-time-car-buyer-loans-no-credit_og_8de17c64.jpg",
    },
    {
      path: "/best-car-loans-after-bankruptcy",
      title: "Best Car Loans After Bankruptcy of 2026 — Reviewed & Ranked",
      description: "Compare the best auto loans after bankruptcy in 2026. Get approved after Chapter 7 or Chapter 13. Lenders that work with discharged and active BK.",
      ogImage: "/manus-storage/best-car-loans-after-bankruptcy_og_af0f7036.jpg",
    },
    {
      path: "/best-auto-loans-after-repossession",
      title: "Best Auto Loans After Repossession of 2026 — Reviewed & Ranked",
      description: "Find the best auto loans after a repossession in 2026. Get approved even with a recent repo on your record. Compare lenders with second-chance programs.",
      ogImage: "/manus-storage/best-auto-loans-after-repossession_og_73cf9d5b.jpg",
    },
    {
      path: "/best-second-chance-auto-loans",
      title: "Best Second Chance Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best second chance auto loans of 2026. Designed for borrowers with past credit problems. Get a fresh start with lenders that look beyond your score.",
      ogImage: "/manus-storage/best-second-chance-auto-loans_og_4419a5ef.jpg",
    },
    {
      path: "/best-itin-auto-loans",
      title: "Best ITIN Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best ITIN auto loans of 2026. Get approved without a Social Security number using your Individual Taxpayer Identification Number.",
      ogImage: "/manus-storage/best-itin-auto-loans_og_8970266d.jpg",
    },
    {
      path: "/best-auto-refinance-bad-credit",
      title: "Best Auto Refinance Loans for Bad Credit (2026) — Reviewed & Ranked",
      description: "Find the best auto refinance options for bad credit in 2026. Lower your monthly payment or interest rate even with a score under 600.",
      ogImage: "/manus-storage/best-car-loans-for-uber-lyft-drivers_og_7fa9b8fb.jpg",
    },
    {
      path: "/best-car-loans-low-income",
      title: "Best Car Loans for Low Income Borrowers of 2026 — Reviewed",
      description: "Compare the best car loans for low income borrowers in 2026. Get approved with income as low as $1,200/month. No minimum credit score required.",
      ogImage: "/manus-storage/best-car-loans-low-income_og_4fb6d3d6.jpg",
    },
  ];

  for (const p of bestOf) {
    map[p.path] = { title: p.title, description: p.description, ogImage: p.ogImage };
  }

  // ── Blog posts ──────────────────────────────────────────────────────────────
  const blogs: Array<PageMeta & { slug: string }> = [
    {
      slug: "what-credit-score-do-you-need-to-buy-a-car",
      title: "What Credit Score Do You Need to Buy a Car? (2026 Guide)",
      description: "Find out exactly what credit score you need to buy a car in 2026. See how your score affects your rate, and how to get approved even with bad credit.",
      ogImage: "/manus-storage/blog_bad-credit-auto-loans-complete-guide_og_31927a96.jpg",
    },
    {
      slug: "how-to-get-a-car-loan-after-bankruptcy",
      title: "How to Get a Car Loan After Bankruptcy (Chapter 7 & 13 Guide)",
      description: "Yes, you can get a car loan after bankruptcy. Learn how Chapter 7 and Chapter 13 affect your approval odds, what lenders look for, and how to get the best rate.",
      ogImage: "/manus-storage/blog_how-to-get-a-car-loan-after-bankruptcy_og_db81cd59.jpg",
    },
    {
      slug: "car-loan-with-500-credit-score",
      title: "Can I Get a Car Loan with a 500 Credit Score? (2026 Guide)",
      description: "Yes — you can get a car loan with a 500 credit score. See which lenders approve 500-score borrowers, what rates to expect, and how to improve your odds.",
      ogImage: "/manus-storage/blog_bad-credit-auto-loans-complete-guide_og_31927a96.jpg",
    },
    {
      slug: "buy-here-pay-here-vs-traditional-auto-loans",
      title: "Buy Here Pay Here vs Traditional Auto Loans: Full Comparison (2026)",
      description: "Compare buy here pay here dealerships vs traditional auto loans. See the real differences in rates, approval odds, credit reporting, and total cost.",
      ogImage: "/manus-storage/blog_buy-here-pay-here-pros-cons_og_79f13d68.jpg",
    },
    {
      slug: "car-loan-no-credit-history",
      title: "How to Get a Car Loan with No Credit History (2026 Guide)",
      description: "No credit history? You can still get approved for a car loan. Learn which lenders specialize in first-time buyers with no credit score.",
      ogImage: "/manus-storage/blog_first-time-car-buyer-guide_og_0adc9c4e.jpg",
    },
    {
      slug: "car-loan-480-credit-score",
      title: "Car Loan with a 480 Credit Score: What to Expect (2026 Guide)",
      description: "A 480 credit score can still get you approved for a car loan. Learn which lenders approve deep subprime borrowers and what rates and terms to expect.",
      ogImage: "/manus-storage/blog_bad-credit-auto-loans-complete-guide_og_31927a96.jpg",
    },
    {
      slug: "chapter-7-bankruptcy-car-loan",
      title: "Car Loan After Chapter 7 Bankruptcy: Complete 2026 Guide",
      description: "You can get a car loan the day your Chapter 7 bankruptcy is discharged. Learn which lenders specialize in post-bankruptcy auto financing.",
      ogImage: "/manus-storage/blog_how-to-get-a-car-loan-after-bankruptcy_og_db81cd59.jpg",
    },
    {
      slug: "how-to-refinance-bad-credit-auto-loan",
      title: "How to Refinance a Bad Credit Auto Loan and Save Money (2026)",
      description: "Refinancing a bad credit auto loan can save you $50–$150/month and thousands in interest. Learn when and how to refinance with a low credit score.",
      ogImage: "/manus-storage/blog_how-to-refinance-a-bad-credit-auto-loan_og_48e71dbd.jpg",
    },
    {
      slug: "itin-auto-loans-no-ssn",
      title: "ITIN Auto Loans: Get a Car Loan Without a Social Security Number (2026)",
      description: "You can get a car loan with an ITIN instead of a Social Security number. Learn which lenders accept ITIN and what documents you need.",
      ogImage: "/manus-storage/blog_itin-auto-loans-guide_og_416b6cbd.jpg",
    },
    {
      slug: "no-money-down-car-loan-guide",
      title: "No Money Down Car Loans: Complete Guide for 2026",
      description: "No-money-down car loans are real — but they cost more than loans with a down payment. Learn who qualifies, what the real costs are, and when a small down payment is worth finding.",
      ogImage: "/manus-storage/blog_no-money-down-car-loan-guide_og_cca83f0c.jpg",
    },
  ];

  for (const b of blogs) {
    map[`/blog/${b.slug}`] = { title: b.title, description: b.description, ogImage: b.ogImage };
  }

  // ── City hub pages ──────────────────────────────────────────────────────────
  const cityHubs = [
    { path: "/phoenix-az", city: "Phoenix, AZ" },
    { path: "/dallas-tx", city: "Dallas, TX" },
    { path: "/chicago-il", city: "Chicago, IL" },
    { path: "/san-antonio-tx", city: "San Antonio, TX" },
    { path: "/fort-worth-tx", city: "Fort Worth, TX" },
    { path: "/charlotte-nc", city: "Charlotte, NC" },
    { path: "/colorado-springs-co", city: "Colorado Springs, CO" },
    { path: "/columbus-oh", city: "Columbus, OH" },
    { path: "/detroit-mi", city: "Detroit, MI" },
    { path: "/tulsa-ok", city: "Tulsa, OK" },
  ];

  for (const h of cityHubs) {
    map[h.path] = {
      title: `Bad Credit Auto Loans ${h.city} | Complete Auto Loans`,
      description: `Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in ${h.city}. Get pre-approved in 2 minutes — all credit accepted.`,
    };
  }

  // ── City service pages ──────────────────────────────────────────────────────
  // Pattern: /{city-slug}/{service-slug}
  // Generated programmatically from city × service combinations

  const cities = [
    { slug: "phoenix-az", name: "Phoenix, AZ" },
    { slug: "dallas-tx", name: "Dallas, TX" },
    { slug: "chicago-il", name: "Chicago, IL" },
    { slug: "san-antonio-tx", name: "San Antonio, TX" },
    { slug: "fort-worth-tx", name: "Fort Worth, TX" },
    { slug: "charlotte-nc", name: "Charlotte, NC" },
    { slug: "colorado-springs-co", name: "Colorado Springs, CO" },
    { slug: "columbus-oh", name: "Columbus, OH" },
    { slug: "detroit-mi", name: "Detroit, MI" },
    { slug: "tulsa-ok", name: "Tulsa, OK" },
  ];

  const services = [
    {
      slug: "bad-credit-auto-loans",
      title: (city: string) => `Best Bad Credit Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Compare the best bad credit auto loans in ${city}. Lenders that approve credit scores 300–600 with $500 down and proof of income.`,
    },
    {
      slug: "buy-here-pay-here",
      title: (city: string) => `Best Buy Here Pay Here Dealerships in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find the best buy here pay here dealerships in ${city}. In-house financing with no credit check required — drive today.`,
    },
    {
      slug: "no-credit-check-car-loans",
      title: (city: string) => `Best No Credit Check Car Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find no credit check car loans in ${city}. Approval based on income, not credit score. Get matched with lenders in 2 minutes.`,
    },
    {
      slug: "guaranteed-approval-auto-loans",
      title: (city: string) => `Best Guaranteed Approval Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find guaranteed approval auto loans in ${city}. Near-guaranteed approval with proof of income — bad credit, no credit, bankruptcy accepted.`,
    },
    {
      slug: "no-money-down-car-loans",
      title: (city: string) => `Best No Money Down Car Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find no money down car loans in ${city}. $0 down payment options for qualified borrowers — bad credit accepted.`,
    },
    {
      slug: "second-chance-auto-loans",
      title: (city: string) => `Best Second Chance Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find second chance auto loans in ${city}. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted.`,
    },
    {
      slug: "car-loans-after-bankruptcy",
      title: (city: string) => `Best Car Loans After Bankruptcy in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find car loans after bankruptcy in ${city}. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.`,
    },
    {
      slug: "auto-loans-after-repossession",
      title: (city: string) => `Best Auto Loans After Repossession in ${city} (2026) | Complete Auto Loans`,
      desc: (city: string) => `Find auto loans after repossession in ${city}. Rebuild your credit with a new loan — lenders who approve post-repo borrowers.`,
    },
  ];

  for (const city of cities) {
    for (const svc of services) {
      const urlPath = `/${city.slug}/${svc.slug}`;
      map[urlPath] = {
        title: svc.title(city.name),
        description: svc.desc(city.name),
      };
    }
  }

  return map;
}

const META_MAP = buildMetaMap();

// ── HTML rewriter ─────────────────────────────────────────────────────────────

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rewriteHtml(html: string, meta: PageMeta, canonicalUrl: string): string {
  const { title, description, ogImage } = meta;
  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const ogImg = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${BASE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

  // Replace or insert <meta name="description">
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${safeDesc}" />`
    );
  } else {
    html = html.replace("</head>", `  <meta name="description" content="${safeDesc}" />\n</head>`);
  }

  // Replace or insert canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Build OG + Twitter block
  const ogBlock = [
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDesc}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${escapeAttr(ogImg)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDesc}" />`,
    `<meta name="twitter:image" content="${escapeAttr(ogImg)}" />`,
  ].join("\n    ");

  // Remove any existing OG/Twitter tags then inject fresh ones
  html = html
    .replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g, "");

  html = html.replace("</head>", `    ${ogBlock}\n  </head>`);

  return html;
}

// ── Express middleware ────────────────────────────────────────────────────────

export function injectMeta(app: Express) {
  // Only run in production — dev uses Vite's transform pipeline
  if (process.env.NODE_ENV !== "production") return;

  const distPath = path.resolve(import.meta.dirname, "public");

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    // Only intercept HTML requests (not assets, API, etc.)
    const accept = req.headers.accept ?? "";
    if (!accept.includes("text/html")) return next();

    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return next();

    // Normalize path: strip trailing slash for lookup (except root)
    let pathname = req.path;
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    const meta = META_MAP[pathname];
    if (!meta) return next();

    try {
      let html = fs.readFileSync(indexPath, "utf-8");

      // Canonical URL always uses trailing slash
      const canonicalPath = pathname === "/" ? "/" : `${pathname}/`;
      const canonicalUrl = `${BASE_URL}${canonicalPath}`;

      html = rewriteHtml(html, meta, canonicalUrl);

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
