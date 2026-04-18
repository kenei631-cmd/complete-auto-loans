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
import { useSEO } from "@/hooks/useSEO";
import {
  buildFinancialProductSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
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
}: BestOfPageProps) {
  const schemas = [
    buildFinancialProductSchema({
      name: seoTitle ?? title,
      description: seoDescription ?? subtitle,
      url: canonicalPath ?? "/",
    }),
    ...(faqs.length > 0 ? [buildFAQSchema(faqs)] : []),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: title, path: canonicalPath ?? "/" },
    ]),
  ];

  useSEO({
    title: seoTitle ?? `${title} | Complete Auto Loans`,
    description: seoDescription ?? subtitle,
    canonical: canonicalPath,
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

            <div className="flex flex-col gap-5 mb-12">
              {lenders.map((lender) => (
                <LenderCard key={lender.rank} lender={lender} />
              ))}
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
    </Layout>
  );
}
