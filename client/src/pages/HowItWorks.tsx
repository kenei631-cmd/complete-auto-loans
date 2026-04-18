/**
 * HowItWorks — Complete Auto Loans
 * Design: Premium Editorial Finance — dark navy header, warm off-white body, teal accents
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Zap, Users, Award, ChevronRight, Shield, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";

const steps = [
  {
    num: "01",
    icon: <Zap size={24} />,
    title: "Answer 4 Quick Questions",
    desc: "Tell us what type of vehicle you want, your current credit situation, your monthly income, and your contact info. The whole process takes about 2 minutes. We never do a hard credit pull — your score stays safe.",
    bullets: ["Vehicle type preference", "Credit score range or situation", "Monthly income (all sources)", "Name, email, phone, ZIP"],
  },
  {
    num: "02",
    icon: <Users size={24} />,
    title: "We Match You Instantly",
    desc: "Your profile is instantly matched against our network of 500+ lenders who specialize in bad credit, no credit, bankruptcy, repossession, and ITIN financing. Real offers come back in minutes — not days.",
    bullets: ["500+ lenders in our network", "Specialists in every credit situation", "Real offers, not estimates", "No obligation to accept"],
  },
  {
    num: "03",
    icon: <Award size={24} />,
    title: "Drive Away Approved",
    desc: "Review your offers, pick the best one, and visit the dealership. Most of our customers drive away in their new vehicle the same day they apply. A loan specialist will call you within 2 hours to walk you through everything.",
    bullets: ["Same-day approval in most cases", "Loan specialist calls within 2 hours", "Bring driver's license + proof of income", "Drive home in your new car"],
  },
];

const faqs = [
  {
    q: "Will applying affect my credit score?",
    a: "No. We only do a soft credit inquiry to match you with lenders. A soft inquiry never appears on your credit report and has zero impact on your score. Only if you choose to proceed with a specific lender will a hard pull occur — and only with your explicit permission.",
  },
  {
    q: "What credit score do I need?",
    a: "There is no minimum credit score. We work with borrowers from 300 all the way up. We also work with people who have no credit history, recent bankruptcies, repossessions, and ITIN-only applicants. If you have a job and can make payments, we can likely find a lender for you.",
  },
  {
    q: "How much do I need for a down payment?",
    a: "Many of our lenders offer $0 down options, especially for first-time buyers or those with steady income. Others may require $500–$1,000 down depending on your credit situation. We'll show you all available options so you can choose what works for your budget.",
  },
  {
    q: "How long does the process take?",
    a: "The application itself takes about 2 minutes. Lender matching happens in real time — you'll typically see offers within minutes. A loan specialist will follow up within 2 hours during business hours (Mon–Sat, 8am–8pm). Most customers drive away same day.",
  },
  {
    q: "Is this service free?",
    a: "Yes, completely free for borrowers. We're compensated by lenders when a match is made — similar to how comparison sites work. You never pay us anything, and there's no obligation to accept any offer.",
  },
  {
    q: "What documents will I need?",
    a: "When you visit the dealership, bring your driver's license, proof of income (recent pay stubs or bank statements), proof of residence (utility bill or lease), and proof of insurance. Your loan specialist will tell you exactly what's needed.",
  },
];

export default function HowItWorks() {
  useSEO({
    title: "How It Works — Get a Bad Credit Auto Loan in 3 Steps | Complete Auto Loans",
    description: "Learn how Complete Auto Loans works. Answer 4 questions, get matched with 500+ lenders, and drive away approved — often same day. No hard credit pull.",
    canonical: "/how-it-works",
    schema: [
      buildWebPageSchema({
        title: "How It Works — Get a Bad Credit Auto Loan in 3 Steps | Complete Auto Loans",
        description: "Learn how Complete Auto Loans works. Answer 4 questions, get matched with 500+ lenders, and drive away approved — often same day. No hard credit pull.",
        url: "/how-it-works",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "How It Works", path: "/how-it-works" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Get a Bad Credit Auto Loan",
        description: "Get matched with a bad credit auto loan lender in 3 simple steps. No hard credit pull, no application fee.",
        totalTime: "PT2M",
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.desc,
        })),
      },
      buildFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    ],
  });

  return (
    <Layout>
      {/* Dark Header */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-14 text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "oklch(0.578 0.098 186 / 0.18)", border: "1px solid oklch(0.65 0.085 186 / 0.35)", color: "oklch(0.78 0.065 186)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Simple Process
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "0.875rem", lineHeight: 1.1 }}>
            How Complete Auto Loans Works
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            From application to approval in 3 steps. No hard credit pull, no application fee, no obligation.
          </p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex flex-col md:flex-row gap-8 py-12"
                style={{ borderBottom: i < steps.length - 1 ? "1px solid oklch(0.90 0.006 80)" : "none" }}
              >
                {/* Icon + Number */}
                <div className="flex flex-col items-center md:items-start gap-3 md:w-44 shrink-0">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl"
                    style={{
                      background: i === 1 ? "oklch(0.578 0.098 186)" : "oklch(0.311 0.065 251)",
                      color: "white",
                      boxShadow: i === 1 ? "0 8px 28px oklch(0.578 0.098 186 / 0.35)" : "0 4px 16px oklch(0.18 0.06 240 / 0.18)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.88 0.007 80)", fontSize: "3rem", fontWeight: 700, lineHeight: 1 }}>
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="font-bold text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                    {step.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif", maxWidth: "560px" }}>
                    {step.desc}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm font-medium" style={{ color: "oklch(0.28 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                        <CheckCircle2 size={13} style={{ color: "oklch(0.578 0.098 186)", flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/apply">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
                style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px oklch(0.76 0.16 75 / 0.40)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                Start My Free Application
                <ChevronRight size={16} />
              </button>
            </Link>
            <p className="mt-3 text-xs" style={{ color: "oklch(0.58 0.015 240)", fontFamily: "'DM Sans', sans-serif" }}>
              Soft credit check only · No application fee · No obligation
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20" style={{ background: "oklch(0.96 0.006 80)" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="section-label mb-3">Common Questions</div>
            <h2 className="mb-10" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "oklch(0.15 0.04 251)" }}>
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border"
                  style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)", boxShadow: "0 2px 10px oklch(0.18 0.06 240 / 0.04)" }}
                >
                  <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.18 0.04 251)" }}>
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.40 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: "oklch(0.311 0.065 251)" }}>
        <div className="container text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}>
            Ready to Get Started?
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
            Takes 2 minutes. No hard credit pull. Real offers from real lenders.
          </p>
          <Link href="/apply">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
              style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 24px oklch(0.76 0.16 75 / 0.45)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Check My Approval Odds — Free
              <Shield size={15} />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
