/**
 * BestOfPageTemplate — Complete Auto Loans
 * Design: Premium Editorial Finance
 * - Dark navy page header with breadcrumb
 * - Sticky sidebar with amber CTA card
 * - Ranked lender cards with Editor's Choice on #1
 * - Real Stories + FAQ sections
 */
import Layout from "./Layout";
import LenderCard, { Lender } from "./LenderCard";
import { Link } from "wouter";
import { ArrowRight, Shield, ChevronRight, CheckCircle2 } from "lucide-react";
import LoanCalculator from "./LoanCalculator";
import { useSEO } from "@/hooks/useSEO";
import {
  buildFinancialProductSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildAggregateRatingSchema,
  buildSpeakableSchema,
} from "@/lib/schema";

interface RealStory {
  name: string;
  city: string;
  creditScore: string;
  vehicle: string;
  downPayment: string;
  quote: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface BestOfPageProps {
  title: string;
  subtitle: string;
  intro: string;
  lenders: Lender[];
  realStories?: RealStory[];
  faqs?: FAQ[];
  relatedPages?: { label: string; href: string }[];
  updatedDate?: string;
  keyTakeaways?: string[];
  // SEO props
  seoTitle?: string;
  seoDescription?: string;
  canonicalPath?: string;
  ogImage?: string;
  /** Service slug for direct city+service links, e.g. "bad-credit-auto-loans" */
  cityServiceSlug?: string;
}

export default function BestOfPageTemplate({
  title,
  subtitle,
  intro,
  lenders,
  realStories = [],
  faqs = [],
  relatedPages = [],
  updatedDate = "April 2026",
  keyTakeaways = [],
  seoTitle,
  seoDescription,
  canonicalPath,
  ogImage,
  cityServiceSlug,
}: BestOfPageProps) {
  const schemas = [
    buildFinancialProductSchema({
      name: seoTitle ?? title,
      description: seoDescription ?? subtitle,
      url: canonicalPath ?? "/",
    }),
    buildAggregateRatingSchema({ itemName: seoTitle ?? title }),
    ...(faqs.length > 0 ? [buildFAQSchema(faqs)] : []),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: title, path: canonicalPath ?? "/" },
    ]),
    buildSpeakableSchema({
      url: canonicalPath ?? "/",
      cssSelectors: ["h1", ".page-summary", ".faq-answer", ".hero-description"],
    }),
  ];

  useSEO({
    title: seoTitle ?? `${title} | Complete Auto Loans`,
    description: seoDescription ?? subtitle,
    canonical: canonicalPath,
    ogImage,
    schema: schemas,
  });

  return (
    <Layout>
      {/* ── Dark Page Header ── */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
        {/* Teal radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.578 0.098 186 / 0.10), transparent)", pointerEvents: "none" }} />
        {/* Subtle grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div className="container py-12" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >Home</Link>
            <ChevronRight size={11} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
              style={{ background: "oklch(0.578 0.098 186 / 0.2)", color: "oklch(0.70 0.075 186)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Updated {updatedDate}
            </span>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Editorial Review
            </span>
          </div>

          <h1
            className="text-white mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "640px",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.6 }}>
            {subtitle}
          </p>

          {/* Author byline + advertiser disclosure */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: "oklch(0.578 0.098 186 / 0.35)", fontFamily: "'DM Sans', sans-serif" }}
              >
                JM
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.50)" }}>
                By <strong style={{ color: "rgba(255,255,255,0.75)" }}>James Mitchell</strong>, Auto Finance Editor
              </span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.30)" }}>
              <Shield size={10} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
              Advertiser Disclosure: Complete Auto Loans earns a referral fee when you apply through our links. This does not affect our editorial rankings.
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Intro + Key Takeaways */}
            <div
              className="p-5 rounded-2xl mb-8"
              style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}
            >
              <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                {intro}
              </p>
              {keyTakeaways.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                    Key Takeaways
                  </p>
                  <ul className="space-y-2">
                    {keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "oklch(0.28 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                        <ArrowRight size={13} className="mt-0.5 shrink-0" style={{ color: "oklch(0.578 0.098 186)" }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Lender Rankings */}
            <h2
              className="mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}
            >
              Our Top Picks for 2026
            </h2>

            <div className="flex flex-col gap-5 mb-8">
              {lenders.map((lender) => (
                <LenderCard key={lender.rank} lender={lender} />
              ))}
            </div>

            {/* Quick Comparison Table */}
            {lenders.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                  Quick Comparison
                </h2>
                <div className="overflow-x-auto rounded-2xl border" style={{ border: "1px solid oklch(0.90 0.006 80)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem" }}>
                    <thead>
                      <tr style={{ background: "oklch(0.311 0.065 251)", color: "white" }}>
                        {["Lender", "Best For", "Min. Credit", "Down Payment", "Approval Rate"].map((h) => (
                          <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, whiteSpace: "nowrap", fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lenders.map((l, i) => (
                        <tr
                          key={l.rank}
                          style={{
                            background: i % 2 === 0 ? "white" : "oklch(0.97 0.004 80)",
                            borderBottom: "1px solid oklch(0.92 0.005 80)",
                          }}
                        >
                          <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                            {l.rank === 1 && <span style={{ fontSize: "0.65rem", background: "oklch(0.578 0.098 186)", color: "white", borderRadius: "4px", padding: "1px 5px", marginRight: "6px", fontWeight: 700 }}>#1</span>}
                            {l.name}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", color: "oklch(0.40 0.04 251)" }}>{l.bestFor}</td>
                          <td style={{ padding: "0.75rem 1rem", color: "oklch(0.40 0.04 251)" }}>{l.minCreditScore}</td>
                          <td style={{ padding: "0.75rem 1rem", color: "oklch(0.40 0.04 251)" }}>{l.downPayment}</td>
                          <td style={{ padding: "0.75rem 1rem" }}>
                            <span style={{ background: "oklch(0.578 0.098 186 / 0.10)", color: "oklch(0.38 0.12 185)", borderRadius: "999px", padding: "2px 10px", fontWeight: 600, fontSize: "0.75rem" }}>
                              {l.approvalRate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── What to Expect Timeline ── */}
            <div className="mb-12">
              <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
              <h2 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                What to Expect After You Apply
              </h2>
              <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Most borrowers go from application to driving away in a single day. Here is what the process looks like.
              </p>
              <div className="relative">
                {/* Vertical connector line */}
                <div
                  className="absolute left-5 top-8 bottom-8 w-px hidden sm:block"
                  style={{ background: "linear-gradient(to bottom, oklch(0.578 0.098 186), oklch(0.578 0.098 186 / 0.15))" }}
                />
                <div className="flex flex-col gap-5">
                  {[
                    { step: "1", title: "Submit Your Application", time: "2 minutes", desc: "Fill out our secure 2-minute form. We ask for basic income and vehicle info — no SSN required at this stage. Soft credit check only." },
                    { step: "2", title: "Get Matched with Lenders", time: "Under 60 seconds", desc: "Our system matches your profile with lenders most likely to approve you. You receive real offers — not estimates — from lenders in our network." },
                    { step: "3", title: "Review & Accept an Offer", time: "Same day", desc: "Compare your offers side by side. When you accept, the lender runs a hard credit check (this is normal and expected at this stage)." },
                    { step: "4", title: "Sign & Pick Up Your Vehicle", time: "Same day or next day", desc: "Sign your loan documents — often electronically. Then visit the dealership, verify insurance, and drive away. Funding typically occurs within 24 hours." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 sm:gap-6 p-5 rounded-2xl" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ background: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif", zIndex: 1 }}
                      >
                        {item.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-bold text-sm" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{item.title}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "oklch(0.578 0.098 186 / 0.10)", color: "oklch(0.38 0.12 185)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Soft Pull vs Hard Pull Explainer ── */}
            <div className="mb-12">
              <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
              <h2 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                Soft Pull vs. Hard Pull: What's the Difference?
              </h2>
              <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Many borrowers worry that applying for a car loan will hurt their credit score. Here is exactly what happens — and when.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl" style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "oklch(0.578 0.098 186)" }} />
                    <p className="font-bold text-sm" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>Soft Credit Pull</p>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "oklch(0.578 0.098 186 / 0.12)", color: "oklch(0.38 0.12 185)", fontFamily: "'DM Sans', sans-serif" }}>Won't affect score</span>
                  </div>
                  <ul className="space-y-2">
                    {["Happens when you apply through Complete Auto Loans", "Lenders use it to pre-qualify you for offers", "Does not appear on your credit report", "Can be done unlimited times with no impact"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: "oklch(0.578 0.098 186)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "oklch(0.65 0.12 30)" }} />
                    <p className="font-bold text-sm" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>Hard Credit Pull</p>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "oklch(0.65 0.12 30 / 0.10)", color: "oklch(0.45 0.10 30)", fontFamily: "'DM Sans', sans-serif" }}>Minimal impact</span>
                  </div>
                  <ul className="space-y-2">
                    {["Only happens when you formally accept a loan offer", "Lender verifies your full credit report before funding", "Typically reduces your score by fewer than 5 points", "Multiple auto inquiries within 14 days count as one"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                        <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: "oklch(0.65 0.12 30)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl" style={{ background: "oklch(0.311 0.065 251 / 0.04)", border: "1px solid oklch(0.311 0.065 251 / 0.10)" }}>
                <p className="text-sm" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                  <strong>Bottom line:</strong> Applying through Complete Auto Loans is completely safe for your credit score. The soft pull we use to match you with lenders has zero impact. Only the final hard pull — which you authorize when accepting an offer — can affect your score, and that impact is minimal and temporary.
                </p>
              </div>
            </div>

            {/* ── Loan Calculator ── */}
            <div className="mb-12">
              <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
              <h2 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                Auto Loan Payment Calculator
              </h2>
              <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Estimate your monthly payment before you apply. Adjust the loan amount, interest rate, and term to see how each affects your payment.
              </p>
              <LoanCalculator />
            </div>

            {/* Real Stories */}
            {realStories.length > 0 && (
              <div className="mb-12">
                <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
                <h2 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                  Real Approvals from Real People
                </h2>
                <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Composite stories based on real approval scenarios we've tracked.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {realStories.map((story, i) => (
                    <div key={i} className="p-5 rounded-2xl border" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ background: "oklch(0.311 0.065 251)", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                            {story.name}, {story.city}
                          </p>
                          <p className="text-xs" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                            Score: {story.creditScore} · {story.vehicle}
                          </p>
                        </div>
                      </div>
                      <blockquote
                        className="text-sm leading-relaxed"
                        style={{
                          color: "oklch(0.38 0.04 251)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontStyle: "italic",
                          borderLeft: "3px solid oklch(0.578 0.098 186)",
                          paddingLeft: "0.75rem",
                        }}
                      >
                        "{story.quote}"
                      </blockquote>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ background: "oklch(0.578 0.098 186 / 0.1)", color: "oklch(0.42 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          ✓ Approved
                        </span>
                        <span className="text-xs" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                          {story.downPayment} down
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="mb-10">
                <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
                <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl border" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                      <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.311 0.065 251)" }}>
                        {faq.question}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Methodology & E-E-A-T Section ── */}
            <div className="mb-10">
              <div style={{ borderTop: "1px solid oklch(0.90 0.006 80)", marginBottom: "2rem" }} />
              <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, color: "oklch(0.18 0.04 251)" }}>
                Our Methodology
              </h2>
              <div className="p-5 rounded-2xl" style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Our editorial team evaluates every lender on this list using five weighted criteria: <strong>approval rate for subprime borrowers</strong> (30%), <strong>interest rate range</strong> (25%), <strong>minimum credit score requirement</strong> (20%), <strong>down payment flexibility</strong> (15%), and <strong>customer experience ratings</strong> (10%). We verify approval rate data directly with lenders quarterly and update rankings accordingly.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  According to Experian's 2025 State of the Automotive Finance Market report, the average interest rate for deep subprime borrowers (scores below 500) reached 21.38% for new vehicles and 22.16% for used vehicles. Our top-ranked lenders consistently offer rates below these averages for qualified applicants.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {[
                    { label: "Lenders Reviewed", value: "40+" },
                    { label: "Data Points Analyzed", value: "200+" },
                    { label: "Last Updated", value: updatedDate },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                      <p className="font-bold text-lg mb-0.5" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>{stat.value}</p>
                      <p className="text-xs" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Quote */}
              <blockquote
                className="mt-6 p-5 rounded-2xl"
                style={{ background: "oklch(0.311 0.065 251 / 0.04)", borderLeft: "4px solid oklch(0.578 0.098 186)", borderRadius: "0 1rem 1rem 0" }}
              >
                <p className="text-sm leading-relaxed mb-3" style={{ color: "oklch(0.30 0.04 251)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                  "The subprime auto market has become more competitive in 2026, which is actually good news for borrowers. Lenders are loosening approval criteria to capture market share, and borrowers with scores in the 450–550 range now have more options than at any point in the last decade."
                </p>
                <footer style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "oklch(0.50 0.04 251)" }}>
                  — <strong>James Mitchell</strong>, Auto Finance Editor, Complete Auto Loans
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-24 flex flex-col gap-5">
              {/* CTA Card */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "oklch(0.311 0.065 251)", boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.25)" }}>
                <div className="p-5">
                  <p className="font-bold text-base text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Ready to Get Approved?
                  </p>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                    Takes 2 minutes. No hard credit pull. Real offers from real lenders.
                  </p>
                  <Link href="/apply">
                    <button
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                      style={{
                        background: "oklch(0.76 0.16 75)",
                        color: "oklch(0.15 0.04 251)",
                        fontFamily: "'DM Sans', sans-serif",
                        boxShadow: "0 3px 14px oklch(0.76 0.16 75 / 0.4)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; }}
                    >
                      Check My Approval Odds
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                  <p className="text-center text-xs mt-2.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                    Soft credit check only. Won't affect your score.
                  </p>
                </div>
              </div>

              {/* Why Trust Us */}
              <div className="p-5 rounded-2xl border" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                  Why Trust Our Rankings?
                </p>
                <ul className="space-y-2.5">
                  {["Independent editorial team", "Updated monthly with live data", "No paid placements in rankings", "Real approval rate data verified"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: "oklch(0.578 0.098 186)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Guides */}
              {relatedPages.length > 0 && (
                <div className="p-5 rounded-2xl border" style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)" }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                    Related Guides
                  </p>
                  <ul className="space-y-2">
                    {relatedPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          className="flex items-center gap-2 text-sm font-medium transition-colors"
                          style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(0.578 0.098 186)"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(0.32 0.04 251)"}
                        >
                          <ChevronRight size={13} style={{ color: "oklch(0.65 0.085 186)" }} />
                          {page.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ── Find a Local Lender ── */}
      <div
        className="py-14"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700 }}
            >
              Find a Local Lender
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
              {cityServiceSlug
                ? "See lenders and local rates in your city"
                : "Find local lenders and dealerships in your city"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { city: "Phoenix, AZ", slug: "phoenix-az" },
              { city: "Dallas, TX", slug: "dallas-tx" },
              { city: "Fort Worth, TX", slug: "fort-worth-tx" },
              { city: "Chicago, IL", slug: "chicago-il" },
              { city: "Charlotte, NC", slug: "charlotte-nc" },
              { city: "Columbus, OH", slug: "columbus-oh" },
              { city: "San Antonio, TX", slug: "san-antonio-tx" },
              { city: "Detroit, MI", slug: "detroit-mi" },
              { city: "Tulsa, OK", slug: "tulsa-ok" },
              { city: "Colorado Springs, CO", slug: "colorado-springs-co" },
            ].map((item) => {
              const href = cityServiceSlug
                ? `/${item.slug}/${cityServiceSlug}/`
                : `/${item.slug}/`;
              return (
                <Link
                  key={item.slug}
                  href={href}
                  className="block rounded-xl p-4 text-center transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                >
                  {item.city}
                  {cityServiceSlug && (
                    <span
                      className="block mt-0.5"
                      style={{ fontSize: "0.68rem", color: "oklch(0.65 0.085 186)", fontWeight: 400 }}
                    >
                      Local rates →
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/locations/">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: "oklch(0.76 0.16 75)",
                  color: "oklch(0.15 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.4)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; }}
              >
                View All Locations
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
