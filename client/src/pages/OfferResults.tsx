/**
 * OfferResults — Complete Auto Loans
 * Shown after form submission. Polls for lender offers and displays ranked cards.
 * Design: Premium dark card layout matching site aesthetic.
 */
import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import {
  CheckCircle2,
  Star,
  Shield,
  ChevronRight,
  Phone,
  Clock,
  Award,
  TrendingDown,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ── Confidence badge config ───────────────────────────────────────────────────
const CONFIDENCE_CONFIG = {
  high: { label: "High Approval Odds", color: "oklch(0.578 0.098 186)", bg: "oklch(0.578 0.098 186 / 0.15)", icon: <Award size={12} /> },
  good: { label: "Good Approval Odds", color: "oklch(0.76 0.16 75)", bg: "oklch(0.76 0.16 75 / 0.15)", icon: <CheckCircle2 size={12} /> },
  fair: { label: "Fair Approval Odds", color: "oklch(0.65 0.12 50)", bg: "oklch(0.65 0.12 50 / 0.15)", icon: <TrendingDown size={12} /> },
};

// ── Loading animation ─────────────────────────────────────────────────────────
function LoadingState({ firstName }: { firstName?: string }) {
  const [lenderCount, setLenderCount] = useState(0);
  const [statusText, setStatusText] = useState("Connecting to lender network...");

  useEffect(() => {
    const messages = [
      "Connecting to lender network...",
      "Checking 47 lenders in our network...",
      "Matching your credit profile...",
      "Collecting best offers...",
      "Ranking results by approval odds...",
    ];
    let i = 0;
    const msgInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      setStatusText(messages[i]!);
    }, 1800);

    const countInterval = setInterval(() => {
      setLenderCount((c) => Math.min(c + Math.floor(Math.random() * 8 + 3), 47));
    }, 400);

    return () => { clearInterval(msgInterval); clearInterval(countInterval); };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.98 0.005 80)" }}>
      <div className="text-center max-w-md px-6">
        {/* Animated ring */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div
            className="w-24 h-24 rounded-full border-4 border-transparent animate-spin"
            style={{ borderTopColor: "oklch(0.578 0.098 186)", borderRightColor: "oklch(0.578 0.098 186 / 0.3)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
              {lenderCount}
            </span>
          </div>
        </div>

        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}
        >
          {firstName ? `Hang tight, ${firstName}!` : "Finding your best offers..."}
        </h2>
        <p className="text-sm mb-6" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
          {statusText}
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.90 0.005 80)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.round((lenderCount / 47) * 100)}%`,
              background: "linear-gradient(to right, oklch(0.578 0.098 186), oklch(0.76 0.16 75))",
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "oklch(0.65 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
          Soft credit check only — no impact to your score
        </p>
      </div>
    </div>
  );
}

// ── No match state ────────────────────────────────────────────────────────────
function NoMatchState() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.98 0.005 80)" }}>
      <div className="text-center max-w-lg px-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ background: "oklch(0.65 0.12 50 / 0.12)" }}
        >
          <AlertCircle size={28} style={{ color: "oklch(0.65 0.12 50)" }} />
        </div>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}
        >
          We're Still Working on Your Match
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
          Our automated system didn't find an instant match, but that doesn't mean you won't qualify. Our team reviews every application manually and will contact you within 24 hours with options.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:4257618500"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: "oklch(0.578 0.098 186)", color: "white", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Phone size={15} />
            Call Us: 425-761-8500
          </a>
          <Link href="/apply">
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
              style={{ background: "oklch(0.96 0.005 80)", color: "oklch(0.15 0.04 251)", border: "1px solid oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Offer card ────────────────────────────────────────────────────────────────
interface Offer {
  offerId: number;
  lenderName: string;
  lenderLogoUrl: string | null;
  aprMin: number;
  aprMax: number;
  estimatedMonthlyPayment: number;
  termMonths: number;
  approvalConfidence: "high" | "good" | "fair";
  isBestMatch: boolean;
}

function OfferCard({ offer, onSelect, selected }: { offer: Offer; onSelect: (id: number) => void; selected: boolean }) {
  const conf = CONFIDENCE_CONFIG[offer.approvalConfidence];

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: offer.isBestMatch ? "oklch(0.311 0.065 251)" : "white",
        border: offer.isBestMatch ? "2px solid oklch(0.578 0.098 186)" : "1px solid oklch(0.88 0.008 80)",
        boxShadow: offer.isBestMatch ? "0 12px 40px oklch(0.311 0.065 251 / 0.28)" : "0 4px 16px oklch(0.311 0.065 251 / 0.07)",
      }}
    >
      {/* Best Match ribbon */}
      {offer.isBestMatch && (
        <div
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider"
          style={{ background: "oklch(0.578 0.098 186)", color: "white", fontFamily: "'DM Sans', sans-serif" }}
        >
          <Star size={11} fill="currentColor" />
          Best Match — Highest Approval Odds
        </div>
      )}

      <div className="p-6">
        {/* Header: lender name + confidence badge */}
        <div className="flex items-start justify-between mb-5">
          <div>
            {offer.lenderLogoUrl ? (
              <img src={offer.lenderLogoUrl} alt={offer.lenderName} className="h-8 object-contain mb-1" />
            ) : (
              <div
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-bold mb-1"
                style={{
                  background: offer.isBestMatch ? "oklch(0.24 0.05 251)" : "oklch(0.96 0.005 80)",
                  color: offer.isBestMatch ? "white" : "oklch(0.18 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {offer.lenderName}
              </div>
            )}
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: conf.bg, color: conf.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            {conf.icon}
            {conf.label}
          </span>
        </div>

        {/* Key numbers */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <p className="text-xs mb-1" style={{ color: offer.isBestMatch ? "rgba(255,255,255,0.55)" : "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              Est. APR Range
            </p>
            <p className="text-xl font-bold" style={{ color: offer.isBestMatch ? "white" : "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              {offer.aprMin}%–{offer.aprMax}%
            </p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: offer.isBestMatch ? "rgba(255,255,255,0.55)" : "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              Est. Monthly
            </p>
            <p className="text-xl font-bold" style={{ color: offer.isBestMatch ? "oklch(0.76 0.16 75)" : "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
              ${offer.estimatedMonthlyPayment.toFixed(0)}/mo
            </p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: offer.isBestMatch ? "rgba(255,255,255,0.55)" : "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              Term
            </p>
            <p className="text-xl font-bold" style={{ color: offer.isBestMatch ? "white" : "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              {offer.termMonths} mo
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs mb-5" style={{ color: offer.isBestMatch ? "rgba(255,255,255,0.40)" : "oklch(0.62 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
          Estimated rates based on your credit profile. Final rate determined by lender after full review.
        </p>

        {/* CTA */}
        <button
          onClick={() => onSelect(offer.offerId)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
          style={{
            background: selected
              ? "oklch(0.578 0.098 186)"
              : offer.isBestMatch
              ? "oklch(0.76 0.16 75)"
              : "oklch(0.311 0.065 251)",
            color: offer.isBestMatch ? "oklch(0.12 0.04 251)" : "white",
            fontFamily: "'DM Sans', sans-serif",
            opacity: selected ? 0.85 : 1,
          }}
        >
          {selected ? (
            <>
              <CheckCircle2 size={15} />
              Offer Selected — Lender Will Contact You
            </>
          ) : (
            <>
              Select This Offer
              <ChevronRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OfferResults() {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [, navigate] = useLocation();
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const selectOffer = trpc.leads.selectOffer.useMutation();

  // Poll for offers every 2 seconds until status is matched/no_match (max 15 polls = 30s)
  const { data, isLoading } = trpc.leads.getOffers.useQuery(
    { token: token ?? "" },
    {
      enabled: !!token,
      refetchInterval: (query) => {
        const status = query.state.data?.status;
        if (status === "matched" || status === "no_match" || pollCount >= 15) return false;
        return 2000;
      },
      refetchIntervalInBackground: true,
    }
  );

  useEffect(() => {
    if (data) setPollCount((c) => c + 1);
  }, [data]);

  useEffect(() => {
    if (!token) navigate("/apply");
  }, [token]);

  const handleSelect = async (offerId: number) => {
    setSelectedOfferId(offerId);
    await selectOffer.mutateAsync({ offerId });
  };

  // Still loading initial data
  if (isLoading || !data) {
    return <LoadingState />;
  }

  // Polling — status is submitted/partial and we haven't timed out
  const isPolling = (data.status === "submitted" || data.status === "partial") && pollCount < 15;
  if (isPolling) {
    return <LoadingState firstName={data.leadInfo?.firstName ?? undefined} />;
  }

  // No match
  if (data.status === "no_match" || data.offers.length === 0) {
    return <NoMatchState />;
  }

  const firstName = data.leadInfo?.firstName ?? "";

  return (
    <Layout>
      {/* Header */}
      <section
        className="py-16"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="container text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "oklch(0.578 0.098 186 / 0.18)", border: "1px solid oklch(0.65 0.085 186 / 0.35)", color: "oklch(0.78 0.065 186)", fontFamily: "'DM Sans', sans-serif" }}
          >
            <CheckCircle2 size={10} />
            Application Received
          </div>
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            {firstName ? `Great news, ${firstName}!` : "Great news!"}
            <br />
            <span style={{ color: "oklch(0.76 0.16 75)" }}>
              {data.offers.length} Lender{data.offers.length !== 1 ? "s" : ""} Want to Work With You
            </span>
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'DM Sans', sans-serif" }}>
            Select an offer below. The lender will contact you directly to finalize your loan.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { icon: <Shield size={13} />, text: "Soft pull only — score unaffected" },
              { icon: <Clock size={13} />, text: "Lender contacts you within 24 hrs" },
              { icon: <CheckCircle2 size={13} />, text: "No obligation to accept" },
            ].map((t) => (
              <span key={t.text} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: "oklch(0.65 0.085 186)" }}>{t.icon}</span>
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Offer cards */}
      <section className="py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Why these offers explainer */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-8"
              style={{ background: "oklch(0.578 0.098 186 / 0.08)", border: "1px solid oklch(0.578 0.098 186 / 0.20)" }}
            >
              <Shield size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.578 0.098 186)" }} />
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                <strong>Why these offers?</strong> These lenders were selected based on your credit profile, income, and vehicle type. Rates shown are estimates — your final rate is determined by the lender after reviewing your full application. No hard credit pull has been performed.
              </p>
            </div>

            {/* Offer cards */}
            <div className="flex flex-col gap-5">
              {data.offers.map((offer) => (
                <OfferCard
                  key={offer.offerId}
                  offer={offer}
                  onSelect={handleSelect}
                  selected={selectedOfferId === offer.offerId}
                />
              ))}
            </div>

            {/* Post-selection message */}
            {selectedOfferId && (
              <div
                className="mt-8 p-5 rounded-2xl text-center"
                style={{ background: "oklch(0.578 0.098 186 / 0.08)", border: "1px solid oklch(0.578 0.098 186 / 0.25)" }}
              >
                <CheckCircle2 size={28} className="mx-auto mb-3" style={{ color: "oklch(0.578 0.098 186)" }} />
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                  Offer Selected — You're All Set
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  The lender will reach out to you directly within 24 hours to finalize your loan. Have your driver's license, proof of income, and insurance information ready.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:4257618500"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                    style={{ background: "oklch(0.578 0.098 186)", color: "white", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Phone size={14} />
                    Questions? Call 425-761-8500
                  </a>
                  <Link href="/">
                    <button
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                      style={{ background: "oklch(0.96 0.005 80)", color: "oklch(0.15 0.04 251)", border: "1px solid oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Back to Home
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
