/**
 * CityServicePageTemplate — Shared component for all 80 city+service pages
 * Design: Premium Editorial Finance
 *
 * All 80 city+service pages (e.g. /phoenix-az/bad-credit-auto-loans/) render
 * through this single template. Only the data props change per page.
 *
 * Layout:
 *   1. Dark hero (city badge, H1, description, CTA, soft-pull note)
 *   2. 2/3 + 1/3 grid:
 *      Left: intro paragraph, editorial note, lender cards, FAQ accordion
 *      Right: sticky apply CTA card, local dealerships card
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import {
  Star,
  CheckCircle2,
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MapPin,
  ChevronRight,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CityLender {
  name: string;
  badge: string | null;
  rating: number;
  reviews: number;
  minScore: string;
  aprRange: string;
  down: string;
  approval: string;
  highlight: string;
  pros: string[];
  href: string;
  isTop: boolean;
}

export interface CityFAQ {
  /** FAQ question */
  question: string;
  /** FAQ answer */
  answer: string;
}

export interface CityServicePageProps {
  /** Full page title for <title> tag */
  title: string;
  /** H1 heading */
  h1: string;
  /** Meta description / hero subtitle */
  description: string;
  /** Intro paragraph shown above lender cards */
  intro: string;
  /** City name, e.g. "Phoenix" */
  city: string;
  /** State abbreviation, e.g. "AZ" */
  state: string;
  /** County / region for sidebar copy, e.g. "Maricopa County" */
  county: string;
  /** 2–4 local dealerships/lenders for sidebar — must be real, verified businesses */
  dealerships: { name: string; note?: string; website?: string }[];
  /** Ranked lender objects */
  lenders: CityLender[];
  /** FAQ items */
  faqs: CityFAQ[];
  /** City URL slug, e.g. "phoenix-az" */
  citySlug: string;
  /** Current service slug, e.g. "bad-credit-auto-loans" */
  serviceSlug: string;
  /** URL of the corresponding national pillar page */
  nationalGuideHref: string;
  /** Label for the national guide link, e.g. "Best Bad Credit Auto Loans" */
  nationalGuideLabel: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CityServicePageTemplate({
  h1,
  description,
  intro,
  city,
  state,
  county,
  dealerships,
  lenders,
  faqs,
  citySlug,
  serviceSlug,
  nationalGuideHref,
  nationalGuideLabel,
}: CityServicePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* ── Dark Hero ── */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, oklch(0.578 0.098 186 / 0.10), transparent)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
          }}
        />

        <div className="relative container">
          {/* Breadcrumb trail */}
          <nav className="flex flex-wrap items-center gap-1 mb-5" aria-label="Breadcrumb">
            {[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: `${city}, ${state}`, href: `/${citySlug}` },
            ].map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight size={9} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                )}
                <Link
                  href={crumb.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.70rem",
                    color: i === 2 ? "oklch(0.65 0.085 186)" : "rgba(255,255,255,0.38)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
            <span className="flex items-center gap-1">
              <ChevronRight size={9} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.70rem",
                  color: "rgba(255,255,255,0.60)",
                  fontWeight: 600,
                }}
                aria-current="page"
              >
                {h1}
              </span>
            </span>
          </nav>

          {/* H1 */}
          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "720px",
            }}
          >
            {h1}
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.65)",
              fontSize: "1rem",
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: "oklch(0.76 0.16 75)",
                  color: "oklch(0.12 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 20px oklch(0.76 0.16 75 / 0.45)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                }}
              >
                Check My Approval Odds — Free
                <ArrowRight size={15} />
              </button>
            </Link>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <Shield size={11} style={{ color: "oklch(0.65 0.085 186)" }} />
              Soft credit check only
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Content + Sidebar ── */}
      <section className="py-14" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Left: Main Content ── */}
            <div className="lg:col-span-2">

              {/* Intro paragraph */}
              <p
                className="mb-10 leading-relaxed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.38 0.04 251)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                }}
              >
                {intro}
              </p>

              {/* National Guide contextual link */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{
                  background: "oklch(0.311 0.065 251 / 0.04)",
                  border: "1px solid oklch(0.311 0.065 251 / 0.12)",
                }}
              >
                <Shield size={14} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0, marginTop: "2px" }} />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "oklch(0.38 0.04 251)",
                    lineHeight: 1.6,
                  }}
                >
                  Want a national comparison?{" "}
                  <Link
                    href={nationalGuideHref}
                    style={{ color: "oklch(0.578 0.098 186)", fontWeight: 600, textDecoration: "underline" }}
                  >
                    {nationalGuideLabel}
                  </Link>
                  {" "}— we reviewed 40+ lenders to rank the best options across all 50 states.
                </p>
              </div>

              {/* Editorial note */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl mb-10"
                style={{
                  background: "oklch(0.578 0.098 186 / 0.07)",
                  border: "1px solid oklch(0.578 0.098 186 / 0.20)",
                }}
              >
                <CheckCircle2
                  size={15}
                  style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0, marginTop: "2px" }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "oklch(0.35 0.06 186)",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Editorial note:</strong> Rankings are based on approval rate, interest rate
                  fairness, lender reputation, and customer reviews. Complete Auto Loans is ranked #1
                  because it provides access to the largest network of bad credit lenders in {city} —
                  giving you the best chance of approval at the lowest rate available to you.
                </p>
              </div>

              {/* Lender Cards */}
              <div className="flex flex-col gap-5">
                {lenders.map((lender, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: lender.isTop
                        ? "2px solid oklch(0.578 0.098 186)"
                        : "1.5px solid oklch(0.90 0.005 80)",
                      boxShadow: lender.isTop
                        ? "0 8px 32px oklch(0.578 0.098 186 / 0.12)"
                        : "0 2px 12px oklch(0.311 0.065 251 / 0.05)",
                      background: "white",
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="flex items-center justify-between px-5 py-3"
                      style={{
                        background: lender.isTop ? "oklch(0.311 0.065 251)" : "oklch(0.97 0.004 80)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: lender.isTop ? "rgba(255,255,255,0.45)" : "oklch(0.52 0.04 251)",
                          }}
                        >
                          #{idx + 1}
                        </span>
                        <span
                          className="font-bold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: lender.isTop ? "white" : "oklch(0.18 0.04 251)",
                            fontSize: "0.95rem",
                          }}
                        >
                          {lender.name}
                        </span>
                        {lender.badge && (
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.578 0.098 186 / 0.20)",
                              color: "oklch(0.42 0.085 186)",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {lender.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          size={11}
                          fill="oklch(0.76 0.16 75)"
                          style={{ color: "oklch(0.76 0.16 75)" }}
                        />
                        <span
                          className="text-xs font-bold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: lender.isTop ? "rgba(255,255,255,0.80)" : "oklch(0.32 0.04 251)",
                          }}
                        >
                          {lender.rating}
                        </span>
                        <span
                          className="text-xs"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: lender.isTop ? "rgba(255,255,255,0.40)" : "oklch(0.55 0.03 251)",
                          }}
                        >
                          · {lender.reviews} reviews
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[
                          { label: "Min. Score", value: lender.minScore },
                          { label: "APR Range", value: lender.aprRange },
                          { label: "Down Payment", value: lender.down },
                          { label: "Approval Rate", value: lender.approval },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-lg p-2.5 text-center"
                            style={{ background: "oklch(0.97 0.004 80)" }}
                          >
                            <p
                              className="text-xs"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                color: "oklch(0.55 0.03 251)",
                                marginBottom: "0.2rem",
                              }}
                            >
                              {stat.label}
                            </p>
                            <p
                              className="font-bold text-sm"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                color: "oklch(0.18 0.04 251)",
                              }}
                            >
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Highlight */}
                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "oklch(0.40 0.04 251)",
                          lineHeight: 1.6,
                        }}
                      >
                        {lender.highlight}
                      </p>

                      {/* Pros tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {lender.pros.map((pro) => (
                          <span
                            key={pro}
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{
                              background: "oklch(0.578 0.098 186 / 0.08)",
                              color: "oklch(0.42 0.085 186)",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            <CheckCircle2 size={9} />
                            {pro}
                          </span>
                        ))}
                      </div>

                      {/* CTA button */}
                      <Link href={lender.href}>
                        <button
                          className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                          style={{
                            background: lender.isTop
                              ? "oklch(0.76 0.16 75)"
                              : "oklch(0.311 0.065 251)",
                            color: lender.isTop ? "oklch(0.12 0.04 251)" : "white",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: lender.isTop
                              ? "0 4px 16px oklch(0.76 0.16 75 / 0.40)"
                              : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (lender.isTop)
                              (e.currentTarget as HTMLElement).style.background =
                                "oklch(0.82 0.14 75)";
                          }}
                          onMouseLeave={(e) => {
                            if (lender.isTop)
                              (e.currentTarget as HTMLElement).style.background =
                                "oklch(0.76 0.16 75)";
                          }}
                        >
                          {lender.isTop
                            ? `Check My Approval Odds in ${city} — Free`
                            : `Visit ${lender.name}`}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-14">
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.18 0.04 251)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1.5px solid oklch(0.90 0.005 80)" }}
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 text-left"
                        style={{
                          background:
                            openFaq === idx ? "oklch(0.578 0.098 186 / 0.06)" : "white",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      >
                        <span
                          className="font-semibold text-sm pr-4"
                          style={{ color: "oklch(0.18 0.04 251)" }}
                        >
                          {faq.question}
                        </span>
                        {openFaq === idx ? (
                          <ChevronUp
                            size={15}
                            style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }}
                          />
                        ) : (
                          <ChevronDown
                            size={15}
                            style={{ color: "oklch(0.55 0.03 251)", flexShrink: 0 }}
                          />
                        )}
                      </button>
                      {openFaq === idx && (
                        <div
                          className="px-4 pb-4"
                          style={{ background: "oklch(0.578 0.098 186 / 0.03)" }}
                        >
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              color: "oklch(0.40 0.04 251)",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Sidebar ── */}
            <div className="flex flex-col gap-5">

              {/* Sticky Apply CTA card */}
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{
                  background: "oklch(0.311 0.065 251)",
                  boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <Star
                    size={11}
                    fill="oklch(0.76 0.16 75)"
                    style={{ color: "oklch(0.76 0.16 75)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "oklch(0.65 0.085 186)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Free · No Obligation
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "white",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: "0.75rem",
                  }}
                >
                  Check Your Approval Odds in {city}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.60)",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                    marginBottom: "1.25rem",
                  }}
                >
                  Takes 2 minutes. No hard credit pull. We match you with lenders serving {city},{" "}
                  {state}.
                </p>
                <Link href="/apply">
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-sm mb-4 transition-all"
                    style={{
                      background: "oklch(0.76 0.16 75)",
                      color: "oklch(0.12 0.04 251)",
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.40)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                    }}
                  >
                    Get Pre-Approved Now
                  </button>
                </Link>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Soft credit check only",
                    "Results in 2 minutes",
                    "500+ lenders in our network",
                    "No application fee",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2
                        size={10}
                        style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.50)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Dealerships card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1.5px solid oklch(0.90 0.005 80)" }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "oklch(0.578 0.098 186)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  Local {city} Dealerships
                </h4>
                <div className="flex flex-col gap-2">
                  {dealerships.map((d) => (
                    <div
                      key={d.name}
                      className="flex flex-col gap-0.5 p-2.5 rounded-lg"
                      style={{ background: "oklch(0.97 0.004 80)" }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={11}
                          style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }}
                        />
                        {d.website ? (
                          <a
                            href={d.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: "oklch(0.38 0.09 251)",
                              fontWeight: 600,
                              textDecoration: "underline",
                              textDecorationColor: "oklch(0.578 0.098 186 / 0.4)",
                            }}
                          >
                            {d.name}
                          </a>
                        ) : (
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              color: "oklch(0.32 0.04 251)",
                              fontWeight: 600,
                            }}
                          >
                            {d.name}
                          </span>
                        )}
                      </div>
                      {d.note && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.70rem",
                            color: "oklch(0.52 0.03 251)",
                            lineHeight: 1.4,
                            paddingLeft: "1.1rem",
                          }}
                        >
                          {d.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p
                  className="mt-3 text-xs"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "oklch(0.62 0.03 251)",
                    lineHeight: 1.5,
                  }}
                >
                  These local {city} dealerships serve {county} and surrounding areas. Complete Auto
                  Loans connects you with the best financing option for your situation.
                </p>
              </div>

              {/* Related City Services card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1.5px solid oklch(0.90 0.005 80)" }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "oklch(0.578 0.098 186)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  More in {city}
                </h4>
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: "Bad Credit Auto Loans", slug: "bad-credit-auto-loans" },
                    { label: "Buy Here Pay Here", slug: "buy-here-pay-here" },
                    { label: "No Credit Check", slug: "no-credit-check-car-loans" },
                    { label: "Guaranteed Approval", slug: "guaranteed-approval-auto-loans" },
                    { label: "No Money Down", slug: "no-money-down-car-loans" },
                    { label: "Second Chance", slug: "second-chance-auto-loans" },
                    { label: "After Bankruptcy", slug: "car-loans-after-bankruptcy" },
                    { label: "After Repossession", slug: "auto-loans-after-repossession" },
                  ]
                    .filter((s) => s.slug !== serviceSlug)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${citySlug}/${s.slug}`}
                        className="flex items-center gap-2 text-xs font-medium py-1.5 transition-colors"
                        style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.578 0.098 186)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.40 0.04 251)"; }}
                      >
                        <ChevronRight size={10} style={{ color: "oklch(0.65 0.085 186)", flexShrink: 0 }} />
                        {s.label}
                      </Link>
                    ))}
                </div>
                <Link
                  href={`/${citySlug}`}
                  className="flex items-center gap-1 mt-3 text-xs font-bold transition-colors"
                  style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.42 0.085 186)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.578 0.098 186)"; }}
                >
                  <MapPin size={10} /> All {city} Loan Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA Bar ── */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "oklch(0.311 0.065 251)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          boxShadow: "0 -4px 24px oklch(0.311 0.065 251 / 0.40)",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.50)", margin: 0 }}>
            <Shield size={9} style={{ display: "inline", marginRight: "3px", verticalAlign: "middle" }} />
            Soft pull only — won’t affect your score
          </p>
        </div>
        <Link href="/apply">
          <button
            style={{
              background: "oklch(0.76 0.16 75)",
              color: "oklch(0.12 0.04 251)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              boxShadow: "0 4px 14px oklch(0.76 0.16 75 / 0.45)",
              flexShrink: 0,
            }}
          >
            Get Pre-Approved <ArrowRight size={13} />
          </button>
        </Link>
      </div>
    </Layout>
  );
}
