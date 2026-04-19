/**
 * Phoenix, AZ — Car Loans After Bankruptcy in Phoenix, AZ
 * Template: CityServicePageTemplate
 */
import CityServicePageTemplate from "@/components/CityServicePageTemplate";
import type { CityLender, CityFAQ } from "@/components/CityServicePageTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema , buildSpeakableSchema } from "@/lib/schema";
import cityLocalData from "@/data/cityLocalData";

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
    name: "Rocky's Auto Credit",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Phoenix in-house financing for bad credit, no credit, and past repossessions.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Courtesy Chevrolet",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Simple, fair auto loans for bad credit and no credit customers in Phoenix.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan after Chapter 7 bankruptcy in Phoenix?", answer: "Yes. Many lenders in Phoenix, AZ approve car loans for borrowers who have filed Chapter 7 bankruptcy. You can often apply as soon as your bankruptcy is discharged, which typically takes 3–6 months." },
  { question: "Can I get a car loan during Chapter 13 bankruptcy in Phoenix?", answer: "Yes, but you'll need permission from your bankruptcy trustee. Some lenders in Phoenix specialize in financing for borrowers who are currently in an active Chapter 13 repayment plan." },
  { question: "How long after bankruptcy can I get a car loan in Phoenix?", answer: "You can apply for a car loan immediately after your bankruptcy is discharged. However, waiting 12–24 months and rebuilding your credit can help you qualify for better interest rates." },
  { question: "What interest rates can I expect after bankruptcy in Phoenix?", answer: "Post-bankruptcy auto loan rates in Phoenix, AZ typically range from 12% to 29.9% APR. Rates improve significantly after 12–24 months of on-time payments on your new loan." },
  { question: "How much down payment do I need after bankruptcy in Phoenix?", answer: "Most post-bankruptcy lenders in Phoenix require $500–$1,500 down. A larger down payment can help you qualify for a lower interest rate and better loan terms." }
];

export default function CityPhoenixAzCarLoansAfterBankruptcy() {
  useSEO({
    title: "Best Car Loans After Bankruptcy in Phoenix, AZ (2026) | Complete Auto Loans",
    description: "Find car loans after bankruptcy in Phoenix, AZ. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.",
    canonical: "/phoenix-az/car-loans-after-bankruptcy/",
    schema: [
      buildLocalBusinessSchema({
        city: "Phoenix",
        state: "AZ",
        serviceType: "Car Loans After Bankruptcy",
        url: "/phoenix-az/car-loans-after-bankruptcy/",
        description: "Find car loans after bankruptcy in Phoenix, AZ. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes.",
        geo: { latitude: 33.4484, longitude: -112.074 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Phoenix, AZ", path: "/phoenix-az/" },
        { name: "Car Loans After Bankruptcy in Phoenix, AZ", path: "/phoenix-az/car-loans-after-bankruptcy/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/phoenix-az/car-loans-after-bankruptcy",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Car Loans After Bankruptcy in Phoenix, AZ (2026) | Complete Auto Loans"
      h1="Best Car Loans After Bankruptcy in Phoenix, AZ"
      description="Find car loans after bankruptcy in Phoenix, AZ. Chapter 7 or Chapter 13 — lenders who approve discharged borrowers. Get matched in 2 minutes."
      intro="Getting a car loan after bankruptcy in Phoenix, AZ is more achievable than most people realize. Whether you filed Chapter 7 or Chapter 13, several lenders in our network specialize in post-bankruptcy auto financing and can approve you as soon as your case is discharged."
      city="Phoenix"
      state="AZ"
      county="Maricopa County"
      dealerships={[{ name: "Rocky's Auto Credit", note: "Phoenix in-house financing for bad credit, no credit, and past repossessions.", website: "https://www.rockysautocredit.com/" }, { name: "Courtesy Chevrolet", note: "Simple, fair auto loans for bad credit and no credit customers in Phoenix.", website: "https://www.courtesychev.com/bad-credit-no-credit-auto-loans-in-phoenix-az/" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="phoenix-az"
      serviceSlug="car-loans-after-bankruptcy"
      nationalGuideHref="/best-car-loans-after-bankruptcy/"
      nationalGuideLabel="Best Car Loans After Bankruptcy of 2026"
      localData={cityLocalData["phoenix-az"]}
    />
  );
}
