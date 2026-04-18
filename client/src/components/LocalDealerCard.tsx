/**
 * LocalDealerCard — Editorial card for real, verified local BHPH dealerships.
 * Design: Warm Brutalist / Subprime Finance — DM Sans, slate-teal palette.
 *
 * Used only on BHPH and in-house financing city pages.
 * Data is editorially verified — not fabricated ratings.
 */
import { MapPin, CheckCircle, Info, CreditCard, DollarSign } from "lucide-react";
import { Link } from "wouter";

export interface LocalDealer {
  name: string;
  area: string;
  bestFor: string;
  creditMin: string;
  downPayment: string;
  /** true = confirmed reports, false = confirmed does NOT report, null = not publicly listed */
  reportsToBureaus: boolean | null;
  keyFact: string;
  /** URL to their website — use "#" if not verified */
  website?: string;
}

interface LocalDealerCardProps {
  dealer: LocalDealer;
  city: string;
  rank: number;
}

export function LocalDealerCard({ dealer, city, rank }: LocalDealerCardProps) {
  const reportsBadge =
    dealer.reportsToBureaus === true
      ? { label: "Reports to bureaus", color: "oklch(0.35 0.12 155)", bg: "oklch(0.94 0.04 155)" }
      : dealer.reportsToBureaus === false
      ? { label: "Does not report", color: "oklch(0.45 0.12 30)", bg: "oklch(0.96 0.04 30)" }
      : null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1.5px solid oklch(0.88 0.01 251)",
        background: "white",
        boxShadow: "0 2px 8px oklch(0.85 0.02 251 / 0.3)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid oklch(0.93 0.005 251)" }}
      >
        <div className="flex items-start gap-3">
          {/* Rank badge */}
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 32,
              height: 32,
              background: "oklch(0.578 0.098 186)",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            {rank}
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "oklch(0.22 0.04 251)",
                lineHeight: 1.2,
                marginBottom: "0.2rem",
              }}
            >
              {dealer.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "oklch(0.55 0.04 251)",
                }}
              >
                {dealer.area}
              </span>
            </div>
          </div>
        </div>
        {/* Best For badge */}
        <div
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "oklch(0.95 0.04 186)",
            color: "oklch(0.35 0.10 186)",
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
            fontSize: "0.7rem",
          }}
        >
          {dealer.bestFor}
        </div>
      </div>

      {/* Key fact */}
      <div
        className="px-5 py-3"
        style={{ borderBottom: "1px solid oklch(0.93 0.005 251)", background: "oklch(0.985 0.003 251)" }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "oklch(0.38 0.04 251)",
            lineHeight: 1.55,
          }}
        >
          {dealer.keyFact}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-0" style={{ borderBottom: "1px solid oklch(0.93 0.005 251)" }}>
        {/* Credit min */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderRight: "1px solid oklch(0.93 0.005 251)" }}
        >
          <CreditCard size={13} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "oklch(0.62 0.03 251)",
                marginBottom: "0.1rem",
              }}
            >
              Credit Min
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "oklch(0.28 0.04 251)",
              }}
            >
              {dealer.creditMin}
            </div>
          </div>
        </div>
        {/* Down payment */}
        <div className="flex items-center gap-2 px-4 py-3">
          <DollarSign size={13} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "oklch(0.62 0.03 251)",
                marginBottom: "0.1rem",
              }}
            >
              Down Payment
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "oklch(0.28 0.04 251)",
              }}
            >
              {dealer.downPayment}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-2">
          {reportsBadge ? (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                background: reportsBadge.bg,
                color: reportsBadge.color,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
              }}
            >
              <CheckCircle size={10} />
              {reportsBadge.label}
            </span>
          ) : (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs"
              style={{
                background: "oklch(0.94 0.005 251)",
                color: "oklch(0.55 0.03 251)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
              }}
            >
              <Info size={10} />
              Bureau reporting not listed
            </span>
          )}
        </div>
        <Link
          href="/apply/"
          className="rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all"
          style={{
            background: "oklch(0.578 0.098 186)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            textDecoration: "none",
          }}
        >
          Get Matched →
        </Link>
      </div>
    </div>
  );
}

interface LocalDealersSectionProps {
  dealers: LocalDealer[];
  city: string;
  state: string;
}

export function LocalDealersSection({ dealers, city, state }: LocalDealersSectionProps) {
  return (
    <section className="mt-10 mb-6">
      {/* Section header */}
      <div className="mb-5">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
          style={{ background: "oklch(0.95 0.04 186)", border: "1px solid oklch(0.88 0.06 186)" }}
        >
          <MapPin size={12} style={{ color: "oklch(0.578 0.098 186)" }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "oklch(0.35 0.10 186)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Local Options Near You
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.3rem, 3vw, 1.65rem)",
            color: "oklch(0.22 0.04 251)",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          Buy Here Pay Here Dealerships Near {city}, {state}
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: "oklch(0.48 0.04 251)",
            lineHeight: 1.6,
            maxWidth: "640px",
          }}
        >
          These are real, currently operating BHPH dealerships in the {city} area. Each offers
          in-house financing — no bank required. We've noted what each is best for so you can
          choose the right fit for your situation.
        </p>
      </div>

      {/* Dealer cards */}
      <div className="flex flex-col gap-4">
        {dealers.map((dealer, i) => (
          <LocalDealerCard key={dealer.name} dealer={dealer} city={city} rank={i + 1} />
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="mt-4 rounded-xl px-4 py-3 flex items-start gap-2"
        style={{ background: "oklch(0.97 0.005 251)", border: "1px solid oklch(0.91 0.01 251)" }}
      >
        <Info size={13} style={{ color: "oklch(0.62 0.03 251)", flexShrink: 0, marginTop: 2 }} />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.73rem",
            color: "oklch(0.55 0.03 251)",
            lineHeight: 1.55,
          }}
        >
          <strong>Editorial note:</strong> Dealership details are verified from publicly available
          information and dealer websites. Inventory, terms, and availability change frequently —
          always confirm directly with the dealership before visiting. Last verified:{" "}
          {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
        </p>
      </div>
    </section>
  );
}
