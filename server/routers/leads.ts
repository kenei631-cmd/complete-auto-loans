/**
 * leads.ts — tRPC router for lead submission and offer retrieval
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  createLead,
  deleteLead,
  getLeadByToken,
  getOffersByLeadId,
  listLeads,
  markOfferSelected,
  updateLead,
  updateLeadByToken,
} from "../db";
import { runPingPost } from "../pingPost";
import { nanoid } from "nanoid";
import { notifyOwner } from "../_core/notification";
import { sendCapiEvent } from "../metaCapi";

const TCPA_CONSENT_TEXT =
  "By submitting this form, you agree to be contacted by Complete Auto Loans and its lending partners via phone, email, and SMS regarding your auto loan inquiry. Message and data rates may apply. You may opt out at any time. Your information is protected by 256-bit SSL encryption.";

export const leadsRouter = router({
  /**
   * Save a partial lead (called at Step 3 to enable abandonment recovery).
   * Returns a token that identifies this lead session.
   */
  savePartial: publicProcedure
    .input(
      z.object({
        token: z.string().optional(),
        vehicleType: z.enum(["new", "used", "refinance", "unsure"]),
        estimatedPrice: z.number().optional(),
        creditScore: z.enum([
          "no_credit", "below_500", "500_549", "550_599",
          "600_649", "650_699", "700_plus",
        ]),
        hasBankruptcy: z.boolean().optional(),
        hasRepossession: z.boolean().optional(),
        employmentStatus: z.enum(["employed", "self_employed", "retired", "disability", "other"]).optional(),
        monthlyIncome: z.number().optional(),
        abandonedAtStep: z.number().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        landingPage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const token = input.token ?? nanoid();

      // If token exists, update; otherwise create
      const existing = input.token ? await getLeadByToken(input.token) : null;

      if (existing) {
        await updateLeadByToken(token, {
          vehicleType: input.vehicleType,
          estimatedPrice: input.estimatedPrice,
          creditScore: input.creditScore,
          hasBankruptcy: input.hasBankruptcy ?? false,
          hasRepossession: input.hasRepossession ?? false,
          employmentStatus: input.employmentStatus,
          monthlyIncome: input.monthlyIncome,
          abandonedAtStep: input.abandonedAtStep,
          status: "partial",
        });
      } else {
        await createLead({
          token,
          vehicleType: input.vehicleType,
          estimatedPrice: input.estimatedPrice,
          creditScore: input.creditScore,
          hasBankruptcy: input.hasBankruptcy ?? false,
          hasRepossession: input.hasRepossession ?? false,
          employmentStatus: input.employmentStatus,
          monthlyIncome: input.monthlyIncome,
          abandonedAtStep: input.abandonedAtStep,
          utmSource: input.utmSource,
          utmMedium: input.utmMedium,
          utmCampaign: input.utmCampaign,
          landingPage: input.landingPage,
          ipAddress: ctx.req.headers["x-forwarded-for"] as string ?? ctx.req.socket?.remoteAddress,
          userAgent: ctx.req.headers["user-agent"],
          status: "partial",
        });
      }

      // Fire GHL abandonment webhook if abandonedAtStep is set and we have the env var
      // This triggers the SMS/email recovery sequence in GoHighLevel
      const ghlWebhookUrl = process.env.GHL_ABANDONMENT_WEBHOOK_URL;
      if (ghlWebhookUrl && input.abandonedAtStep) {
        fetch(ghlWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            abandonedAtStep: input.abandonedAtStep,
            vehicleType: input.vehicleType,
            creditScore: input.creditScore,
            monthlyIncome: input.monthlyIncome,
            utmSource: input.utmSource,
            utmMedium: input.utmMedium,
            utmCampaign: input.utmCampaign,
            resumeUrl: `${process.env.VITE_APP_URL ?? "https://completeautoloans.com"}/apply?token=${token}`,
          }),
        }).catch((err) => console.error("[GHL Webhook] Error:", err));
      }

      return { token };
    }),

  /**
   * Submit a completed lead — runs the full Ping Post cycle.
   * Returns the token and initial offer count.
   */
  submit: publicProcedure
    .input(
      z.object({
        token: z.string(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        zipCode: z.string().min(5),
        state: z.string().length(2),
        trustedFormCertUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const lead = await getLeadByToken(input.token);
      if (!lead) throw new Error("Lead session not found. Please restart the application.");

      // Update with contact info and mark submitted
      await updateLeadByToken(input.token, {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        zipCode: input.zipCode,
        state: input.state,
        trustedFormCertUrl: input.trustedFormCertUrl,
        tcpaConsentText: TCPA_CONSENT_TEXT,
        abandonedAtStep: null,
        status: "submitted",
      });

      // Reload updated lead
      const updatedLead = await getLeadByToken(input.token);
      if (!updatedLead) throw new Error("Lead not found after update");

      // Run Ping Post asynchronously — don't block the response
      // We return the token immediately; the client polls for offers
      runPingPost(updatedLead).catch((err) => {
        console.error("[PingPost] Error:", err);
      });

      // Notify owner
      notifyOwner({
        title: "New Lead Submitted",
        content: `${input.firstName} ${input.lastName} (${input.email}) submitted an application. Credit: ${updatedLead.creditScore}, Vehicle: ${updatedLead.vehicleType}, State: ${input.state}`,
      }).catch(() => {});

      // Fire CAPI Lead event (server-side, deduplicated with browser pixel via eventId)
      // The browser fires fbq('track', 'Lead', {}, { eventID: token }) on form submit
      // We use the same token as eventId so Meta deduplicates correctly
      sendCapiEvent({
        eventName: "Lead",
        eventId: input.token,
        eventSourceUrl: `${process.env.VITE_APP_URL ?? "https://completeautoloans.com"}/apply`,
        userData: {
          email: input.email,
          phone: input.phone,
          firstName: input.firstName,
          lastName: input.lastName,
          state: input.state,
          zip: input.zipCode,
          clientIpAddress: ctx.req.headers["x-forwarded-for"] as string ?? ctx.req.socket?.remoteAddress,
          clientUserAgent: ctx.req.headers["user-agent"],
          fbp: ctx.req.cookies?.["_fbp"],
          fbc: ctx.req.cookies?.["_fbc"],
        },
        customData: {
          contentName: "Auto Loan Application",
          contentCategory: "auto_loan",
          leadType: updatedLead.creditScore ?? undefined,
        },
      }).catch((err) => console.error("[CAPI] Lead event error:", err));

      return { token: input.token };
    }),

  /**
   * Get offers for a lead by token — called by the Offer Results page.
   * Returns offers once ping/post is complete.
   */
  getOffers: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const lead = await getLeadByToken(input.token);
      if (!lead) return { status: "not_found" as const, offers: [] };

      const offers = await getOffersByLeadId(lead.id);

      return {
        status: lead.status,
        offers: offers.map((o) => ({
          offerId: o.id,
          lenderId: o.lenderId,
          lenderName: o.lenderName ?? "Auto Lender",
          lenderLogoUrl: o.lenderLogoUrl ?? null,
          aprMin: Number(o.aprMin ?? 0),
          aprMax: Number(o.aprMax ?? 0),
          estimatedMonthlyPayment: Number(o.estimatedMonthlyPayment ?? 0),
          termMonths: o.termMonths ?? 60,
          approvalConfidence: (o.approvalConfidence ?? "fair") as "high" | "good" | "fair",
          isBestMatch: o.isBestMatch,
        })),
        leadInfo: {
          firstName: lead.firstName,
          creditScore: lead.creditScore,
          vehicleType: lead.vehicleType,
        },
      };
    }),

  /**
   * Record that a borrower selected a specific offer.
   */
  selectOffer: publicProcedure
    .input(z.object({ offerId: z.number() }))
    .mutation(async ({ input }) => {
      await markOfferSelected(input.offerId);
      return { success: true };
    }),

  /**
   * Admin: mark a lead as test (won't appear in real analytics)
   */
  markAsTest: protectedProcedure
    .input(z.object({ id: z.number(), isTest: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      await updateLead(input.id, { isTest: input.isTest });
      return { success: true };
    }),

  /**
   * Admin: delete a lead (and its associated offers)
   */
  deleteLead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      await deleteLead(input.id);
      return { success: true };
    }),

  /**
   * Admin: list all leads (protected — admin only)
   */
  adminList: protectedProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new Error("Forbidden");
      return listLeads(input.limit, input.offset);
    }),
});
