import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db helpers so tests don't need a real database
vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue(undefined),
  updateLeadByToken: vi.fn().mockResolvedValue(undefined),
  getLeadByToken: vi.fn().mockResolvedValue(null),
  getLenderOffersByToken: vi.fn().mockResolvedValue([]),
  createLenderOffer: vi.fn().mockResolvedValue(undefined),
  updateLenderOfferStatus: vi.fn().mockResolvedValue(undefined),
  getActiveLenders: vi.fn().mockResolvedValue([]),
  getAllLenders: vi.fn().mockResolvedValue([]),
  listAllLenders: vi.fn().mockResolvedValue([]),
  getLenderById: vi.fn().mockResolvedValue(null),
  createLender: vi.fn().mockResolvedValue(undefined),
  updateLender: vi.fn().mockResolvedValue(undefined),
  getLeadsAdmin: vi.fn().mockResolvedValue([]),
}));

// Mock ping post engine
vi.mock("./pingPost", () => ({
  runPingPost: vi.fn().mockResolvedValue([]),
}));

// Mock notifyOwner
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { "user-agent": "test-agent" },
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@completeautoloans.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("leads.savePartial", () => {
  it("returns a token when creating a new partial lead", async () => {
    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.savePartial({
      vehicleType: "used",
      creditScore: "below_500",
      monthlyIncome: 2000,
    });

    expect(result).toHaveProperty("token");
    expect(typeof result.token).toBe("string");
    expect(result.token.length).toBeGreaterThan(0);
  });

  it("returns a token when updating an existing partial lead", async () => {
    const { getLeadByToken } = await import("./db");
    vi.mocked(getLeadByToken).mockResolvedValueOnce({
      id: 1,
      token: "existing-token",
      vehicleType: "used",
      creditScore: "below_500",
      status: "partial",
      hasBankruptcy: false,
      hasRepossession: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);

    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.savePartial({
      token: "existing-token",
      vehicleType: "used",
      creditScore: "below_500",
    });

    expect(result.token).toBe("existing-token");
  });
});

describe("leads.submit", () => {
  it("throws if lead token does not exist", async () => {
    const { getLeadByToken } = await import("./db");
    vi.mocked(getLeadByToken).mockResolvedValueOnce(null);

    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submit({
        token: "nonexistent-token",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "5551234567",
        zipCode: "75001",
        state: "TX",
      })
    ).rejects.toThrow("Lead session not found");
  });

  it("returns token and offerCount on successful submission", async () => {
    const { getLeadByToken } = await import("./db");
    const mockLead = {
      id: 1,
      token: "valid-token",
      vehicleType: "used",
      creditScore: "below_500",
      status: "partial",
      hasBankruptcy: false,
      hasRepossession: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never;
    // Called twice: once to verify token exists, once to reload after update
    vi.mocked(getLeadByToken).mockResolvedValueOnce(mockLead).mockResolvedValueOnce(mockLead);

    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      token: "valid-token",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "5551234567",
      zipCode: "75001",
      state: "TX",
    });

    expect(result).toHaveProperty("token", "valid-token");
  });
});

describe("leads.getOffers", () => {
  it("returns not_found status for unknown token", async () => {
    const { getLeadByToken } = await import("./db");
    vi.mocked(getLeadByToken).mockResolvedValueOnce(null);

    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.getOffers({ token: "bad-token" });
    expect(result.status).toBe("not_found");
    expect(result.offers).toEqual([]);
  });
});

describe("lenders.list (protected)", () => {
  it("throws UNAUTHORIZED for unauthenticated user", async () => {
    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);
    // protectedProcedure throws when user is null
    await expect(caller.lenders.list()).rejects.toThrow();
  });

  it("returns lender list for admin user", async () => {
    const { listAllLenders } = await import("./db");
    vi.mocked(listAllLenders).mockResolvedValueOnce([]);

    const ctx = createAdminCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lenders.list();
    expect(Array.isArray(result)).toBe(true);
  });
});
