/**
 * useSEO — Complete Auto Loans
 * Yoast-style dynamic SEO hook.
 * Injects per-page <title>, <meta description>, canonical (trailing slash),
 * Open Graph, Twitter Card, and robots tags into <head>.
 *
 * Rules:
 * - Canonical always uses trailing slash: https://completeautoloans.com/path/
 * - All pages are indexable by default (index, follow)
 * - OG type is "website" for all pages
 */

import { useEffect } from "react";

const BASE_URL = "https://completeautoloans.com";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string; // path only, e.g. "/best-bad-credit-auto-loans" — trailing slash added automatically
  ogImage?: string;
  noIndex?: boolean;
  schema?: object | object[]; // JSON-LD schema object(s)
}

function ensureTrailingSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setSchema(schema: object | object[]) {
  // Remove any existing JSON-LD scripts injected by this hook
  document.querySelectorAll('script[data-seo="cal"]').forEach((el) => el.remove());
  const schemas = Array.isArray(schema) ? schema : [schema];
  schemas.forEach((s) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "cal");
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = `${BASE_URL}/og-default.jpg`,
  noIndex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // ── Title ──
    document.title = title;

    // ── Meta description ──
    setMeta("description", description);

    // ── Robots ──
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");

    // ── Canonical (always trailing slash) ──
    const rawPath = canonical ?? window.location.pathname;
    const canonicalPath = ensureTrailingSlash(rawPath);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    setLink("canonical", canonicalUrl);

    // ── Open Graph ──
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", ogImage, true);
    setMeta("og:site_name", "Complete Auto Loans", true);

    // ── Twitter Card ──
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // ── JSON-LD Schema ──
    if (schema) {
      setSchema(schema);
    }

    // ── Trailing slash redirect (client-side) ──
    // If the current URL has no trailing slash (and isn't the root), redirect
    const currentPath = window.location.pathname;
    if (currentPath !== "/" && !currentPath.endsWith("/")) {
      window.history.replaceState(null, "", ensureTrailingSlash(currentPath) + window.location.search);
    }
  }, [title, description, canonical, ogImage, noIndex, schema]);
}
