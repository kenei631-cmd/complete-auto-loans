/**
 * lenders.ts — tRPC router for lender config management (admin only)
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createLender,
  deleteLender,
  getLenderById,
  listAllLenders,
  updateLender,
} from "../db";

const lenderInput = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  logoUrl: z.string().url().optional().nullable(),
  pingUrl: z.string().url().optional().nullable(),
  postUrl: z.string().url().optional().nullable(),
  apiKey: z.string().optional().nullable(),
  pingFieldMap: z.record(z.string(), z.string()).optional().nullable(),
  postFieldMap: z.record(z.string(), z.string()).optional().nullable(),
  isActive: z.boolean().default(true),
  priority: z.number().int().min(1).max(100).default(10),
  maxBid: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

function adminOnly(role: string) {
  if (role !== "admin") throw new Error("Forbidden: admin access required");
}

export const lendersRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    adminOnly(ctx.user.role);
    return listAllLenders();
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      const lender = await getLenderById(input.id);
      if (!lender) throw new Error("Lender not found");
      return lender;
    }),

  create: protectedProcedure
    .input(lenderInput)
    .mutation(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      return createLender({
        ...input,
        pingFieldMap: input.pingFieldMap ?? null,
        postFieldMap: input.postFieldMap ?? null,
        maxBid: input.maxBid ?? null,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), data: lenderInput.partial() }))
    .mutation(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      await updateLender(input.id, input.data);
      return getLenderById(input.id);
    }),

  toggleActive: protectedProcedure
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      await updateLender(input.id, { isActive: input.isActive });
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      await deleteLender(input.id);
      return { success: true };
    }),

  /**
   * Test Ping — fires a single ping to a lender using a fake lead profile.
   * Does NOT create a real lead in the database.
   * Returns the raw HTTP response, bid amount, and acceptance status.
   */
  testPing: protectedProcedure
    .input(
      z.object({
        lenderId: z.number(),
        creditScore: z.enum(["no_credit", "below_500", "500_549", "550_599", "600_649", "650_699", "700_plus"]),
        vehicleType: z.enum(["new", "used", "refinance", "unsure"]),
        estimatedPrice: z.number().min(1000).max(100000).default(15000),
        monthlyIncome: z.number().min(0).max(50000).default(3000),
        state: z.string().length(2).default("WA"),
        hasBankruptcy: z.boolean().default(false),
        hasRepossession: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      adminOnly(ctx.user.role);
      const lender = await getLenderById(input.lenderId);
      if (!lender) throw new Error("Lender not found");

      const startTime = Date.now();

      if (!lender.pingUrl) {
        // Mock mode — simulate the response
        const CREDIT_APR_MAP: Record<string, { aprMin: number; aprMax: number; confidence: string }> = {
          no_credit:  { aprMin: 18.9, aprMax: 24.9, confidence: "fair" },
          below_500:  { aprMin: 16.9, aprMax: 22.9, confidence: "fair" },
          "500_549":  { aprMin: 14.9, aprMax: 19.9, confidence: "fair" },
          "550_599":  { aprMin: 12.9, aprMax: 17.9, confidence: "good" },
          "600_649":  { aprMin: 10.9, aprMax: 14.9, confidence: "good" },
          "650_699":  { aprMin: 7.9,  aprMax: 11.9, confidence: "high" },
          "700_plus": { aprMin: 4.9,  aprMax: 8.9,  confidence: "high" },
        };
        const aprData = CREDIT_APR_MAP[input.creditScore] ?? CREDIT_APR_MAP["below_500"]!;
        let acceptChance = 0.85;
        if (input.hasBankruptcy) acceptChance -= 0.15;
        if (input.hasRepossession) acceptChance -= 0.10;
        if (input.creditScore === "no_credit" || input.creditScore === "below_500") acceptChance -= 0.10;
        acceptChance = Math.max(0.4, acceptChance);
        const accepted = Math.random() < acceptChance;
        const bid = accepted ? Math.round((input.estimatedPrice * 0.012 + Math.random() * 20) * 100) / 100 : 0;
        const responseMs = Date.now() - startTime;
        return {
          lenderName: lender.name,
          isMock: true,
          accepted,
          bid,
          responseMs,
          rawResponse: {
            mock: true,
            accepted,
            bid,
            aprMin: aprData.aprMin,
            aprMax: aprData.aprMax,
            approvalConfidence: aprData.confidence,
            note: "This is a simulated response. Configure a Ping URL to test a real endpoint.",
          },
          pingPayload: {
            creditScore: input.creditScore,
            vehicleType: input.vehicleType,
            state: input.state,
            estimatedPrice: input.estimatedPrice,
            monthlyIncome: input.monthlyIncome,
            hasBankruptcy: input.hasBankruptcy,
            hasRepossession: input.hasRepossession,
          },
        };
      }

      // Real ping
      const fieldMap = (lender.pingFieldMap ?? {}) as Record<string, string>;
      const map = (key: string) => fieldMap[key] ?? key;
      const pingPayload: Record<string, unknown> = {
        [map("creditScore")]: input.creditScore,
        [map("vehicleType")]: input.vehicleType,
        [map("state")]: input.state,
        [map("zipCode")]: "98201", // test zip
        [map("monthlyIncome")]: input.monthlyIncome,
        [map("estimatedPrice")]: input.estimatedPrice,
        [map("hasBankruptcy")]: input.hasBankruptcy,
        [map("hasRepossession")]: input.hasRepossession,
      };

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);

      try {
        const resp = await fetch(lender.pingUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lender.apiKey}`,
          },
          body: JSON.stringify(pingPayload),
          signal: controller.signal,
        });
        clearTimeout(timer);
        // Safely parse response — some lenders return non-JSON on error
        let rawResponse: unknown;
        try {
          rawResponse = await resp.json();
        } catch {
          const text = await resp.text().catch(() => "(unreadable body)");
          rawResponse = { parseError: "Response was not valid JSON", rawText: text.substring(0, 500) };
        }
        const accepted = resp.ok && (rawResponse as Record<string, unknown>).accepted === true;
        const bid = Number((rawResponse as Record<string, unknown>).bid ?? 0);
        const responseMs = Date.now() - startTime;
        return {
          lenderName: lender.name,
          isMock: false,
          accepted,
          bid,
          responseMs,
          rawResponse,
          pingPayload,
          httpStatus: resp.status,
        };
      } catch (err: unknown) {
        clearTimeout(timer);
        const responseMs = Date.now() - startTime;
        return {
          lenderName: lender.name,
          isMock: false,
          accepted: false,
          bid: 0,
          responseMs,
          rawResponse: { error: err instanceof Error ? err.message : "timeout_or_network_error" },
          pingPayload,
          httpStatus: 0,
        };
      }
    }),

  /**
   * Seed mock lenders for demo/testing purposes.
   * Only works when no lenders exist yet.
   */
  seedMock: protectedProcedure.mutation(async ({ ctx }) => {
    adminOnly(ctx.user.role);
    const existing = await listAllLenders();
    if (existing.length > 0) return { seeded: 0, message: "Lenders already exist" };

    const mockLenders = [
      {
        name: "AutoCredit Express",
        slug: "autocredit-express",
        logoUrl: null,
        pingUrl: null, // null = mock mode
        postUrl: null,
        apiKey: null,
        priority: 1,
        notes: "Mock lender — replace with real endpoint when ready",
      },
      {
        name: "DriveTime Financial",
        slug: "drivetime-financial",
        logoUrl: null,
        pingUrl: null,
        postUrl: null,
        apiKey: null,
        priority: 2,
        notes: "Mock lender — replace with real endpoint when ready",
      },
      {
        name: "Capital One Auto",
        slug: "capital-one-auto",
        logoUrl: null,
        pingUrl: null,
        postUrl: null,
        apiKey: null,
        priority: 3,
        notes: "Mock lender — replace with real endpoint when ready",
      },
      {
        name: "Westlake Financial",
        slug: "westlake-financial",
        logoUrl: null,
        pingUrl: null,
        postUrl: null,
        apiKey: null,
        priority: 4,
        notes: "Mock lender — replace with real endpoint when ready",
      },
      {
        name: "RoadLoans",
        slug: "roadloans",
        logoUrl: null,
        pingUrl: null,
        postUrl: null,
        apiKey: null,
        priority: 5,
        notes: "Mock lender — replace with real endpoint when ready",
      },
    ];

    for (const l of mockLenders) {
      await createLender({ ...l, isActive: true, pingFieldMap: null, postFieldMap: null, maxBid: null });
    }

    return { seeded: mockLenders.length, message: `${mockLenders.length} mock lenders created` };
  }),
});
