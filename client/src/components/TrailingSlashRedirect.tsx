/**
 * TrailingSlashRedirect — Complete Auto Loans
 * Enforces trailing slash on all URLs sitewide.
 * Runs once at app mount and on every route change.
 *
 * In a static SPA, true server-side 301 redirects aren't possible,
 * so we use history.replaceState (no extra navigation entry) to
 * normalize the URL immediately on load. This ensures:
 * - Canonical URLs always have trailing slash
 * - No duplicate content between /path and /path/
 * - Consistent behavior for all 96 pages
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export default function TrailingSlashRedirect() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const path = window.location.pathname;
    // Skip root, already-slashed paths, and file extensions (e.g. /sitemap.xml)
    if (
      path === "/" ||
      path.endsWith("/") ||
      /\.[a-zA-Z0-9]+$/.test(path)
    ) {
      return;
    }
    // Replace state (not push) to avoid polluting browser history
    const newPath = path + "/" + window.location.search + window.location.hash;
    window.history.replaceState(null, "", newPath);
  }, [location]);

  return null;
}
