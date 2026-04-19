import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { webhookRouter } from "../webhooks";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Trust the reverse proxy (Manus hosting layer) so express-rate-limit reads
  // the real client IP from X-Forwarded-For without throwing ERR_ERL_UNEXPECTED_X_FORWARDED_FOR
  app.set("trust proxy", 1);

  // ── Security headers (Helmet) ──────────────────────────────────────────────
  // Skip Content-Security-Policy in development to allow Vite HMR
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === "production",
      crossOriginEmbedderPolicy: false, // Required for Meta Pixel iframes
    })
  );

  // ── Body parsers — keep limits tight ──────────────────────────────────────
  // Storage proxy needs larger limit for file uploads; everything else is small
  app.use("/manus-storage", express.raw({ limit: "20mb" }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  // ── Rate limiting ──────────────────────────────────────────────────────────
  // General API rate limit: 120 requests per minute per IP
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
    skip: () => process.env.NODE_ENV === "test",
  });

  // Strict rate limit for lead submission: 10 per 10 minutes per IP
  // Prevents spam submissions without blocking normal browsing
  const leadSubmitLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many submissions, please wait a few minutes." },
    skip: () => process.env.NODE_ENV === "test",
  });

  // Webhook rate limit: 60 per minute per IP
  const webhookLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many webhook requests." },
    skip: () => process.env.NODE_ENV === "test",
  });

  // Apply general rate limit to all API routes
  app.use("/api", apiLimiter);

  // Apply strict rate limit specifically to lead mutation endpoints
  // tRPC batches mutations as POST to /api/trpc/leads.savePartial and /api/trpc/leads.submit
  app.use("/api/trpc/leads.savePartial", leadSubmitLimiter);
  app.use("/api/trpc/leads.submit", leadSubmitLimiter);

  // Apply webhook rate limit
  app.use("/api/webhooks", webhookLimiter);

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Lender webhooks
  app.use("/api/webhooks", webhookRouter);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ── Trailing slash redirect (301) ────────────────────────────────────────
  // Redirect /path → /path/ for all non-API, non-file, non-root requests.
  // This makes trailing-slash enforcement authoritative at the HTTP layer so
  // Googlebot receives a proper 301 rather than relying on the client-side
  // history.replaceState in useSEO.ts.
  app.use((req, res, next) => {
    const { pathname, search } = new URL(req.originalUrl, "http://x");
    if (
      pathname !== "/" &&
      !pathname.endsWith("/") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/manus-storage") &&
      !/\.[a-z0-9]+$/i.test(pathname) // skip static assets (.js, .css, .png, etc.)
    ) {
      return res.redirect(301, pathname + "/" + search);
    }
    next();
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
