import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  leads,
  lenders,
  lenderOffers,
  InsertLead,
  InsertLender,
  InsertLenderOffer,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(leads).values(data);
  const result = await db.select().from(leads).where(eq(leads.token, data.token!)).limit(1);
  return result[0]!;
}

export async function getLeadByToken(token: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(leads).where(eq(leads.token, token)).limit(1);
  return result[0] ?? null;
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0] ?? null;
}

export async function updateLead(id: number, data: Partial<InsertLead>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set(data).where(eq(leads.id, id));
}

export async function updateLeadByToken(token: string, data: Partial<InsertLead>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(leads).set(data).where(eq(leads.token, token));
}

export async function listLeads(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(limit).offset(offset);
}

// ── Lenders ───────────────────────────────────────────────────────────────────

export async function createLender(data: InsertLender) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(lenders).values(data);
  const result = await db.select().from(lenders).where(eq(lenders.slug, data.slug)).limit(1);
  return result[0]!;
}

export async function getLenderById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(lenders).where(eq(lenders.id, id)).limit(1);
  return result[0] ?? null;
}

export async function listActiveLenders() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(lenders).where(eq(lenders.isActive, true)).orderBy(lenders.priority);
}

export async function listAllLenders() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(lenders).orderBy(lenders.priority);
}

export async function updateLender(id: number, data: Partial<InsertLender>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(lenders).set(data).where(eq(lenders.id, id));
}

export async function deleteLender(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(lenders).where(eq(lenders.id, id));
}

// ── Lender Offers ─────────────────────────────────────────────────────────────

export async function createLenderOffer(data: InsertLenderOffer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(lenderOffers).values(data);
  const result = await db
    .select()
    .from(lenderOffers)
    .where(and(eq(lenderOffers.leadId, data.leadId), eq(lenderOffers.lenderId, data.lenderId)))
    .limit(1);
  return result[0]!;
}

export async function updateLenderOffer(id: number, data: Partial<InsertLenderOffer>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(lenderOffers).set(data).where(eq(lenderOffers.id, id));
}

export async function getOffersByLeadId(leadId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(lenderOffers)
    .where(and(eq(lenderOffers.leadId, leadId), eq(lenderOffers.pingAccepted, true)))
    .orderBy(desc(lenderOffers.pingBid));
}

export async function markOfferSelected(offerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(lenderOffers)
    .set({ selectedByBorrower: true, selectedAt: new Date() })
    .where(eq(lenderOffers.id, offerId));
}
