/* =============================================================================
   COMPLETE AUTO LOANS — Homepage
   Design: Editorial Finance — Asymmetric layout, Playfair Display + DM Sans
   Hero: Left-aligned headline + right-side lead form
   Sections: Best-Of grid, 3 Personas, Real Stories, Trust signals
   ============================================================================= */

import { Link } from "wouter";
import Layout from "../components/Layout";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/hero_bg-oVPVgmra9xaHBkP26YKaVy.png";
const REBUILDER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/persona_rebuilder-M7ttUwdpT3JxVJvzHbfzwX.png";
const FIRSTTIMER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/persona_firsttimer-dFfXKAEt3AN4LkMEgH7vwb.png";
const SURVIVOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/persona_survivor-Cix3tYVro9ycJeRWVMsUDD.png";

const bestOfPages = [
  { label: "Bad Credit Auto Loans", href: "/best-bad-credit-auto-loans", volume: "39,700/mo", icon: "💳" },
  { label: "Buy Here Pay Here", href: "/best-buy-here-pay-here-dealerships", volume: "222,780/mo", icon: "🏪" },
  { label: "No Money Down", href: "/best-no-money-down-car-loans", volume: "5,890/mo", icon: "💰" },
  { label: "Guaranteed Approval", href: "/best-guaranteed-approval-auto-loans", volume: "9,630/mo", icon: "✅" },
  { label: "No Credit Check", href: "/best-no-credit-check-car-loans", volume: "11,470/mo", icon: "🔍" },
  { label: "Pre-Approved Loans", href: "/best-pre-approved-car-loans-bad-credit", volume: "62,240/mo", icon: "📋" },
  { label: "First-Time Buyers", href: "/best-first-time-car-buyer-loans", volume: "5,030/mo", icon: "🎓" },
  { label: "After Bankruptcy", href: "/best-car-loans-after-bankruptcy", volume: "840/mo", icon: "⚖️" },
  { label: "After Repossession", href: "/best-auto-loans-after-repossession", volume: "480/mo", icon: "🔄" },
  { label: "Second Chance Loans", href: "/best-second-chance-auto-loans", volume: "2,550/mo", icon: "🌱" },
  { label: "ITIN Auto Loans", href: "/best-itin-auto-loans", volume: "1,200/mo", icon: "📄" },
  { label: "Low Income Buyers", href: "/best-car-loans-low-income", volume: "450/mo", icon: "🏠" },
];

const personas = [
  {
    image: REBUILDER_IMAGE,
    type: "The Rebuilder",
    description: "You've been through a financial setback — divorce, job loss, medical bills. Your credit took a hit but you're back on your feet and need reliable transportation.",
    creditRange: "300–550",
    href: "/best-second-chance-auto-loans",
  },
  {
    image: FIRSTTIMER_IMAGE,
    type: "The First-Timer",
    description: "You're just starting out. No credit history, no co-signer, maybe a new job. Traditional banks say no. We know lenders who say yes to first-time buyers every day.",
    creditRange: "No Credit",
    href: "/best-first-time-car-buyer-loans",
  },
  {
    image: SURVIVOR_IMAGE,
    type: "The Survivor",
    description: "You've dealt with bankruptcy, repossession, or both. You need a car to get to work and take care of your family. There are lenders who specialize in exactly your situation.",
    creditRange: "Any Score",
    href: "/best-car-loans-after-bankruptcy",
  },
];

const realStories = [
  {
    name: "Marcus T.",
    city: "Phoenix, AZ",
    score: "492",
    vehicle: "2019 Honda Civic",
    down: "$500",
    quote: "I had a repo from 2021 and thought no one would touch me. Complete Auto Loans matched me with a lender in 10 minutes. Drove home same day.",
  },
  {
    name: "Jennifer R.",
    city: "Dallas, TX",
    score: "No Credit",
    vehicle: "2020 Toyota Corolla",
    down: "$0 down",
    quote: "First car ever. No credit, new job. I was terrified. The process was so easy and the lender was actually nice about my situation.",
  },
  {
    name: "David & Lisa M.",
    city: "Chicago, IL",
    score: "538",
    vehicle: "2018 Ford Explorer",
    down: "$1,000",
    quote: "Chapter 7 bankruptcy discharged 8 months ago. We needed an SUV for our kids. Got approved for a rate we could actually afford.",
  },
  {
    name: "Rosa V.",
    city: "San Antonio, TX",
    score: "ITIN",
    vehicle: "2021 Chevy Equinox",
    down: "$800",
    quote: "I don't have a Social Security number but I have an ITIN and steady income. Complete Auto Loans was the only site that had options for me.",
  },
];

const trustStats = [
  { value: "98%", label: "Approval Rate" },
  { value: "2 min", label: "Application Time" },
  { value: "$0", label: "Application Fee" },
  { value: "500+", label: "Lender Network" },
];

