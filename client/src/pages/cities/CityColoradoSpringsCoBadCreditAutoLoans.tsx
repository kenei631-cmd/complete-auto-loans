/**
 * Colorado Springs, CO — Bad Credit Auto Loans in Colorado Springs, CO
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
    name: "Perkins Motors",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Low-to-no credit auto loans with quick approvals in Colorado Springs.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Wilcoxson GMC",
    badge: null,
    rating: 4.2,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Bad credit auto loans for various vehicles in the Colorado Springs area.",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const faqs: CityFAQ[] = [
  { question: "Can I get a car loan in Colorado Springs with bad credit?", answer: "Yes. Lenders serving Colorado Springs, CO specialize in bad credit auto loans for borrowers with credit scores as low as 300. Approval is primarily based on your income and ability to make monthly payments, not your credit score alone." },
  { question: "How much down payment do I need for a bad credit car loan in Colorado Springs?", answer: "Most lenders in Colorado Springs require between $500 and $1,000 down for bad credit auto loans. Some no-money-down programs are available for borrowers with steady income. A larger down payment typically results in a lower interest rate." },
  { question: "Will applying hurt my credit score?", answer: "Complete Auto Loans uses a soft credit inquiry to match you with lenders, which does not affect your credit score. Only when you formally accept a loan offer will a hard inquiry be made." },
  { question: "How fast can I get approved in Colorado Springs?", answer: "Most borrowers in Colorado Springs, CO receive a match within 2 minutes of completing the application. Same-day approval and same-day vehicle pickup are common through our lender network." },
  { question: "What income do I need to qualify?", answer: "Most lenders in Colorado Springs require a minimum monthly income of $1,500 to $2,000 from any verifiable source — employment, self-employment, disability, or Social Security." }
];

export default function CityColoradoSpringsCoBadCreditAutoLoans() {
  useSEO({
    title: "Best Bad Credit Auto Loans in Colorado Springs, CO (2026) | Complete Auto Loans",
    description: "Compare the best bad credit auto loans in Colorado Springs, CO. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
    canonical: "/colorado-springs-co/bad-credit-auto-loans/",
    schema: [
      buildLocalBusinessSchema({
        city: "Colorado Springs",
        state: "CO",
        serviceType: "Bad Credit Auto Loans",
        url: "/colorado-springs-co/bad-credit-auto-loans/",
        description: "Compare the best bad credit auto loans in Colorado Springs, CO. Lenders that approve credit scores 300–600 with $500 down and proof of income.",
        geo: { latitude: 38.8339, longitude: -104.8214 },
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Colorado Springs, CO", path: "/colorado-springs-co/" },
        { name: "Bad Credit Auto Loans in Colorado Springs, CO", path: "/colorado-springs-co/bad-credit-auto-loans/" },
      ]),
      buildFAQSchema(faqs),
      buildSpeakableSchema({
        url: "/colorado-springs-co/bad-credit-auto-loans",
        cssSelectors: ["h1", ".faq-answer", ".hero-description"],
      }),
    ],
  });

  return (
    <CityServicePageTemplate
      title="Best Bad Credit Auto Loans in Colorado Springs, CO (2026) | Complete Auto Loans"
      h1="Best Bad Credit Auto Loans in Colorado Springs, CO"
      description="Compare the best bad credit auto loans in Colorado Springs, CO. Lenders that approve credit scores 300–600 with $500 down and proof of income."
      intro="Finding a bad credit auto loan in Colorado Springs, CO doesn't have to mean getting taken advantage of. Whether you need a vehicle for work or family, your credit score shouldn't stop you. We've reviewed every major lender serving Colorado Springs residents and ranked them by approval rate, interest rate fairness, and customer experience."
      city="Colorado Springs"
      state="CO"
      county="El Paso County"
      dealerships={[{ name: "Perkins Motors", note: "Low-to-no credit auto loans with quick approvals in Colorado Springs.", website: "https://perkinsmotors.com/" }, { name: "Wilcoxson GMC", note: "Bad credit auto loans for various vehicles in the Colorado Springs area.", website: "https://www.wilcoxsonautos.com/" }]}
      lenders={lenders}
      faqs={faqs}
      citySlug="colorado-springs-co"
      serviceSlug="bad-credit-auto-loans"
      nationalGuideHref="/best-bad-credit-auto-loans/"
      nationalGuideLabel="Best Bad Credit Auto Loans of 2026"
      localData={cityLocalData["colorado-springs-co"]}
    />
  );
}
