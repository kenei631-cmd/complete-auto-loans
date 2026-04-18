/**
 * City Hub: Dallas, TX — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/dallas-tx/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/dallas-tx/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/dallas-tx/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/dallas-tx/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/dallas-tx/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/dallas-tx/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/dallas-tx/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/dallas-tx/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubDallasTx() {
  useSEO({
    title: "Bad Credit Auto Loans Dallas, TX | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Dallas, TX. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/dallas-tx",
    schema: [
      buildLocalBusinessSchema({
        city: "Dallas",
        state: "TX",
        serviceType: "Auto Loans",
        url: "/dallas-tx",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Dallas, TX. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Dallas, TX", path: "/dallas-tx" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Dallas"
      state="TX"
      slug="dallas-tx"
      monthlySearches="13,340"
      description="Dallas is a major financial and commercial hub, but its sprawling highway network means nearly every resident needs a car. A large and diverse population creates strong demand for all types of subprime auto financing."
      lenderNote="Dallas lenders compete aggressively for subprime borrowers, often offering same-day approval decisions."
      services={services}

      geo={{ latitude: 32.7767, longitude: -96.797 }}
    />
  );
}
