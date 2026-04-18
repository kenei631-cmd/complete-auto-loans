/**
 * LenderCard — Complete Auto Loans
 * Design: Premium Editorial Finance — Bold, magazine-quality lender comparison cards
 * - Editor's Choice: full dark navy header with gold star + teal accent bar
 * - Stats displayed as large, bold figures
 * - Amber CTA with glow for #1 pick only
 */
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, ExternalLink, Star, TrendingUp } from "lucide-react";

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

export default function LenderCard({ lender }: { lender: Lender }) {
  const isFeatured = lender.featured || lender.rank === 1;

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "white",
        border: isFeatured ? "2px solid oklch(0.58 0.13 185)" : "1px solid oklch(0.88 0.007 80)",
        boxShadow: isFeatured
          ? "0 12px 40px oklch(0.58 0.13 185 / 0.15), 0 2px 8px oklch(0.18 0.06 240 / 0.06)"
          : "0 2px 12px oklch(0.18 0.06 240 / 0.06)",
      }}
      onMouseEnter={(e) => {
        if (!isFeatured) {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px oklch(0.18 0.06 240 / 0.12)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.68 0.12 185 / 0.5)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isFeatured) {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px oklch(0.18 0.06 240 / 0.06)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.007 80)";
        }
      }}
    >
      {/* Editor's Choice Banner */}
      {isFeatured ? (
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "oklch(0.18 0.06 240)" }}
        >
          <div className="flex items-center gap-2.5">
            <Star size={13} fill="oklch(0.76 0.16 75)" style={{ color: "oklch(0.76 0.16 75)" }} />
            <span className="text-xs font-bold text-white uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Editor's Choice — #1 Rated for 2026
            </span>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "oklch(0.58 0.13 185 / 0.25)", color: "oklch(0.75 0.09 185)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Best Overall
          </span>
        </div>
      ) : (
        <div
          className="flex items-center gap-3 px-5 py-2.5"
          style={{ background: "oklch(0.97 0.004 80)", borderBottom: "1px solid oklch(0.91 0.006 80)" }}
        >
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
            style={{ background: "oklch(0.88 0.008 80)", color: "oklch(0.40 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {lender.rank}
          </div>
          <span className="text-xs font-semibold" style={{ color: "oklch(0.45 0.015 240)", fontFamily: "'DM Sans', sans-serif" }}>
            #{lender.rank} Ranked
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Name + Tagline + Pros */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              {isFeatured && (
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{ background: "oklch(0.58 0.13 185)", boxShadow: "0 4px 14px oklch(0.58 0.13 185 / 0.35)" }}
                >
                  <TrendingUp size={18} style={{ color: "white" }} />
                </div>
              )}
              <div>
                <h3
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isFeatured ? "1.3rem" : "1.1rem",
                    color: "oklch(0.12 0.02 240)",
                  }}
                >
                  {lender.name}
                </h3>
                <p className="text-sm mt-0.5" style={{ color: "oklch(0.52 0.015 240)", fontFamily: "'DM Sans', sans-serif" }}>
                  {lender.tagline}
                </p>
              </div>
            </div>

            {/* Approval Rate badge */}
            <span
              className="inline-flex items-center gap-1.5 mb-4 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: isFeatured ? "oklch(0.58 0.13 185 / 0.12)" : "oklch(0.96 0.005 80)",
                color: isFeatured ? "oklch(0.38 0.12 185)" : "oklch(0.42 0.015 240)",
                border: isFeatured ? "1px solid oklch(0.58 0.13 185 / 0.25)" : "1px solid oklch(0.88 0.007 80)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <CheckCircle2 size={11} />
              {lender.approvalRate} Approval Rate
            </span>

            {/* Pros */}
            <ul className="space-y-2">
              {lender.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "oklch(0.32 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: isFeatured ? "oklch(0.58 0.13 185)" : "oklch(0.65 0.10 185)" }} />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col gap-3 sm:w-52 shrink-0">
            {/* Stats grid */}
            <div
              className="grid grid-cols-2 gap-px rounded-xl overflow-hidden"
              style={{ background: "oklch(0.88 0.007 80)" }}
            >
              {[
                { label: "Min. Credit", value: lender.minCreditScore },
                { label: "Min. Income", value: lender.minIncome },
                { label: "Down Payment", value: lender.downPayment },
                { label: "Best For", value: lender.bestFor },
              ].map((s) => (
                <div key={s.label} className="p-3" style={{ background: isFeatured ? "oklch(0.97 0.005 185)" : "oklch(0.97 0.004 80)" }}>
                  <p className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: "oklch(0.62 0.015 240)", fontFamily: "'DM Sans', sans-serif" }}>
                    {s.label}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "oklch(0.18 0.04 240)", fontFamily: "'DM Sans', sans-serif" }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            {isFeatured ? (
              <Link href={lender.ctaHref || "/apply"}>
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: "oklch(0.76 0.16 75)",
                    color: "oklch(0.10 0.02 240)",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 18px oklch(0.76 0.16 75 / 0.45)",
                    fontSize: "0.9375rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px oklch(0.76 0.16 75 / 0.55)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px oklch(0.76 0.16 75 / 0.45)";
                  }}
                >
                  {lender.ctaLabel || "Get Pre-Approved"}
                  <ArrowRight size={15} />
                </button>
              </Link>
            ) : (
              <button
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all"
                style={{
                  background: "transparent",
                  color: "oklch(0.48 0.015 240)",
                  border: "1px solid oklch(0.86 0.007 80)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.58 0.13 185)";
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.42 0.12 185)";
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.58 0.13 185 / 0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.86 0.007 80)";
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.48 0.015 240)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <ExternalLink size={13} />
                Visit website to apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
