/**
 * Chicago, IL — Auto Loans After Repossession in Chicago, IL
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
    name: "Windy City Auto Finance",
    badge: null,
    rating: 4.2,
    reviews: 180,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Cook County's largest subprime lender network",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Illinois Auto Approval",
    badge: null,
    rating: 4.2,
    reviews: 225,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Chicago-area specialist for bad credit auto loans",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan after a repossession in Chicago?", answer: "Yes. Several lenders in Chicago, IL specialize in auto loans for borrowers who have had a vehicle repossessed. Approval is based primarily on your current income and ability to make payments." },
  { question: "How long after a repossession can I get a car loan in Chicago?", answer: "You can apply for a car loan immediately after a repossession, though some lenders prefer to wait 12 months. Having steady income and a down payment significantly improves your chances." },
  { question: "What interest rates can I expect after a repossession in Chicago?", answer: "Post-repossession auto loan rates in Chicago, IL typically range from 15% to 29.9% APR. Rates improve as you rebuild your credit with on-time payments." },
  { question: "Do I need to pay off my old repossession before getting a new loan in Chicago?", answer: "Not necessarily. Some lenders in Chicago will approve you even if you have an outstanding deficiency balance from a previous repossession. However, paying it off can improve your approval odds." },
  { question: "How much down payment do I need after a repossession in Chicago?", answer: "Most post-repossession lenders in Chicago require $500–$2,000 down. A larger down payment reduces the lender's risk and can help you qualify for better terms." }
];

export default function CityChicagoIlAutoLoansAfterRepossession() {
  useSEO({
    title: "Best Auto Loans After Repossession in Chicago, IL (2026) | Complete Auto Loans",
    description: "Find auto loans after repossession in Chicago, IL. Rebuild your credit with a new loan — lenders who approve post-repo borrowers.",
    canonical: "/chicago-il/auto-loans-after-repossession/",
    schema: [
      buildLocalBusinessSchema({
        city: "Chicago",
        state: "IL",
        serviceType: "Auto Loans After Repossession",
        url: "/chicago-il/auto-loans-after-repossession/",
        description: "Find auto loans after repossession in Chicago, IL. Rebuild your credit with a new loan — lenders who approve post-repo borrowers.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Chicago, IL", path: "/chicago-il/" },
        { name: "Auto Loans After Repossession in Chicago, IL", path: "/chicago-il/auto-loans-after-repossession/" },
      ]),
      buildFAQSchema(faqs),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Auto Loans After Repossession in Chicago, IL (2026) | Complete Auto Loans"
      h1="Best Auto Loans After Repossession in Chicago, IL"
      description="Find auto loans after repossession in Chicago, IL. Rebuild your credit with a new loan — lenders who approve post-repo borrowers."
      intro="Getting an auto loan after a repossession in Chicago, IL is challenging but entirely possible. Repossession stays on your credit report for up to 7 years, but many lenders in our network specialize in post-repo financing and evaluate your current financial situation rather than your past."
      city="Chicago"
      state="IL"
      county="Cook County"
      dealerships={["Windy City Auto Credit", "Chicago BHPH Motors", "Cook County Car Finance", "Illinois Auto Approval"]}
      lenders={lenders}
      faqs={faqs}
      citySlug="chicago-il"
      serviceSlug="auto-loans-after-repossession"
      nationalGuideHref="/best-auto-loans-after-repossession/"
      nationalGuideLabel="Best Auto Loans After Repossession of 2026"
    />
  );
}
