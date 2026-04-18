/**
 * City Hub: San Antonio, TX — Complete Auto Loans
 * Design: Premium Editorial Finance
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { MapPin, ChevronRight, ArrowRight, Star, Users, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

const services = [
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
    <Layout>
      {/* Dark Hero */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.578 0.098 186 / 0.10), transparent)", pointerEvents: "none" }} />
        <div className="container py-14" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/locations" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">Locations</Link>
            <ChevronRight size={11} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>San Antonio, TX</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: "oklch(0.65 0.085 186)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>
              San Antonio, TX · 4,190 Monthly Searches
            </span>
          </div>
          <h1 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, maxWidth: "680px" }}>
            Bad Credit Auto Loans in San Antonio, TX
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.65 }}>
            San Antonio is Texas's second-largest city with a large military, tourism, and healthcare workforce. The city has a significant ITIN borrower population and strong demand for no-credit-check and second chance auto financing.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.4)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; }}
              >
                Get Pre-Approved in San Antonio
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { icon: <Users size={14} />, value: "50K+", label: "People Matched" },
              { icon: <Star size={14} fill="currentColor" />, value: "4.8/5", label: "Avg Rating" },
              { icon: <Zap size={14} />, value: "2 min", label: "Application" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: "oklch(0.65 0.085 186)" }}>{s.icon}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontWeight: 700, fontSize: "1rem" }}>{s.value}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container py-14">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)", marginBottom: "0.5rem" }}>
          Auto Loan Options in San Antonio
        </h2>
        <p className="mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.04 251)", fontSize: "0.95rem" }}>
          San Antonio lenders offer ITIN auto loans and accept applicants without a Social Security number.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group block rounded-2xl p-5 transition-all"
              style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)", boxShadow: "0 2px 8px oklch(0.311 0.065 251 / 0.05)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.578 0.098 186)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px oklch(0.578 0.098 186 / 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.90 0.006 80)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px oklch(0.311 0.065 251 / 0.05)";
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "oklch(0.18 0.04 251)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {svc.label}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "oklch(0.50 0.04 251)", lineHeight: 1.55, marginBottom: "1rem" }}>
                {svc.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                View Options <ChevronRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "oklch(0.311 0.065 251)", boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)" }}
        >
          <h2 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700 }}>
            Ready to Get Approved in San Antonio?
          </h2>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
            Bad credit, no credit, bankruptcy, or repossession — we match you with lenders who say yes. Takes 2 minutes.
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
