/**
 * City Hub: San Antonio, TX — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/san-antonio-tx/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/san-antonio-tx/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/san-antonio-tx/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/san-antonio-tx/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/san-antonio-tx/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/san-antonio-tx/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/san-antonio-tx/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/san-antonio-tx/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubSanAntonioTx() {
  useSEO({
    title: "Bad Credit Auto Loans San Antonio, TX | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in San Antonio, TX. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/san-antonio-tx",
    schema: [
      buildLocalBusinessSchema({
        city: "San Antonio",
        state: "TX",
        serviceType: "Auto Loans",
        url: "/san-antonio-tx",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in San Antonio, TX. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "San Antonio, TX", path: "/san-antonio-tx" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="San Antonio"
      state="TX"
      slug="san-antonio-tx"
      monthlySearches="4,190"
      description="San Antonio is Texas's second-largest city with a large military, tourism, and healthcare workforce. The city has a significant ITIN borrower population and strong demand for no-credit-check and second chance auto financing."
      lenderNote="San Antonio lenders offer ITIN auto loans and accept applicants without a Social Security number."
      services={services}

      geo={{ latitude: 29.4241, longitude: -98.4936 }}
    />
  );
}
