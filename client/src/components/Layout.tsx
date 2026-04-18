/**
 * Layout — Complete Auto Loans
 * Design: Premium Editorial Finance
 * - Dark navy header with teal accents and amber CTA
 * - Scrolled state: adds shadow
 * - Dropdown for Best-Of Guides
 * - Rich 4-column footer
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Shield, Phone, Star } from "lucide-react";

const bestOfLinks = [
  { label: "Bad Credit Auto Loans", href: "/best-bad-credit-auto-loans" },
  { label: "Buy Here Pay Here", href: "/best-buy-here-pay-here-dealerships" },
  { label: "No Money Down", href: "/best-no-money-down-car-loans" },
  { label: "Guaranteed Approval", href: "/best-guaranteed-approval-auto-loans" },
  { label: "No Credit Check", href: "/best-no-credit-check-car-loans" },
  { label: "Pre-Approved Loans", href: "/best-pre-approved-car-loans" },
  { label: "First-Time Buyers", href: "/best-first-time-car-buyer-loans" },
  { label: "After Bankruptcy", href: "/best-car-loans-after-bankruptcy" },
  { label: "After Repossession", href: "/best-auto-loans-after-repossession" },
  { label: "Second Chance", href: "/best-second-chance-auto-loans" },
  { label: "ITIN Auto Loans", href: "/best-itin-auto-loans" },
  { label: "Refinance Bad Credit", href: "/best-refinance-bad-credit" },
  { label: "Low Income Buyers", href: "/best-low-income-car-loans" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 80)" }}>

      {/* ── Top Bar ── */}
      <div style={{ background: "oklch(0.14 0.05 240)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container flex items-center justify-between" style={{ paddingTop: "0.4rem", paddingBottom: "0.4rem" }}>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Shield size={10} style={{ color: "oklch(0.65 0.085 186)" }} />
              256-bit SSL Encrypted
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span style={{ color: "oklch(0.65 0.085 186)", fontSize: "10px" }}>✓</span>
              Soft Credit Check Only — Won't Affect Your Score
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "oklch(0.65 0.085 186)" }}>
            <Star size={10} fill="currentColor" />
            <span style={{ color: "rgba(255,255,255,0.55)" }}>4.8/5 from 2,400+ reviews</span>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: "oklch(0.311 0.065 251)",
          boxShadow: scrolled ? "0 4px 24px oklch(0.10 0.05 240 / 0.5)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="container flex items-center justify-between h-[4.25rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/manus-storage/logo_final_95e47a06.png"
              alt="Complete Auto Loans"
              style={{ height: "52px", width: "auto", objectFit: "contain", filter: "brightness(1.15) drop-shadow(0 0 8px oklch(0.578 0.098 186 / 0.35))" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-medium transition-all"
                style={{
                  color: dropdownOpen ? "oklch(0.70 0.075 186)" : "rgba(255,255,255,0.8)",
                  background: dropdownOpen ? "rgba(255,255,255,0.06)" : "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Best-Of Guides
                <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "oklch(0.20 0.055 240)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 20px 60px oklch(0.10 0.05 240 / 0.7)",
                    width: "230px",
                  }}
                >
                  <div className="p-1.5">
                    {bestOfLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans', sans-serif" }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "rgba(255,255,255,0.06)";
                          el.style.color = "oklch(0.70 0.075 186)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "transparent";
                          el.style.color = "rgba(255,255,255,0.72)";
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/how-it-works"
              className="px-3.5 py-2 rounded-md text-sm font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              How It Works
            </Link>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/apply">
              <button
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-md transition-all"
                style={{
                  background: "oklch(0.76 0.16 75)",
                  color: "oklch(0.15 0.04 251)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 2px 12px oklch(0.76 0.16 75 / 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px oklch(0.76 0.16 75 / 0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px oklch(0.76 0.16 75 / 0.35)";
                }}
              >
                Get Pre-Approved
              </button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md transition-colors"
              style={{ color: "rgba(255,255,255,0.8)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: "oklch(0.15 0.055 240)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="container py-4 flex flex-col gap-0.5">
              <p className="text-xs font-bold uppercase tracking-widest px-3 pb-2" style={{ color: "oklch(0.65 0.085 186)" }}>Best-Of Guides</p>
              {bestOfLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
                <Link href="/how-it-works" className="block px-3 py-2.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                  How It Works
                </Link>
                <Link href="/apply">
                  <button className="mt-3 w-full py-3 rounded-md font-bold text-sm" style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Get Pre-Approved — Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer style={{ background: "oklch(0.13 0.05 240)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-md font-bold text-xs" style={{ background: "linear-gradient(135deg, oklch(0.578 0.098 186), oklch(0.48 0.13 185))", color: "white", fontFamily: "'Playfair Display', serif" }}>CA</div>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Complete Auto Loans</span>
                  <span className="text-xs" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>#1 Rated Bad Credit Network</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Helping real people get approved for auto loans regardless of their credit history since 2010.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>Best-Of Lists</h4>
              <ul className="space-y-2.5">
                {[
                  ["Bad Credit Auto Loans", "/best-bad-credit-auto-loans"],
                  ["Buy Here Pay Here", "/best-buy-here-pay-here-dealerships"],
                  ["No Money Down", "/best-no-money-down-car-loans"],
                  ["Guaranteed Approval", "/best-guaranteed-approval-auto-loans"],
                  ["No Credit Check", "/best-no-credit-check-car-loans"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>Specialty Loans</h4>
              <ul className="space-y-2.5">
                {[
                  ["After Bankruptcy", "/best-car-loans-after-bankruptcy"],
                  ["After Repossession", "/best-auto-loans-after-repossession"],
                  ["Second Chance", "/best-second-chance-auto-loans"],
                  ["ITIN Auto Loans", "/best-itin-auto-loans"],
                  ["First-Time Buyers", "/best-first-time-car-buyer-loans"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}>Company</h4>
              <ul className="space-y-2.5">
                {[["How It Works", "/how-it-works"], ["Get Pre-Approved", "/apply"]].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "3rem", paddingTop: "1.5rem" }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}>© 2026 Complete Auto Loans. All rights reserved.</p>
            <p className="text-xs max-w-lg sm:text-right leading-relaxed" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif" }}>
              Complete Auto Loans is a lead generation and comparison service, not a lender. Approval is not guaranteed. Rates and terms vary by lender.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
