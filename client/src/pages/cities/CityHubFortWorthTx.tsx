/**
 * City Hub: Fort Worth, TX — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/fort-worth-tx/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/fort-worth-tx/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/fort-worth-tx/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/fort-worth-tx/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/fort-worth-tx/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/fort-worth-tx/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/fort-worth-tx/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/fort-worth-tx/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubFortWorthTx() {
  useSEO({
    title: "Bad Credit Auto Loans Fort Worth, TX | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Fort Worth, TX. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/fort-worth-tx",
    schema: [
      buildLocalBusinessSchema({
        city: "Fort Worth",
        state: "TX",
        serviceType: "Auto Loans",
        url: "/fort-worth-tx",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Fort Worth, TX. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Fort Worth, TX", path: "/fort-worth-tx" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Fort Worth"
      state="TX"
      slug="fort-worth-tx"
      monthlySearches="97,710"
      description="Fort Worth anchors the western half of the Dallas-Fort Worth Metroplex. The city has a strong blue-collar workforce in manufacturing, logistics, and energy — industries where workers often need a reliable vehicle but may carry subprime credit."
      lenderNote="Fort Worth has one of the highest concentrations of Buy Here Pay Here dealerships in Texas."
      services={services}

      geo={{ latitude: 32.7555, longitude: -97.3308 }}
    />
  );
}
