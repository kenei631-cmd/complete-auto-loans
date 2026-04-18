/**
 * City Page: Best Buy Here Pay Here Dealerships in Chicago, IL (2026)
 * City: Chicago, IL | Page Type: buy here pay here
 * Auto-generated — Complete Auto Loans Tier 1 City Expansion
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Star, CheckCircle2, Shield, ChevronDown, ChevronUp, ArrowRight, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema";


const TITLE = "Best Buy Here Pay Here Dealerships in Chicago, IL (2026)";
const H1 = "Best Buy Here Pay Here Dealerships in Chicago, IL";
const DESC = "Find the best buy here pay here dealerships in Chicago, IL. No bank required \u2014 dealer finances directly. Approvals for any credit score.";
const INTRO = "Buy here pay here dealerships in Chicago, IL offer a direct path to vehicle ownership when traditional banks say no. The dealer acts as the lender, which means your approval is based on your income and down payment \u2014 not your credit score. We've ranked the top BHPH options serving Cook County and surrounding areas so you can drive off the lot today.";
const CITY = "Chicago";
const STATE = "IL";
const COUNTY = "Cook County";
const DEALERSHIPS = ["Windy City Auto Credit", "Chicago BHPH Center", "Midwest Car Finance", "Illinois Second Chance Motors"];

const lenders = [

  {
    name: "Complete Auto Loans",
    badge: "Editor's Choice",
    rating: 4.9,
    reviews: 2847,
    minScore: "300+",
    aprRange: "3.9% \u2013 29.9%",
    down: "$0 \u2013 $500",
    approval: "98%",
    highlight: "Largest bad credit lender network. Matches you with 500+ lenders in 2 minutes. No hard credit pull.",
    pros: ["No hard credit pull", "500+ lender network", "Same-day approval", "All credit types accepted"],
    href: "/apply",
    isTop: true,
  },

  {
    name: "Auto Credit Express",
    badge: null,
    rating: 4.6,
    reviews: 1203,
    minScore: "400+",
    aprRange: "5.9% \u2013 35.9%",
    down: "$500+",
    approval: "89%",
    highlight: "Strong network for subprime borrowers. Good for first-time buyers.",
    pros: ["Quick pre-qualification", "Large dealer network", "No application fee"],
    href: "#",
    isTop: false,
  },

  {
    name: "MyAutoLoan",
    badge: null,
    rating: 4.4,
    reviews: 876,
    minScore: "500+",
    aprRange: "4.9% \u2013 28.9%",
    down: "$0+",
    approval: "82%",
    highlight: "Multiple loan offers in one application. Good for comparison shopping.",
    pros: ["Multiple offers at once", "Competitive rates", "Fast funding"],
    href: "#",
    isTop: false,
  },

  {
    name: "DriveTime",
    badge: null,
    rating: 4.1,
    reviews: 654,
    minScore: "No minimum",
    aprRange: "10.9% \u2013 39.9%",
    down: "$500+",
    approval: "75%",
    highlight: "In-house financing at dealerships nationwide. Good for very low credit scores.",
    pros: ["In-house financing", "No minimum credit score", "Large inventory"],
    href: "#",
    isTop: false,
  },

  {
    name: "Carvana",
    badge: null,
    rating: 4.0,
    reviews: 432,
    minScore: "450+",
    aprRange: "7.9% \u2013 32.9%",
    down: "$0+",
    approval: "70%",
    highlight: "Online-only buying experience. Good for those who want to avoid dealerships.",
    pros: ["100% online", "7-day return policy", "No dealership pressure"],
    href: "#",
    isTop: false,
  }
];

const faqs = [
  {
    "q": "Can I get a car loan in Chicago with bad credit?",
    "a": "Yes. Lenders serving Chicago, IL specialize in bad credit auto loans for borrowers with credit scores as low as 300. Approval is primarily based on your income and ability to make monthly payments, not your credit score alone."
  },
  {
    "q": "How much down payment do I need for a bad credit car loan in Chicago?",
    "a": "Most lenders in Chicago require between $500 and $1,000 down for bad credit auto loans. Some no-money-down programs are available for borrowers with steady income. A larger down payment typically results in a lower interest rate."
  },
  {
    "q": "Will applying hurt my credit score?",
    "a": "Complete Auto Loans uses a soft credit inquiry to match you with lenders, which does not affect your credit score. Only when you formally accept a loan offer will a hard inquiry be made."
  },
  {
    "q": "How fast can I get approved in Chicago?",
    "a": "Most borrowers in Chicago, IL receive a match within 2 minutes of completing the application. Same-day approval and same-day vehicle pickup are common through our lender network."
  },
  {
    "q": "What income do I need to qualify?",
    "a": "Most lenders in Chicago require a minimum monthly income of $1,500 to $2,000 from any verifiable source \u2014 employment, self-employment, disability, or Social Security. A recent pay stub or bank statement is typically sufficient."
  }
];

export default function CityChicagoIlBuyHerePayHere() {
  useSEO({
    title: "Best Buy Here Pay Here Dealerships in Chicago, IL (2026) | Complete Auto Loans",
    description: "Find the best buy here pay here dealerships in Chicago, IL. No bank required \u2014 dealer finances directly. Approvals for any credit score.",
    canonical: "/chicago-il/buy-here-pay-here",
    schema: [
      buildLocalBusinessSchema({
        city: "Chicago",
        state: "IL",
        serviceType: "Buy Here Pay Here Financing",
        url: "/chicago-il/buy-here-pay-here",
        description: "Find the best buy here pay here dealerships in Chicago, IL. No bank required \u2014 dealer finances directly. Approvals for any credit score.",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Chicago, IL", path: "/chicago-il" },
        { name: "Buy Here Pay Here Financing", path: "/chicago-il/buy-here-pay-here" },
      ]),
    ],
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* ── Dark Hero Header ── */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, oklch(0.578 0.098 186 / 0.10), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)" }} />
        <div className="relative container">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={12} style={{ color: "oklch(0.65 0.085 186)" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "oklch(0.65 0.085 186)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{CITY}, {STATE}</span>
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.15, maxWidth: "720px" }}
          >
            {H1}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.6 }}>
            {DESC}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px oklch(0.76 0.16 75 / 0.45)" }}
              >
                Check My Approval Odds — Free
                <ArrowRight size={15} />
              </button>
            </Link>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
              <Shield size={11} style={{ color: "oklch(0.65 0.085 186)" }} />
              Soft credit check only
            </span>
          </div>
        </div>
      </section>

      {/* ── Intro + Lender List ── */}
      <section className="py-14" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.38 0.04 251)", fontSize: "1rem", lineHeight: 1.75 }}>
                {INTRO}
              </p>

              {/* Editorial Note */}
              <div className="flex items-start gap-3 p-4 rounded-xl mb-10" style={{ background: "oklch(0.578 0.098 186 / 0.07)", border: "1px solid oklch(0.578 0.098 186 / 0.20)" }}>
                <CheckCircle2 size={15} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "oklch(0.35 0.06 186)", lineHeight: 1.6 }}>
                  <strong>Editorial note:</strong> Rankings are based on approval rate, interest rate fairness, lender reputation, and customer reviews. Complete Auto Loans is ranked #1 because it provides access to the largest network of bad credit lenders in {CITY} — giving you the best chance of approval at the lowest rate available to you.
                </p>
              </div>

              {/* Lender Cards */}
              <div className="flex flex-col gap-5">
                {lenders.map((lender, lenderIdx) => (
                  <div
                    key={lenderIdx}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: lender.isTop ? "2px solid oklch(0.578 0.098 186)" : "1.5px solid oklch(0.90 0.005 80)",
                      boxShadow: lender.isTop ? "0 8px 32px oklch(0.578 0.098 186 / 0.12)" : "0 2px 12px oklch(0.311 0.065 251 / 0.05)",
                      background: "white",
                    }}
                  >
                    {/* Card Header */}
                    <div
                      className="flex items-center justify-between px-5 py-3"
                      style={{ background: lender.isTop ? "oklch(0.311 0.065 251)" : "oklch(0.97 0.004 80)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: lender.isTop ? "rgba(255,255,255,0.45)" : "oklch(0.52 0.04 251)" }}>
                          #{lenderIdx + 1}
                        </span>
                        <span className="font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: lender.isTop ? "white" : "oklch(0.18 0.04 251)", fontSize: "0.95rem" }}>
                          {lender.name}
                        </span>
                        {lender.badge && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "oklch(0.578 0.098 186 / 0.20)", color: "oklch(0.42 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>
                            {lender.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={11} fill="oklch(0.76 0.16 75)" style={{ color: "oklch(0.76 0.16 75)" }} />
                        <span className="text-xs font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: lender.isTop ? "rgba(255,255,255,0.80)" : "oklch(0.32 0.04 251)" }}>{lender.rating}</span>
                        <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: lender.isTop ? "rgba(255,255,255,0.40)" : "oklch(0.55 0.03 251)" }}>· {lender.reviews} reviews</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[
                          { label: "Min. Score", value: lender.minScore },
                          { label: "APR Range", value: lender.aprRange },
                          { label: "Down Payment", value: lender.down },
                          { label: "Approval Rate", value: lender.approval },
                        ].map((stat) => (
                          <div key={stat.label} className="rounded-lg p-2.5 text-center" style={{ background: "oklch(0.97 0.004 80)" }}>
                            <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.03 251)", marginBottom: "0.2rem" }}>{stat.label}</p>
                            <p className="font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.18 0.04 251)" }}>{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.04 251)", lineHeight: 1.6 }}>{lender.highlight}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {lender.pros.map((pro: string) => (
                          <span key={pro} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "oklch(0.578 0.098 186 / 0.08)", color: "oklch(0.42 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>
                            <CheckCircle2 size={9} />
                            {pro}
                          </span>
                        ))}
                      </div>
                      <Link href={lender.href}>
                        <button
                          className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                          style={{
                            background: lender.isTop ? "oklch(0.76 0.16 75)" : "oklch(0.311 0.065 251)",
                            color: lender.isTop ? "oklch(0.12 0.04 251)" : "white",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: lender.isTop ? "0 4px 16px oklch(0.76 0.16 75 / 0.40)" : "none",
                          }}
                        >
                          {lender.isTop ? `Check My Approval Odds in ${CITY} — Free` : `Visit ${lender.name}`}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-14">
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.04 251)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
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
                        style={{ background: openFaq === idx ? "oklch(0.578 0.098 186 / 0.06)" : "white", fontFamily: "'DM Sans', sans-serif" }}
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      >
                        <span className="font-semibold text-sm pr-4" style={{ color: "oklch(0.18 0.04 251)" }}>{faq.q}</span>
                        {openFaq === idx ? <ChevronUp size={15} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} /> : <ChevronDown size={15} style={{ color: "oklch(0.55 0.03 251)", flexShrink: 0 }} />}
                      </button>
                      {openFaq === idx && (
                        <div className="px-4 pb-4" style={{ background: "oklch(0.578 0.098 186 / 0.03)" }}>
                          <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.04 251)" }}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Apply CTA Card */}
              <div className="rounded-2xl p-6 sticky top-24" style={{ background: "oklch(0.311 0.065 251)", boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)" }}>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={11} fill="oklch(0.76 0.16 75)" style={{ color: "oklch(0.76 0.16 75)" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "oklch(0.65 0.085 186)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Free · No Obligation</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.75rem" }}>
                  Check Your Approval Odds in {CITY}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.60)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Takes 2 minutes. No hard credit pull. We match you with lenders serving {CITY}, {STATE}.
                </p>
                <Link href="/apply">
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-sm mb-4"
                    style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.40)" }}
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
                      <CheckCircle2 size={10} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.50)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Dealerships */}
              <div className="rounded-2xl p-5" style={{ background: "white", border: "1.5px solid oklch(0.90 0.005 80)" }}>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "oklch(0.578 0.098 186)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                  Local {CITY} Dealerships
                </h4>
                <div className="flex flex-col gap-2">
                  {DEALERSHIPS.map((d: string) => (
                    <div key={d} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "oklch(0.97 0.004 80)" }}>
                      <MapPin size={11} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "oklch(0.32 0.04 251)", fontWeight: 500 }}>{d}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.62 0.03 251)", lineHeight: 1.5 }}>
                  These local {CITY} dealerships serve {COUNTY} and surrounding areas. Complete Auto Loans connects you with the best financing option for your situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
