/**
 * Detroit, MI — Second Chance Auto Loans in Detroit, MI
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
  { question: "What is a second chance auto loan in Detroit?", answer: "A second chance auto loan is a financing program designed for borrowers with seriously damaged credit — including bankruptcy, repossession, or multiple collections. Lenders in Detroit, MI focus on your current income rather than your credit history." },
  { question: "Can I get a second chance loan after bankruptcy in Detroit?", answer: "Yes. Many lenders in Detroit specialize in financing for borrowers who have filed Chapter 7 or Chapter 13 bankruptcy. Some lenders can approve you the same day your bankruptcy is discharged." },
  { question: "How do second chance loans help rebuild credit in Detroit?", answer: "Second chance lenders in Detroit typically report your payments to all three credit bureaus. Making on-time payments consistently over 12–24 months can significantly improve your credit score." },
  { question: "What are the interest rates for second chance loans in Detroit?", answer: "Second chance auto loan rates in Detroit, MI typically range from 12% to 29.9% APR, depending on your credit history, income, and down payment. Rates improve as your credit score recovers." },
  { question: "How do I apply for a second chance loan in Detroit?", answer: "Complete the 2-minute application on Complete Auto Loans. We'll match you with second chance lenders in Detroit who specialize in your specific credit situation." }
];

export default function CityDetroitMiSecondChanceAutoLoans() {
  useSEO({
    title: "Best Second Chance Auto Loans in Detroit, MI (2026) | Complete Auto Loans",
    description: "Find second chance auto loans in Detroit, MI. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted.",
    canonical: "/detroit-mi/second-chance-auto-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "Detroit",
        state: "MI",
        serviceType: "Second Chance Auto Loans",
        url: "/detroit-mi/second-chance-auto-loans/",
        description: "Find second chance auto loans in Detroit, MI. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted.",
        geo: { latitude: 42.3314, longitude: -83.0458 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Detroit, MI", path: "/detroit-mi/" },
        { name: "Second Chance Auto Loans in Detroit, MI", path: "/detroit-mi/second-chance-auto-loans/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/detroit-mi/second-chance-auto-loans",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Second Chance Auto Loans in Detroit, MI (2026) | Complete Auto Loans"
      h1="Best Second Chance Auto Loans in Detroit, MI"
      description="Find second chance auto loans in Detroit, MI. Fresh start financing after bankruptcy, repossession, or collections — all credit accepted."
      intro="Second chance auto loans in Detroit, MI are designed for borrowers who have experienced serious credit events — bankruptcy, repossession, collections, or charge-offs. These programs give you a fresh start with financing that focuses on your current financial situation rather than your past."
      city="Detroit"
      state="MI"
      county="Wayne County"
      dealerships={[{ name: "Jefferson Chevrolet", note: "Subprime auto financing for those with past credit challenges near Dearborn.", website: "https://www.jeffersonchevrolet.com/subprime-financing-near-dearborn-mi.html" }, { name: "Roy O'Brien Ford", note: "Subprime auto loans for individuals with less-than-perfect credit history.", website: "https://www.royobrien.net/subprime-auto-financing-st-clair-shores-mi.htm" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="detroit-mi"
      serviceSlug="second-chance-auto-loans"
      nationalGuideHref="/best-second-chance-auto-loans/"
      nationalGuideLabel="Best Second Chance Auto Loans of 2026"
    />
  );
}
