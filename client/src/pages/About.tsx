import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Mail, Star, Shield, Users, Award } from "lucide-react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

const SITE_URL = "https://completeautoloans.com";

function buildAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    name: "About Complete Auto Loans",
    description:
      "Complete Auto Loans is a bad credit auto loan matching network based in Everett, WA. We connect borrowers with subprime specialty lenders across the United States.",
    mainEntity: {
      "@type": "Organization",
      name: "Complete Auto Loans",
      url: SITE_URL,
      foundingDate: "2015",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2911 Hewitt Ave, Ste 5",
        addressLocality: "Everett",
        addressRegion: "WA",
        postalCode: "98201",
        addressCountry: "US",
      },
      telephone: "+14257618500",
      email: "info@completeautoloans.com",
      sameAs: ["https://www.facebook.com/completeautoloans/"],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "238",
        bestRating: "5",
        worstRating: "1",
      },
      employee: [
        {
          "@type": "Person",
          name: "James Mitchell",
          jobTitle: "Auto Finance Editor",
          description:
            "James Mitchell has covered subprime auto lending and consumer finance for over 10 years. He reviews lender policies, rate data, and approval criteria to produce the editorial content on Complete Auto Loans.",
        },
      ],
    },
  };
}

const stats = [
  { value: "50,000+", label: "Borrowers Matched", icon: <Users size={20} /> },
  { value: "5.0 / 5", label: "Facebook Rating", icon: <Star size={20} /> },
  { value: "238", label: "Verified Reviews", icon: <Award size={20} /> },
  { value: "10+", label: "Years in Business", icon: <Shield size={20} /> },
];

