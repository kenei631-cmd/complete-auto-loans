/* =============================================================================
   COMPLETE AUTO LOANS — BestOfPageTemplate
   Shared template for all 15 national Best-Of pages.
   Editorial layout with asymmetric sidebar, lender cards, FAQs, Real Stories.
   ============================================================================= */

import Layout from "./Layout";
import LenderCard, { Lender } from "./LenderCard";
import { Link } from "wouter";

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
}: BestOfPageProps) {
  return (
    <Layout>
      {/* Page Header */}
      <div style={{ backgroundColor: "#F8F7F4", borderBottom: "1px solid #E5E0D8" }}>
        <div className="container mx-auto px-4 max-w-6xl py-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="teal-badge">Updated {updatedDate}</span>
            <span style={{ color: "#9CA3AF", fontSize: "0.75rem", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              Editorial Review
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#1A365D",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "700px",
              marginBottom: "0.75rem",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "#4B5563",
              fontSize: "1.1rem",
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Main Content */}
          <div className="flex-1 min-w-0">
            {/* Intro */}
            <div
              className="data-callout mb-8"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#374151", fontSize: "0.95rem", lineHeight: 1.7 }}
            >
              {intro}
            </div>

            {/* Key Takeaways */}
            {keyTakeaways.length > 0 && (
              <div className="mb-8 p-5 rounded-lg" style={{ backgroundColor: "#F0FDF9", border: "1px solid #CCFBF1" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A365D", fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#374151" }}>
                      <span style={{ color: "#0D9488", flexShrink: 0 }}>→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lender Rankings */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#1A365D",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Our Top Picks for {new Date().getFullYear()}
            </h2>

            <div className="space-y-4 mb-10">
              {lenders.map((lender) => (
                <LenderCard key={lender.rank} lender={lender} />
              ))}
            </div>

            <hr className="section-rule my-10" />

            {/* Real Stories */}
            {realStories.length > 0 && (
              <div className="mb-10">
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  Real Approvals from Real People
                </h2>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                  These are composite stories based on real approval scenarios we've tracked.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {realStories.map((story, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-lg"
                      style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            backgroundColor: "#0D9488",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1rem",
                            fontWeight: 700,
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            flexShrink: 0,
                          }}
                        >
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, color: "#1A365D", fontSize: "0.9rem" }}>
                            {story.name}, {story.city}
                          </div>
                          <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem" }}>
                            Credit Score: {story.creditScore} · {story.vehicle}
                          </div>
                        </div>
                      </div>
                      <blockquote
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          color: "#374151",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          borderLeft: "3px solid #0D9488",
                          paddingLeft: "0.75rem",
                          fontStyle: "italic",
                        }}
                      >
                        "{story.quote}"
                      </blockquote>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <span className="teal-badge">✓ Approved</span>
                        <span style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", alignItems: "center" }}>
                          {story.downPayment} down
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr className="section-rule my-10" />

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="mb-10">
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-lg" style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}>
                      <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, color: "#1A365D", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                        {faq.question}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.7 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Quick Apply CTA */}
              <div
                className="p-5 rounded-lg text-center"
                style={{ backgroundColor: "#1A365D", color: "white" }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "white",
                  }}
                >
                  Ready to Get Approved?
                </h3>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: "1rem", lineHeight: 1.5 }}>
                  Takes 2 minutes. No hard credit pull. Real offers from real lenders.
                </p>
                <Link href="/apply">
                  <button className="btn-cta w-full text-sm">
                    Check My Approval Odds →
                  </button>
                </Link>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>
                  Soft credit check only. Won't affect your score.
                </p>
              </div>

              {/* Trust Signals */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}>
                <h4 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, color: "#1A365D", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  Why Trust Our Rankings?
                </h4>
                {[
                  "Independent editorial team",
                  "Updated monthly with live data",
                  "No paid placements in rankings",
                  "Real approval rate data verified",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span style={{ color: "#0D9488", fontSize: "0.8rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#4B5563" }}>{point}</span>
                  </div>
                ))}
              </div>

              {/* Related Pages */}
              {relatedPages.length > 0 && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}>
                  <h4 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, color: "#1A365D", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                    Related Guides
                  </h4>
                  <ul className="space-y-2">
                    {relatedPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: "#0D9488", textDecoration: "none" }}
                          className="hover:underline"
                        >
                          → {page.label}
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
