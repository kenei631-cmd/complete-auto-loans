/**
 * Charlotte, NC — Bad Credit Auto Loans in Charlotte, NC
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
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan in Charlotte with bad credit?", answer: "Yes. Lenders serving Charlotte, NC specialize in bad credit auto loans for borrowers with credit scores as low as 300. Approval is primarily based on your income and ability to make monthly payments, not your credit score alone." },
  { question: "How much down payment do I need for a bad credit car loan in Charlotte?", answer: "Most lenders in Charlotte require between $500 and $1,000 down for bad credit auto loans. Some no-money-down programs are available for borrowers with steady income. A larger down payment typically results in a lower interest rate." },
  { question: "Will applying hurt my credit score?", answer: "Complete Auto Loans uses a soft credit inquiry to match you with lenders, which does not affect your credit score. Only when you formally accept a loan offer will a hard inquiry be made." },
  { question: "How fast can I get approved in Charlotte?", answer: "Most borrowers in Charlotte, NC receive a match within 2 minutes of completing the application. Same-day approval and same-day vehicle pickup are common through our lender network." },
  { question: "What income do I need to qualify?", answer: "Most lenders in Charlotte require a minimum monthly income of $1,500 to $2,000 from any verifiable source — employment, self-employment, disability, or Social Security." }
];

export default function CityCharlotteNcBadCreditAutoLoans() {
  useSEO({
    title: "Best Bad Credit Auto Loans in Charlotte, NC (2026) | Complete Auto Loans",
    description: "Compare the best bad credit auto loans in Charlotte, NC. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
    canonical: "/charlotte-nc/bad-credit-auto-loans",
    schema: [
      buildLocalBusinessSchema({
        city: "Charlotte",
        state: "NC",
        serviceType: "Bad Credit Auto Loans",
        url: "/charlotte-nc/bad-credit-auto-loans",
        description: "Compare the best bad credit auto loans in Charlotte, NC. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Charlotte, NC", path: "/charlotte-nc" },
        { name: "Bad Credit Auto Loans in Charlotte, NC", path: "/charlotte-nc/bad-credit-auto-loans" },
      ]),
      buildFAQSchema(faqs),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Bad Credit Auto Loans in Charlotte, NC (2026) | Complete Auto Loans"
      h1="Best Bad Credit Auto Loans in Charlotte, NC"
      description="Compare the best bad credit auto loans in Charlotte, NC. Lenders that approve credit scores 300–600 with $500 down and proof of income."
      intro="Finding a bad credit auto loan in Charlotte, NC doesn't have to mean getting taken advantage of. Whether you need a vehicle for work or family, your credit score shouldn't stop you. We've reviewed every major lender serving Charlotte residents and ranked them by approval rate, interest rate fairness, and customer experience."
      city="Charlotte"
      state="NC"
      county="Mecklenburg County"
      dealerships={["Queen City Auto Credit", "Charlotte BHPH", "Mecklenburg Car Finance", "Carolina Auto Approval"]}
      lenders={lenders}
      faqs={faqs}
    />
  );
}
