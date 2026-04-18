/**
 * CreditScoreWidget — Interactive credit score slider that routes users
 * to the most relevant Best-Of page based on their credit score range.
 *
 * Design: Editorial Finance — navy/teal/amber palette, DM Sans + Playfair Display
 * ICP: Anxious subprime borrowers (300–600) who need reassurance before clicking
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, AlertCircle, Shield } from "lucide-react";

interface ScoreTier {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  trackColor: string;
  recommendation: string;
  recommendationDesc: string;
  href: string;
  ctaLabel: string;
  icon: "check" | "alert";
}

const SCORE_TIERS: ScoreTier[] = [
  {
    min: 300,
    max: 499,
    label: "Deep Subprime",
    description: "Scores 300–499 — You've likely been turned down before. We specialize in exactly this range.",
    color: "oklch(0.62 0.18 25)",
    bgColor: "oklch(0.62 0.18 25 / 0.08)",
    trackColor: "oklch(0.62 0.18 25)",
    recommendation: "Buy Here Pay Here or Guaranteed Approval",
    recommendationDesc: "These programs approve based on income and down payment — not your credit score. $500–$1,000 down gets you approved today.",
    href: "/best-guaranteed-approval-auto-loans",
    ctaLabel: "See Guaranteed Approval Options",
    icon: "alert",
  },
  {
    min: 500,
    max: 549,
    label: "Subprime",
    description: "Scores 500–549 — More options than you think. Several lenders in our network specialize here.",
    color: "oklch(0.68 0.16 50)",
    bgColor: "oklch(0.68 0.16 50 / 0.08)",
    trackColor: "oklch(0.68 0.16 50)",
    recommendation: "Bad Credit Auto Loans",
    recommendationDesc: "At 500–549, you qualify for multiple lenders in our network. Expect APRs of 12–24% and $500+ down. Getting pre-approved takes 2 minutes.",
    href: "/best-bad-credit-auto-loans",
    ctaLabel: "See Bad Credit Loan Options",
    icon: "alert",
  },
  {
    min: 550,
    max: 599,
    label: "Near Subprime",
    description: "Scores 550–599 — You're in a strong position for subprime financing with competitive rates.",
    color: "oklch(0.72 0.14 80)",
    bgColor: "oklch(0.72 0.14 80 / 0.08)",
    trackColor: "oklch(0.72 0.14 80)",
    recommendation: "Pre-Approved Bad Credit Loans",
    recommendationDesc: "At 550–599, you can get pre-approved before you shop. This gives you negotiating power at the dealership and access to better rates.",
    href: "/best-pre-approved-car-loans-bad-credit",
    ctaLabel: "Get Pre-Approved Now",
    icon: "check",
  },
  {
    min: 600,
    max: 649,
    label: "Fair Credit",
    description: "Scores 600–649 — You qualify for a wide range of lenders, including some near-prime options.",
    color: "oklch(0.578 0.098 186)",
    bgColor: "oklch(0.578 0.098 186 / 0.08)",
    trackColor: "oklch(0.578 0.098 186)",
    recommendation: "Pre-Approved Auto Loans",
    recommendationDesc: "With a 600+ score, you're in a great position. Pre-approval gives you the best rates available and lets you shop like a cash buyer.",
    href: "/best-pre-approved-car-loans-bad-credit",
    ctaLabel: "Get Pre-Approved Now",
    icon: "check",
  },
  {
    min: 650,
    max: 850,
    label: "Good / Excellent",
    description: "Scores 650+ — You qualify for the best rates. Refinancing your current loan could save you thousands.",
    color: "oklch(0.52 0.12 155)",
    bgColor: "oklch(0.52 0.12 155 / 0.08)",
    trackColor: "oklch(0.52 0.12 155)",
    recommendation: "Auto Refinance",
    recommendationDesc: "If you have an existing high-rate loan from when your credit was lower, refinancing now could cut your monthly payment significantly.",
    href: "/best-auto-refinance-bad-credit",
    ctaLabel: "See Refinance Options",
    icon: "check",
  },
];

const NO_CREDIT_OPTION = {
  label: "No Credit / First Time",
  description: "Never had credit before? That's actually easier to work with than bad credit.",
  color: "oklch(0.311 0.065 251)",
  bgColor: "oklch(0.311 0.065 251 / 0.08)",
  recommendation: "First-Time Buyer & No Credit Check Loans",
  recommendationDesc: "No credit history means no negative marks. First-time buyer programs and no credit check loans are specifically designed for you.",
  href: "/best-first-time-car-buyer-loans-no-credit",
  ctaLabel: "See First-Time Buyer Options",
  icon: "check" as const,
};

function getScoreTier(score: number): ScoreTier {
  return SCORE_TIERS.find((t) => score >= t.min && score <= t.max) || SCORE_TIERS[0];
}

export default function CreditScoreWidget() {
  const [score, setScore] = useState(520);
  const [noCredit, setNoCredit] = useState(false);
  const [, navigate] = useLocation();

  const tier = getScoreTier(score);
  const activeTier = noCredit ? null : tier;
  const activeColor = noCredit ? NO_CREDIT_OPTION.color : tier.color;
  const activeBg = noCredit ? NO_CREDIT_OPTION.bgColor : tier.bgColor;

  const scorePercent = ((score - 300) / (850 - 300)) * 100;

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "white",
        border: "1.5px solid oklch(0.90 0.005 80)",
        boxShadow: "0 8px 40px oklch(0.311 0.065 251 / 0.08)",
      }}
    >
      {/* Widget Header */}
      <div
        className="px-6 pt-6 pb-5"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield size={13} style={{ color: "oklch(0.578 0.098 186)" }} />
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
            Find Your Best Option
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "white",
            fontSize: "1.25rem",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          What's your credit score?
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.82rem",
            marginTop: "0.35rem",
          }}
        >
          Move the slider — we'll show your best loan options instantly.
        </p>
      </div>

      {/* Slider Area */}
      <div className="px-6 py-5" style={{ background: "oklch(0.98 0.003 80)" }}>
        {/* No Credit Toggle */}
        <button
          onClick={() => setNoCredit(!noCredit)}
          className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg transition-all w-full text-left"
          style={{
            background: noCredit ? activeBg : "transparent",
            border: `1.5px solid ${noCredit ? NO_CREDIT_OPTION.color : "oklch(0.88 0.005 80)"}`,
          }}
        >
          <div
            className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0"
            style={{
              background: noCredit ? NO_CREDIT_OPTION.color : "white",
              border: `1.5px solid ${noCredit ? NO_CREDIT_OPTION.color : "oklch(0.80 0.005 80)"}`,
            }}
          >
            {noCredit && <CheckCircle2 size={10} color="white" />}
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: noCredit ? NO_CREDIT_OPTION.color : "oklch(0.45 0.04 251)",
            }}
          >
            I have no credit history (first time)
          </span>
        </button>

        {/* Score Display */}
        {!noCredit && (
          <>
            <div className="flex items-end justify-between mb-3">
              <div>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: activeColor,
                    lineHeight: 1,
                  }}
                >
                  {score}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "oklch(0.55 0.03 251)",
                    marginLeft: "0.4rem",
                  }}
                >
                  / 850
                </span>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: activeBg,
                  color: activeColor,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {tier.label}
              </span>
            </div>

            {/* Custom Slider */}
            <div className="relative mb-2">
              {/* Track background */}
              <div
                className="w-full h-2 rounded-full"
                style={{ background: "oklch(0.90 0.005 80)" }}
              />
              {/* Filled track */}
              <div
                className="absolute top-0 left-0 h-2 rounded-full transition-all duration-150"
                style={{
                  width: `${scorePercent}%`,
                  background: `linear-gradient(to right, oklch(0.62 0.18 25), ${activeColor})`,
                }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-150"
                style={{
                  left: `calc(${scorePercent}% - 10px)`,
                  background: activeColor,
                  boxShadow: `0 2px 8px ${activeColor}60`,
                }}
              />
              <input
                type="range"
                min={300}
                max={850}
                step={10}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ margin: 0 }}
              />
            </div>

            {/* Score range labels */}
            <div className="flex justify-between">
              {["300", "400", "500", "600", "700", "850"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    color: "oklch(0.65 0.03 251)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Recommendation Panel */}
      <div className="px-6 pb-6">
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: noCredit ? NO_CREDIT_OPTION.bgColor : activeBg,
            border: `1.5px solid ${noCredit ? NO_CREDIT_OPTION.color : activeColor}30`,
          }}
        >
          <div className="flex items-start gap-2.5">
            {(noCredit ? NO_CREDIT_OPTION.icon : tier.icon) === "check" ? (
              <CheckCircle2
                size={14}
                style={{ color: activeColor, flexShrink: 0, marginTop: "2px" }}
              />
            ) : (
              <AlertCircle
                size={14}
                style={{ color: activeColor, flexShrink: 0, marginTop: "2px" }}
              />
            )}
            <div>
              <p
                className="font-bold text-sm mb-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeColor,
                }}
              >
                {noCredit
                  ? NO_CREDIT_OPTION.recommendation
                  : tier.recommendation}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.35 0.04 251)",
                }}
              >
                {noCredit
                  ? NO_CREDIT_OPTION.recommendationDesc
                  : tier.recommendationDesc}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            navigate(noCredit ? NO_CREDIT_OPTION.href : tier.href)
          }
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
          style={{
            background: "oklch(0.76 0.16 75)",
            color: "oklch(0.12 0.04 251)",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.40)",
          }}
        >
          {noCredit ? NO_CREDIT_OPTION.ctaLabel : tier.ctaLabel}
          <ArrowRight size={14} />
        </button>

        <p
          className="text-center mt-3 text-xs"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "oklch(0.62 0.03 251)",
          }}
        >
          <Shield
            size={9}
            style={{ display: "inline", marginRight: "4px", color: "oklch(0.578 0.098 186)" }}
          />
          Soft credit check only — won't affect your score
        </p>
      </div>
    </div>
  );
}
