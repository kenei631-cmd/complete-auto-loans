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
