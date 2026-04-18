/* =============================================================================
   COMPLETE AUTO LOANS — Layout Component
   Design: Editorial Finance — Playfair Display headings, DM Sans body
   Navy (#1A365D) header, warm off-white (#F8F7F4) background
   ============================================================================= */

import { useState } from "react";
import { Link, useLocation } from "wouter";

const LOGO_URL = "/manus-storage/logo_final_d27ae39a.png";

const navLinks = [
  { label: "Best-Of Lists", href: "/best-bad-credit-auto-loans" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Buy Here Pay Here", href: "/best-buy-here-pay-here-dealerships" },
  { label: "No Money Down", href: "/best-no-money-down-car-loans" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F7F4", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1A365D" }} className="sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <img
                src={LOGO_URL}
                alt="Complete Auto Loans"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    color: location === link.href ? "#0D9488" : "rgba(255,255,255,0.85)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/apply">
                <button className="btn-cta text-sm px-5 py-2.5">
                  Get Pre-Approved
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <div className="w-6 h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2.5 text-sm text-white/85 hover:text-white"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/apply" onClick={() => setMenuOpen(false)}>
                <button className="btn-cta w-full mt-3 text-sm">
                  Get Pre-Approved
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1A365D", color: "rgba(255,255,255,0.75)" }} className="mt-16">
        <div className="container mx-auto px-4 max-w-6xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <img
                src={LOGO_URL}
                alt="Complete Auto Loans"
                className="h-9 w-auto mb-3"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                Helping real people get approved for auto loans regardless of their credit history since 2010.
              </p>
            </div>

            {/* Best-Of Pages */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Best-Of Lists</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Bad Credit Auto Loans", href: "/best-bad-credit-auto-loans" },
                  { label: "Buy Here Pay Here", href: "/best-buy-here-pay-here-dealerships" },
                  { label: "No Money Down", href: "/best-no-money-down-car-loans" },
                  { label: "Guaranteed Approval", href: "/best-guaranteed-approval-auto-loans" },
                  { label: "No Credit Check", href: "/best-no-credit-check-car-loans" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', system-ui, sans-serif" }} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialty Loans */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Specialty Loans</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "After Bankruptcy", href: "/best-car-loans-after-bankruptcy" },
                  { label: "After Repossession", href: "/best-auto-loans-after-repossession" },
                  { label: "Second Chance", href: "/best-second-chance-auto-loans" },
                  { label: "ITIN Auto Loans", href: "/best-itin-auto-loans" },
                  { label: "First-Time Buyers", href: "/best-first-time-car-buyer-loans" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', system-ui, sans-serif" }} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Company</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "Get Pre-Approved", href: "/apply" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', system-ui, sans-serif" }} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-white/10 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
            <p>© 2026 Complete Auto Loans. All rights reserved.</p>
            <p className="max-w-lg text-right leading-relaxed">
              Complete Auto Loans is an independent comparison service, not a lender. We may receive compensation when you click on partner links. Our editorial rankings are independent of any commercial relationships.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
