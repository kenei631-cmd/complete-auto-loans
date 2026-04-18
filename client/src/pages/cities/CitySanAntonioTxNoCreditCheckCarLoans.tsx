/**
 * San Antonio, TX — No Credit Check Car Loans in San Antonio, TX
 * Template: CityServicePageTemplate
 */
import CityServicePageTemplate from "@/components/CityServicePageTemplate";
import type { CityLender, CityFAQ } from "@/components/CityServicePageTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";

const lenders: CityLender[] = [
  {
    name: "Complete Auto Loans",
    badge: "Editor's Choice",
    rating: 4.9,
    reviews: 2847,
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
    reviews: 1203,
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
    reviews: 876,
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
    reviews: 654,
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
    reviews: 432,
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
    name: "River City FCU",
    badge: null,
    rating: 4.2,
    reviews: 180,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Secured auto loans for individuals with bad credit in San Antonio.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Red McCombs Toyota",
    badge: null,
    rating: 4.2,
    reviews: 225,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Bad credit auto loans through partnerships with subprime lenders in San Antonio.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan in San Antonio with no credit check?", answer: "Yes. Several lenders and dealerships in San Antonio, TX offer auto loans without running a traditional credit check. Approval is based primarily on your income and employment." },
  { question: "What do I need to qualify for a no credit check loan in San Antonio?", answer: "Most no credit check lenders in San Antonio require proof of income (pay stubs or bank statements), a valid driver's license, proof of residence, and a down payment of $500–$1,000." },
  { question: "Are no credit check loans more expensive in San Antonio?", answer: "Yes, no credit check loans in San Antonio typically carry higher interest rates (15%–35% APR) than traditional loans. However, they provide access to financing that would otherwise be unavailable." },
  { question: "Will a no credit check loan help me build credit?", answer: "Some no credit check lenders in San Antonio report payments to credit bureaus. Making on-time payments can gradually improve your credit score over 12–24 months." },
  { question: "How fast can I get approved for a no credit check loan in San Antonio?", answer: "Many no credit check lenders in San Antonio, TX offer same-day approval. Complete Auto Loans can match you with a lender in as little as 2 minutes." }
];

export default function CitySanAntonioTxNoCreditCheckCarLoans() {
  useSEO({
    title: "Best No Credit Check Car Loans in San Antonio, TX (2026) | Complete Auto Loans",
    description: "Find no credit check car loans in San Antonio, TX. Approval based on income, not credit score. Get matched with lenders in 2 minutes.",
    canonical: "/san-antonio-tx/no-credit-check-car-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "San Antonio",
        state: "TX",
        serviceType: "No Credit Check Car Loans",
        url: "/san-antonio-tx/no-credit-check-car-loans/",
        description: "Find no credit check car loans in San Antonio, TX. Approval based on income, not credit score. Get matched with lenders in 2 minutes.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "San Antonio, TX", path: "/san-antonio-tx/" },
        { name: "No Credit Check Car Loans in San Antonio, TX", path: "/san-antonio-tx/no-credit-check-car-loans/" },
      ]),
      buildFAQSchema(faqs),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best No Credit Check Car Loans in San Antonio, TX (2026) | Complete Auto Loans"
      h1="Best No Credit Check Car Loans in San Antonio, TX"
      description="Find no credit check car loans in San Antonio, TX. Approval based on income, not credit score. Get matched with lenders in 2 minutes."
      intro="No credit check car loans in San Antonio, TX are designed for borrowers who have been turned down by traditional lenders due to poor credit history, no credit history, or recent financial hardship. These lenders approve based on your current income and employment stability."
      city="San Antonio"
      state="TX"
      county="Bexar County"
      dealerships={[{ name: "River City FCU", note: "Secured auto loans for individuals with bad credit in San Antonio.", website: "https://www.rivercityfcu.org/bad-credit-auto-loan" }, { name: "Red McCombs Toyota", note: "Bad credit auto loans through partnerships with subprime lenders in San Antonio.", website: "https://www.redmccombstoyota.com/finance/low-credit-financing/" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="san-antonio-tx"
      serviceSlug="no-credit-check-car-loans"
      nationalGuideHref="/best-no-credit-check-car-loans/"
      nationalGuideLabel="Best No Credit Check Car Loans of 2026"
    />
  );
}
