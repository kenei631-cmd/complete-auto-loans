/**
 * Detroit, MI — No Credit Check Car Loans in Detroit, MI
 * Template: CityServicePageTemplate
 */
import CityServicePageTemplate from "@/components/CityServicePageTemplate";
import type { CityLender, CityFAQ } from "@/components/CityServicePageTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema , buildSpeakableSchema } from "@/lib/schema";

const lenders: CityLender[] = [
  {
    name: "Complete Auto Loans",
    badge: "Editor's Choice",
    rating: 4.9,
    minScore: "300+",
    aprRange: "3.9% – 29.9%",
    down: "$0 – $500",
    approval: "98%",
    highlight: "Largest bad credit lender network. Matches you with 500+ lenders in 2 minutes. No hard credit pull.",
    pros: ["No hard credit pull", "500+ lender network", "Same-day approval", "All credit types accepted"],
    href: "/apply",
    isTop: true,
  },
  {
    name: "Auto Credit Express",
    badge: null,
    rating: 4.6,
    minScore: "400+",
    aprRange: "5.9% – 35.9%",
    down: "$500+",
    approval: "89%",
    highlight: "Strong network for subprime borrowers. Good for first-time buyers.",
    pros: ["Quick pre-qualification", "Large dealer network", "No application fee"],
    href: "#",
    isTop: false,
  },
  {
    name: "MyAutoLoan",
    badge: null,
    rating: 4.4,
    minScore: "500+",
    aprRange: "4.9% – 28.9%",
    down: "$0+",
    approval: "82%",
    highlight: "Multiple loan offers in one application. Good for comparison shopping.",
    pros: ["Multiple offers at once", "Competitive rates", "Fast funding"],
    href: "#",
    isTop: false,
  },
  {
    name: "DriveTime",
    badge: null,
    rating: 4.1,
    minScore: "No minimum",
    aprRange: "10.9% – 39.9%",
    down: "$500+",
    approval: "75%",
    highlight: "In-house financing at dealerships nationwide. Good for very low credit scores.",
    pros: ["In-house financing", "No minimum credit score", "Large inventory"],
    href: "#",
    isTop: false,
  },
  {
    name: "Carvana",
    badge: null,
    rating: 4.0,
    minScore: "450+",
    aprRange: "7.9% – 32.9%",
    down: "$0+",
    approval: "70%",
    highlight: "Online-only buying experience. Good for those who want to avoid dealerships.",
    pros: ["100% online", "7-day return policy", "No dealership pressure"],
    href: "#",
    isTop: false,
  },
  {
    name: "Jefferson Chevrolet",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Subprime auto financing for those with past credit challenges near Dearborn.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Roy O'Brien Ford",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Subprime auto loans for individuals with less-than-perfect credit history.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan in Detroit with no credit check?", answer: "Yes. Several lenders and dealerships in Detroit, MI offer auto loans without running a traditional credit check. Approval is based primarily on your income and employment." },
  { question: "What do I need to qualify for a no credit check loan in Detroit?", answer: "Most no credit check lenders in Detroit require proof of income (pay stubs or bank statements), a valid driver's license, proof of residence, and a down payment of $500–$1,000." },
  { question: "Are no credit check loans more expensive in Detroit?", answer: "Yes, no credit check loans in Detroit typically carry higher interest rates (15%–35% APR) than traditional loans. However, they provide access to financing that would otherwise be unavailable." },
  { question: "Will a no credit check loan help me build credit?", answer: "Some no credit check lenders in Detroit report payments to credit bureaus. Making on-time payments can gradually improve your credit score over 12–24 months." },
  { question: "How fast can I get approved for a no credit check loan in Detroit?", answer: "Many no credit check lenders in Detroit, MI offer same-day approval. Complete Auto Loans can match you with a lender in as little as 2 minutes." }
];

export default function CityDetroitMiNoCreditCheckCarLoans() {
  useSEO({
    title: "Best No Credit Check Car Loans in Detroit, MI (2026) | Complete Auto Loans",
    description: "Find no credit check car loans in Detroit, MI. Approval based on income, not credit score. Get matched with lenders in 2 minutes.",
    canonical: "/detroit-mi/no-credit-check-car-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "Detroit",
        state: "MI",
        serviceType: "No Credit Check Car Loans",
        url: "/detroit-mi/no-credit-check-car-loans/",
        description: "Find no credit check car loans in Detroit, MI. Approval based on income, not credit score. Get matched with lenders in 2 minutes.",
        geo: { latitude: 42.3314, longitude: -83.0458 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Detroit, MI", path: "/detroit-mi/" },
        { name: "No Credit Check Car Loans in Detroit, MI", path: "/detroit-mi/no-credit-check-car-loans/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/detroit-mi/no-credit-check-car-loans",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best No Credit Check Car Loans in Detroit, MI (2026) | Complete Auto Loans"
      h1="Best No Credit Check Car Loans in Detroit, MI"
      description="Find no credit check car loans in Detroit, MI. Approval based on income, not credit score. Get matched with lenders in 2 minutes."
      intro="No credit check car loans in Detroit, MI are designed for borrowers who have been turned down by traditional lenders due to poor credit history, no credit history, or recent financial hardship. These lenders approve based on your current income and employment stability."
      city="Detroit"
      state="MI"
      county="Wayne County"
      dealerships={[{ name: "Jefferson Chevrolet", note: "Subprime auto financing for those with past credit challenges near Dearborn.", website: "https://www.jeffersonchevrolet.com/subprime-financing-near-dearborn-mi.html" }, { name: "Roy O'Brien Ford", note: "Subprime auto loans for individuals with less-than-perfect credit history.", website: "https://www.royobrien.net/subprime-auto-financing-st-clair-shores-mi.htm" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="detroit-mi"
      serviceSlug="no-credit-check-car-loans"
      nationalGuideHref="/best-no-credit-check-car-loans/"
      nationalGuideLabel="Best No Credit Check Car Loans of 2026"
    />
  );
}
