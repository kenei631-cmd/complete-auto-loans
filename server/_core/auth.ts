/**
 * Self-contained email+password authentication (replaces Manus OAuth).
 * - Passwords are hashed with bcrypt
 * - Sessions are signed JWTs stored in a cookie (same as before)
 */
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { Express, Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";
import { ForbiddenError } from "@shared/_core/errors";

function getSecretKey() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(openId: string, name: string): Promise<string> {
  const secretKey = getSecretKey();
  const expirationSeconds = Math.floor((Date.now() + ONE_YEAR_MS) / 1000);
  return new SignJWT({ openId, appId: ENV.appId || "cal", name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

export async function verifySession(
  cookieValue: string | undefined | null
): Promise<{ openId: string; name: string } | null> {
  if (!cookieValue) return null;
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(cookieValue, secretKey, { algorithms: ["HS256"] });
    const { openId, name } = payload as Record<string, unknown>;
    if (typeof openId !== "string" || !openId) return null;
    return { openId, name: typeof name === "string" ? name : "" };
  } catch {
    return null;
  }
}

export async function authenticateRequest(req: Request) {
  const cookieHeader = req.headers.cookie ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [k, ...v] = c.trim().split("=");
      return [k, decodeURIComponent(v.join("="))];
    })
  );
  const sessionCookie = cookies[COOKIE_NAME];
  const session = await verifySession(sessionCookie);
  if (!session) throw ForbiddenError("Invalid session cookie");

  const user = await db.getUserByOpenId(session.openId);
  if (!user) throw ForbiddenError("User not found");
  return user;
}

export function registerAuthRoutes(app: Express) {
  // POST /api/auth/login — email + password login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }
    try {
      const user = await db.getUserByEmail(email.toLowerCase().trim());
      if (!user || !user.passwordHash) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const token = await createSessionToken(user.openId, user.name ?? "");
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // POST /api/auth/setup — one-time admin account creation (only if no admin exists)
  app.post("/api/auth/setup", async (req: Request, res: Response) => {
    const { email, password, name, setupSecret } = req.body ?? {};
    // Require a setup secret to prevent unauthorized admin creation
    if (setupSecret !== ENV.cookieSecret) {
      res.status(403).json({ error: "Invalid setup secret" });
      return;
    }
    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }
    try {
      const existing = await db.getUserByEmail(email.toLowerCase().trim());
      if (existing) {
        res.status(409).json({ error: "User already exists" });
        return;
      }
      const passwordHash = await hashPassword(password);
      const openId = `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await db.upsertUser({
        openId,
        email: email.toLowerCase().trim(),
        name: name ?? email,
        passwordHash,
        loginMethod: "email",
        role: "admin",
        lastSignedIn: new Date(),
      });
      const token = await createSessionToken(openId, name ?? email);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.json({ success: true, message: "Admin account created" });
    } catch (error) {
      console.error("[Auth] Setup failed", error);
      res.status(500).json({ error: "Setup failed" });
    }
  });
}
