import {
  boolean,
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const vehicleTypeEnum = pgEnum("vehicle_type", ["new", "used", "refinance", "unsure"]);
export const creditScoreEnum = pgEnum("credit_score", [
  "no_credit",
  "below_500",
  "500_549",
  "550_599",
  "600_649",
  "650_699",
  "700_plus",
]);
export const employmentStatusEnum = pgEnum("employment_status", [
  "employed",
  "self_employed",
  "retired",
  "disability",
  "other",
]);
export const leadStatusEnum = pgEnum("lead_status", [
  "partial",
  "submitted",
  "matched",
  "no_match",
  "contacted",
  "sold",
]);
export const approvalConfidenceEnum = pgEnum("approval_confidence", ["high", "good", "fair"]);

// ─────────────────────────────────────────────────────────────────────────────
// USERS (auth)
// ─────────────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: text("passwordHash"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LENDERS — config table managed via admin panel
// ─────────────────────────────────────────────────────────────────────────────
export const lenders = pgTable("lenders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  logoUrl: text("logoUrl"),
  pingUrl: text("pingUrl"),
  postUrl: text("postUrl"),
  apiKey: text("apiKey"),
  pingFieldMap: json("pingFieldMap"),
  postFieldMap: json("postFieldMap"),
  isActive: boolean("isActive").default(true).notNull(),
  priority: integer("priority").default(10).notNull(),
  maxBid: decimal("maxBid", { precision: 8, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Lender = typeof lenders.$inferSelect;
export type InsertLender = typeof lenders.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LEADS — one row per form submission
// ─────────────────────────────────────────────────────────────────────────────
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  token: varchar("token", { length: 36 }).notNull().unique(),

  // ── Step 1: Vehicle ──────────────────────────────────────────────────────
  vehicleType: vehicleTypeEnum("vehicleType").notNull(),
  estimatedPrice: integer("estimatedPrice"),

  // ── Step 2: Credit ───────────────────────────────────────────────────────
  creditScore: creditScoreEnum("creditScore").notNull(),
  hasBankruptcy: boolean("hasBankruptcy").default(false),
  hasRepossession: boolean("hasRepossession").default(false),

  // ── Step 3: Income ───────────────────────────────────────────────────────
  employmentStatus: employmentStatusEnum("employmentStatus"),
  monthlyIncome: integer("monthlyIncome"),

  // ── Step 4: Contact ──────────────────────────────────────────────────────
  firstName: varchar("firstName", { length: 64 }),
  lastName: varchar("lastName", { length: 64 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  zipCode: varchar("zipCode", { length: 10 }),
  state: varchar("state", { length: 2 }),

  // ── Compliance ───────────────────────────────────────────────────────────
  trustedFormCertUrl: text("trustedFormCertUrl"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  tcpaConsentText: text("tcpaConsentText"),

  // ── Tracking ─────────────────────────────────────────────────────────────
  utmSource: varchar("utmSource", { length: 128 }),
  utmMedium: varchar("utmMedium", { length: 128 }),
  utmCampaign: varchar("utmCampaign", { length: 128 }),
  landingPage: text("landingPage"),
  abandonedAtStep: integer("abandonedAtStep"),

  // ── Status ───────────────────────────────────────────────────────────────
  status: leadStatusEnum("status").default("partial").notNull(),

  // ── Sale / Revenue tracking ───────────────────────────────────────────────
  leadSoldAt: timestamp("leadSoldAt"),
  saleValue: decimal("saleValue", { precision: 8, scale: 2 }),
  soldToLenderId: integer("soldToLenderId"),
  webhookToken: varchar("webhookToken", { length: 64 }),

  isTest: boolean("isTest").default(false).notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LENDER_OFFERS — one row per lender response per lead
// ─────────────────────────────────────────────────────────────────────────────
export const lenderOffers = pgTable("lender_offers", {
  id: serial("id").primaryKey(),
  leadId: integer("leadId").notNull(),
  lenderId: integer("lenderId").notNull(),

  pingAccepted: boolean("pingAccepted").default(false).notNull(),
  pingBid: decimal("pingBid", { precision: 8, scale: 2 }),
  pingResponseMs: integer("pingResponseMs"),
  pingRawResponse: json("pingRawResponse"),

  postSent: boolean("postSent").default(false).notNull(),
  postAccepted: boolean("postAccepted").default(false).notNull(),
  postRawResponse: json("postRawResponse"),

  lenderName: varchar("lenderName", { length: 128 }),
  lenderLogoUrl: text("lenderLogoUrl"),
  aprMin: decimal("aprMin", { precision: 5, scale: 2 }),
  aprMax: decimal("aprMax", { precision: 5, scale: 2 }),
  estimatedMonthlyPayment: decimal("estimatedMonthlyPayment", { precision: 8, scale: 2 }),
  termMonths: integer("termMonths"),
  approvalConfidence: approvalConfidenceEnum("approvalConfidence"),
  isBestMatch: boolean("isBestMatch").default(false).notNull(),

  selectedByBorrower: boolean("selectedByBorrower").default(false).notNull(),
  selectedAt: timestamp("selectedAt"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LenderOffer = typeof lenderOffers.$inferSelect;
export type InsertLenderOffer = typeof lenderOffers.$inferInsert;
