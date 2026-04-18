/* =============================================================================
   COMPLETE AUTO LOANS — Apply Page (Multi-Step Lead Capture Form)
   4-step quiz-style form: Vehicle → Credit → Income → Contact
   Design: Editorial Finance — Navy/Teal/Orange brand colors
   ============================================================================= */

import { useState } from "react";
import Layout from "../components/Layout";

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

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicle: "",
    credit: "",
    income: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (currentStep < 3) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ backgroundColor: "#F8F7F4" }}
        >
          <div
            className="max-w-lg w-full text-center p-10 rounded-xl shadow-lg"
            style={{ backgroundColor: "white", border: "2px solid #0D9488" }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#0D9488",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
                margin: "0 auto 1.5rem",
              }}
            >
              ✓
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#1A365D",
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              You're Pre-Approved!
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: "#4B5563",
                fontSize: "1rem",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Great news, {formData.firstName}. Based on your profile, we've matched you with lenders in your area. Check your email at <strong>{formData.email}</strong> for your personalized offers within the next few minutes.
            </p>
            <div
              className="p-4 rounded-lg text-left mb-6"
              style={{ backgroundColor: "#F0FDF9", border: "1px solid #CCFBF1" }}
            >
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: "#374151" }}>
                <strong>What happens next:</strong> A loan specialist will call you within 2 hours during business hours (Mon–Sat 8am–8pm). Have your driver's license and proof of income ready to speed up the process.
              </p>
            </div>
            <span className="teal-badge text-sm">Soft credit check only — your score is safe</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen px-4 py-12"
        style={{ backgroundColor: "#F8F7F4" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#1A365D",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Check Your Approval Odds
            </h1>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.95rem" }}>
              Takes 2 minutes · Soft credit check only · Won't affect your score
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  style={{ flex: 1 }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: currentStep >= step.id ? "#0D9488" : "#E5E0D8",
                      color: currentStep >= step.id ? "white" : "#9CA3AF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      transition: "background-color 0.3s ease",
                      margin: "0 auto",
                    }}
                  >
                    {currentStep > step.id ? "✓" : step.id}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: currentStep >= step.id ? "#0D9488" : "#9CA3AF",
                      marginTop: "0.25rem",
                      fontWeight: currentStep === step.id ? 600 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                height: "4px",
                backgroundColor: "#E5E0D8",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "#0D9488",
                  borderRadius: "2px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div
            className="rounded-xl shadow-md p-6 md:p-8"
            style={{ backgroundColor: "white", border: "1px solid #E5E0D8" }}
          >
            {/* Step 1: Vehicle */}
            {currentStep === 1 && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                  }}
                >
                  {steps[0].title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect("vehicle", opt.value)}
                      className="p-4 rounded-lg text-center transition-all"
                      style={{
                        border: formData.vehicle === opt.value ? "2px solid #0D9488" : "1px solid #E5E0D8",
                        backgroundColor: formData.vehicle === opt.value ? "#F0FDF9" : "white",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{opt.icon}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1A365D" }}>{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Credit */}
            {currentStep === 2 && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {steps[1].title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  We work with all credit situations. Be honest — it helps us find the best match.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {creditOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect("credit", opt.value)}
                      className="p-4 rounded-lg text-left transition-all"
                      style={{
                        border: formData.credit === opt.value ? "2px solid #0D9488" : "1px solid #E5E0D8",
                        backgroundColor: formData.credit === opt.value ? "#F0FDF9" : "white",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A365D" }}>{opt.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "0.2rem" }}>{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Income */}
            {currentStep === 3 && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {steps[2].title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  Include all income sources: job, benefits, child support, etc.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {incomeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect("income", opt.value)}
                      className="p-4 rounded-lg text-left transition-all"
                      style={{
                        border: formData.income === opt.value ? "2px solid #0D9488" : "1px solid #E5E0D8",
                        backgroundColor: formData.income === opt.value ? "#F0FDF9" : "white",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#1A365D",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn-cta w-full mt-4"
                  style={{ marginTop: "1.5rem" }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A365D",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {steps[3].title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#6B7280", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  We'll send your personalized offers here. No spam, ever.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-md text-sm"
                        style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", color: "#1A365D" }}
                        placeholder="Maria"
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-md text-sm"
                        style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", color: "#1A365D" }}
                        placeholder="Garcia"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-md text-sm"
                      style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", color: "#1A365D" }}
                      placeholder="maria@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-md text-sm"
                        style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", color: "#1A365D" }}
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.4rem" }}>
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={formData.zip}
                        onChange={(e) => setFormData((p) => ({ ...p, zip: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-md text-sm"
                        style={{ border: "1px solid #E5E0D8", fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none", color: "#1A365D" }}
                        placeholder="75001"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-cta w-full text-base">
                    Get My Approval Offers →
                  </button>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", color: "#9CA3AF", textAlign: "center", lineHeight: 1.5 }}>
                    By submitting, you agree to our Terms and consent to be contacted by phone or email. Soft credit check only.
                  </p>
                </form>
              </div>
            )}

            {/* Back Button */}
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "#6B7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "1.25rem",
                  display: "block",
                }}
              >
                ← Back
              </button>
            )}
          </div>

          {/* Trust Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {[
              "🔒 256-bit SSL Encrypted",
              "✓ Soft Credit Check Only",
              "★ 4.8/5 from 2,400+ reviews",
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "#6B7280",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
