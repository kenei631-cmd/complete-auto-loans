/**
 * Detroit, MI — Bad Credit Auto Loans in Detroit, MI
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
  { question: "Can I get a car loan in Detroit with bad credit?", answer: "Yes. Lenders serving Detroit, MI specialize in bad credit auto loans for borrowers with credit scores as low as 300. Approval is primarily based on your income and ability to make monthly payments, not your credit score alone." },
  { question: "How much down payment do I need for a bad credit car loan in Detroit?", answer: "Most lenders in Detroit require between $500 and $1,000 down for bad credit auto loans. Some no-money-down programs are available for borrowers with steady income. A larger down payment typically results in a lower interest rate." },
  { question: "Will applying hurt my credit score?", answer: "Complete Auto Loans uses a soft credit inquiry to match you with lenders, which does not affect your credit score. Only when you formally accept a loan offer will a hard inquiry be made." },
  { question: "How fast can I get approved in Detroit?", answer: "Most borrowers in Detroit, MI receive a match within 2 minutes of completing the application. Same-day approval and same-day vehicle pickup are common through our lender network." },
  { question: "What income do I need to qualify?", answer: "Most lenders in Detroit require a minimum monthly income of $1,500 to $2,000 from any verifiable source — employment, self-employment, disability, or Social Security." }
];

export default function CityDetroitMiBadCreditAutoLoans() {
  useSEO({
    title: "Best Bad Credit Auto Loans in Detroit, MI (2026) | Complete Auto Loans",
    description: "Compare the best bad credit auto loans in Detroit, MI. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
    canonical: "/detroit-mi/bad-credit-auto-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "Detroit",
        state: "MI",
        serviceType: "Bad Credit Auto Loans",
        url: "/detroit-mi/bad-credit-auto-loans/",
        description: "Compare the best bad credit auto loans in Detroit, MI. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Detroit, MI", path: "/detroit-mi/" },
        { name: "Bad Credit Auto Loans in Detroit, MI", path: "/detroit-mi/bad-credit-auto-loans/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/detroit-mi/bad-credit-auto-loans",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Bad Credit Auto Loans in Detroit, MI (2026) | Complete Auto Loans"
      h1="Best Bad Credit Auto Loans in Detroit, MI"
      description="Compare the best bad credit auto loans in Detroit, MI. Lenders that approve credit scores 300–600 with $500 down and proof of income."
      intro="Finding a bad credit auto loan in Detroit, MI doesn't have to mean getting taken advantage of. Whether you need a vehicle for work or family, your credit score shouldn't stop you. We've reviewed every major lender serving Detroit residents and ranked them by approval rate, interest rate fairness, and customer experience."
      city="Detroit"
      state="MI"
      county="Wayne County"
      dealerships={[{ name: "Jefferson Chevrolet", note: "Subprime auto financing for those with past credit challenges near Dearborn.", website: "https://www.jeffersonchevrolet.com/subprime-financing-near-dearborn-mi.html" }, { name: "Roy O'Brien Ford", note: "Subprime auto loans for individuals with less-than-perfect credit history.", website: "https://www.royobrien.net/subprime-auto-financing-st-clair-shores-mi.htm" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="detroit-mi"
      serviceSlug="bad-credit-auto-loans"
      nationalGuideHref="/best-bad-credit-auto-loans/"
      nationalGuideLabel="Best Bad Credit Auto Loans of 2026"
    />
  );
}
