import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// ─────────────────────────────────────────────────────────────────────────────
// USERS (auth — do not remove)
// ─────────────────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LENDERS — config table managed via admin panel
// ─────────────────────────────────────────────────────────────────────────────
export const lenders = mysqlTable("lenders", {
  id: int("id").autoincrement().primaryKey(),

  /** Display name shown to borrowers on the Offer Results page */
  name: varchar("name", { length: 128 }).notNull(),

  /** Short slug used internally, e.g. "lender-a" */
  slug: varchar("slug", { length: 64 }).notNull().unique(),

  /** Logo URL (uploaded to S3 or external CDN) */
  logoUrl: text("logoUrl"),

  /** Full URL for the Ping endpoint, e.g. https://api.lender.com/v1/ping */
  pingUrl: text("pingUrl"),

  /** Full URL for the Post endpoint, e.g. https://api.lender.com/v1/post */
  postUrl: text("postUrl"),

  /** API key / bearer token for this lender — stored server-side only */
  apiKey: text("apiKey"),

  /**
   * JSON object describing how to map our standard lead fields to this
   * lender's expected payload keys. Example:
   * { "creditScore": "credit_score_range", "state": "borrower_state" }
   */
  pingFieldMap: json("pingFieldMap"),
  postFieldMap: json("postFieldMap"),

  /** Whether this lender is currently active in the ping waterfall */
  isActive: boolean("isActive").default(true).notNull(),

  /** Priority order — lower number = pinged first */
  priority: int("priority").default(10).notNull(),

  /** Maximum accepted bid this lender has historically returned (informational) */
  maxBid: decimal("maxBid", { precision: 8, scale: 2 }),

  /** Notes for internal use (e.g. account rep contact, contract notes) */
  notes: text("notes"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lender = typeof lenders.$inferSelect;
export type InsertLender = typeof lenders.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LEADS — one row per form submission
// ─────────────────────────────────────────────────────────────────────────────
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),

  /** UUID token used in the public-facing offer URL (/offers/:token) */
  token: varchar("token", { length: 36 }).notNull().unique(),

  // ── Step 1: Vehicle ──────────────────────────────────────────────────────
  vehicleType: mysqlEnum("vehicleType", ["new", "used", "refinance", "unsure"]).notNull(),
  estimatedPrice: int("estimatedPrice"),

  // ── Step 2: Credit ───────────────────────────────────────────────────────
  creditScore: mysqlEnum("creditScore", [
    "no_credit",
    "below_500",
    "500_549",
    "550_599",
    "600_649",
    "650_699",
    "700_plus",
  ]).notNull(),
  hasBankruptcy: boolean("hasBankruptcy").default(false),
  hasRepossession: boolean("hasRepossession").default(false),

  // ── Step 3: Income ───────────────────────────────────────────────────────
  employmentStatus: mysqlEnum("employmentStatus", [
    "employed",
    "self_employed",
    "retired",
    "disability",
    "other",
  ]),
  monthlyIncome: int("monthlyIncome"),

  // ── Step 4: Contact ──────────────────────────────────────────────────────
  firstName: varchar("firstName", { length: 64 }),
  lastName: varchar("lastName", { length: 64 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  zipCode: varchar("zipCode", { length: 10 }),
  state: varchar("state", { length: 2 }),

  // ── Compliance ───────────────────────────────────────────────────────────
  /** TrustedForm certificate URL captured at form submission */
  trustedFormCertUrl: text("trustedFormCertUrl"),
  /** IP address of the submitter */
  ipAddress: varchar("ipAddress", { length: 45 }),
  /** User-agent string */
  userAgent: text("userAgent"),
  /** TCPA consent text shown to the user at time of submission */
  tcpaConsentText: text("tcpaConsentText"),

  // ── Tracking ─────────────────────────────────────────────────────────────
  /** UTM source from query string */
  utmSource: varchar("utmSource", { length: 128 }),
  utmMedium: varchar("utmMedium", { length: 128 }),
  utmCampaign: varchar("utmCampaign", { length: 128 }),
  /** Landing page URL */
  landingPage: text("landingPage"),
  /** Which step the user reached before abandoning (null = completed) */
  abandonedAtStep: int("abandonedAtStep"),

    // ── Status ───────────────────────────────────────────────────────────
  status: mysqlEnum("status", [
    "partial",     // form started but not completed
    "submitted",   // form completed, ping/post in progress
    "matched",     // at least one lender accepted
    "no_match",    // no lender accepted
    "contacted",   // lender has contacted the borrower
    "sold",        // lead was purchased by a lender (triggers CAPI Purchase)
  ]).default("partial").notNull(),

  // ── Sale / Revenue tracking (for CAPI Purchase event) ────────────────
  /** Timestamp when the lender confirmed purchase of this lead */
  leadSoldAt: timestamp("leadSoldAt"),
  /** Amount paid by the lender for this lead in USD */
  saleValue: decimal("saleValue", { precision: 8, scale: 2 }),
  /** Which lender purchased this lead */
  soldToLenderId: int("soldToLenderId"),
  /** Webhook secret used to verify the incoming purchase notification */
  webhookToken: varchar("webhookToken", { length: 64 }),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// ─────────────────────────────────────────────────────────────────────────────
// LENDER_OFFERS — one row per lender response per lead
// ─────────────────────────────────────────────────────────────────────────────
export const lenderOffers = mysqlTable("lender_offers", {
  id: int("id").autoincrement().primaryKey(),

  leadId: int("leadId").notNull(),
  lenderId: int("lenderId").notNull(),

  // ── Ping result ──────────────────────────────────────────────────────────
  pingAccepted: boolean("pingAccepted").default(false).notNull(),
  pingBid: decimal("pingBid", { precision: 8, scale: 2 }),
  pingResponseMs: int("pingResponseMs"),
  pingRawResponse: json("pingRawResponse"),

  // ── Post result ──────────────────────────────────────────────────────────
  postSent: boolean("postSent").default(false).notNull(),
  postAccepted: boolean("postAccepted").default(false).notNull(),
  postRawResponse: json("postRawResponse"),

  // ── Offer details shown to borrower ──────────────────────────────────────
  /** Lender display name (snapshot at time of offer) */
  lenderName: varchar("lenderName", { length: 128 }),
  lenderLogoUrl: text("lenderLogoUrl"),
  aprMin: decimal("aprMin", { precision: 5, scale: 2 }),
  aprMax: decimal("aprMax", { precision: 5, scale: 2 }),
  estimatedMonthlyPayment: decimal("estimatedMonthlyPayment", { precision: 8, scale: 2 }),
  termMonths: int("termMonths"),
  /** Confidence label shown on the offer card: "High", "Good", "Fair" */
  approvalConfidence: mysqlEnum("approvalConfidence", ["high", "good", "fair"]),
  /** Whether this offer was the top-ranked / "Best Match" */
  isBestMatch: boolean("isBestMatch").default(false).notNull(),

  // ── Borrower action ───────────────────────────────────────────────────────
  /** Whether the borrower clicked "Select This Offer" */
  selectedByBorrower: boolean("selectedByBorrower").default(false).notNull(),
  selectedAt: timestamp("selectedAt"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LenderOffer = typeof lenderOffers.$inferSelect;
export type InsertLenderOffer = typeof lenderOffers.$inferInsert;
