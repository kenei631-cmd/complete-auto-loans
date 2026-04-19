/**
 * CityHubTemplate — Shared component for all 10 city hub pages
 * Design: Premium Editorial Finance
 *
 * Props drive everything: city name, state, slug, search volume, description,
 * lender note, and the 8 sub-service links. Layout never changes — only data.
 *
 * Usage:
 *   <CityHubTemplate city="Phoenix" state="AZ" slug="phoenix-az" ... />
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { MapPin, ChevronRight, ArrowRight, Star, Users, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/schema";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CityService {
  label: string;
  href: string;
  desc: string;
}

export interface CityHubProps {
  /** City name, e.g. "Phoenix" */
  city: string;
  /** State abbreviation, e.g. "AZ" */
  state: string;
  /** URL slug, e.g. "phoenix-az" */
  slug: string;
  /** Monthly search volume display string, e.g. "242,150" */
  monthlySearches: string;
  /** 2–3 sentence city description shown in the hero */
  description: string;
  /** One-sentence lender note shown above the services grid */
  lenderNote: string;
  /** The 8 sub-service links for this city */
  services: CityService[];
  /** City center coordinates for LocalBusiness geo schema */
  geo?: { latitude: number; longitude: number };
  /** Optional unique local market data for SEO differentiation */
  localData?: import("@/data/cityLocalData").CityLocalData;
}

// ── Component ─────────────────────────────────────────────────────────────────

// National pillar pages for the "Explore Loan Types" section
const NATIONAL_PILLARS = [
  { label: "Bad Credit Auto Loans", href: "/best-bad-credit-auto-loans/" },
  { label: "Buy Here Pay Here", href: "/best-buy-here-pay-here-dealerships/" },
  { label: "No Money Down", href: "/best-no-money-down-car-loans-bad-credit/" },
  { label: "Guaranteed Approval", href: "/best-guaranteed-approval-auto-loans/" },
  { label: "No Credit Check", href: "/best-no-credit-check-car-loans/" },
  { label: "After Bankruptcy", href: "/best-car-loans-after-bankruptcy/" },
  { label: "After Repossession", href: "/best-auto-loans-after-repossession/" },
  { label: "Second Chance Loans", href: "/best-second-chance-auto-loans/" },
  { label: "Refinance Bad Credit", href: "/best-auto-refinance-bad-credit/" },
  { label: "First-Time Buyers", href: "/best-first-time-car-buyer-loans-no-credit/" },
];

