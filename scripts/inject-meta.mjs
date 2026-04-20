/**
 * inject-meta.mjs — Post-build per-route static HTML generation
 *
 * For Netlify static hosting: generates a separate index.html for each of the
 * 122 routes with the correct title, meta description, canonical, and OG tags
 * hardcoded directly in the <head>. No JavaScript required for crawlers.
 *
 * Netlify serves dist/public/best-bad-credit-auto-loans/index.html directly
 * when a crawler visits /best-bad-credit-auto-loans/ — the correct title is
 * already in the raw HTML before any JS executes.
 *
 * The root dist/public/index.html also gets the homepage metadata hardcoded.
 * A client-side fallback script is still included for any routes not in the map.
 *
 * Usage: node scripts/inject-meta.mjs
 * Called automatically by: pnpm build:netlify
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");
const BASE_URL = "https://completeautoloans.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/manus-storage/og-default.jpg`;
const SITE_NAME = "Complete Auto Loans";

// ── Page metadata map ─────────────────────────────────────────────────────────

const META_MAP = {
  // Core pages
  "/": {
    title: "Complete Auto Loans — Bad Credit Auto Loans | Get Approved Today",
    description: "Get approved for a bad credit auto loan today. Complete Auto Loans matches you with 500+ lenders. No minimum credit score. Soft credit check only.",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/hero_premium-3w25pnkm7XPeSZaaGkqMXo.webp",
  },
  "/apply": {
    title: "Apply for a Bad Credit Auto Loan | Complete Auto Loans",
    description: "Apply for a bad credit auto loan in 2 minutes. Answer 4 quick questions and get matched with 500+ lenders. No hard credit pull. Same-day approval available.",
  },
  "/how-it-works": {
    title: "How It Works — Get a Bad Credit Auto Loan in 3 Steps | Complete Auto Loans",
    description: "Learn how Complete Auto Loans works. Answer 4 questions, get matched with 500+ lenders, and drive away approved — often same day. No hard credit pull.",
  },
  "/about": {
    title: "About Complete Auto Loans — Bad Credit Auto Loan Experts",
    description: "Complete Auto Loans is based in Everett, WA. We help borrowers with bad credit, no credit, and past bankruptcies get approved for auto loans.",
  },
  "/blog": {
    title: "Auto Loan Blog — Expert Guides for Bad Credit Borrowers | Complete Auto Loans",
    description: "Expert guides on bad credit auto loans, refinancing, and car buying for borrowers with challenging credit histories.",
  },
  "/locations": {
    title: "Auto Loan Locations — Bad Credit Lenders Near You | Complete Auto Loans",
    description: "Find bad credit auto loan lenders near you. Complete Auto Loans serves borrowers in Phoenix, Dallas, Chicago, and 50+ cities nationwide.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Complete Auto Loans",
    description: "Read the Complete Auto Loans privacy policy. Learn how we collect, use, and protect your personal information.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Complete Auto Loans",
    description: "Read the Complete Auto Loans terms of service. Understand your rights and obligations when using our platform.",
  },
  "/contact": {
    title: "Contact Us | Complete Auto Loans",
    description: "Contact Complete Auto Loans for questions about bad credit auto loans, our lender network, or your application status.",
  },
  "/editorial-standards": {
    title: "Editorial Standards & Methodology | Complete Auto Loans",
    description: "How Complete Auto Loans researches, ranks, and reviews auto loan lenders. Our editorial process, data sources, and advertiser disclosure.",
  },

  // Best-Of pages
  "/best-bad-credit-auto-loans": {
    title: "Best Bad Credit Auto Loans of 2026 — Reviewed & Ranked",
    description: "Compare the best bad credit auto loans of 2026. We reviewed 40+ lenders to find options for scores under 600. No minimum credit score required.",
    ogImage: `${BASE_URL}/manus-storage/best-bad-credit-auto-loans_og_73f14a9e.jpg`,
  },
  "/best-buy-here-pay-here-dealerships": {
    title: "Best Buy Here Pay Here Dealerships of 2026 — Reviewed & Ranked",
    description: "Find the best buy here pay here dealerships of 2026. In-house financing with guaranteed approval for deep subprime borrowers. No minimum credit score.",
  },
  "/best-no-money-down-car-loans-bad-credit": {
    title: "Best No Money Down Car Loans for Bad Credit (2026) — Reviewed",
    description: "Compare the best $0 down car loans for bad credit in 2026. Get approved with no down payment even with a low credit score. 500+ lender network.",
  },
  "/best-guaranteed-approval-auto-loans": {
    title: "Best Guaranteed Approval Auto Loans of 2026 — Reviewed & Ranked",
    description: "Find the best guaranteed approval auto loans of 2026. Get pre-approved regardless of credit score. Compare lenders with near-100% approval rates.",
  },
  "/best-pre-approved-car-loans-bad-credit": {
    title: "Best Pre-Approved Car Loans for Bad Credit (2026) — Reviewed",
    description: "Get pre-approved for a car loan with bad credit in 2026. Compare lenders offering soft-pull pre-approval with no impact to your credit score.",
  },
  "/best-no-credit-check-car-loans": {
    title: "Best No Credit Check Car Loans of 2026 — Reviewed & Ranked",
    description: "Compare the best no credit check car loans of 2026. Get approved without a hard credit inquiry. Ideal for rebuilding credit or first-time buyers.",
  },
  "/best-first-time-car-buyer-loans-no-credit": {
    title: "Best Car Loans for First-Time Buyers with No Credit (2026) — Reviewed",
    description: "Find the best auto loans for first-time buyers with no credit history in 2026. No co-signer required. Compare lenders that specialize in new borrowers.",
  },
  "/best-car-loans-after-bankruptcy": {
    title: "Best Car Loans After Bankruptcy of 2026 — Reviewed & Ranked",
    description: "Compare the best auto loans after bankruptcy in 2026. Get approved after Chapter 7 or Chapter 13. Lenders that work with discharged and active BK.",
  },
  "/best-auto-loans-after-repossession": {
    title: "Best Auto Loans After Repossession of 2026 — Reviewed & Ranked",
    description: "Find the best auto loans after a repossession in 2026. Get approved even with a recent repo on your record. Compare lenders with second-chance programs.",
  },
  "/best-second-chance-auto-loans": {
    title: "Best Second Chance Auto Loans of 2026 — Reviewed & Ranked",
    description: "Compare the best second chance auto loans of 2026. Designed for borrowers with past credit problems. Get a fresh start with lenders that look beyond your score.",
  },
  "/best-itin-auto-loans": {
    title: "Best ITIN Auto Loans of 2026 — Reviewed & Ranked",
    description: "Compare the best ITIN auto loans of 2026. Get approved without a Social Security number using your Individual Taxpayer Identification Number.",
  },
  "/best-auto-refinance-bad-credit": {
    title: "Best Auto Refinance Loans for Bad Credit (2026) — Reviewed & Ranked",
    description: "Find the best auto refinance options for bad credit in 2026. Lower your monthly payment or interest rate even with a score under 600.",
  },
  "/best-car-loans-low-income": {
    title: "Best Car Loans for Low Income Borrowers of 2026 — Reviewed",
    description: "Compare the best car loans for low income borrowers in 2026. Get approved with income as low as $1,200/month. No minimum credit score required.",
  },

  // Blog posts
  "/blog/what-credit-score-do-you-need-to-buy-a-car": {
    title: "What Credit Score Do You Need to Buy a Car? (2026 Guide)",
    description: "Find out exactly what credit score you need to buy a car in 2026. See how your score affects your rate and which lenders approve scores under 600.",
  },
  "/blog/how-to-get-a-car-loan-after-bankruptcy": {
    title: "How to Get a Car Loan After Bankruptcy (Chapter 7 & 13 Guide)",
    description: "Yes, you can get a car loan after bankruptcy. Learn how Chapter 7 and Chapter 13 affect your options and which lenders approve discharged borrowers.",
  },
  "/blog/car-loan-with-500-credit-score": {
    title: "Can I Get a Car Loan with a 500 Credit Score? (Yes — Here's How)",
    description: "Yes — you can get a car loan with a 500 credit score. See which lenders approve scores under 550 and what rates to expect.",
  },
  "/blog/buy-here-pay-here-vs-traditional-auto-loans": {
    title: "Buy Here Pay Here vs. Traditional Auto Loans: Which Is Right for You?",
    description: "Compare buy here pay here dealerships vs traditional auto loans. See the real differences in rates, approval odds, and total cost.",
  },
  "/blog/car-loan-no-credit-history": {
    title: "How to Get Approved for a Car Loan with No Credit History",
    description: "No credit history? You can still get approved for a car loan. Learn which lenders specialize in first-time buyers with no credit score.",
  },
  "/blog/car-loan-480-credit-score": {
    title: "How to Get a Car Loan with a 480 Credit Score",
    description: "A 480 credit score can still get you approved for a car loan. Learn which lenders approve deep subprime borrowers and what to expect.",
  },
  "/blog/chapter-7-bankruptcy-car-loan": {
    title: "Getting a Car Loan After Chapter 7 Bankruptcy",
    description: "You can get a car loan the day your Chapter 7 bankruptcy is discharged. Learn which lenders specialize in post-bankruptcy auto financing.",
  },
  "/blog/how-to-refinance-bad-credit-auto-loan": {
    title: "How to Refinance a Bad Credit Auto Loan (Step-by-Step Guide)",
    description: "Refinancing a bad credit auto loan can save you $50–$150/month and thousands in interest. Learn when and how to refinance with a low credit score.",
  },
  "/blog/itin-auto-loans-no-ssn": {
    title: "How to Get a Car Loan with an ITIN (No Social Security Number)",
    description: "You can get a car loan with an ITIN instead of a Social Security number. Learn which lenders accept ITIN and what documents you need.",
  },
  "/blog/no-money-down-car-loan-guide": {
    title: "No Money Down Car Loans: What You Need to Know Before You Apply",
    description: "No money down car loans are possible even with bad credit. Learn the real requirements, risks, and which lenders offer $0 down financing.",
  },
};

// City hub pages
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
  META_MAP[h.path] = {
    title: `Bad Credit Auto Loans ${h.city} | Complete Auto Loans`,
    description: `Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in ${h.city}. Get pre-approved in 2 minutes — all credit accepted.`,
  };
}

// City service pages
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
    title: (c) => `Best Bad Credit Auto Loans in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Compare the best bad credit auto loans in ${c}. Lenders that approve credit scores 300–600 with $500 down and proof of income.`,
  },
  {
    slug: "buy-here-pay-here",
    title: (c) => `Best Buy Here Pay Here Dealerships in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find the best buy here pay here dealerships in ${c}. In-house financing with no credit check required — drive today.`,
  },
  {
    slug: "no-credit-check-car-loans",
    title: (c) => `Best No Credit Check Car Loans in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find no credit check car loans in ${c}. Approval based on income, not credit score. Get matched with lenders in 2 minutes.`,
  },
  {
    slug: "guaranteed-approval-auto-loans",
    title: (c) => `Best Guaranteed Approval Auto Loans in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find guaranteed approval auto loans in ${c}. Near-guaranteed approval with proof of income — bad credit, no credit, bankruptcy accepted.`,
  },
  {
    slug: "no-money-down-car-loans",
    title: (c) => `Best No Money Down Car Loans in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find no money down car loans in ${c}. $0 down payment options for qualified borrowers — bad credit accepted.`,
  },
  {
    slug: "second-chance-auto-loans",
    title: (c) => `Best Second Chance Auto Loans in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find second chance auto loans in ${c}. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted.`,
  },
  {
    slug: "car-loans-after-bankruptcy",
    title: (c) => `Best Car Loans After Bankruptcy in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find car loans after bankruptcy in ${c}. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.`,
  },
  {
    slug: "auto-loans-after-repossession",
    title: (c) => `Best Auto Loans After Repossession in ${c} (2026) | Complete Auto Loans`,
    desc: (c) => `Find auto loans after repossession in ${c}. Rebuild your credit with a new loan — lenders who approve post-repo borrowers.`,
  },
];

for (const city of cities) {
  for (const svc of services) {
    META_MAP[`/${city.slug}/${svc.slug}`] = {
      title: svc.title(city.name),
      description: svc.desc(city.name),
    };
  }
}

// ── Helper: inject metadata into an HTML string ───────────────────────────────

function injectMetaIntoHtml(html, routePath, meta) {
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  const canonical = `${BASE_URL}${routePath}${routePath === "/" ? "" : "/"}`;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace or inject meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    );
  } else {
    html = html.replace("</head>", `  <meta name="description" content="${escapeHtml(meta.description)}" />\n</head>`);
  }

  // Replace or inject canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n</head>`);
  }

  // OG tags — replace or inject
  const ogTags = [
    ['og:title', escapeHtml(meta.title)],
    ['og:description', escapeHtml(meta.description)],
    ['og:url', canonical],
    ['og:image', ogImage],
    ['og:site_name', SITE_NAME],
    ['og:type', 'website'],
  ];

  for (const [prop, content] of ogTags) {
    const regex = new RegExp(`<meta\\s+property="${prop}"[^>]*>`);
    const tag = `<meta property="${prop}" content="${content}" />`;
    if (regex.test(html)) {
      html = html.replace(regex, tag);
    } else {
      html = html.replace("</head>", `  ${tag}\n</head>`);
    }
  }

  // Twitter tags
  const twitterTags = [
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', escapeHtml(meta.title)],
    ['twitter:description', escapeHtml(meta.description)],
    ['twitter:image', ogImage],
  ];

  for (const [name, content] of twitterTags) {
    const regex = new RegExp(`<meta\\s+name="${name}"[^>]*>`);
    const tag = `<meta name="${name}" content="${content}" />`;
    if (regex.test(html)) {
      html = html.replace(regex, tag);
    } else {
      html = html.replace("</head>", `  ${tag}\n</head>`);
    }
  }

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Main: generate per-route index.html files ─────────────────────────────────

const indexPath = path.join(DIST, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error(`❌ dist/public/index.html not found. Run pnpm build first.`);
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");

let generated = 0;

for (const [routePath, meta] of Object.entries(META_MAP)) {
  const injected = injectMetaIntoHtml(baseHtml, routePath, meta);

  if (routePath === "/") {
    // Overwrite the root index.html
    fs.writeFileSync(indexPath, injected, "utf-8");
  } else {
    // Create a subdirectory with its own index.html
    // e.g. /best-bad-credit-auto-loans → dist/public/best-bad-credit-auto-loans/index.html
    const subDir = path.join(DIST, routePath.slice(1)); // remove leading slash
    fs.mkdirSync(subDir, { recursive: true });
    fs.writeFileSync(path.join(subDir, "index.html"), injected, "utf-8");
  }

  generated++;
}

console.log(`✅ inject-meta: generated ${generated} route-specific index.html files with hardcoded metadata`);
console.log(`   Routes covered: ${Object.keys(META_MAP).length} (home + ${Object.keys(META_MAP).length - 1} sub-routes)`);
