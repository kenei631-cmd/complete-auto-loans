/**
 * City Hub: Columbus, OH — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/columbus-oh/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/columbus-oh/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/columbus-oh/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/columbus-oh/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/columbus-oh/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/columbus-oh/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/columbus-oh/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/columbus-oh/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubColumbusOh() {
  useSEO({
    title: "Bad Credit Auto Loans Columbus, OH | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Columbus, OH. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/columbus-oh",
    schema: [
      buildLocalBusinessSchema({
        city: "Columbus",
        state: "OH",
        serviceType: "Auto Loans",
        url: "/columbus-oh",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Columbus, OH. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Columbus, OH", path: "/columbus-oh" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Columbus"
      state="OH"
      slug="columbus-oh"
      monthlySearches="4,390"
      description="Columbus is Ohio's capital and largest city, home to a large university population and a growing tech sector. Despite the economic growth, many residents still carry subprime credit and need flexible auto financing options."
      lenderNote="Columbus lenders frequently approve first-time buyers and recent graduates with thin or no credit history."
      services={services}
    />
  );
}
