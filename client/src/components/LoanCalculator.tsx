/**
 * LoanCalculator — Complete Auto Loans
 * Design: Premium Editorial Finance
 *
 * Interactive auto loan calculator:
 * - Loan amount slider ($3,000 – $50,000)
 * - APR slider (3.9% – 29.9%)
 * - Term selector (24, 36, 48, 60, 72 months)
 * - Outputs: monthly payment, total interest, total cost
 * - Contextual messaging for subprime borrowers
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator } from "lucide-react";

function calcMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  if (annualRate === 0) return principal / termMonths;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatCurrencyDecimal(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

const TERMS = [24, 36, 48, 60, 72];

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(12000);
  const [apr, setApr] = useState(18);
  const [termMonths, setTermMonths] = useState(60);

  const monthly = useMemo(() => calcMonthlyPayment(loanAmount, apr, termMonths), [loanAmount, apr, termMonths]);
  const totalCost = useMemo(() => monthly * termMonths, [monthly, termMonths]);
  const totalInterest = useMemo(() => totalCost - loanAmount, [totalCost, loanAmount]);

  // Contextual tip based on APR
  const aprTip = useMemo(() => {
    if (apr <= 8) return "Excellent rate — typically requires a credit score above 700.";
    if (apr <= 14) return "Good rate — typical for scores in the 620–700 range.";
    if (apr <= 20) return "Fair rate — common for scores in the 500–620 range. On-time payments can help you refinance lower within 12–18 months.";
    return "High rate — typical for scores below 500. Consider a larger down payment to reduce the loan amount and total interest paid.";
  }, [apr]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid oklch(0.90 0.006 80)", background: "white" }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Calculator size={18} style={{ color: "oklch(0.65 0.085 186)" }} />
        <div>
          <p className="font-bold text-white text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Auto Loan Payment Calculator
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
            Estimate your monthly payment before you apply
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Loan Amount
                </label>
                <span
                  className="text-sm font-bold px-3 py-0.5 rounded-full"
                  style={{ background: "oklch(0.578 0.098 186 / 0.10)", color: "oklch(0.38 0.12 185)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={50000}
                step={500}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "oklch(0.578 0.098 186)", cursor: "pointer" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "oklch(0.60 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                <span>$3,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* APR */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Interest Rate (APR)
                </label>
                <span
                  className="text-sm font-bold px-3 py-0.5 rounded-full"
                  style={{ background: "oklch(0.578 0.098 186 / 0.10)", color: "oklch(0.38 0.12 185)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {apr.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={3.9}
                max={29.9}
                step={0.1}
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "oklch(0.578 0.098 186)", cursor: "pointer" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "oklch(0.60 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                <span>3.9% (excellent)</span>
                <span>29.9% (subprime)</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Loan Term
              </label>
              <div className="flex gap-2 flex-wrap">
                {TERMS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTermMonths(t)}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: termMonths === t ? "oklch(0.578 0.098 186)" : "oklch(0.97 0.004 80)",
                      color: termMonths === t ? "white" : "oklch(0.40 0.04 251)",
                      border: termMonths === t ? "1px solid oklch(0.578 0.098 186)" : "1px solid oklch(0.88 0.006 80)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
            </div>

            {/* APR tip */}
            <div
              className="p-3 rounded-xl text-xs leading-relaxed"
              style={{ background: "oklch(0.578 0.098 186 / 0.06)", border: "1px solid oklch(0.578 0.098 186 / 0.15)", color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <strong style={{ color: "oklch(0.38 0.12 185)" }}>Rate context:</strong> {aprTip}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {/* Monthly Payment — hero stat */}
            <div
              className="p-6 rounded-2xl text-center"
              style={{ background: "oklch(0.311 0.065 251)", boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.20)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Estimated Monthly Payment
              </p>
              <p
                className="font-bold"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.25rem, 5vw, 3rem)", color: "white", lineHeight: 1.1 }}
              >
                {formatCurrencyDecimal(monthly)}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'DM Sans', sans-serif" }}>
                per month for {termMonths} months
              </p>
            </div>

            {/* Breakdown */}
            <div
              className="p-5 rounded-2xl flex flex-col gap-3"
              style={{ background: "oklch(0.97 0.004 80)", border: "1px solid oklch(0.90 0.006 80)" }}
            >
              {[
                { label: "Loan Amount", value: formatCurrency(loanAmount) },
                { label: "Total Interest Paid", value: formatCurrency(totalInterest), highlight: true },
                { label: "Total Cost of Loan", value: formatCurrency(totalCost) },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "oklch(0.45 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    {row.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: row.highlight ? "oklch(0.55 0.12 30)" : "oklch(0.18 0.04 251)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.60 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
              This calculator provides estimates only. Actual rates and payments depend on your credit profile, lender, and loan terms. Does not include taxes, fees, or insurance.
            </p>

            {/* CTA */}
            <Link href="/apply/">
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: "oklch(0.76 0.16 75)",
                  color: "oklch(0.15 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 3px 14px oklch(0.76 0.16 75 / 0.35)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)"; }}
              >
                Get My Real Rate — No Hard Pull
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
