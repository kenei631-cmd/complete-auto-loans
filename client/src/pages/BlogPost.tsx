import { useRoute, Link } from "wouter";
import { ArrowRight, Clock, Calendar, Tag, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema, buildBreadcrumbSchema, buildFAQSchema, buildSpeakableSchema } from "@/lib/schema";
import { getBlogPost, getRelatedPosts } from "@/data/blogPosts";

const SITE_URL = "https://completeautoloans.com";

function buildArticleSchema(post: {
  title: string;
  metaDescription: string;
  slug: string;
  publishDate: string;
  updatedDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      "@type": "Person",
      name: "James Mitchell",
      jobTitle: "Auto Finance Editor",
      url: `${SITE_URL}/about`,
      description:
        "James Mitchell has covered subprime auto lending and consumer finance for over 10 years. He came to this work after his own experience being turned down by traditional banks following a job loss \u2014 and finding his way back through a specialty lender. His goal with every guide is to give borrowers the honest, specific information he wished he had at the time.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marysville",
        addressRegion: "WA",
        addressCountry: "US",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Complete Auto Loans",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid oklch(0.88 0.008 80)",
            background: openIndex === i ? "white" : "oklch(0.98 0.005 80)",
          }}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <span
              className="font-semibold text-sm leading-snug"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "oklch(0.15 0.04 251)",
              }}
            >
              {faq.question}
            </span>
            <span className="shrink-0" style={{ color: "oklch(0.578 0.098 186)" }}>
              {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
          {openIndex === i && (
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{
                color: "oklch(0.40 0.04 251)",
                fontFamily: "'DM Sans', sans-serif",
                borderTop: "1px solid oklch(0.93 0.004 80)",
                paddingTop: "1rem",
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getBlogPost(slug);
  const related = getRelatedPosts(slug, 3);

  if (!post) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "oklch(0.15 0.04 251)",
            }}
          >
            Article Not Found
          </h1>
          <p className="mt-4 mb-8" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            This article doesn't exist or may have moved.
          </p>
          <Link href="/blog">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{
                background: "oklch(0.578 0.098 186)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Back to Blog
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  useSEO({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `/blog/${post.slug}`,
    ogImage: post.ogImage,
    schema: [
      buildArticleSchema(post),
      buildFAQSchema(post.faqs),
      buildWebPageSchema({
        title: post.metaTitle,
        description: post.metaDescription,
        url: `/blog/${post.slug}`,
      }),
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
      buildSpeakableSchema({
        url: `/blog/${post.slug}`,
        cssSelectors: ["h1", ".article-excerpt", ".prose-article h2", ".prose-article p"],
      }),
    ],
  });

  return (
    <Layout>
      {/* ── Article Hero ── */}
      <section
        className="py-12 md:py-16"
        style={{ background: "oklch(0.311 0.065 251)" }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/">
              <span className="cursor-pointer" style={{ color: "oklch(0.65 0.085 186)" }}>Home</span>
            </Link>
            <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.30)" }} />
            <Link href="/blog">
              <span className="cursor-pointer" style={{ color: "oklch(0.65 0.085 186)" }}>Blog</span>
            </Link>
            <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.30)" }} />
            <span style={{ color: "rgba(255,255,255,0.45)" }} className="truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.578 0.098 186 / 0.20)",
                color: "oklch(0.78 0.065 186)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Tag size={10} />
              {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <Calendar size={11} />
              {formatDate(post.publishDate)}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <Clock size={11} />
              {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "800px",
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="article-excerpt"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              maxWidth: "680px",
            }}
          >
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-7">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/4PVxMbTDNUnbn8uxYc8fXK/james-mitchell-headshot-bnw2b4JcPE3BrZh9wS8vWe.webp"
              alt="James Mitchell"
              className="w-9 h-9 rounded-full object-cover object-top shrink-0"
              style={{ border: "2px solid oklch(0.578 0.098 186 / 0.5)" }}
            />
            <div>
              <p className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                James Mitchell
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Auto Finance Editor · Complete Auto Loans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Body + Sidebar ── */}
      <section className="py-12 md:py-16" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Article HTML */}
              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.28 0.04 251)",
                  lineHeight: 1.75,
                  fontSize: "1rem",
                }}
              />

              {/* FAQ Section */}
              <div className="mt-14">
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.625rem",
                    fontWeight: 700,
                    color: "oklch(0.15 0.04 251)",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={post.faqs} />
              </div>

              {/* Internal links */}
              {post.internalLinks.length > 0 && (
                <div
                  className="mt-10 p-6 rounded-2xl"
                  style={{
                    background: "oklch(0.578 0.098 186 / 0.07)",
                    border: "1px solid oklch(0.578 0.098 186 / 0.20)",
                  }}
                >
                  <h3
                    className="font-bold mb-4 text-sm uppercase tracking-wide"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.42 0.085 186)",
                    }}
                  >
                    Related Resources
                  </h3>
                  <ul className="space-y-2.5">
                    {post.internalLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>
                          <span
                            className="inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors"
                            style={{
                              color: "oklch(0.578 0.098 186)",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            <ArrowRight size={12} />
                            {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Apply CTA */}
              <div
                className="p-6 rounded-2xl sticky top-6"
                style={{
                  background: "oklch(0.311 0.065 251)",
                  boxShadow: "0 8px 32px oklch(0.311 0.065 251 / 0.20)",
                }}
              >
                <h3
                  className="text-white font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}
                >
                  Ready to Get Approved?
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{
                    color: "rgba(255,255,255,0.60)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.55,
                  }}
                >
                  No minimum credit score. Soft pull only. Results in 2 minutes.
                </p>
                <Link href="/apply">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: "oklch(0.76 0.16 75)",
                      color: "oklch(0.12 0.04 251)",
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: "0 4px 16px oklch(0.76 0.16 75 / 0.40)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.82 0.14 75)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.76 0.16 75)";
                    }}
                  >
                    Check My Approval Odds
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <div className="mt-4 space-y-1.5">
                  {["No hard credit pull", "Won't affect your score", "Free to apply"].map((t) => (
                    <p
                      key={t}
                      className="text-xs flex items-center gap-1.5"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <span style={{ color: "oklch(0.65 0.085 186)" }}>✓</span>
                      {t}
                    </p>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div
                className="p-5 rounded-2xl text-center"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.008 80)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: "oklch(0.55 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Questions? Call Us
                </p>
                <a
                  href="tel:+14257618500"
                  className="text-xl font-bold block"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "oklch(0.311 0.065 251)",
                  }}
                >
                  425-761-8500
                </a>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.60 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Mon–Fri 8am–6pm PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section
          className="py-14"
          style={{ background: "oklch(0.96 0.006 80)", borderTop: "1px solid oklch(0.90 0.006 80)" }}
        >
          <div className="container">
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "oklch(0.15 0.04 251)",
              }}
            >
              More Guides You Might Find Helpful
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <div
                    className="group flex flex-col h-full p-5 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1px solid oklch(0.88 0.008 80)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 24px oklch(0.311 0.065 251 / 0.10)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <span
                      className="text-xs font-semibold mb-3 block"
                      style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {rp.category}
                    </span>
                    <h3
                      className="font-bold mb-2 flex-1 text-sm leading-snug"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "oklch(0.15 0.04 251)",
                        fontSize: "1rem",
                      }}
                    >
                      {rp.title}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold mt-3 transition-all group-hover:gap-2"
                      style={{ color: "oklch(0.578 0.098 186)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Read Guide
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
