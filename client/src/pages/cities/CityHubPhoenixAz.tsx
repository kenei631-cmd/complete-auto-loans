/**
 * City Hub: Phoenix, AZ — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/phoenix-az/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/phoenix-az/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/phoenix-az/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/phoenix-az/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/phoenix-az/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/phoenix-az/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/phoenix-az/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/phoenix-az/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubPhoenixAz() {
  useSEO({
    title: "Bad Credit Auto Loans Phoenix, AZ | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Phoenix, AZ. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/phoenix-az",
    schema: [
      buildLocalBusinessSchema({
        city: "Phoenix",
        state: "AZ",
        serviceType: "Auto Loans",
        url: "/phoenix-az",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Phoenix, AZ. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Phoenix, AZ", path: "/phoenix-az" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Phoenix"
      state="AZ"
      slug="phoenix-az"
      monthlySearches="242,150"
      description="Phoenix is the fifth-largest city in the U.S. and one of the fastest-growing metros in the country. With a car-dependent layout and a large working-class population, demand for subprime auto financing is among the highest in the nation."
      lenderNote="Phoenix lenders are accustomed to approving borrowers with credit scores as low as 450."
      services={services}
    />
  );
}
