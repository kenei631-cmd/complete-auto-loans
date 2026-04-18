import Layout from "../components/Layout";
import { Link } from "wouter";

const steps = [
  {
    number: "01",
    title: "Answer 4 Quick Questions",
    description: "Tell us about your vehicle preference, credit situation, and income. No hard credit pull — this is just to match you with the right lenders.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Get Matched Instantly",
    description: "Our system matches your profile with lenders who specialize in your exact situation — whether that's bad credit, bankruptcy, repo, or no credit history.",
    icon: "⚡",
  },
  {
    number: "03",
    title: "Review Your Offers",
    description: "Receive real loan offers from real lenders within minutes. Compare rates, terms, and down payment requirements side by side.",
    icon: "📊",
  },
  {
    number: "04",
    title: "Drive Away Approved",
    description: "Choose your offer, visit the dealership, and drive away in your vehicle. Most approvals are finalized same day.",
    icon: "🚗",
  },
];

const faqs = [
  {
    q: "Will applying hurt my credit score?",
    a: "No. We use a soft credit inquiry only, which does not affect your credit score. Only when you formally accept a loan offer from a lender will a hard inquiry be made.",
  },
  {
    q: "What credit score do I need?",
    a: "We work with all credit scores, including 300 and below. We specialize in matching borrowers who have been rejected elsewhere with lenders who understand their situation.",
  },
  {
    q: "How much do I need for a down payment?",
    a: "Many of our lenders offer $0 down options. However, a down payment of $500–$1,000 significantly improves your approval odds and lowers your monthly payment.",
  },
  {
    q: "How long does the process take?",
    a: "The application takes about 2 minutes. Most borrowers receive their first offers within 5–15 minutes. Same-day approvals are common.",
  },
  {
    q: "Do I need a job to qualify?",
    a: "You need verifiable income, but it doesn't have to be from a traditional job. SSI, disability, child support, self-employment, and gig income all qualify.",
  },
];

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <div style={{ backgroundColor: "#1A365D", color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="teal-badge mb-4 inline-block">Simple Process</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Getting Approved Is Easier Than You Think
          </h1>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", lineHeight: 1.6 }}>
            We've helped thousands of people with bad credit, bankruptcies, and repossessions get into reliable vehicles. Here's how it works.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-xl"
              style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}
            >
              <div className="flex items-start gap-4 flex-1">
                <div
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#F0FDF9",
                    border: "2px solid #0D9488",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#0D9488", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                    Step {step.number}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A365D", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/apply">
            <button className="btn-cta text-base px-8 py-4">
              Start My Application — Takes 2 Minutes →
            </button>
          </Link>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#9CA3AF", marginTop: "0.75rem" }}>
            Soft credit check only. Won't affect your score.
          </p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #E5E0D8", margin: "4rem 0" }} />

        {/* FAQs */}
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A365D", fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", textAlign: "center" }}>
          Common Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-lg" style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}>
              <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, color: "#1A365D", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                {faq.q}
              </h3>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
