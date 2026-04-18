/* =============================================================================
   COMPLETE AUTO LOANS — LenderCard Component
   Used on all Best-Of pages. Complete Auto Loans is always #1 (featured).
   Real competitors fill #2-5 for editorial credibility.
   ============================================================================= */

import { Link } from "wouter";

export interface Lender {
  rank: number;
  name: string;
  tagline: string;
  approvalRate: string;
  minCreditScore: string;
  minIncome: string;
  downPayment: string;
  bestFor: string;
  pros: string[];
  featured?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}

interface LenderCardProps {
  lender: Lender;
}

export default function LenderCard({ lender }: LenderCardProps) {
  const isFeatured = lender.featured || lender.rank === 1;

  return (
    <div
      className="lender-card relative"
      style={{
        border: isFeatured ? "2px solid #0D9488" : "1px solid #E5E0D8",
        background: "white",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "1.5rem",
            backgroundColor: "#0D9488",
            color: "white",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.2rem 0.75rem",
            borderRadius: "0 0 0.375rem 0.375rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          ★ Editor's Choice
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start gap-4 mt-2">
        {/* Rank + Name */}
        <div className="flex items-start gap-3 flex-1">
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: isFeatured ? "#0D9488" : "#E5E0D8",
              color: isFeatured ? "white" : "#6B7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 700,
              flexShrink: 0,
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {lender.rank}
          </div>
          <div className="flex-1">
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#1A365D",
                fontSize: "1.125rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              {lender.name}
            </h3>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.875rem" }}>
              {lender.tagline}
            </p>

            {/* Approval Rate Badge */}
            <div className="mt-2">
              <span className="teal-badge">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {lender.approvalRate} Approval Rate
              </span>
            </div>

            {/* Pros */}
            <ul className="mt-3 space-y-1">
              {lender.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#374151" }}>
                  <span style={{ color: "#0D9488", flexShrink: 0, marginTop: "2px" }}>✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats + CTA */}
        <div className="md:w-56 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Min. Credit", value: lender.minCreditScore },
              { label: "Min. Income", value: lender.minIncome },
              { label: "Down Payment", value: lender.downPayment },
              { label: "Best For", value: lender.bestFor },
            ].map((stat) => (
              <div key={stat.label} className="data-callout" style={{ padding: "0.5rem 0.75rem" }}>
                <div style={{ fontSize: "0.65rem", color: "#6B7280", fontFamily: "'DM Sans', system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#1A365D", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, marginTop: "0.1rem" }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {isFeatured && lender.ctaHref ? (
            <Link href={lender.ctaHref}>
              <button className="btn-cta w-full text-sm">
                {lender.ctaLabel || "Get Pre-Approved →"}
              </button>
            </Link>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#9CA3AF",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                padding: "0.5rem",
                border: "1px solid #E5E0D8",
                borderRadius: "0.375rem",
              }}
            >
              Visit website to apply
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