export default function About() {
  useSEO({
    title: "About Complete Auto Loans — Bad Credit Auto Loan Network | Everett, WA",
    description:
      "Complete Auto Loans is a bad credit auto loan matching network based in Everett, WA. Learn about our mission, our team, and how we connect borrowers with lenders who say yes.",
    canonical: "/about",
    schema: [
      buildAboutPageSchema(),
      buildWebPageSchema({
        title: "About Complete Auto Loans",
        description:
          "Complete Auto Loans is a bad credit auto loan matching network based in Everett, WA. We connect borrowers with subprime specialty lenders across the United States.",
        url: "/about",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="py-16 md:py-20"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/">
              <span className="cursor-pointer" style={{ color: "oklch(0.65 0.085 186)" }}>Home</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.30)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>About</span>
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
              Our Story
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
              We Built This for the People Banks Turned Away
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
              }}
            >
              Complete Auto Loans started with a simple observation: millions of Americans need a car to get to work, but their credit history makes traditional lenders say no. We decided to build something different.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ background: "oklch(0.24 0.05 251)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="flex items-center justify-center gap-2 mb-1"
                  style={{ color: "oklch(0.65 0.085 186)" }}
                >
                  {s.icon}
                  <span
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.value}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission Section ── */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="section-label mb-3">Our Mission</div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "oklch(0.15 0.04 251)",
                  lineHeight: 1.15,
                }}
              >
                Connecting Real People with Lenders Who Say Yes
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: "oklch(0.35 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
              >
                <p>
                  Complete Auto Loans is a bad credit auto loan matching network based in Everett, Washington. Since 2015, we have connected tens of thousands of borrowers — people with bad credit, no credit, bankruptcies, and repossessions — with lenders who specialize in exactly their situation.
                </p>
                <p>
                  We are not a lender. We are a matching service. Our job is to take your profile and find the lenders in our network who are most likely to approve you at the best available rate. We do this with a soft credit check that does not affect your score, and we return results in minutes.
                </p>
                <p>
                  We believe that a number on a credit report should not permanently define your access to transportation. A car is not a luxury — it is how you get to work, take your kids to school, and manage your daily life. We exist to make sure that access is available to everyone.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Values */}
              {[
                {
                  title: "Transparency First",
                  desc: "We show you real offers from real lenders — not estimates, not guesses. Every offer you see is a genuine pre-approval from a lender who has reviewed your profile.",
                  color: "oklch(0.578 0.098 186)",
                },
                {
                  title: "No Hard Credit Pull",
                  desc: "Our matching process uses a soft inquiry that is invisible to other lenders and has zero impact on your credit score. You can check your options without any risk.",
                  color: "oklch(0.76 0.16 75)",
                },
                {
                  title: "Subprime Specialists Only",
                  desc: "Every lender in our network has been vetted for their willingness and ability to work with borrowers in challenging credit situations. We do not send your application to lenders who will just decline you.",
                  color: "oklch(0.578 0.098 186)",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="p-5 rounded-2xl"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.88 0.008 80)",
                    borderLeft: `4px solid ${v.color}`,
                  }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.15 0.04 251)",
                      fontSize: "1rem",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial Team ── */}
      <section className="py-16" style={{ background: "oklch(0.96 0.006 80)" }}>
        <div className="container">
          <div className="section-label mb-3">Our Team</div>
          <h2
            className="mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "oklch(0.15 0.04 251)",
            }}
          >
            The People Behind the Content
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {/* James Mitchell */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid oklch(0.88 0.008 80)",
                boxShadow: "0 4px 16px oklch(0.311 0.065 251 / 0.06)",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/james-mitchell-headshot-bnw2b4JcPE3BrZh9wS8vWe.webp"
                  alt="James Mitchell — Auto Finance Editor"
                  className="w-14 h-14 rounded-full object-cover object-top shrink-0"
                  style={{ border: "2px solid oklch(0.578 0.098 186 / 0.35)" }}
                />
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.15 0.04 251)" }}
                  >
                    James Mitchell
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Auto Finance Editor
                  </p>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
              >
                James has covered subprime auto lending and consumer finance for over 10 years. He reviews lender policies, rate data, and approval criteria to produce the editorial rankings and guides on Complete Auto Loans. His work focuses on giving borrowers the honest, specific information they need to make good decisions — not generic advice that ignores their actual situation.
              </p>
            </div>

            {/* Editorial Standards */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "oklch(0.311 0.065 251)",
                boxShadow: "0 4px 16px oklch(0.311 0.065 251 / 0.20)",
              }}
            >
              <h3
                className="font-bold text-base text-white mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Our Editorial Standards
              </h3>
              <div className="space-y-3">
                {[
                  "No paid placements in our lender rankings",
                  "Rate data updated monthly from lender disclosures",
                  "All approval criteria verified directly with lenders",
                  "Advertiser relationships disclosed on every page",
                  "Content reviewed annually for accuracy",
                ].map((item) => (
                  <p
                    key={item}
                    className="text-sm flex items-start gap-2"
                    style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span style={{ color: "oklch(0.65 0.085 186)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact / Location ── */}
      <section className="py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl">
            <div>
              <div className="section-label mb-3">Contact Us</div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "oklch(0.15 0.04 251)",
                }}
              >
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} style={{ color: "oklch(0.578 0.098 186)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Office Address
                    </p>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      2911 Hewitt Ave, Ste 5<br />
                      Everett, WA 98201
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} style={{ color: "oklch(0.578 0.098 186)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Phone
                    </p>
                    <a
                      href="tel:+14257618500"
                      className="text-sm mt-0.5 block"
                      style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      425-761-8500
                    </a>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.60 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Mon–Fri 8am–6pm PT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} style={{ color: "oklch(0.578 0.098 186)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:info@completeautoloans.com"
                      className="text-sm mt-0.5 block"
                      style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      info@completeautoloans.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid oklch(0.88 0.008 80)",
                boxShadow: "0 4px 16px oklch(0.311 0.065 251 / 0.06)",
              }}
            >
              <h3
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  color: "oklch(0.15 0.04 251)",
                }}
              >
                Why Borrowers Trust Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.578 0.098 186 / 0.10)" }}
                  >
                    <Star size={14} style={{ color: "oklch(0.578 0.098 186)" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      5.0 / 5 Rating — 238 Reviews
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Verified Facebook reviews from real borrowers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.76 0.16 75 / 0.10)" }}
                  >
                    <Shield size={14} style={{ color: "oklch(0.55 0.12 75)" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      TrustedForm Certified
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Every lead is certified by ActiveProspect for TCPA compliance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.578 0.098 186 / 0.10)" }}
                  >
                    <Award size={14} style={{ color: "oklch(0.578 0.098 186)" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      10+ Years in Business
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Serving borrowers since 2015 from Everett, WA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14" style={{ background: "oklch(0.311 0.065 251)" }}>
        <div className="container text-center">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Ready to Find Your Lender?
          </h2>
          <p
            className="mb-8 max-w-lg mx-auto"
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            No minimum credit score. Soft pull only. Results in 2 minutes.
          </p>
          <Link href="/apply">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: "oklch(0.76 0.16 75)",
                color: "oklch(0.12 0.04 251)",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 20px oklch(0.76 0.16 75 / 0.40)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Check My Approval Odds — Free
              <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