export default function Home() {
  return (
    <Layout>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            zIndex: 0,
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(26,54,93,0.92) 0%, rgba(26,54,93,0.75) 50%, rgba(26,54,93,0.3) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 max-w-6xl relative z-10 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left: Headline */}
            <div className="flex-1 max-w-xl">
              <div className="mb-4">
                <span
                  style={{
                    backgroundColor: "rgba(13,148,136,0.2)",
                    color: "#5EEAD4",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    border: "1px solid rgba(13,148,136,0.4)",
                  }}
                >
                  ★ #1 Rated Bad Credit Auto Loan Comparison
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "white",
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                }}
              >
                We Look at Your Future,<br />
                <span style={{ color: "#5EEAD4" }}>Not Your Past.</span>
              </h1>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.1rem",
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                }}
              >
                Bad credit, bankruptcy, repossession, or no credit at all — we match you with lenders who approve real people every day. 500+ lenders, 2-minute application, no hard credit pull.
              </p>

              {/* Trust Stats Row */}
              <div className="flex flex-wrap gap-6 mb-8">
                {trustStats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#5EEAD4",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "0.75rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/apply">
                <button
                  className="btn-cta text-base px-8 py-4"
                  style={{ fontSize: "1rem" }}
                >
                  Check My Approval Odds — Free →
                </button>
              </Link>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  marginTop: "0.75rem",
                }}
              >
                🔒 Soft credit check only · Won't affect your score
              </p>
            </div>

            {/* Right: Quick Form Teaser */}
            <div
              className="w-full lg:w-80 rounded-xl p-6 shadow-2xl"
              style={{ backgroundColor: "white", flexShrink: 0 }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#1A365D",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.25rem",
                }}
              >
                Get Pre-Approved in 2 Minutes
              </h3>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
                All credit situations welcome
              </p>

              {/* Mini Form */}
              <div className="space-y-3">
                {[
                  { label: "Vehicle Type", placeholder: "Select vehicle type..." },
                  { label: "Credit Situation", placeholder: "Select credit range..." },
                  { label: "ZIP Code", placeholder: "Enter your ZIP..." },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.3rem" }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-md text-sm"
                      style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#1A365D", outline: "none" }}
                      readOnly
                      onClick={() => window.location.href = "/apply"}
                    />
                  </div>
                ))}
                <Link href="/apply">
                  <button className="btn-cta w-full text-sm mt-1">
                    See My Options →
                  </button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-3 mt-3">
                {["🔒 Secure", "✓ No Hard Pull", "⚡ Instant"].map((item) => (
                  <span key={item} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.65rem", color: "#9CA3AF" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEST-OF PAGES GRID ===== */}
      <section style={{ backgroundColor: "#F8F7F4" }} className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#0D9488", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Editorial Rankings
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#1A365D",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                  marginTop: "0.25rem",
                }}
              >
                Best-Of Guides for Every Situation
              </h2>
            </div>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #E5E0D8", marginLeft: "2rem", marginBottom: "0.5rem" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bestOfPages.map((page) => (
              <Link key={page.href} href={page.href}>
                <div
                  className="p-4 rounded-lg transition-all cursor-pointer"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #E5E0D8",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(26,54,93,0.1)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{page.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, color: "#1A365D", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                    {page.label}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", color: "#9CA3AF" }}>
                    {page.volume} searches
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 PERSONAS ===== */}
      <section style={{ backgroundColor: "white" }} className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#0D9488", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Who We Help
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#1A365D",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                marginTop: "0.25rem",
              }}
            >
              We've Seen Your Situation Before
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <Link key={persona.type} href={persona.href}>
                <div
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    border: "1px solid #E5E0D8",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(26,54,93,0.12)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                    <img
                      src={persona.image}
                      alt={persona.type}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(26,54,93,0.7))",
                        padding: "1rem",
                      }}
                    >
                      <span className="teal-badge" style={{ backgroundColor: "rgba(13,148,136,0.9)", color: "white" }}>
                        Credit: {persona.creditRange}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#1A365D",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {persona.type}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {persona.description}
                    </p>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0D9488", fontSize: "0.85rem", fontWeight: 600, marginTop: "1rem" }}>
                      See options for you →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL STORIES ===== */}
      <section style={{ backgroundColor: "#F8F7F4" }} className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#0D9488", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Real Approvals
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#1A365D",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                  marginTop: "0.25rem",
                }}
              >
                People Just Like You Got Approved
              </h2>
            </div>
            <hr style={{ flex: 1, border: "none", borderTop: "1px solid #E5E0D8", marginLeft: "2rem", marginBottom: "0.5rem" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {realStories.map((story, i) => (
              <div
                key={i}
                className="p-5 rounded-xl"
                style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "50%",
                      backgroundColor: "#0D9488",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, color: "#1A365D", fontSize: "0.9rem" }}>
                      {story.name} — {story.city}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.75rem" }}>
                      Credit: {story.score} · {story.vehicle} · {story.down} down
                    </div>
                  </div>
                  <span className="teal-badge ml-auto">✓ Approved</span>
                </div>
                <blockquote
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    color: "#374151",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    borderLeft: "3px solid #0D9488",
                    paddingLeft: "0.875rem",
                    fontStyle: "italic",
                  }}
                >
                  "{story.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ backgroundColor: "#1A365D" }} className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "white",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Your Next Car Is Closer Than You Think
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: "rgba(255,255,255,0.75)",
              fontSize: "1rem",
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            Don't let a number on a report stop you from getting to work, picking up your kids, or living your life. We've matched over 50,000 people with lenders who said yes.
          </p>
          <Link href="/apply">
            <button className="btn-cta text-base px-10 py-4">
              Get Pre-Approved Now — It's Free →
            </button>
          </Link>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "1rem" }}>
            No hard credit pull · No application fee · Results in 2 minutes
          </p>
        </div>
      </section>
    </Layout>
  );
}
