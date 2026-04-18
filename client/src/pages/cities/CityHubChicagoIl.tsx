/**
 * City Hub: Chicago, IL — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/chicago-il/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/chicago-il/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/chicago-il/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/chicago-il/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/chicago-il/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/chicago-il/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/chicago-il/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/chicago-il/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubChicagoIl() {
  useSEO({
    title: "Bad Credit Auto Loans Chicago, IL | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Chicago, IL. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/chicago-il",
    schema: [
      buildLocalBusinessSchema({
        city: "Chicago",
        state: "IL",
        serviceType: "Auto Loans",
        url: "/chicago-il",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Chicago, IL. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Chicago, IL", path: "/chicago-il" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Chicago"
      state="IL"
      slug="chicago-il"
      monthlySearches="3,720"
      description="Chicago is the Midwest's largest city with a diverse economy and population. While public transit is available downtown, the vast suburban areas require personal vehicles — creating strong demand for subprime auto financing across all neighborhoods."
      lenderNote="Chicago-area lenders serve one of the most diverse borrower pools in the country, with programs for every credit situation."
      services={services}
    />
  );
}
