/**
 * schema.ts — Complete Auto Loans
 * JSON-LD schema builders for SEO and AEO/LLM optimization.
 *
 * Supported types:
 * - Organization (sitewide)
 * - WebSite (sitewide, enables Sitelinks Searchbox)
 * - BreadcrumbList (all pages)
 * - FAQPage (national best-of + city pages)
 * - FinancialProduct (best-of pages)
 * - LocalBusiness (city pages)
 * - WebPage (all pages)
 */

const BASE_URL = "https://completeautoloans.com";
const ORG_NAME = "Complete Auto Loans";
const LOGO_URL = "https://completeautoloans.com/logo.png";

// Real GBP data — verified April 2026
export const GBP_RATING = 5.0;
export const GBP_REVIEW_COUNT = 11;
export const GBP_ADDRESS = "2911 Hewitt Ave, Ste 5, Everett, WA 98201";
export const GBP_PHONE = "(617) 420-2172";

// ── Organization ──────────────────────────────────────────────────────────────
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    telephone: GBP_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2911 Hewitt Ave, Ste 5",
      addressLocality: "Everett",
      addressRegion: "WA",
      postalCode: "98201",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.facebook.com/completeautoloans",
      "https://twitter.com/completeautoloans",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: GBP_PHONE,
      contactType: "customer service",
      availableLanguage: "English",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GBP_RATING,
      reviewCount: GBP_REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
    description:
      "Complete Auto Loans matches bad credit, no credit, and subprime borrowers with auto loan lenders across the United States. No minimum credit score required.",
  };
}

// ── WebSite ───────────────────────────────────────────────────────────────────
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path}/`,
    })),
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── FinancialProduct ──────────────────────────────────────────────────────────
export function buildFinancialProductSchema({
  name,
  description,
  url,
  minCreditScore = "300",
  minAPR = "3.9",
  maxAPR = "29.9",
}: {
  name: string;
  description: string;
  url: string;
  minCreditScore?: string;
  minAPR?: string;
  maxAPR?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    description,
    url: `${BASE_URL}${url}/`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    annualPercentageRate: {
      "@type": "QuantitativeValue",
      minValue: parseFloat(minAPR),
      maxValue: parseFloat(maxAPR),
      unitText: "APR",
    },
    feesAndCommissionsSpecification: "No application fee. Soft credit check only.",
    eligibilityNote: `Minimum credit score: ${minCreditScore}. Proof of income required.`,
  };
}

// ── LocalBusiness (for city pages) ───────────────────────────────────────────
export function buildLocalBusinessSchema({
  city,
  state,
  serviceType,
  url,
  description,
}: {
  city: string;
  state: string;
  serviceType: string;
  url: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `${ORG_NAME} — ${city}, ${state}`,
    description,
    url: `${BASE_URL}${url}/`,
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    serviceType,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceType} in ${city}, ${state}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceType,
          },
        },
      ],
    },
  };
}

// ── WebPage ───────────────────────────────────────────────────────────────────
export function buildWebPageSchema({
  title,
  description,
  url,
  dateModified = "2026-04-01",
}: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${BASE_URL}${url}/`,
    dateModified,
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
    },
  };
}

// ── Review / AggregateRating ──────────────────────────────────────────────────
export function buildAggregateRatingSchema({
  itemName,
  ratingValue = GBP_RATING,
  reviewCount = GBP_REVIEW_COUNT,
}: {
  itemName: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ── HowTo ─────────────────────────────────────────────────────────────────────
export function buildHowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// ── ItemList (for directory/index pages) ──────────────────────────────────────
export function buildItemListSchema(items: { name: string; url: string; description?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${BASE_URL}${item.url}/`,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

// ── Service (for lead-gen / apply pages) ─────────────────────────────────────
export function buildServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${url}/`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Auto Loan Matching",
    audience: {
      "@type": "Audience",
      audienceType: "Subprime and bad credit auto loan borrowers",
    },
  };
}
