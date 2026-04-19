/**
 * City Hub: Detroit, MI — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Template: CityHubTemplate
 */
import CityHubTemplate from "@/components/CityHubTemplate";
import type { CityService } from "@/components/CityHubTemplate";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";
import cityLocalData from "@/data/cityLocalData";


const services: CityService[] = [
  { label: "Bad Credit Auto Loans", href: "/detroit-mi/bad-credit-auto-loans", desc: "For scores 300–579. Multiple lenders compete for your business." },
  { label: "Buy Here Pay Here", href: "/detroit-mi/buy-here-pay-here", desc: "In-house financing. No third-party lender required." },
  { label: "No Credit Check", href: "/detroit-mi/no-credit-check-car-loans", desc: "Approval based on income, not credit score." },
  { label: "Guaranteed Approval", href: "/detroit-mi/guaranteed-approval-auto-loans", desc: "Near-guaranteed approval with proof of income." },
  { label: "No Money Down", href: "/detroit-mi/no-money-down-car-loans", desc: "$0 down payment options for qualified borrowers." },
  { label: "Second Chance", href: "/detroit-mi/second-chance-auto-loans", desc: "Fresh start after bankruptcy, repo, or collections." },
  { label: "After Bankruptcy", href: "/detroit-mi/car-loans-after-bankruptcy", desc: "Chapter 7 or 13 — we match you with lenders who say yes." },
  { label: "After Repossession", href: "/detroit-mi/auto-loans-after-repossession", desc: "Rebuild credit after a repossession with a new loan." },
];

export default function CityHubDetroitMi() {
  useSEO({
    title: "Bad Credit Auto Loans Detroit, MI | Complete Auto Loans",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Detroit, MI. Get pre-approved in 2 minutes — all credit accepted.",
    canonical: "/detroit-mi",
    schema: [
      buildLocalBusinessSchema({
        city: "Detroit",
        state: "MI",
        serviceType: "Auto Loans",
        url: "/detroit-mi",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in Detroit, MI. Complete Auto Loans matches you with lenders who approve all credit types.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Detroit, MI", path: "/detroit-mi" },
      ]),
    ],
  });

  return (
    <CityHubTemplate
      city="Detroit"
      state="MI"
      slug="detroit-mi"
      monthlySearches="11,400"
      description="Detroit's automotive heritage runs deep, but the city's economic challenges mean many residents carry damaged credit. The metro area has a dense network of BHPH dealerships and subprime lenders ready to work with all credit situations."
      lenderNote="Detroit-area lenders are among the most experienced in the country at approving borrowers after bankruptcy or repossession."
      services={services}

      geo={{ latitude: 42.3314, longitude: -83.0458 }}
      localData={cityLocalData["detroit-mi"]}
/>
  );
}
