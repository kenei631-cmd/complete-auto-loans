import { Link } from "wouter";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/data/blogPosts";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Credit & Financing": {
    bg: "oklch(0.578 0.098 186 / 0.12)",
    text: "oklch(0.42 0.085 186)",
  },
  "Bankruptcy & Recovery": {
    bg: "oklch(0.76 0.16 75 / 0.12)",
    text: "oklch(0.55 0.12 75)",
  },
  "Loan Types": {
    bg: "oklch(0.311 0.065 251 / 0.10)",
    text: "oklch(0.311 0.065 251)",
  },
  "First-Time Buyers": {
    bg: "oklch(0.578 0.098 186 / 0.12)",
    text: "oklch(0.42 0.085 186)",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  useSEO({
    title: "Auto Loan Blog — Bad Credit Car Financing Guides | Complete Auto Loans",
    description:
      "Expert guides on bad credit auto loans, car financing after bankruptcy, credit score requirements, and first-time buyer tips. Updated for 2026.",
    canonical: "/blog",
    schema: [
      buildWebPageSchema({
        title: "Auto Loan Blog — Bad Credit Car Financing Guides",
        description:
          "Expert guides on bad credit auto loans, car financing after bankruptcy, credit score requirements, and first-time buyer tips.",
        url: "/blog",
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  });

  const [featured, ...rest] = blogPosts;

  return (
    <Layout>
      {/* ── Page Header ── */}
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
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Blog</span>
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
              Auto Finance Education
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Bad Credit Auto Loan Guides
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.62)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
              }}
            >
              Honest, answer-first guides on getting approved for a car loan — no matter your credit situation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section className="py-12 md:py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="mb-8">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Featured Guide
            </span>
          </div>

          <Link href={`/blog/${featured.slug}`}>
            <div
              className="group grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: "oklch(0.311 0.065 251)",
                boxShadow: "0 8px 40px oklch(0.311 0.065 251 / 0.22)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 20px 60px oklch(0.311 0.065 251 / 0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 40px oklch(0.311 0.065 251 / 0.22)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Left content — 3 cols */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Category badge */}
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                    style={{
                      background: "oklch(0.578 0.098 186 / 0.20)",
                      color: "oklch(0.78 0.065 186)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <Tag size={10} />
                    {featured.category}
                  </span>

                  <h2
                    className="text-white mb-4 transition-colors"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    className="leading-relaxed mb-6"
                    style={{
                      color: "rgba(255,255,255,0.62)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div
                    className="flex items-center gap-4 text-xs"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {formatDate(featured.publishDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {featured.readingTime} min read
                    </span>
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: "oklch(0.76 0.16 75)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Read Guide
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>

              {/* Right decorative panel — 2 cols */}
              <div
                className="md:col-span-2 hidden md:flex items-center justify-center p-10"
                style={{ background: "oklch(0.24 0.05 251)" }}
              >
                <div className="text-center">
                  <div
                    className="text-7xl font-black mb-3"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.578 0.098 186 / 0.25)",
                      lineHeight: 1,
                    }}
                  >
                    #1
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.65 0.085 186)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Most Asked Question
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    in Auto Financing
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Article Grid ── */}
      <section className="pb-20" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="mb-8">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
            >
              All Guides
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {rest.map((post) => {
              const colors =
                CATEGORY_COLORS[post.category] || CATEGORY_COLORS["Credit & Financing"];
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div
                    className="group flex flex-col h-full p-7 rounded-2xl cursor-pointer transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1px solid oklch(0.88 0.008 80)",
                      boxShadow: "0 2px 12px oklch(0.311 0.065 251 / 0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 12px 36px oklch(0.311 0.065 251 / 0.13)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.578 0.098 186 / 0.40)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 2px 12px oklch(0.311 0.065 251 / 0.06)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.88 0.008 80)";
                    }}
                  >
                    {/* Category */}
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-4 self-start"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <Tag size={9} />
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2
                      className="mb-3 flex-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1875rem",
                        fontWeight: 700,
                        color: "oklch(0.15 0.04 251)",
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "oklch(0.43 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-4"
                      style={{ borderTop: "1px solid oklch(0.93 0.004 80)" }}
                    >
                      <div
                        className="flex items-center gap-3 text-xs"
                        style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(post.publishDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readingTime} min
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
                        style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Read More
                        <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="container text-center">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Ready to Get Approved?
          </h2>
          <p
            className="mb-8 max-w-lg mx-auto"
            style={{
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            Reading about it is the first step. The second step takes 2 minutes.
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
