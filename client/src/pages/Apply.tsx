/**
 * Apply — Complete Auto Loans
 * Design: Premium Editorial Finance
 * Split layout: dark left panel (social proof) + light right panel (form)
 * 4-step quiz: Vehicle → Credit → Income → Contact
 */
import { useState } from "react";
import Layout from "../components/Layout";
import { Shield, CheckCircle2, Star, ArrowLeft, ArrowRight, Users, Award, Zap } from "lucide-react";

const steps = [
  { id: 1, label: "Vehicle", title: "What type of vehicle are you looking for?" },
  { id: 2, label: "Credit", title: "What best describes your credit situation?" },
  { id: 3, label: "Income", title: "What is your monthly income?" },
  { id: 4, label: "Contact", title: "Where should we send your approval?" },
];

const vehicleOptions = [
  { value: "sedan", label: "Sedan / Car", icon: "🚗" },
  { value: "suv", label: "SUV / Crossover", icon: "🚙" },
  { value: "truck", label: "Truck / Pickup", icon: "🛻" },
  { value: "van", label: "Van / Minivan", icon: "🚐" },
  { value: "not_sure", label: "Not Sure Yet", icon: "🤔" },
];

const creditOptions = [
  { value: "no_credit", label: "No Credit History", sub: "First time borrower" },
  { value: "bad_300_500", label: "Poor (300–500)", sub: "Rebuilding credit" },
  { value: "fair_500_600", label: "Fair (500–600)", sub: "Some history" },
  { value: "good_600_plus", label: "Good (600+)", sub: "Decent credit" },
  { value: "bankruptcy", label: "Recent Bankruptcy", sub: "Chapter 7 or 13" },
  { value: "repo", label: "Past Repossession", sub: "Previous repo on record" },
];

const incomeOptions = [
  { value: "under_1500", label: "Under $1,500/mo" },
  { value: "1500_2500", label: "$1,500 – $2,500/mo" },
  { value: "2500_4000", label: "$2,500 – $4,000/mo" },
  { value: "over_4000", label: "Over $4,000/mo" },
];

