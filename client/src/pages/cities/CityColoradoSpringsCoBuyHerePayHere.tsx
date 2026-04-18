/**
 * Colorado Springs, CO — Buy Here Pay Here Dealerships in Colorado Springs, CO
 * Template: CityServicePageTemplate
 */
import CityServicePageTemplate from "@/components/CityServicePageTemplate";
import type { CityLender, CityFAQ } from "@/components/CityServicePageTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";
import { LocalDealersSection, LocalDealer } from "@/components/LocalDealerCard";


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
    name: "Pikes Peak Credit Union Auto",
    badge: null,
    rating: 4.2,
    reviews: 180,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "El Paso County's top subprime lender",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  },
  {
    name: "Colorado Auto Approval",
    badge: null,
    rating: 4.2,
    reviews: 225,
    minScore: "300+",
    aprRange: "8.9% – 34.9%",
    down: "$500+",
    approval: "78%",
    highlight: "Local network serving Colorado Springs metro",
    pros: ["Local approval decisions", "Familiar with local market", "Fast same-day funding"],
    href: "/apply",
    isTop: false,
  }
];

const localDealers: LocalDealer[] = [
  {
    name: "CarHop of Colorado Springs",
    area: "East Colorado Springs",
    bestFor: "Best for bad credit or no credit",
    creditMin: "No minimum",
    downPayment: "Not publicly listed",
    reportsToBureaus: null,
    keyFact: "18-month/18,000-mile limited warranty and money-back guarantee on every vehicle.",
    website: "https://www.carhop.com/",
  },
  {
    name: "DriveEasy Used Cars",
    area: "Colorado Springs, CO",
    bestFor: "Best for no credit check with bilingual service",
    creditMin: "No minimum",
    downPayment: "$500+",
    reportsToBureaus: null,
    keyFact: "Friendly bilingual (English/Spanish) service. Flexible in-house financing with no credit check.",
    website: "https://www.idriveasy.com/",
  },
  {
    name: "Byrider Colorado Springs",
    area: "Colorado Springs, CO",
    bestFor: "Best for flexible financing with vehicle inspection",
    creditMin: "No minimum",
    downPayment: "Not publicly listed",
    reportsToBureaus: null,
    keyFact: "Vehicle inspection, warranty, optional service contract, and in-house auto repair service department.",
    website: "https://www.byrider.com/",
  }
];

const faqs: CityFAQ[] = [
  { question: "What is buy here pay here in Colorado Springs?", answer: "Buy here pay here (BHPH) means the dealership finances the vehicle directly — no bank or credit union involved. Colorado Springs BHPH dealers approve buyers based on income, not credit score." },
  { question: "Do BHPH dealerships in Colorado Springs check credit?", answer: "Most BHPH dealerships in Colorado Springs, CO do not run a traditional credit check. They focus on your current income and ability to make weekly or biweekly payments." },
  { question: "What are the interest rates at BHPH dealers in Colorado Springs?", answer: "BHPH interest rates in Colorado Springs typically range from 18% to 29.9% APR. While higher than traditional loans, they provide access to financing for buyers who cannot qualify elsewhere." },
  { question: "Can I rebuild my credit with a BHPH loan in Colorado Springs?", answer: "Some BHPH dealers in Colorado Springs report payments to credit bureaus, which can help rebuild your credit over time. Ask the dealer directly whether they report to Experian, Equifax, or TransUnion." },
  { question: "How much down payment do BHPH dealers require in Colorado Springs?", answer: "Most BHPH dealers in Colorado Springs require between $500 and $1,500 down. Some accept trade-ins as a down payment. The amount varies by dealer and vehicle price." }
];

export default function CityColoradoSpringsCoBuyHerePayHere() {
  useSEO({
    title: "Best Buy Here Pay Here Dealerships in Colorado Springs, CO (2026) | Complete Auto Loans",
    description: "Find the best buy here pay here dealerships in Colorado Springs, CO. In-house financing with no credit check required — drive today.",
    canonical: "/colorado-springs-co/buy-here-pay-here/",
    schema: [
      buildLocalBusinessSchema({
        city: "Colorado Springs",
        state: "CO",
        serviceType: "Buy Here Pay Here",
        url: "/colorado-springs-co/buy-here-pay-here/",
        description: "Find the best buy here pay here dealerships in Colorado Springs, CO. In-house financing with no credit check required — drive today.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Colorado Springs, CO", path: "/colorado-springs-co/" },
        { name: "Buy Here Pay Here Dealerships in Colorado Springs, CO", path: "/colorado-springs-co/buy-here-pay-here/" },
      ]),
      buildFAQSchema(faqs),
    ],
  });

  return (
    <>
    <CityServicePageTemplate
      title="Best Buy Here Pay Here Dealerships in Colorado Springs, CO (2026) | Complete Auto Loans"
      h1="Best Buy Here Pay Here Dealerships in Colorado Springs, CO"
      description="Find the best buy here pay here dealerships in Colorado Springs, CO. In-house financing with no credit check required — drive today."
      intro="Buy here pay here dealerships in Colorado Springs, CO offer in-house financing directly to buyers with bad credit, no credit, or prior bankruptcies. Unlike traditional lenders, BHPH dealers make their own approval decisions on-site, meaning you can often drive away the same day."
      city="Colorado Springs"
      state="CO"
      county="El Paso County"
      dealerships={["Pikes Peak Auto Credit", "Springs BHPH Motors", "Colorado Auto Approval", "Front Range Car Credit"]}
      lenders={lenders}
      faqs={faqs}
      citySlug="colorado-springs-co"
      serviceSlug="buy-here-pay-here"
      nationalGuideHref="/best-buy-here-pay-here-dealerships/"
      nationalGuideLabel="Best Buy Here Pay Here Dealerships of 2026"
    />
    <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
      <LocalDealersSection dealers={localDealers} city="Colorado Springs" state="CO" />
    </div>
    </>
  );
}
