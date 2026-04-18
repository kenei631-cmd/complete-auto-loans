/**
 * San Antonio, TX — No Money Down Car Loans in San Antonio, TX
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
    name: "River City FCU",
    badge: null,
    rating: 4.2,
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
  { question: "Can I get a car loan with no money down in San Antonio?", answer: "Yes. Several lenders in San Antonio, TX offer $0 down car loans for borrowers with steady income. Qualification depends more on your monthly income than your credit score." },
  { question: "What income do I need for a no money down loan in San Antonio?", answer: "Most no money down lenders in San Antonio require a minimum monthly income of $1,800–$2,000. A higher income makes it easier to qualify without a down payment." },
  { question: "Are no money down car loans more expensive in San Antonio?", answer: "No money down loans in San Antonio typically have slightly higher interest rates because the lender is taking on more risk. However, they allow you to preserve your savings while getting the vehicle you need." },
  { question: "Can I trade in my current vehicle as a down payment in San Antonio?", answer: "Yes. Many lenders in San Antonio, TX accept trade-in vehicles as a down payment, which can help you qualify for better terms even if you don't have cash available." },
  { question: "How do I apply for a no money down loan in San Antonio?", answer: "Complete the 2-minute application on Complete Auto Loans. We'll match you with lenders in San Antonio who offer $0 down programs based on your income and credit profile." }
];

export default function CitySanAntonioTxNoMoneyDownCarLoans() {
  useSEO({
    title: "Best No Money Down Car Loans in San Antonio, TX (2026) | Complete Auto Loans",
    description: "Find no money down car loans in San Antonio, TX. $0 down payment options for qualified borrowers — bad credit accepted.",
    canonical: "/san-antonio-tx/no-money-down-car-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "San Antonio",
        state: "TX",
        serviceType: "No Money Down Car Loans",
        url: "/san-antonio-tx/no-money-down-car-loans/",
        description: "Find no money down car loans in San Antonio, TX. $0 down payment options for qualified borrowers — bad credit accepted.",
        geo: { latitude: 29.4241, longitude: -98.4936 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "San Antonio, TX", path: "/san-antonio-tx/" },
        { name: "No Money Down Car Loans in San Antonio, TX", path: "/san-antonio-tx/no-money-down-car-loans/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/san-antonio-tx/no-money-down-car-loans",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best No Money Down Car Loans in San Antonio, TX (2026) | Complete Auto Loans"
      h1="Best No Money Down Car Loans in San Antonio, TX"
      description="Find no money down car loans in San Antonio, TX. $0 down payment options for qualified borrowers — bad credit accepted."
      intro="No money down car loans in San Antonio, TX allow qualified borrowers to purchase a vehicle without any upfront down payment. While these programs are harder to qualify for with bad credit, several lenders in our network offer $0 down options for borrowers with steady income."
      city="San Antonio"
      state="TX"
      county="Bexar County"
      dealerships={[{ name: "River City FCU", note: "Secured auto loans for individuals with bad credit in San Antonio.", website: "https://www.rivercityfcu.org/bad-credit-auto-loan" }, { name: "Red McCombs Toyota", note: "Bad credit auto loans through partnerships with subprime lenders in San Antonio.", website: "https://www.redmccombstoyota.com/finance/low-credit-financing/" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="san-antonio-tx"
      serviceSlug="no-money-down-car-loans"
      nationalGuideHref="/best-no-money-down-car-loans-bad-credit/"
      nationalGuideLabel="Best No Money Down Car Loans of 2026"
    />
  );
}
