/**
 * Home — Complete Auto Loans
 * Design: Premium Editorial Finance
 * 
 * Sections:
 * 1. Hero — cinematic full-bleed with asymmetric layout + floating stats card
 * 2. Trust bar — social proof strip
 * 3. Best-Of Editorial Grid — dark featured cards + white cards
 * 4. How It Works — 3-step horizontal with connecting line
 * 5. Persona Cards — photo + content with accent borders
 * 6. Testimonials — 4-column quote cards
 * 7. Dark CTA — full-bleed photo with amber button
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star, Shield, Zap, Clock, ChevronRight, Users, Award, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/hero_premium-3w25pnkm7XPeSZaaGkqMXo.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/cta_bg-PDasKWDRcQeYKLEiLA7yk9.webp";

const bestOfGuides = [
  { emoji: "💳", label: "Bad Credit Auto Loans", volume: "39,700/mo", href: "/best-bad-credit-auto-loans", featured: true },
  { emoji: "🏪", label: "Buy Here Pay Here", volume: "222,780/mo", href: "/best-buy-here-pay-here-dealerships", featured: true },
  { emoji: "📋", label: "Pre-Approved Loans", volume: "62,240/mo", href: "/best-pre-approved-car-loans", featured: true },
  { emoji: "✅", label: "Guaranteed Approval", volume: "9,630/mo", href: "/best-guaranteed-approval-auto-loans" },
  { emoji: "🔍", label: "No Credit Check", volume: "11,470/mo", href: "/best-no-credit-check-car-loans" },
  { emoji: "💰", label: "No Money Down", volume: "5,890/mo", href: "/best-no-money-down-car-loans" },
  { emoji: "🎓", label: "First-Time Buyers", volume: "5,030/mo", href: "/best-first-time-car-buyer-loans" },
  { emoji: "⚖️", label: "After Bankruptcy", volume: "840/mo", href: "/best-car-loans-after-bankruptcy" },
  { emoji: "🔄", label: "After Repossession", volume: "480/mo", href: "/best-auto-loans-after-repossession" },
  { emoji: "🌱", label: "Second Chance", volume: "2,550/mo", href: "/best-second-chance-auto-loans" },
  { emoji: "📄", label: "ITIN Auto Loans", volume: "1,200/mo", href: "/best-itin-auto-loans" },
  { emoji: "🏠", label: "Low Income Buyers", volume: "450/mo", href: "/best-low-income-car-loans" },
];

const personas = [
  {
    tag: "Credit: 300–550",
    title: "The Rebuilder",
    desc: "You've been through a financial setback — divorce, job loss, medical bills. Your credit took a hit but you're back on your feet. We know lenders who see your recovery, not your past.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    href: "/best-bad-credit-auto-loans",
    accentColor: "oklch(0.578 0.098 186)",
  },
  {
    tag: "Credit: No History",
    title: "The First-Timer",
    desc: "No credit history, no co-signer, maybe a new job. Traditional banks say no. We match you with lenders who specialize in first-time buyers and look at your income, not just your score.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    href: "/best-first-time-car-buyer-loans",
    accentColor: "oklch(0.76 0.16 75)",
  },
  {
    tag: "Credit: Any Score",
    title: "The Survivor",
    desc: "Bankruptcy, repossession, or both. You need a car to get to work and take care of your family. There are lenders who specialize in exactly your situation — and they approve people every day.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    href: "/best-second-chance-auto-loans",
    accentColor: "oklch(0.50 0.07 251)",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    location: "Phoenix, AZ",
    score: "492",
    vehicle: "2019 Honda Civic",
    down: "$500 down",
    quote: "I had a repo from 2021 and thought no one would touch me. Complete Auto Loans matched me with a lender in 10 minutes. Drove home same day.",
    initials: "MT",
    color: "oklch(0.578 0.098 186)",
  },
  {
    name: "Jennifer R.",
    location: "Dallas, TX",
    score: "No Credit",
    vehicle: "2020 Toyota Corolla",
    down: "$0 down",
    quote: "First car ever. No credit, new job. I was terrified. The process was so easy and the lender was actually nice about my situation.",
    initials: "JR",
    color: "oklch(0.76 0.16 75)",
  },
  {
    name: "David & Lisa M.",
    location: "Chicago, IL",
    score: "538",
    vehicle: "2018 Ford Explorer",
    down: "$1,000 down",
    quote: "Chapter 7 bankruptcy discharged 8 months ago. We needed an SUV for our kids. Got approved for a rate we could actually afford.",
    initials: "DM",
    color: "oklch(0.50 0.07 251)",
  },
  {
    name: "Rosa V.",
    location: "San Antonio, TX",
    score: "ITIN",
    vehicle: "2021 Chevy Equinox",
    down: "$800 down",
    quote: "I don't have a Social Security number but I have an ITIN and steady income. Complete Auto Loans was the only site that had options for me.",
    initials: "RV",
    color: "oklch(0.578 0.098 186)",
  },
];

const steps = [
  { num: "01", icon: <Zap size={22} />, title: "Answer 4 Quick Questions", desc: "Tell us your vehicle type, credit situation, income, and contact info. Takes 2 minutes. No hard credit pull." },
  { num: "02", icon: <Users size={22} />, title: "We Match You Instantly", desc: "Our network of 500+ lenders reviews your profile and returns real offers — not estimates, not guesses." },
  { num: "03", icon: <Award size={22} />, title: "Drive Away Approved", desc: "Pick your best offer, visit the dealership, and drive home. Most approvals happen same day." },
];

export default function Home() {
  return (
    <Layout>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100svh" }}>
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        {/* Gradient — strong left, fades right */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, oklch(0.08 0.05 240 / 0.97) 0%, oklch(0.12 0.04 251 / 0.88) 40%, oklch(0.10 0.05 240 / 0.35) 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, oklch(0.98 0.005 80), transparent)" }} />

        <div className="relative container" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "640px" }}>
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-7"
              style={{ background: "oklch(0.578 0.098 186 / 0.18)", border: "1px solid oklch(0.65 0.085 186 / 0.35)", color: "oklch(0.78 0.065 186)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <Star size={10} fill="currentColor" />
              #1 Rated Bad Credit Auto Loan Network
            </div>

            {/* Headline */}
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.75rem, 6vw, 4.75rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              We Look at Your{" "}
              <em style={{ color: "oklch(0.70 0.075 186)", fontStyle: "italic" }}>Future,</em>
              <br />
              Not Your Past.
            </h1>

            {/* Sub */}
            <p
              className="mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.125rem", fontFamily: "'DM Sans', sans-serif", maxWidth: "500px" }}
            >
              Bad credit, bankruptcy, repossession, or no credit at all — we match you with lenders who approve real people every single day.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/apply">
                <button
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base transition-all"
                  style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 6px 28px oklch(0.76 0.16 75 / 0.50)", fontSize: "1.0625rem" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 36px oklch(0.76 0.16 75 / 0.55)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px oklch(0.76 0.16 75 / 0.50)"; }}
                >
                  Check My Approval Odds — Free
                  <ArrowRight size={17} />
                </button>
              </Link>
              <Link href="/how-it-works">
                <button
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
                >
                  How It Works
                </button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: <Shield size={12} />, text: "Soft credit check only" },
                { icon: <CheckCircle2 size={12} />, text: "Won't affect your score" },
                { icon: <Zap size={12} />, text: "Results in 2 minutes" },
              ].map((t) => (
                <span key={t.text} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: "oklch(0.70 0.075 186)" }}>{t.icon}</span>
                  {t.text}
                </span>
              ))}
            </div>
          </div>

          {/* Floating Stats Card */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
            style={{
              background: "oklch(1 0 0 / 0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "1.25rem",
              padding: "1.75rem",
              width: "220px",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.70 0.075 186)", fontFamily: "'DM Sans', sans-serif" }}>
              By the Numbers
            </p>
            {[
              { value: "98%", label: "Approval Rate" },
              { value: "2 min", label: "Application Time" },
              { value: "$0", label: "Application Fee" },
              { value: "500+", label: "Lender Network" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "white" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: <TrendingUp size={14} />, text: "50,000+ People Matched" },
              { icon: <Star size={14} fill="currentColor" />, text: "4.8/5 Rating · 2,400+ Reviews" },
              { icon: <Shield size={14} />, text: "256-bit SSL Encrypted" },
              { icon: <CheckCircle2 size={14} />, text: "Independent Editorial Rankings" },
            ].map((t) => (
              <span key={t.text} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: "oklch(0.65 0.085 186)" }}>{t.icon}</span>
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BEST-OF EDITORIAL GRID
      ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label mb-3">Editorial Rankings</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "oklch(0.15 0.04 251)", lineHeight: 1.1 }}>
                Best-Of Guides for<br />Every Situation
              </h2>
            </div>
            <div className="sm:max-w-xs">
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Updated monthly. Independent editorial team. No paid placements in our rankings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {bestOfGuides.map((guide) => (
              <Link key={guide.href} href={guide.href}>
                <div
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl transition-all duration-200 cursor-pointer h-full"
                  style={{
                    background: guide.featured ? "oklch(0.311 0.065 251)" : "oklch(0.96 0.005 80)",
                    border: guide.featured ? "1px solid oklch(0.58 0.13 185 / 0.30)" : "1px solid oklch(0.88 0.008 80)",
                    boxShadow: guide.featured ? "0 8px 28px oklch(0.311 0.065 251 / 0.22)" : "0 2px 8px oklch(0.311 0.065 251 / 0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = guide.featured ? "0 20px 48px oklch(0.18 0.06 240 / 0.32)" : "0 12px 32px oklch(0.311 0.065 251 / 0.14)";
                    if (!guide.featured) el.style.borderColor = "oklch(0.578 0.098 186)";
                    if (!guide.featured) el.style.background = "white";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = guide.featured ? "0 8px 28px oklch(0.311 0.065 251 / 0.22)" : "0 2px 8px oklch(0.311 0.065 251 / 0.06)";
                    if (!guide.featured) el.style.borderColor = "oklch(0.88 0.008 80)";
                    if (!guide.featured) el.style.background = "oklch(0.96 0.005 80)";
                  }}
                >
                  {guide.featured && (
                    <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "oklch(0.58 0.13 185 / 0.22)", color: "oklch(0.72 0.070 186)", fontFamily: "'DM Sans', sans-serif" }}>
                      Popular
                    </span>
                  )}
                  <span className="text-2xl">{guide.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight mb-1" style={{ color: guide.featured ? "white" : "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      {guide.label}
                    </p>
                    <p className="text-xs" style={{ color: guide.featured ? "oklch(0.65 0.085 186)" : "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      {guide.volume} searches
                    </p>
                  </div>
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" style={{ color: guide.featured ? "oklch(0.65 0.085 186)" : "oklch(0.62 0.12 185)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "oklch(0.311 0.065 251)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-3" style={{ color: "oklch(0.70 0.075 186)" }}>
              Simple Process
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "white", lineHeight: 1.1 }}>
              Approved in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="absolute top-10 left-1/4 right-1/4 h-px hidden md:block" style={{ background: "linear-gradient(to right, oklch(0.578 0.098 186 / 0.4), oklch(0.578 0.098 186 / 0.4))" }} />

            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6 relative z-10"
                  style={{
                    background: i === 1 ? "oklch(0.578 0.098 186)" : "oklch(0.24 0.05 251)",
                    border: i === 1 ? "none" : "1px solid oklch(0.578 0.098 186 / 0.25)",
                    boxShadow: i === 1 ? "0 8px 32px oklch(0.578 0.098 186 / 0.35)" : "none",
                    color: "white",
                  }}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}>
                  Step {step.num}
                </span>
                <h3 className="font-bold text-lg mb-3 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px oklch(0.76 0.16 75 / 0.40)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                Start My Free Application
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PERSONA CARDS
      ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "oklch(0.96 0.006 80)" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label mb-3">Who We Help</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "oklch(0.15 0.04 251)", lineHeight: 1.1, maxWidth: "400px" }}>
                We've Seen Your Situation Before
              </h2>
            </div>
            <p className="text-sm md:max-w-xs leading-relaxed" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              Every credit situation is different. We match you with lenders who specialize in yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((p) => (
              <Link key={p.href} href={p.href}>
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 h-full"
                  style={{ boxShadow: "0 4px 20px oklch(0.311 0.065 251 / 0.08)", borderTop: `3px solid ${p.accentColor}` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px oklch(0.18 0.06 240 / 0.16)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px oklch(0.311 0.065 251 / 0.08)"; }}
                >
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.10 0.05 240 / 0.75) 0%, transparent 55%)" }} />
                    <span className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: p.accentColor, fontFamily: "'DM Sans', sans-serif" }}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6" style={{ background: "white" }}>
                    <h3 className="font-bold text-xl mb-2.5" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      {p.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all" style={{ color: p.accentColor, fontFamily: "'DM Sans', sans-serif" }}>
                      See options for you
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label mb-3">Real Approvals</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "oklch(0.15 0.04 251)", lineHeight: 1.1 }}>
                People Just Like You<br />Got Approved
              </h2>
            </div>
            <div className="flex items-center gap-1.5 sm:mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="oklch(0.76 0.16 75)" style={{ color: "oklch(0.76 0.16 75)" }} />)}
              <span className="text-sm font-semibold ml-2" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>4.8/5 · 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col p-6 rounded-2xl transition-all duration-200"
                style={{ background: "white", border: "1px solid oklch(0.88 0.008 80)", boxShadow: "0 4px 16px oklch(0.311 0.065 251 / 0.07)", borderTop: `3px solid ${t.color}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px oklch(0.311 0.065 251 / 0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px oklch(0.311 0.065 251 / 0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: t.color, fontFamily: "'DM Sans', sans-serif" }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{t.location}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: "oklch(0.578 0.098 186 / 0.10)", color: "oklch(0.42 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>
                    ✓ Approved
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 pb-4" style={{ borderBottom: "1px solid oklch(0.93 0.004 80)" }}>
                  {[`Score: ${t.score}`, t.vehicle, t.down].map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: "oklch(0.96 0.006 80)", color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <blockquote className="text-sm leading-relaxed flex-1" style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                  "{t.quote}"
                </blockquote>

                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="oklch(0.76 0.16 75)" style={{ color: "oklch(0.76 0.16 75)" }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK CTA
      ══════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "oklch(0.12 0.04 251 / 0.88)" }} />
        {/* Teal glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.578 0.098 186 / 0.12), transparent)" }} />

        <div className="relative container text-center">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div className="section-label justify-center mb-5" style={{ color: "oklch(0.70 0.075 186)" }}>
              Get Started Today
            </div>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Your Next Car Is Closer<br />Than You Think
            </h2>
            <p
              className="mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", fontFamily: "'DM Sans', sans-serif" }}
            >
              Don't let a number on a report stop you from getting to work, picking up your kids, or living your life. We've matched over 50,000 people with lenders who said yes.
            </p>

            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl font-bold transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", fontSize: "1.0625rem", boxShadow: "0 6px 32px oklch(0.76 0.16 75 / 0.55)", padding: "1rem 2.5rem" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px oklch(0.76 0.16 75 / 0.60)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px oklch(0.76 0.16 75 / 0.55)"; }}
              >
                Get Pre-Approved Now — It's Free
                <ArrowRight size={18} />
              </button>
            </Link>

            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {[
                { icon: <Shield size={13} />, text: "No hard credit pull" },
                { icon: <Clock size={13} />, text: "Results in 2 minutes" },
                { icon: <CheckCircle2 size={13} />, text: "No application fee" },
              ].map((t) => (
                <span key={t.text} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: "oklch(0.70 0.075 186)" }}>{t.icon}</span>
                  {t.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
