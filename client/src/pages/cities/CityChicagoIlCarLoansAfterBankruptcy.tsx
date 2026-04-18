/**
 * Chicago, IL — Car Loans After Bankruptcy in Chicago, IL
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
    name: "Zeigler Chrysler Dodge Jeep RAM",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Bad credit car loans with multiple lending sources in the Chicago area.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Midway Dodge",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Bad credit auto loans working with various financial institutions in Chicago.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan after Chapter 7 bankruptcy in Chicago?", answer: "Yes. Many lenders in Chicago, IL approve car loans for borrowers who have filed Chapter 7 bankruptcy. You can often apply as soon as your bankruptcy is discharged, which typically takes 3–6 months." },
  { question: "Can I get a car loan during Chapter 13 bankruptcy in Chicago?", answer: "Yes, but you'll need permission from your bankruptcy trustee. Some lenders in Chicago specialize in financing for borrowers who are currently in an active Chapter 13 repayment plan." },
  { question: "How long after bankruptcy can I get a car loan in Chicago?", answer: "You can apply for a car loan immediately after your bankruptcy is discharged. However, waiting 12–24 months and rebuilding your credit can help you qualify for better interest rates." },
  { question: "What interest rates can I expect after bankruptcy in Chicago?", answer: "Post-bankruptcy auto loan rates in Chicago, IL typically range from 12% to 29.9% APR. Rates improve significantly after 12–24 months of on-time payments on your new loan." },
  { question: "How much down payment do I need after bankruptcy in Chicago?", answer: "Most post-bankruptcy lenders in Chicago require $500–$1,500 down. A larger down payment can help you qualify for a lower interest rate and better loan terms." }
];

export default function CityChicagoIlCarLoansAfterBankruptcy() {
  useSEO({
    title: "Best Car Loans After Bankruptcy in Chicago, IL (2026) | Complete Auto Loans",
    description: "Find car loans after bankruptcy in Chicago, IL. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.",
    canonical: "/chicago-il/car-loans-after-bankruptcy/",
    schema: [
      buildLocalBusinessSchema({
        city: "Chicago",
        state: "IL",
        serviceType: "Car Loans After Bankruptcy",
        url: "/chicago-il/car-loans-after-bankruptcy/",
        description: "Find car loans after bankruptcy in Chicago, IL. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.",
        geo: { latitude: 41.8781, longitude: -87.6298 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Chicago, IL", path: "/chicago-il/" },
        { name: "Car Loans After Bankruptcy in Chicago, IL", path: "/chicago-il/car-loans-after-bankruptcy/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/chicago-il/car-loans-after-bankruptcy",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Car Loans After Bankruptcy in Chicago, IL (2026) | Complete Auto Loans"
      h1="Best Car Loans After Bankruptcy in Chicago, IL"
      description="Find car loans after bankruptcy in Chicago, IL. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes."
      intro="Getting a car loan after bankruptcy in Chicago, IL is more achievable than most people realize. Whether you filed Chapter 7 or Chapter 13, several lenders in our network specialize in post-bankruptcy auto financing and can approve you as soon as your case is discharged."
      city="Chicago"
      state="IL"
      county="Cook County"
      dealerships={[{ name: "Zeigler Chrysler Dodge Jeep RAM", note: "Bad credit car loans with multiple lending sources in the Chicago area.", website: "https://www.zeiglerchryslerdodge.com/bad-credit-car-loan-in-chicago.htm" }, { name: "Midway Dodge", note: "Bad credit auto loans working with various financial institutions in Chicago.", website: "https://www.midwaydodge.com/bad-credit-auto-loans-chicago-il" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="chicago-il"
      serviceSlug="car-loans-after-bankruptcy"
      nationalGuideHref="/best-car-loans-after-bankruptcy/"
      nationalGuideLabel="Best Car Loans After Bankruptcy of 2026"
    />
  );
}
