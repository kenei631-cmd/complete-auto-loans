/**
 * server/ssr.ts — Server-Side Rendering handler
 *
 * In production, this replaces the plain serveStatic() fallback for HTML requests.
 * It:
 *   1. Loads the compiled entry-server.js (built by Vite SSR build)
 *   2. Calls render(url) to get the React HTML string
 *   3. Injects the rendered HTML into the index.html template
 *   4. Injects per-page metadata (title, description, canonical, OG tags)
 *   5. Sends the complete HTML to the client
 *
 * Static assets (.js, .css, images) are still served by express.static().
 * API routes are handled before this middleware runs.
 */

import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import fs from "fs";
import path from "path";
import { META_MAP, rewriteHtml } from "./seoMeta";

const BASE_URL = "https://completeautoloans.com";

// Cache the template and SSR module in memory after first load
let _template: string | null = null;
let _render: ((url: string) => Promise<{ html: string }>) | null = null;

function getDistPath() {
  return process.env.NODE_ENV === "development"
    ? path.resolve(import.meta.dirname, "../..", "dist", "public")
    : path.resolve(import.meta.dirname, "public");
}

async function getRenderer() {
  if (_render) return _render;

  const distPath = getDistPath();
  // In production, dist/index.js is at dist/, public is at dist/public/, server-entry is at dist/server-entry/
  const ssrModulePath = path.resolve(import.meta.dirname, "server-entry", "entry-server.js");

  if (!fs.existsSync(ssrModulePath)) {
    console.warn("[SSR] entry-server.js not found at", ssrModulePath, "— falling back to static HTML");
    return null;
  }

  try {
    const mod = await import(ssrModulePath);
    _render = mod.render;
    return _render;
  } catch (e) {
    console.error("[SSR] Failed to load entry-server.js:", e);
    return null;
  }
}

function getTemplate(): string {
  if (_template) return _template;

  const distPath = getDistPath();
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(indexPath)) {
    throw new Error(`[SSR] index.html not found at ${indexPath}`);
  }

  _template = fs.readFileSync(indexPath, "utf-8");
  return _template;
}

export function setupSSR(app: Express) {
  const distPath = getDistPath();

  // Serve static assets (JS, CSS, images, fonts) from dist/public
  app.use(express.static(distPath, { index: false }));

  // Handle all HTML requests with SSR
  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    // Skip API routes — they are handled by Express routers registered before SSR
    if (req.originalUrl.startsWith("/api/") || req.originalUrl === "/api") return next();
    // Skip non-HTML requests — but allow */* (curl, some crawlers) and missing accept headers
    const accept = req.headers.accept ?? "";
    const wantsHtml = accept.includes("text/html") || accept.includes("*/*") || accept === "";
    if (!wantsHtml) return next();

    // Normalize path
    let pathname = req.originalUrl.split("?")[0];
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    try {
      const render = await getRenderer();
      let template = getTemplate();

      let appHtml = "";

      if (render) {
        // SSR: render the React app to an HTML string
        const result = await render(req.originalUrl);
        appHtml = result.html;
      }
      // else: fall through with empty appHtml (client-side hydration will fill it)

      // Inject the rendered app HTML into the template
      let html = template.replace(
        `<!--ssr-outlet-->`,
        appHtml
      );

      // Inject per-page metadata (title, description, canonical, OG tags)
      const meta = META_MAP[pathname];
      if (meta) {
        const canonicalPath = pathname === "/" ? "/" : `${pathname}/`;
        const canonicalUrl = `${BASE_URL}${canonicalPath}`;
        html = rewriteHtml(html, meta, canonicalUrl);
      }

      res
        .status(200)
        .set({
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        })
        .end(html);
    } catch (e) {
      console.error("[SSR] Render error for", req.originalUrl, e);
      // On SSR error, fall back to serving the plain index.html
      try {
        const distPath2 = getDistPath();
        res.sendFile(path.resolve(distPath2, "index.html"));
      } catch {
        next(e);
      }
    }
  });
}
