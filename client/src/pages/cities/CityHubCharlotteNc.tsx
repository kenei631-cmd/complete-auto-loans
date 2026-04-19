/**
 * City Hub: Charlotte, NC — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import cityLocalData from "@/data/cityLocalData";


const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/charlotte-nc/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/charlotte-nc/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/charlotte-nc/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/charlotte-nc/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/charlotte-nc/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/charlotte-nc/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/charlotte-nc/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/charlotte-nc/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubCharlotteNc() {
  useSEO({
    title: "Bad Credit Auto Loans Charlotte, NC | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Charlotte, NC. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/charlotte-nc",
    schema: [
      buildLocalBusinessSchema({
        city: "Charlotte",
        state: "NC",
        serviceType: "Auto Loans",
        url: "/charlotte-nc",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Charlotte, NC. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Charlotte, NC", path: "/charlotte-nc" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Charlotte"
      state="NC"
      slug="charlotte-nc"
      monthlySearches="4,260"
      description="Charlotte is one of the fastest-growing cities in the Southeast and a major banking hub. Despite the financial industry presence, a large portion of residents carry subprime credit scores and need alternative auto financing."
      lenderNote="Charlotte's growing population creates strong demand for no-money-down and guaranteed approval auto loans."
      services={services}

      geo={{ latitude: 35.2271, longitude: -80.8431 }}
      localData={cityLocalData["charlotte-nc"]}
/>
  );
}
