/**
 * City Hub: Tulsa, OK — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/tulsa-ok/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/tulsa-ok/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/tulsa-ok/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/tulsa-ok/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/tulsa-ok/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/tulsa-ok/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/tulsa-ok/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/tulsa-ok/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubTulsaOk() {
  useSEO({
    title: "Bad Credit Auto Loans Tulsa, OK | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Tulsa, OK. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/tulsa-ok",
    schema: [
      buildLocalBusinessSchema({
        city: "Tulsa",
        state: "OK",
        serviceType: "Auto Loans",
        url: "/tulsa-ok",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Tulsa, OK. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Tulsa, OK", path: "/tulsa-ok" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Tulsa"
      state="OK"
      slug="tulsa-ok"
      monthlySearches="6,300"
      description="Tulsa is Oklahoma's second-largest city with a strong energy and manufacturing economy. Car ownership is essential in this spread-out metro, and local lenders offer competitive rates for borrowers with all types of credit histories."
      lenderNote="Tulsa has relatively low keyword competition, making it easier to rank for local subprime auto loan searches."
      services={services}
    />
  );
}
