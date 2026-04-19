import { Link } from "wouter";
import { Shield, CheckCircle2, RefreshCw, Users, BookOpen, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

const SITE_URL = "https://completeautoloans.com";

const dataSources = [
  {
    name: "Consumer Financial Protection Bureau (CFPB)",
    url: "https://www.consumerfinance.gov/",
    desc: "Federal agency data on auto loan complaint trends, lending practices, and consumer rights under the Truth in Lending Act (TILA).",
  },
  {
    name: "Experian Automotive",
    url: "https://www.experian.com/automotive/",
    desc: "Quarterly State of the Automotive Finance Market reports — the primary source for average APR by credit tier, loan term data, and subprime market share statistics.",
  },
  {
    name: "Federal Reserve — Consumer Credit (G.19)",
    url: "https://www.federalreserve.gov/releases/g19/",
    desc: "Monthly Federal Reserve statistical release tracking outstanding consumer credit, including auto loan balances and interest rate benchmarks.",
  },
  {
    name: "Edmunds Industry Center",
    url: "https://www.edmunds.com/industry/",
    desc: "Used vehicle pricing data, average transaction prices, and automotive market trends used to benchmark vehicle cost estimates.",
  },
  {
    name: "J.D. Power",
    url: "https://www.jdpower.com/",
    desc: "Consumer satisfaction data for auto lenders and dealerships, referenced when comparing lender service quality.",
  },
  {
    name: "National Automobile Dealers Association (NADA)",
    url: "https://www.nada.org/",
    desc: "Dealer-side data on financing penetration rates, F&I product trends, and franchise dealership statistics.",
  },
  {
    name: "U.S. Bureau of Labor Statistics (BLS)",
    url: "https://www.bls.gov/",
    desc: "Employment and wage data used to contextualize income requirements and affordability thresholds for auto loan qualification.",
  },
  {
    name: "U.S. Census Bureau",
    url: "https://www.census.gov/",
    desc: "Vehicle ownership rates, commuting data, and household income statistics used in city-level market analyses.",
  },
];

const principles = [
  {
    icon: <Shield size={20} />,
    title: "Independence",
    desc: "Lender rankings are determined solely by our editorial team based on approval rates, interest rate fairness, minimum credit score requirements, and customer experience data. Lenders cannot pay to improve their ranking or appear in our guides.",
    color: "oklch(0.578 0.098 186)",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Accuracy",
    desc: "All rate ranges, approval criteria, and lender details are verified directly with lenders or sourced from their published disclosures. We update rate data monthly and review all guides annually for material changes.",
    color: "oklch(0.76 0.16 75)",
  },
  {
    icon: <RefreshCw size={20} />,
    title: "Transparency",
    desc: "We disclose advertiser relationships on every page where they exist. When a lender in our network is featured in a guide, that relationship is noted. Our editorial rankings are never influenced by those relationships.",
    color: "oklch(0.578 0.098 186)",
  },
  {
    icon: <Users size={20} />,
    title: "Expertise",
    desc: "Content is written and reviewed by our Auto Finance Editor, James Mitchell, who has covered subprime lending for over 10 years. All factual claims are sourced to primary data from government agencies, credit bureaus, or industry publications.",
    color: "oklch(0.76 0.16 75)",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Reader-First",
    desc: "Every guide is written to answer the specific question a borrower in a difficult credit situation is asking — not to rank for keywords. We do not recommend products we would not recommend to a family member.",
    color: "oklch(0.578 0.098 186)",
  },
];

export default function EditorialStandards() {
  useSEO({
    title: "Editorial Standards & Methodology | Complete Auto Loans",
    description:
      "Learn how Complete Auto Loans researches, ranks, and updates its auto loan guides. Our editorial process, data sources, and independence policy.",
    canonical: "/editorial-standards",
    schema: [
      buildWebPageSchema({
        title: "Editorial Standards & Methodology | Complete Auto Loans",
        description:
          "Learn how Complete Auto Loans researches, ranks, and updates its auto loan guides. Our editorial process, data sources, and independence policy.",
        url: "/editorial-standards",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Editorial Standards", path: "/editorial-standards" },
      ]),
    ],
  });

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.311 0.065 251)" }}>
        <div className="container">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/">
              <span className="cursor-pointer" style={{ color: "oklch(0.65 0.085 186)" }}>Home</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.30)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Editorial Standards</span>
          </nav>
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "oklch(0.578 0.098 186 / 0.18)",
                border: "1px solid oklch(0.65 0.085 186 / 0.30)",
                color: "oklch(0.78 0.065 186)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              How We Work
            </div>
            <h1
              className="text-white mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Editorial Standards &amp; Methodology
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", fontSize: "1.0625rem", lineHeight: 1.65 }}>
              Every guide on Complete Auto Loans is produced by a human editor with direct experience in subprime auto lending. Here is exactly how we research, rank, and maintain our content.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="section-label mb-3">Our Principles</div>
          <h2
            className="mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "oklch(0.15 0.04 251)",
              lineHeight: 1.15,
            }}
          >
            Five Commitments We Make to Every Reader
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 80)",
                  borderTop: `3px solid ${p.color}`,
                  boxShadow: "0 2px 10px oklch(0.311 0.065 251 / 0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color.replace(")", " / 0.10)")}` }}
                >
                  <span style={{ color: p.color }}>{p.icon}</span>
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.15 0.04 251)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Rank Lenders ── */}
      <section className="py-16" style={{ background: "oklch(0.96 0.006 80)" }}>
        <div className="container max-w-4xl">
          <div className="section-label mb-3">Ranking Methodology</div>
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "oklch(0.15 0.04 251)",
            }}
          >
            How We Rank Lenders
          </h2>
          <div
            className="p-6 rounded-2xl mb-6"
            style={{ background: "white", border: "1px solid oklch(0.88 0.008 80)", boxShadow: "0 2px 10px oklch(0.311 0.065 251 / 0.05)" }}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              Each lender in our guides is evaluated across five weighted criteria. Scores are assigned by our editorial team based on direct lender research, published disclosures, and borrower feedback.
            </p>
            <table className="w-full text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid oklch(0.88 0.008 80)" }}>
                  <th className="text-left py-2 pr-4 font-bold" style={{ color: "oklch(0.15 0.04 251)" }}>Criterion</th>
                  <th className="text-left py-2 pr-4 font-bold" style={{ color: "oklch(0.15 0.04 251)" }}>Weight</th>
                  <th className="text-left py-2 font-bold" style={{ color: "oklch(0.15 0.04 251)" }}>What We Measure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Approval Rate", "30%", "Percentage of subprime applicants (300–600 score) who receive an offer"],
                  ["Interest Rate Fairness", "25%", "APR range relative to market benchmarks for each credit tier"],
                  ["Minimum Credit Score", "20%", "Lowest score accepted; bonus points for accepting scores below 500"],
                  ["Down Payment Requirement", "15%", "Minimum down payment; $0 down options score highest"],
                  ["Customer Experience", "10%", "BBB rating, CFPB complaint volume, and verified borrower reviews"],
                ].map(([criterion, weight, measure]) => (
                  <tr key={criterion} style={{ borderBottom: "1px solid oklch(0.93 0.004 80)" }}>
                    <td className="py-2.5 pr-4 font-semibold" style={{ color: "oklch(0.20 0.04 251)" }}>{criterion}</td>
                    <td className="py-2.5 pr-4" style={{ color: "oklch(0.578 0.098 186)", fontWeight: 700 }}>{weight}</td>
                    <td className="py-2.5" style={{ color: "oklch(0.43 0.04 251)" }}>{measure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Rankings are reviewed monthly. When a lender changes its minimum score requirements, APR range, or down payment policy, we update the affected guides within 30 days of becoming aware of the change. Lenders that receive a significant increase in CFPB complaints are flagged for re-evaluation.
          </p>
        </div>
      </section>

      {/* ── Update Policy ── */}
      <section className="py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container max-w-4xl">
          <div className="section-label mb-3">Content Freshness</div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "oklch(0.15 0.04 251)",
            }}
          >
            How Often We Update Our Content
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { freq: "Monthly", items: ["Lender APR ranges", "Minimum credit score requirements", "Down payment minimums", "Lender availability by state"] },
              { freq: "Quarterly", items: ["Market rate benchmarks (Fed G.19 data)", "Experian credit tier averages", "CFPB complaint volume by lender", "City-level market data"] },
              { freq: "Annually", items: ["Full guide editorial review", "Lender ranking re-evaluation", "FAQ accuracy audit", "Schema and structured data review"] },
            ].map((col) => (
              <div
                key={col.freq}
                className="p-5 rounded-2xl"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 80)",
                  boxShadow: "0 2px 10px oklch(0.311 0.065 251 / 0.05)",
                }}
              >
                <p
                  className="font-bold text-sm mb-3"
                  style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  {col.freq}
                </p>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      <CheckCircle2 size={13} style={{ color: "oklch(0.578 0.098 186)", marginTop: "3px", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Each guide displays a "Last Updated" date at the top of the article. This date reflects the most recent substantive review, not minor copy edits.
          </p>
        </div>
      </section>

      {/* ── Data Sources ── */}
      <section className="py-16" style={{ background: "oklch(0.96 0.006 80)" }}>
        <div className="container max-w-4xl">
          <div className="section-label mb-3">Primary Sources</div>
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "oklch(0.15 0.04 251)",
            }}
          >
            Data Sources We Rely On
          </h2>
          <div className="space-y-3">
            {dataSources.map((src) => (
              <div
                key={src.name}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 80)",
                  boxShadow: "0 2px 10px oklch(0.311 0.065 251 / 0.04)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "oklch(0.578 0.098 186 / 0.10)" }}
                >
                  <ExternalLink size={14} style={{ color: "oklch(0.578 0.098 186)" }} />
                </div>
                <div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {src.name}
                  </a>
                  <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    {src.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advertiser Disclosure ── */}
      <section className="py-16" style={{ background: "oklch(0.311 0.065 251)" }}>
        <div className="container max-w-3xl">
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
            }}
          >
            Advertiser Disclosure
          </h2>
          <div className="space-y-4" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}>
            <p>
              Complete Auto Loans is a lead generation and matching service. We earn compensation when a visitor submits a loan application and is matched with a lender in our network. This compensation may influence which lenders we feature in our network, but it does not influence our editorial rankings or the content of our guides.
            </p>
            <p>
              Lenders featured in our "Best Of" guides are ranked independently by our editorial team. A lender's participation in our matching network does not guarantee a positive editorial ranking, and lenders with negative consumer outcomes may be removed from both our network and our guides.
            </p>
            <p>
              All rate ranges, approval criteria, and loan terms shown in our guides are for informational purposes only. Actual offers depend on your individual credit profile, income, and the lender's current underwriting criteria. We recommend comparing multiple offers before accepting any loan.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/about">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
              >
                About Our Team
              </button>
            </Link>
            <Link href="/blog">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Read Our Guides
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