export default function CityHubTemplate({
  city,
  state,
  slug,
  monthlySearches,
  description,
  lenderNote,
  services,
  geo,
  localData,
}: CityHubProps) {
  useSEO({
    title: `Bad Credit Auto Loans in ${city}, ${state} | Complete Auto Loans`,
    description: `Find bad credit auto loans, buy here pay here dealerships, and no credit check financing in ${city}, ${state}. Get matched with local lenders in 2 minutes.`,
    canonical: `/${slug}/`,
    schema: [
      buildLocalBusinessSchema({
        city,
        state,
        serviceType: "Auto Loan Matching Service",
        url: `/${slug}/`,
        description: `Complete Auto Loans connects ${city}, ${state} borrowers with bad credit auto loan lenders. No minimum credit score required.`,
        ...(geo ? { geo } : {}),
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
        { name: `${city}, ${state}`, path: `/${slug}/` },
      ]),
    ],
  });

  return (
    <Layout>
      {/* ── Dark Hero ── */}
      <div
        style={{
          background: "oklch(0.311 0.065 251)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.578 0.098 186 / 0.10), transparent)",
            pointerEvents: "none",
          }}
        />

        <div className="container py-14" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-xs mb-5"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={11} />
            <Link href="/locations" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">
              Locations
            </Link>
            <ChevronRight size={11} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              {city}, {state}
            </span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: "oklch(0.65 0.085 186)" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {city}, {state} · {monthlySearches} Monthly Searches
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-white mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "680px",
            }}
          >
            Bad Credit Auto Loans in {city}, {state}
          </h1>

          {/* Description */}
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              maxWidth: "580px",
              lineHeight: 1.65,
            }}
          >
            {description}
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: "oklch(0.76 0.16 75)",
                  color: "oklch(0.15 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                }}
              >
                Get Pre-Approved in {city}
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>

          {/* Stats Row */}
          <div
            className="flex flex-wrap gap-6 mt-8 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { icon: <Users size={14} />, value: "50K+", label: "People Matched" },
              { icon: <Star size={14} fill="currentColor" />, value: "5.0/5", label: "Google Rating" },
              { icon: <Zap size={14} />, value: "2 min", label: "Application" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span style={{ color: "oklch(0.65 0.085 186)" }}>{s.icon}</span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.75rem",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="container py-14">
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "oklch(0.18 0.04 251)",
            marginBottom: "0.5rem",
          }}
        >
          Auto Loan Options in {city}
        </h2>
        <p
          className="mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.04 251)", fontSize: "0.95rem" }}
        >
          {lenderNote}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group block rounded-2xl p-5 transition-all"
              style={{
                background: "white",
                border: "1px solid oklch(0.90 0.006 80)",
                boxShadow: "0 2px 8px oklch(0.311 0.065 251 / 0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.578 0.098 186)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px oklch(0.578 0.098 186 / 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.90 0.006 80)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px oklch(0.311 0.065 251 / 0.05)";
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "oklch(0.18 0.04 251)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {svc.label}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "oklch(0.50 0.04 251)",
                  lineHeight: 1.55,
                  marginBottom: "1rem",
                }}
              >
                {svc.desc}
              </p>
              <span
                className="inline-flex items-center gap-1 text-xs font-bold"
                style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
              >
                View Options <ChevronRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        {/* ── National Guides Section ── */}
        <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.90 0.006 80)" }}>
          <h2
            className="mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}
          >
            Explore Loan Types — National Guides
          </h2>
          <p className="mb-5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "oklch(0.50 0.04 251)" }}>
            Not sure which loan type fits your situation? Our national guides compare 40+ lenders by credit score, down payment, and approval rate.
          </p>
          <div className="flex flex-wrap gap-2">
            {NATIONAL_PILLARS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: "oklch(0.578 0.098 186 / 0.08)",
                  color: "oklch(0.42 0.085 186)",
                  border: "1px solid oklch(0.578 0.098 186 / 0.20)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.578 0.098 186 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.578 0.098 186 / 0.08)";
                }}
              >
                {p.label} <ChevronRight size={10} />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Local Market Facts ── */}
        {localData && (
          <div
            className="mt-10 p-6 rounded-2xl"
            style={{
              background: "oklch(0.97 0.005 80)",
              border: "1px solid oklch(0.88 0.008 80)",
            }}
          >
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "oklch(0.15 0.04 251)",
              }}
            >
              {city}, {state} Auto Loan Market Facts
            </h2>
            <p
              className="text-sm mb-5 leading-relaxed"
              style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {localData.marketContext}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {localData.facts.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.90 0.006 80)",
                  }}
                >
                  <p
                    className="font-bold text-base mb-0.5"
                    style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <strong>State Law Note:</strong> {localData.stateLawNote}
            </p>
          </div>
        )}

        {/* ── Bottom CTA Banner ── */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background: "oklch(0.311 0.065 251)",
            boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)",
          }}
        >
          <h2
            className="text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700 }}
          >
            Ready to Get Approved in {city}?
          </h2>
          <p
            className="mb-6"
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
            }}
          >
            Bad credit, no credit, bankruptcy, or repossession — we match you with lenders who say yes.
            Takes 2 minutes.
          </p>
          <Link href="/apply">
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: "oklch(0.76 0.16 75)",
                color: "oklch(0.15 0.04 251)",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
              }}
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