const socialProof = [
  { initials: "MT", name: "Marcus T.", location: "Phoenix, AZ", score: "492", text: "Matched in 10 minutes. Drove home same day." },
  { initials: "JR", name: "Jennifer R.", location: "Dallas, TX", score: "No Credit", text: "First car ever. No credit. Got approved easily." },
  { initials: "DM", name: "David M.", location: "Chicago, IL", score: "538", text: "Post-bankruptcy. Got a rate we could afford." },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  borderRadius: "0.625rem",
  border: "1px solid oklch(0.88 0.007 80)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  color: "oklch(0.15 0.02 240)",
  background: "white",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "oklch(0.35 0.02 240)",
  marginBottom: "0.4rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicle: "", credit: "", income: "",
    firstName: "", lastName: "", email: "", phone: "", zip: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (currentStep < 3) setTimeout(() => setCurrentStep((s) => s + 1), 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
          <div
            className="max-w-lg w-full text-center p-10 rounded-2xl"
            style={{ background: "white", border: "2px solid oklch(0.58 0.13 185)", boxShadow: "0 20px 60px oklch(0.58 0.13 185 / 0.18)" }}
          >
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6"
              style={{ background: "oklch(0.58 0.13 185)", color: "white", fontSize: "2rem" }}
            >
              ✓
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.02 240)", fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              You're Pre-Approved!
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.42 0.015 240)", fontSize: "1rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              Great news, {formData.firstName}. Based on your profile, we've matched you with lenders in your area. Check your email at{" "}
              <strong style={{ color: "oklch(0.18 0.06 240)" }}>{formData.email}</strong> for your personalized offers.
            </p>
            <div className="p-4 rounded-xl text-left mb-6" style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "oklch(0.35 0.02 240)", lineHeight: 1.65 }}>
                <strong>What happens next:</strong> A loan specialist will call you within 2 hours (Mon–Sat 8am–8pm). Have your driver's license and proof of income ready.
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "oklch(0.58 0.13 185 / 0.1)", color: "oklch(0.42 0.12 185)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <Shield size={11} />
              Soft credit check only — your score is safe
            </span>
          </div>
        </div>
      </Layout>
    );
  }

  const progressPct = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <Layout>
      <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "oklch(0.98 0.005 80)" }}>

        {/* ── Left Panel: Dark Social Proof ── */}
        <div
          className="lg:w-[420px] xl:w-[480px] shrink-0 flex flex-col justify-between p-8 lg:p-12"
          style={{ background: "oklch(0.18 0.06 240)", minHeight: "100px" }}
        >
          <div>
            {/* Header */}
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: "oklch(0.58 0.13 185 / 0.18)", border: "1px solid oklch(0.68 0.12 185 / 0.35)", color: "oklch(0.82 0.09 185)", fontFamily: "'DM Sans', sans-serif" }}
              >
                <Star size={9} fill="currentColor" />
                Free · No Obligation
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "0.75rem" }}>
                Check Your Approval Odds in 2 Minutes
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                Bad credit, no credit, bankruptcy, or repossession — we match you with lenders who say yes.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: <Users size={16} />, value: "50K+", label: "People Matched" },
                { icon: <Award size={16} />, value: "98%", label: "Approval Rate" },
                { icon: <Zap size={16} />, value: "2 min", label: "Application" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center p-3 rounded-xl"
                  style={{ background: "oklch(0.24 0.06 240)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span style={{ color: "oklch(0.68 0.12 185)", marginBottom: "0.25rem" }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.125rem", fontWeight: 700, lineHeight: 1 }}>{s.value}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Stories */}
            <div className="flex flex-col gap-3 mb-8">
              {socialProof.map((p) => (
                <div
                  key={p.name}
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ background: "oklch(0.22 0.06 240)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold text-white shrink-0"
                    style={{ background: "oklch(0.58 0.13 185)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.8rem", fontWeight: 600 }}>{p.name}</span>
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded-full shrink-0"
                        style={{ background: "oklch(0.58 0.13 185 / 0.2)", color: "oklch(0.72 0.10 185)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        ✓ Approved
                      </span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.50)", fontSize: "0.75rem", lineHeight: 1.4 }}>
                      {p.location} · Score: {p.score}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", marginTop: "0.25rem", fontStyle: "italic" }}>
                      "{p.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-col gap-2 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { icon: <Shield size={12} />, text: "256-bit SSL Encrypted" },
              { icon: <CheckCircle2 size={12} />, text: "Soft credit check only — won't affect your score" },
              { icon: <Star size={12} fill="currentColor" />, text: "4.8/5 from 2,400+ verified reviews" },
            ].map((t) => (
              <span key={t.text} className="flex items-center gap-2 text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: "oklch(0.68 0.12 185)", flexShrink: 0 }}>{t.icon}</span>
                {t.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-14" style={{ background: "oklch(0.98 0.005 80)" }}>
          <div style={{ maxWidth: "520px", width: "100%" }}>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "oklch(0.58 0.13 185)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Step {currentStep} of {steps.length}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "oklch(0.55 0.015 240)" }}>
                  {Math.round(progressPct)}% complete
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.90 0.006 80)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct + 25}%`, background: "oklch(0.58 0.13 185)" }}
                />
              </div>
              {/* Step Labels */}
              <div className="flex justify-between mt-2">
                {steps.map((step) => (
                  <span
                    key={step.id}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: currentStep === step.id ? 700 : 500,
                      color: currentStep >= step.id ? "oklch(0.58 0.13 185)" : "oklch(0.68 0.015 240)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "white", border: "1px solid oklch(0.90 0.006 80)", boxShadow: "0 6px 32px oklch(0.18 0.06 240 / 0.08)" }}
            >
              {/* Step 1: Vehicle */}
              {currentStep === 1 && (
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.02 240)", fontSize: "1.375rem", fontWeight: 700, marginBottom: "1.5rem", lineHeight: 1.2 }}>
                    {steps[0].title}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {vehicleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect("vehicle", opt.value)}
                        className="p-4 rounded-xl text-center transition-all duration-200"
                        style={{
                          border: formData.vehicle === opt.value ? "2px solid oklch(0.58 0.13 185)" : "1.5px solid oklch(0.88 0.007 80)",
                          background: formData.vehicle === opt.value ? "oklch(0.58 0.13 185 / 0.07)" : "white",
                          fontFamily: "'DM Sans', sans-serif",
                          transform: formData.vehicle === opt.value ? "scale(1.03)" : "scale(1)",
                          boxShadow: formData.vehicle === opt.value ? "0 4px 16px oklch(0.58 0.13 185 / 0.15)" : "none",
                        }}
                      >
                        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{opt.icon}</div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "oklch(0.15 0.02 240)" }}>{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Credit */}
              {currentStep === 2 && (
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.02 240)", fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.2 }}>
                    {steps[1].title}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.52 0.015 240)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    We work with all credit situations. Be honest — it helps us find the best match.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {creditOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect("credit", opt.value)}
                        className="p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          border: formData.credit === opt.value ? "2px solid oklch(0.58 0.13 185)" : "1.5px solid oklch(0.88 0.007 80)",
                          background: formData.credit === opt.value ? "oklch(0.58 0.13 185 / 0.07)" : "white",
                          fontFamily: "'DM Sans', sans-serif",
                          boxShadow: formData.credit === opt.value ? "0 4px 16px oklch(0.58 0.13 185 / 0.15)" : "none",
                        }}
                      >
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "oklch(0.15 0.02 240)" }}>{opt.label}</div>
                        <div style={{ fontSize: "0.75rem", color: "oklch(0.52 0.015 240)", marginTop: "0.2rem" }}>{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Income */}
              {currentStep === 3 && (
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.02 240)", fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.2 }}>
                    {steps[2].title}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.52 0.015 240)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Include all income sources: job, benefits, child support, etc.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {incomeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect("income", opt.value)}
                        className="p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          border: formData.income === opt.value ? "2px solid oklch(0.58 0.13 185)" : "1.5px solid oklch(0.88 0.007 80)",
                          background: formData.income === opt.value ? "oklch(0.58 0.13 185 / 0.07)" : "white",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "oklch(0.15 0.02 240)",
                          boxShadow: formData.income === opt.value ? "0 4px 16px oklch(0.58 0.13 185 / 0.15)" : "none",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.02 240)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 18px oklch(0.76 0.16 75 / 0.38)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    Continue
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Step 4: Contact */}
              {currentStep === 4 && (
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.02 240)", fontSize: "1.375rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.2 }}>
                    {steps[3].title}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.52 0.015 240)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    We'll send your personalized offers here. No spam, ever.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label style={labelStyle}>First Name *</label>
                        <input
                          type="text" required value={formData.firstName}
                          onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                          style={inputStyle} placeholder="Maria"
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.58 0.13 185)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.58 0.13 185 / 0.12)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.007 80)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name *</label>
                        <input
                          type="text" required value={formData.lastName}
                          onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                          style={inputStyle} placeholder="Garcia"
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.58 0.13 185)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.58 0.13 185 / 0.12)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.007 80)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        style={inputStyle} placeholder="maria@email.com"
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.58 0.13 185)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.58 0.13 185 / 0.12)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.007 80)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label style={labelStyle}>Phone Number *</label>
                        <input
                          type="tel" required value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          style={inputStyle} placeholder="(555) 000-0000"
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.58 0.13 185)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.58 0.13 185 / 0.12)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.007 80)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>ZIP Code *</label>
                        <input
                          type="text" required maxLength={5} value={formData.zip}
                          onChange={(e) => setFormData((p) => ({ ...p, zip: e.target.value }))}
                          style={inputStyle} placeholder="75001"
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.58 0.13 185)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px oklch(0.58 0.13 185 / 0.12)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "oklch(0.88 0.007 80)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
                      style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.02 240)", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 6px 24px oklch(0.76 0.16 75 / 0.42)", fontSize: "1rem" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 32px oklch(0.76 0.16 75 / 0.48)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px oklch(0.76 0.16 75 / 0.42)"; }}
                    >
                      Get My Approval Offers
                      <ArrowRight size={16} />
                    </button>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "oklch(0.62 0.015 240)", textAlign: "center", lineHeight: 1.5 }}>
                      By submitting, you agree to our Terms and consent to be contacted by phone or email. Soft credit check only.
                    </p>
                  </form>
                </div>
              )}

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="flex items-center gap-1.5 mt-5 text-sm transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.52 0.015 240)", background: "none", border: "none" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(0.35 0.02 240)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "oklch(0.52 0.015 240)"}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
