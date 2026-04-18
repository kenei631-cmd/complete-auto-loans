/**
 * Locations — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Lists all 10 Tier 1 cities with links to their hub pages and sub-service pages
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

const cities = [
  {
    name: "Phoenix", state: "AZ", slug: "phoenix-az",
    desc: "Arizona's largest city — high demand for subprime auto financing with 242,150 monthly searches.",
    volume: "242,150/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/phoenix-az/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/phoenix-az/buy-here-pay-here" },
      { label: "No Credit Check", href: "/phoenix-az/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/phoenix-az/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/phoenix-az/no-money-down-car-loans" },
      { label: "Second Chance", href: "/phoenix-az/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/phoenix-az/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/phoenix-az/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Colorado Springs", state: "CO", slug: "colorado-springs-co",
    desc: "Colorado's second-largest city — 172,370 monthly searches for subprime auto financing.",
    volume: "172,370/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/colorado-springs-co/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/colorado-springs-co/buy-here-pay-here" },
      { label: "No Credit Check", href: "/colorado-springs-co/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/colorado-springs-co/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/colorado-springs-co/no-money-down-car-loans" },
      { label: "Second Chance", href: "/colorado-springs-co/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/colorado-springs-co/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/colorado-springs-co/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Fort Worth", state: "TX", slug: "fort-worth-tx",
    desc: "DFW's western anchor — 97,710 monthly searches, especially for Buy Here Pay Here.",
    volume: "97,710/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/fort-worth-tx/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/fort-worth-tx/buy-here-pay-here" },
      { label: "No Credit Check", href: "/fort-worth-tx/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/fort-worth-tx/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/fort-worth-tx/no-money-down-car-loans" },
      { label: "Second Chance", href: "/fort-worth-tx/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/fort-worth-tx/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/fort-worth-tx/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Dallas", state: "TX", slug: "dallas-tx",
    desc: "Major Texas metro — 13,340 monthly searches with strong Buy Here Pay Here demand.",
    volume: "13,340/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/dallas-tx/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/dallas-tx/buy-here-pay-here" },
      { label: "No Credit Check", href: "/dallas-tx/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/dallas-tx/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/dallas-tx/no-money-down-car-loans" },
      { label: "Second Chance", href: "/dallas-tx/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/dallas-tx/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/dallas-tx/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Detroit", state: "MI", slug: "detroit-mi",
    desc: "Motor City — 11,400 monthly searches. High subprime demand in a working-class market.",
    volume: "11,400/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/detroit-mi/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/detroit-mi/buy-here-pay-here" },
      { label: "No Credit Check", href: "/detroit-mi/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/detroit-mi/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/detroit-mi/no-money-down-car-loans" },
      { label: "Second Chance", href: "/detroit-mi/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/detroit-mi/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/detroit-mi/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Tulsa", state: "OK", slug: "tulsa-ok",
    desc: "Oklahoma's second city — 6,300 monthly searches with low keyword competition.",
    volume: "6,300/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/tulsa-ok/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/tulsa-ok/buy-here-pay-here" },
      { label: "No Credit Check", href: "/tulsa-ok/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/tulsa-ok/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/tulsa-ok/no-money-down-car-loans" },
      { label: "Second Chance", href: "/tulsa-ok/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/tulsa-ok/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/tulsa-ok/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Columbus", state: "OH", slug: "columbus-oh",
    desc: "Ohio's capital — 4,390 monthly searches with strong Buy Here Pay Here intent.",
    volume: "4,390/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/columbus-oh/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/columbus-oh/buy-here-pay-here" },
      { label: "No Credit Check", href: "/columbus-oh/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/columbus-oh/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/columbus-oh/no-money-down-car-loans" },
      { label: "Second Chance", href: "/columbus-oh/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/columbus-oh/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/columbus-oh/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Charlotte", state: "NC", slug: "charlotte-nc",
    desc: "Southeast financial hub — 4,260 monthly searches with growing subprime demand.",
    volume: "4,260/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/charlotte-nc/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/charlotte-nc/buy-here-pay-here" },
      { label: "No Credit Check", href: "/charlotte-nc/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/charlotte-nc/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/charlotte-nc/no-money-down-car-loans" },
      { label: "Second Chance", href: "/charlotte-nc/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/charlotte-nc/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/charlotte-nc/auto-loans-after-repossession" },
    ],
  },
  {
    name: "San Antonio", state: "TX", slug: "san-antonio-tx",
    desc: "Texas's second-largest city — 4,190 monthly searches with large ITIN borrower population.",
    volume: "4,190/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/san-antonio-tx/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/san-antonio-tx/buy-here-pay-here" },
      { label: "No Credit Check", href: "/san-antonio-tx/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/san-antonio-tx/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/san-antonio-tx/no-money-down-car-loans" },
      { label: "Second Chance", href: "/san-antonio-tx/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/san-antonio-tx/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/san-antonio-tx/auto-loans-after-repossession" },
    ],
  },
  {
    name: "Chicago", state: "IL", slug: "chicago-il",
    desc: "Midwest's largest city — 3,720 monthly searches with diverse subprime borrower base.",
    volume: "3,720/mo",
    pages: [
      { label: "Bad Credit Auto Loans", href: "/chicago-il/bad-credit-auto-loans" },
      { label: "Buy Here Pay Here", href: "/chicago-il/buy-here-pay-here" },
      { label: "No Credit Check", href: "/chicago-il/no-credit-check-car-loans" },
      { label: "Guaranteed Approval", href: "/chicago-il/guaranteed-approval-auto-loans" },
      { label: "No Money Down", href: "/chicago-il/no-money-down-car-loans" },
      { label: "Second Chance", href: "/chicago-il/second-chance-auto-loans" },
      { label: "After Bankruptcy", href: "/chicago-il/car-loans-after-bankruptcy" },
      { label: "After Repossession", href: "/chicago-il/auto-loans-after-repossession" },
    ],
  },
];

export default function Locations() {
  useSEO({
    title: "Bad Credit Auto Loans by City | Complete Auto Loans Locations",
    description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in your city. Complete Auto Loans serves 10 major U.S. markets.",
    canonical: "/locations",
    schema: [
      buildWebPageSchema({
        title: "Bad Credit Auto Loans by City | Complete Auto Loans Locations",
        description: "Find the best bad credit auto loans, buy here pay here dealerships, and no credit check car loans in your city. Complete Auto Loans serves 10 major U.S. markets.",
        url: "/locations",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
      ]),
    ],
  });

  return (
    <Layout>
      {/* Dark Header */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.578 0.098 186 / 0.10), transparent)", pointerEvents: "none" }} />
        <div className="container py-14" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Locations</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: "oklch(0.65 0.085 186)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>10 Cities Covered</span>
          </div>
          <h1 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, maxWidth: "640px" }}>
            Bad Credit Auto Loans by City
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.6 }}>
            Find lenders who approve bad credit, no credit, bankruptcy, and repossession in your city. Select your market below to see all available financing options.
          </p>
        </div>
      </div>

      {/* City Grid */}
      <div className="container py-14">
        <div className="grid md:grid-cols-2 gap-6">
          {cities.map((city) => (
            <div
              key={city.slug}
              className="rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)", boxShadow: "0 2px 12px oklch(0.311 0.065 251 / 0.06)" }}
            >
              {/* City Header */}
              <div className="p-5 pb-4" style={{ borderBottom: "1px solid oklch(0.93 0.005 80)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={13} style={{ color: "oklch(0.578 0.098 186)" }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                        {city.state}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "oklch(0.18 0.04 251)", lineHeight: 1.2 }}>
                      {city.name}
                    </h2>
                    <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      {city.desc}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: "oklch(0.578 0.098 186 / 0.1)", color: "oklch(0.42 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {city.volume}
                  </span>
                </div>
              </div>

              {/* Sub-pages */}
              <div className="p-5">
                <div className="grid grid-cols-2 gap-2">
                  {city.pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all"
                      style={{ color: "oklch(0.32 0.04 251)", background: "oklch(0.97 0.003 80)", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.578 0.098 186 / 0.08)";
                        (e.currentTarget as HTMLElement).style.color = "oklch(0.42 0.085 186)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.97 0.003 80)";
                        (e.currentTarget as HTMLElement).style.color = "oklch(0.32 0.04 251)";
                      }}
                    >
                      <ChevronRight size={11} style={{ color: "oklch(0.65 0.085 186)", flexShrink: 0 }} />
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-14 rounded-2xl p-8 text-center"
          style={{ background: "oklch(0.311 0.065 251)", boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)" }}
        >
          <h2 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700 }}>
            Don't See Your City?
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
            Complete Auto Loans works in all 50 states. Apply now and we'll match you with lenders in your area regardless of location.
          </p>
          <Link href="/apply">
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.4)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; }}
            >
              Get Pre-Approved Now
              <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
