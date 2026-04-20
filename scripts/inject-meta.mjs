/**
 * inject-meta.mjs — Post-build static metadata injection
 *
 * Reads dist/public/index.html and generates per-route index.html files
 * with correct <title>, <meta description>, <link canonical>, and OG/Twitter
 * tags pre-baked into the static HTML. This ensures crawlers and the Manus
 * platform proxy serve unique metadata for every URL without needing Express
 * middleware to intercept requests.
 *
 * Usage: node scripts/inject-meta.mjs
 * Called automatically by: pnpm build (via postbuild script)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");
const BASE_URL = "https://completeautoloans.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;
const SITE_NAME = "Complete Auto Loans";

// ── Page metadata map ─────────────────────────────────────────────────────────

function buildMetaMap() {
  const map = {};

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
    title: "About Complete Auto Loans — Bad Credit Auto Loan Experts",
    description: "Complete Auto Loans is based in Everett, WA. We help borrowers with bad credit, no credit, and past bankruptcies get approved for auto loans.",
  };
  map["/blog"] = {
    title: "Auto Loan Blog — Expert Guides for Bad Credit Borrowers | Complete Auto Loans",
    description: "Expert guides on bad credit auto loans, refinancing, and car buying for borrowers with challenging credit histories.",
  };
  map["/locations"] = {
    title: "Auto Loan Locations — Bad Credit Lenders Near You | Complete Auto Loans",
    description: "Find bad credit auto loan lenders near you. Complete Auto Loans serves borrowers in Phoenix, Dallas, Chicago, and 50+ cities nationwide.",
  };
  map["/privacy-policy"] = {
    title: "Privacy Policy | Complete Auto Loans",
    description: "Read the Complete Auto Loans privacy policy. Learn how we collect, use, and protect your personal information.",
  };
  map["/terms-of-service"] = {
    title: "Terms of Service | Complete Auto Loans",
    description: "Read the Complete Auto Loans terms of service. Understand your rights and obligations when using our platform.",
  };
  map["/contact"] = {
    title: "Contact Us | Complete Auto Loans",
    description: "Contact Complete Auto Loans for questions about bad credit auto loans, our lender network, or your application status.",
  };

  // ── Best-Of Pages ────────────────────────────────────────────────────────────
  const bestOf = [
    {
      path: "/best-bad-credit-auto-loans",
      title: "Best Bad Credit Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best bad credit auto loans of 2026. We reviewed 40+ lenders to find options for scores under 600. No minimum credit score required.",
      ogImage: `${BASE_URL}/manus-storage/best-bad-credit-auto-loans_og_73f14a9e.jpg`,
    },
    {
      path: "/best-buy-here-pay-here-dealerships",
      title: "Best Buy Here Pay Here Dealerships of 2026 — Reviewed & Ranked",
      description: "Find the best buy here pay here dealerships of 2026. In-house financing with guaranteed approval for deep subprime borrowers. No minimum credit score.",
      ogImage: `${BASE_URL}/manus-storage/best-buy-here-pay-here-dealerships_og_a1b2c3d4.jpg`,
    },
    {
      path: "/best-no-money-down-car-loans-bad-credit",
      title: "Best No Money Down Car Loans for Bad Credit (2026) — Reviewed",
      description: "Compare the best $0 down car loans for bad credit in 2026. Get approved with no down payment even with a low credit score. 500+ lender network.",
      ogImage: `${BASE_URL}/manus-storage/best-no-money-down-car-loans_og_e5f6g7h8.jpg`,
    },
    {
      path: "/best-guaranteed-approval-auto-loans",
      title: "Best Guaranteed Approval Auto Loans of 2026 — Reviewed & Ranked",
      description: "Find the best guaranteed approval auto loans of 2026. Get pre-approved regardless of credit score. Compare lenders with near-100% approval rates.",
      ogImage: `${BASE_URL}/manus-storage/best-guaranteed-approval-auto-loans_og_i9j0k1l2.jpg`,
    },
    {
      path: "/best-pre-approved-car-loans-bad-credit",
      title: "Best Pre-Approved Car Loans for Bad Credit (2026) — Reviewed",
      description: "Get pre-approved for a car loan with bad credit in 2026. Compare lenders offering soft-pull pre-approval with no impact to your credit score.",
      ogImage: `${BASE_URL}/manus-storage/best-pre-approved-car-loans_og_m3n4o5p6.jpg`,
    },
    {
      path: "/best-no-credit-check-car-loans",
      title: "Best No Credit Check Car Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best no credit check car loans of 2026. Get approved without a hard credit inquiry. Ideal for rebuilding credit or first-time buyers.",
      ogImage: `${BASE_URL}/manus-storage/best-no-credit-check-car-loans_og_q7r8s9t0.jpg`,
    },
    {
      path: "/best-first-time-car-buyer-loans-no-credit",
      title: "Best Car Loans for First-Time Buyers with No Credit (2026) — Reviewed",
      description: "Find the best auto loans for first-time buyers with no credit history in 2026. No co-signer required. Compare lenders that specialize in new borrowers.",
      ogImage: `${BASE_URL}/manus-storage/best-first-time-car-buyer-loans_og_u1v2w3x4.jpg`,
    },
    {
      path: "/best-car-loans-after-bankruptcy",
      title: "Best Car Loans After Bankruptcy of 2026 — Reviewed & Ranked",
      description: "Compare the best auto loans after bankruptcy in 2026. Get approved after Chapter 7 or Chapter 13. Lenders that work with discharged and active BK.",
      ogImage: `${BASE_URL}/manus-storage/best-car-loans-after-bankruptcy_og_y5z6a7b8.jpg`,
    },
    {
      path: "/best-auto-loans-after-repossession",
      title: "Best Auto Loans After Repossession of 2026 — Reviewed & Ranked",
      description: "Find the best auto loans after a repossession in 2026. Get approved even with a recent repo on your record. Compare lenders with second-chance programs.",
      ogImage: `${BASE_URL}/manus-storage/best-auto-loans-after-repossession_og_c9d0e1f2.jpg`,
    },
    {
      path: "/best-second-chance-auto-loans",
      title: "Best Second Chance Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best second chance auto loans of 2026. Designed for borrowers with past credit problems. Get a fresh start with lenders that look beyond your score.",
      ogImage: `${BASE_URL}/manus-storage/best-second-chance-auto-loans_og_g3h4i5j6.jpg`,
    },
    {
      path: "/best-itin-auto-loans",
      title: "Best ITIN Auto Loans of 2026 — Reviewed & Ranked",
      description: "Compare the best ITIN auto loans of 2026. Get approved without a Social Security number using your Individual Taxpayer Identification Number.",
      ogImage: `${BASE_URL}/manus-storage/best-itin-auto-loans_og_k7l8m9n0.jpg`,
    },
    {
      path: "/best-auto-refinance-bad-credit",
      title: "Best Auto Refinance Loans for Bad Credit (2026) — Reviewed & Ranked",
      description: "Find the best auto refinance options for bad credit in 2026. Lower your monthly payment or interest rate even with a score under 600.",
      ogImage: `${BASE_URL}/manus-storage/best-auto-refinance-bad-credit_og_o1p2q3r4.jpg`,
    },
    {
      path: "/best-car-loans-low-income",
      title: "Best Car Loans for Low Income Borrowers of 2026 — Reviewed",
      description: "Compare the best car loans for low income borrowers in 2026. Get approved with income as low as $1,200/month. No minimum credit score required.",
      ogImage: `${BASE_URL}/manus-storage/best-car-loans-low-income_og_s5t6u7v8.jpg`,
    },
  ];

  for (const p of bestOf) {
    map[p.path] = { title: p.title, description: p.description, ogImage: p.ogImage };
  }

  // ── Blog Posts ───────────────────────────────────────────────────────────────
  const blogs = [
    {
      slug: "what-credit-score-do-you-need-to-buy-a-car",
      title: "What Credit Score Do You Need to Buy a Car? (2026 Guide)",
      description: "Find out exactly what credit score you need to buy a car in 2026. See how your score affects your rate and which lenders approve scores under 600.",
      ogImage: `${BASE_URL}/manus-storage/blog_what-credit-score-buy-car_og_a1b2c3d4.jpg`,
    },
    {
      slug: "how-to-get-a-car-loan-after-bankruptcy",
      title: "How to Get a Car Loan After Bankruptcy (Chapter 7 & 13 Guide)",
      description: "Yes, you can get a car loan after bankruptcy. Learn how Chapter 7 and Chapter 13 affect your options and which lenders approve discharged borrowers.",
      ogImage: `${BASE_URL}/manus-storage/blog_car-loan-after-bankruptcy_og_e5f6g7h8.jpg`,
    },
    {
      slug: "car-loan-with-500-credit-score",
      title: "Can I Get a Car Loan with a 500 Credit Score? (Yes — Here's How)",
      description: "Yes — you can get a car loan with a 500 credit score. See which lenders approve scores under 550 and what rates to expect.",
      ogImage: `${BASE_URL}/manus-storage/blog_car-loan-500-credit-score_og_i9j0k1l2.jpg`,
    },
    {
      slug: "buy-here-pay-here-vs-traditional-auto-loans",
      title: "Buy Here Pay Here vs. Traditional Auto Loans: Which Is Right for You?",
      description: "Compare buy here pay here dealerships vs traditional auto loans. See the real differences in rates, approval odds, and total cost.",
      ogImage: `${BASE_URL}/manus-storage/blog_bhph-vs-traditional_og_m3n4o5p6.jpg`,
    },
    {
      slug: "car-loan-no-credit-history",
      title: "How to Get Approved for a Car Loan with No Credit History",
      description: "No credit history? You can still get approved for a car loan. Learn which lenders specialize in first-time buyers with no credit score.",
      ogImage: `${BASE_URL}/manus-storage/blog_car-loan-no-credit-history_og_q7r8s9t0.jpg`,
    },
    {
      slug: "car-loan-480-credit-score",
      title: "How to Get a Car Loan with a 480 Credit Score",
      description: "A 480 credit score can still get you approved for a car loan. Learn which lenders approve deep subprime borrowers and what to expect.",
      ogImage: `${BASE_URL}/manus-storage/blog_car-loan-480-credit-score_og_u1v2w3x4.jpg`,
    },
    {
      slug: "chapter-7-bankruptcy-car-loan",
      title: "Getting a Car Loan After Chapter 7 Bankruptcy",
      description: "You can get a car loan the day your Chapter 7 bankruptcy is discharged. Learn which lenders specialize in post-bankruptcy auto financing.",
      ogImage: `${BASE_URL}/manus-storage/blog_chapter-7-bankruptcy-car-loan_og_y5z6a7b8.jpg`,
    },
    {
      slug: "how-to-refinance-bad-credit-auto-loan",
      title: "How to Refinance a Bad Credit Auto Loan (Step-by-Step Guide)",
      description: "Refinancing a bad credit auto loan can save you $50–$150/month and thousands in interest. Learn when and how to refinance with a low credit score.",
      ogImage: `${BASE_URL}/manus-storage/blog_refinance-bad-credit-auto-loan_og_c9d0e1f2.jpg`,
    },
    {
      slug: "itin-auto-loans-no-ssn",
      title: "How to Get a Car Loan with an ITIN (No Social Security Number)",
      description: "You can get a car loan with an ITIN instead of a Social Security number. Learn which lenders accept ITIN and what documents you need.",
      ogImage: `${BASE_URL}/manus-storage/blog_itin-auto-loans-no-ssn_og_g3h4i5j6.jpg`,
    },
    {
      slug: "no-money-down-car-loan-guide",
      title: "No Money Down Car Loans: What You Need to Know Before You Apply",
      description: "No money down car loans are possible even with bad credit. Learn the real requirements, risks, and which lenders offer $0 down financing.",
      ogImage: `${BASE_URL}/manus-storage/blog_no-money-down-car-loan-guide_og_cca83f0c.jpg`,
    },
  ];

  for (const b of blogs) {
    map[`/blog/${b.slug}`] = { title: b.title, description: b.description, ogImage: b.ogImage };
  }

  // ── City hub pages ───────────────────────────────────────────────────────────
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

  // ── City service pages ───────────────────────────────────────────────────────
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
      title: (city) => `Best Bad Credit Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Compare the best bad credit auto loans in ${city}. Lenders that approve credit scores 300–600 with $500 down and proof of income.`,
    },
    {
      slug: "buy-here-pay-here",
      title: (city) => `Best Buy Here Pay Here Dealerships in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find the best buy here pay here dealerships in ${city}. In-house financing with no credit check required — drive today.`,
    },
    {
      slug: "no-credit-check-car-loans",
      title: (city) => `Best No Credit Check Car Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find no credit check car loans in ${city}. Approval based on income, not credit score. Get matched with lenders in 2 minutes.`,
    },
    {
      slug: "guaranteed-approval-auto-loans",
      title: (city) => `Best Guaranteed Approval Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find guaranteed approval auto loans in ${city}. Near-guaranteed approval with proof of income — bad credit, no credit, bankruptcy accepted.`,
    },
    {
      slug: "no-money-down-car-loans",
      title: (city) => `Best No Money Down Car Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find no money down car loans in ${city}. $0 down payment options for qualified borrowers — bad credit accepted.`,
    },
    {
      slug: "second-chance-auto-loans",
      title: (city) => `Best Second Chance Auto Loans in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find second chance auto loans in ${city}. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted.`,
    },
    {
      slug: "car-loans-after-bankruptcy",
      title: (city) => `Best Car Loans After Bankruptcy in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find car loans after bankruptcy in ${city}. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.`,
    },
    {
      slug: "auto-loans-after-repossession",
      title: (city) => `Best Auto Loans After Repossession in ${city} (2026) | Complete Auto Loans`,
      desc: (city) => `Find auto loans after repossession in ${city}. Rebuild your credit with a new loan — lenders who approve post-repo borrowers.`,
    },
  ];

  for (const city of cities) {
    for (const svc of services) {
      map[`/${city.slug}/${svc.slug}`] = {
        title: svc.title(city.name),
        description: svc.desc(city.name),
      };
    }
  }

  return map;
}

// ── HTML rewriter ─────────────────────────────────────────────────────────────

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rewriteHtml(html, meta, canonicalUrl) {
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

  // Replace <meta name="description">
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

  // Remove any existing OG/Twitter tags
  html = html
    .replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g, "");

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

  html = html.replace("</head>", `    ${ogBlock}\n  </head>`);

  return html;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const indexPath = path.join(DIST, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error(`❌ dist/public/index.html not found. Run pnpm build first.`);
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");
const META_MAP = buildMetaMap();

let count = 0;
let skipped = 0;

for (const [routePath, meta] of Object.entries(META_MAP)) {
  // Canonical URL always uses trailing slash
  const canonicalPath = routePath === "/" ? "/" : `${routePath}/`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const rewritten = rewriteHtml(baseHtml, meta, canonicalUrl);

  if (routePath === "/") {
    // Overwrite the root index.html
    fs.writeFileSync(indexPath, rewritten, "utf-8");
    count++;
    continue;
  }

  // Create directory for the route and write index.html
  const routeDir = path.join(DIST, routePath.slice(1)); // strip leading /
  try {
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, "index.html"), rewritten, "utf-8");
    count++;
  } catch (err) {
    console.warn(`⚠️  Skipped ${routePath}: ${err.message}`);
    skipped++;
  }
}

console.log(`✅ inject-meta: wrote ${count} HTML files (${skipped} skipped) into dist/public/`);
