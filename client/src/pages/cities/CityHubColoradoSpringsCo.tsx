/**
 * City Hub: Colorado Springs, CO — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/colorado-springs-co/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/colorado-springs-co/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/colorado-springs-co/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/colorado-springs-co/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/colorado-springs-co/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/colorado-springs-co/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/colorado-springs-co/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/colorado-springs-co/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubColoradoSpringsCo() {
  useSEO({
    title: "Bad Credit Auto Loans Colorado Springs, CO | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Colorado Springs, CO. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/colorado-springs-co",
    schema: [
      buildLocalBusinessSchema({
        city: "Colorado Springs",
        state: "CO",
        serviceType: "Auto Loans",
        url: "/colorado-springs-co",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Colorado Springs, CO. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Colorado Springs, CO", path: "/colorado-springs-co" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Colorado Springs"
      state="CO"
      slug="colorado-springs-co"
      monthlySearches="172,370"
      description="Colorado Springs is home to a large military and veteran population, many of whom face credit challenges after deployment or financial hardship. The city's sprawling layout makes a personal vehicle essential for daily life."
      lenderNote="Many Colorado Springs lenders offer special programs for military personnel and veterans with imperfect credit."
      services={services}
    />
  );
}
