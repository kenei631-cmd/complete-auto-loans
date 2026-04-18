/**
 * AdminPanel — Complete Auto Loans
 * Lender config management + lead list + test ping tool. Protected: admin role only.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import {
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Users,
  Building2,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  FlaskConical,
  Send,
  XCircle,
  TestTube,
} from "lucide-react";
import { toast } from "sonner";

// ── Lender form ───────────────────────────────────────────────────────────────
interface LenderFormData {
  name: string;
  slug: string;
  logoUrl: string;
  pingUrl: string;
  postUrl: string;
  apiKey: string;
  isActive: boolean;
  priority: number;
  notes: string;
}

const EMPTY_FORM: LenderFormData = {
  name: "",
  slug: "",
  logoUrl: "",
  pingUrl: "",
  postUrl: "",
  apiKey: "",
  isActive: true,
  priority: 10,
  notes: "",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function LenderForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial?: Partial<LenderFormData>;
  onSave: (data: LenderFormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<LenderFormData>({ ...EMPTY_FORM, ...initial });

  const set = (key: keyof LenderFormData, value: string | boolean | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "white", border: "1px solid oklch(0.88 0.008 80)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Lender Name *
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.name}
            onChange={(e) => { set("name", e.target.value); if (!initial?.slug) set("slug", slugify(e.target.value)); }}
            placeholder="e.g. AutoCredit Express"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Slug * (auto-generated)
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="autocredit-express"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Ping URL (leave blank for mock mode)
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.pingUrl}
            onChange={(e) => set("pingUrl", e.target.value)}
            placeholder="https://api.lender.com/v1/ping"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Post URL (leave blank for mock mode)
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.postUrl}
            onChange={(e) => set("postUrl", e.target.value)}
            placeholder="https://api.lender.com/v1/post"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            API Key / Bearer Token
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.apiKey}
            onChange={(e) => set("apiKey", e.target.value)}
            placeholder="••••••••••••••••"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Logo URL (optional)
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.logoUrl}
            onChange={(e) => set("logoUrl", e.target.value)}
            placeholder="https://cdn.lender.com/logo.png"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Priority (1 = highest)
          </label>
          <input
            type="number"
            min={1}
            max={100}
            className="w-full px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
            value={form.priority}
            onChange={(e) => set("priority", parseInt(e.target.value) || 10)}
          />
        </div>
        <div className="flex items-center gap-3 pt-5">
          <button
            type="button"
            onClick={() => set("isActive", !form.isActive)}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: form.isActive ? "oklch(0.578 0.098 186)" : "oklch(0.62 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {form.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
            {form.isActive ? "Active" : "Inactive"}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
          Internal Notes
        </label>
        <textarea
          className="w-full px-3 py-2 rounded-lg text-sm border resize-none"
          style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
          rows={2}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Account rep, contract notes, etc."
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onSave(form)}
          disabled={isSaving || !form.name || !form.slug}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
          style={{ background: "oklch(0.311 0.065 251)", color: "white", fontFamily: "'DM Sans', sans-serif", opacity: isSaving ? 0.7 : 1 }}
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
          Save Lender
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl font-bold text-sm"
          style={{ background: "oklch(0.96 0.005 80)", color: "oklch(0.32 0.04 251)", border: "1px solid oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Test Ping result display ───────────────────────────────────────────────────
interface PingResult {
  lenderName: string;
  isMock: boolean;
  accepted: boolean;
  bid: number;
  responseMs: number;
  rawResponse: unknown;
  pingPayload: unknown;
  httpStatus?: number;
}

function PingResultCard({ result, onClear }: { result: PingResult; onClear: () => void }) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div
      className="rounded-2xl p-5 mt-4"
      style={{
        background: result.accepted ? "oklch(0.578 0.098 186 / 0.07)" : "oklch(0.65 0.12 50 / 0.07)",
        border: `1px solid ${result.accepted ? "oklch(0.578 0.098 186 / 0.30)" : "oklch(0.65 0.12 50 / 0.30)"}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {result.accepted ? (
            <CheckCircle2 size={18} style={{ color: "oklch(0.578 0.098 186)" }} />
          ) : (
            <XCircle size={18} style={{ color: "oklch(0.55 0.12 50)" }} />
          )}
          <span className="font-bold text-sm" style={{ color: result.accepted ? "oklch(0.578 0.098 186)" : "oklch(0.55 0.12 50)", fontFamily: "'DM Sans', sans-serif" }}>
            {result.accepted ? "Ping Accepted" : "Ping Declined"} — {result.lenderName}
          </span>
          {result.isMock && (
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "oklch(0.76 0.16 75 / 0.15)", color: "oklch(0.55 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
              Mock Mode
            </span>
          )}
        </div>
        <button onClick={onClear} style={{ color: "oklch(0.62 0.04 251)" }}>
          <XCircle size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {[
          ["Bid Amount", result.accepted ? `$${result.bid.toFixed(2)}` : "—"],
          ["Response Time", `${result.responseMs}ms`],
          ["HTTP Status", result.httpStatus !== undefined ? String(result.httpStatus) : "N/A (mock)"],
          ["Mode", result.isMock ? "Mock (no endpoint)" : "Live endpoint"],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
            <p className="text-sm font-semibold" style={{ color: "oklch(0.18 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowRaw(!showRaw)}
        className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
      >
        {showRaw ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {showRaw ? "Hide" : "Show"} Raw Response
      </button>

      {showRaw && (
        <div className="mt-3">
          <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>Ping Payload Sent:</p>
          <pre
            className="text-xs p-3 rounded-lg overflow-x-auto mb-3"
            style={{ background: "oklch(0.12 0.04 251)", color: "oklch(0.82 0.065 186)", fontFamily: "monospace" }}
          >
            {JSON.stringify(result.pingPayload, null, 2)}
          </pre>
          <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>Raw Response:</p>
          <pre
            className="text-xs p-3 rounded-lg overflow-x-auto"
            style={{ background: "oklch(0.12 0.04 251)", color: "oklch(0.82 0.065 186)", fontFamily: "monospace" }}
          >
            {JSON.stringify(result.rawResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"lenders" | "leads" | "test-ping">("lenders");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  // Test Ping state
  const [pingLenderId, setPingLenderId] = useState<number | "">("");
  const [pingCreditScore, setPingCreditScore] = useState("500_549");
  const [pingVehicleType, setPingVehicleType] = useState("used");
  const [pingPrice, setPingPrice] = useState(15000);
  const [pingIncome, setPingIncome] = useState(3000);
  const [pingState, setPingState] = useState("WA");
  const [pingBankruptcy, setPingBankruptcy] = useState(false);
  const [pingRepo, setPingRepo] = useState(false);
  const [pingResult, setPingResult] = useState<PingResult | null>(null);

  const utils = trpc.useUtils();

  const { data: lenders, isLoading: loadingLenders } = trpc.lenders.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: leads, isLoading: loadingLeads } = trpc.leads.adminList.useQuery(
    { limit: 50, offset: 0 },
    { enabled: isAuthenticated && user?.role === "admin" && activeTab === "leads" }
  );

  const createLender = trpc.lenders.create.useMutation({
    onSuccess: () => { utils.lenders.list.invalidate(); setShowAddForm(false); toast.success("Lender added"); },
    onError: (e) => toast.error(e.message),
  });

  const updateLender = trpc.lenders.update.useMutation({
    onSuccess: () => { utils.lenders.list.invalidate(); setEditingId(null); toast.success("Lender updated"); },
    onError: (e) => toast.error(e.message),
  });

  const toggleLender = trpc.lenders.toggleActive.useMutation({
    onSuccess: () => utils.lenders.list.invalidate(),
    onError: (e) => toast.error(e.message),
  });

  const deleteLender = trpc.lenders.delete.useMutation({
    onSuccess: () => { utils.lenders.list.invalidate(); toast.success("Lender deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const seedMock = trpc.lenders.seedMock.useMutation({
    onSuccess: (r) => { utils.lenders.list.invalidate(); toast.success(r.message); },
    onError: (e) => toast.error(e.message),
  });

  const testPing = trpc.lenders.testPing.useMutation({
    onSuccess: (r) => { setPingResult(r as PingResult); },
    onError: (e) => toast.error(`Ping failed: ${e.message}`),
  });

  const markAsTest = trpc.leads.markAsTest.useMutation({
    onSuccess: () => { utils.leads.adminList.invalidate(); toast.success("Lead updated"); },
    onError: (e) => toast.error(e.message),
  });

  const deleteLeadMutation = trpc.leads.deleteLead.useMutation({
    onSuccess: () => { utils.leads.adminList.invalidate(); toast.success("Lead deleted"); },
    onError: (e) => toast.error(e.message),
  });

  // Redirect if not admin
  if (!loading && (!isAuthenticated || user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.98 0.005 80)" }}>
        <div className="text-center">
          <AlertCircle size={40} className="mx-auto mb-4" style={{ color: "oklch(0.65 0.12 50)" }} />
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Access Required</h2>
          <p className="text-sm mb-4" style={{ color: "oklch(0.50 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
            You must be logged in as an admin to access this page.
          </p>
          <button onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "oklch(0.311 0.065 251)", color: "white", fontFamily: "'DM Sans', sans-serif" }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.98 0.005 80)" }}>
        <Loader2 size={28} className="animate-spin" style={{ color: "oklch(0.578 0.098 186)" }} />
      </div>
    );
  }

  const handleSaveLender = (form: LenderFormData) => {
    const payload = {
      name: form.name,
      slug: form.slug,
      logoUrl: form.logoUrl || null,
      pingUrl: form.pingUrl || null,
      postUrl: form.postUrl || null,
      apiKey: form.apiKey || null,
      isActive: form.isActive,
      priority: form.priority,
      notes: form.notes || null,
    };
    if (editingId) {
      updateLender.mutate({ id: editingId, data: payload });
    } else {
      createLender.mutate(payload);
    }
  };

  const handleTestPing = () => {
    if (!pingLenderId) { toast.error("Please select a lender"); return; }
    setPingResult(null);
    testPing.mutate({
      lenderId: Number(pingLenderId),
      creditScore: pingCreditScore as "no_credit" | "below_500" | "500_549" | "550_599" | "600_649" | "650_699" | "700_plus",
      vehicleType: pingVehicleType as "new" | "used" | "refinance" | "unsure",
      estimatedPrice: pingPrice,
      monthlyIncome: pingIncome,
      state: pingState,
      hasBankruptcy: pingBankruptcy,
      hasRepossession: pingRepo,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.005 80)" }}>
      {/* Header */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Admin Panel
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'DM Sans', sans-serif" }}>
                Complete Auto Loans — Lender & Lead Management
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-xs font-semibold px-4 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.70)", fontFamily: "'DM Sans', sans-serif" }}
            >
              ← Back to Site
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-5">
            {[
              { key: "lenders", label: "Lenders", icon: <Building2 size={14} /> },
              { key: "leads", label: "Leads", icon: <Users size={14} /> },
              { key: "test-ping", label: "Test Ping", icon: <FlaskConical size={14} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "lenders" | "leads" | "test-ping")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab.key ? "rgba(255,255,255,0.15)" : "transparent",
                  color: activeTab === tab.key ? "white" : "rgba(255,255,255,0.55)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* ── LENDERS TAB ── */}
        {activeTab === "lenders" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                  Lender Configuration
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Lenders with no Ping URL run in mock mode — safe for testing.
                </p>
              </div>
              <div className="flex gap-2">
                {(!lenders || lenders.length === 0) && (
                  <button
                    onClick={() => seedMock.mutate()}
                    disabled={seedMock.isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm"
                    style={{ background: "oklch(0.76 0.16 75)", color: "oklch(0.12 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Zap size={13} />
                    Seed Mock Lenders
                  </button>
                )}
                <button
                  onClick={() => { setShowAddForm(true); setEditingId(null); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm"
                  style={{ background: "oklch(0.311 0.065 251)", color: "white", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Plus size={14} />
                  Add Lender
                </button>
              </div>
            </div>

            {showAddForm && !editingId && (
              <div className="mb-6">
                <LenderForm
                  onSave={handleSaveLender}
                  onCancel={() => setShowAddForm(false)}
                  isSaving={createLender.isPending}
                />
              </div>
            )}

            {loadingLenders ? (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="animate-spin" style={{ color: "oklch(0.578 0.098 186)" }} />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {(lenders ?? []).map((lender) => (
                  <div key={lender.id}>
                    {editingId === lender.id ? (
                      <LenderForm
                        initial={{
                          name: lender.name,
                          slug: lender.slug,
                          logoUrl: lender.logoUrl ?? "",
                          pingUrl: lender.pingUrl ?? "",
                          postUrl: lender.postUrl ?? "",
                          apiKey: lender.apiKey ?? "",
                          isActive: lender.isActive,
                          priority: lender.priority,
                          notes: lender.notes ?? "",
                        }}
                        onSave={handleSaveLender}
                        onCancel={() => setEditingId(null)}
                        isSaving={updateLender.isPending}
                      />
                    ) : (
                      <div
                        className="flex items-center justify-between p-4 rounded-2xl"
                        style={{
                          background: "white",
                          border: `1px solid ${lender.isActive ? "oklch(0.88 0.008 80)" : "oklch(0.93 0.004 80)"}`,
                          opacity: lender.isActive ? 1 : 0.65,
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: lender.isActive ? "oklch(0.311 0.065 251)" : "oklch(0.70 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {lender.priority}
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                              {lender.name}
                            </p>
                            <p className="text-xs" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                              {lender.pingUrl ? `Ping: ${lender.pingUrl.substring(0, 40)}...` : "Mock mode (no endpoint)"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: lender.isActive ? "oklch(0.578 0.098 186 / 0.12)" : "oklch(0.93 0.004 80)",
                              color: lender.isActive ? "oklch(0.578 0.098 186)" : "oklch(0.55 0.04 251)",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {lender.isActive ? "Active" : "Inactive"}
                          </span>
                          <button
                            onClick={() => toggleLender.mutate({ id: lender.id, isActive: !lender.isActive })}
                            title={lender.isActive ? "Deactivate" : "Activate"}
                            style={{ color: lender.isActive ? "oklch(0.578 0.098 186)" : "oklch(0.62 0.04 251)" }}
                          >
                            {lender.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                          </button>
                          <button onClick={() => { setEditingId(lender.id); setShowAddForm(false); }} style={{ color: "oklch(0.52 0.04 251)" }}>
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => { if (confirm(`Delete ${lender.name}?`)) deleteLender.mutate({ id: lender.id }); }}
                            style={{ color: "oklch(0.55 0.15 25)" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(lenders ?? []).length === 0 && !showAddForm && (
                  <div className="text-center py-12" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    No lenders configured yet. Click "Seed Mock Lenders" to get started.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TEST PING TAB ── */}
        {activeTab === "test-ping" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                Test Ping Tool
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                Fire a live ping to a single lender using a fake credit profile. Does <strong>not</strong> create a real lead in the database.
              </p>
            </div>

            <div className="rounded-2xl p-6 mb-4" style={{ background: "white", border: "1px solid oklch(0.88 0.008 80)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {/* Lender selector */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Lender *
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingLenderId}
                    onChange={(e) => setPingLenderId(e.target.value === "" ? "" : Number(e.target.value))}
                  >
                    <option value="">— Select a lender —</option>
                    {(lenders ?? []).map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} {!l.pingUrl ? "(mock)" : "(live)"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Credit score */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Credit Score Range
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingCreditScore}
                    onChange={(e) => setPingCreditScore(e.target.value)}
                  >
                    <option value="no_credit">No Credit History</option>
                    <option value="below_500">Below 500</option>
                    <option value="500_549">500–549</option>
                    <option value="550_599">550–599</option>
                    <option value="600_649">600–649</option>
                    <option value="650_699">650–699</option>
                    <option value="700_plus">700+</option>
                  </select>
                </div>

                {/* Vehicle type */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Vehicle Type
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingVehicleType}
                    onChange={(e) => setPingVehicleType(e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refinance">Refinance</option>
                    <option value="unsure">Unsure</option>
                  </select>
                </div>

                {/* Estimated price */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Estimated Vehicle Price ($)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={100000}
                    step={500}
                    className="w-full px-3 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingPrice}
                    onChange={(e) => setPingPrice(Number(e.target.value) || 15000)}
                  />
                </div>

                {/* Monthly income */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    Monthly Income ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50000}
                    step={100}
                    className="w-full px-3 py-2 rounded-lg text-sm border"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingIncome}
                    onChange={(e) => setPingIncome(Number(e.target.value) || 3000)}
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "oklch(0.32 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    State (2-letter code)
                  </label>
                  <input
                    maxLength={2}
                    className="w-full px-3 py-2 rounded-lg text-sm border uppercase"
                    style={{ borderColor: "oklch(0.88 0.008 80)", fontFamily: "'DM Sans', sans-serif" }}
                    value={pingState}
                    onChange={(e) => setPingState(e.target.value.toUpperCase())}
                    placeholder="WA"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6 mb-5">
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.32 0.04 251)" }}>
                  <input
                    type="checkbox"
                    checked={pingBankruptcy}
                    onChange={(e) => setPingBankruptcy(e.target.checked)}
                    className="rounded"
                  />
                  Has Bankruptcy
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.32 0.04 251)" }}>
                  <input
                    type="checkbox"
                    checked={pingRepo}
                    onChange={(e) => setPingRepo(e.target.checked)}
                    className="rounded"
                  />
                  Has Repossession
                </label>
              </div>

              <button
                onClick={handleTestPing}
                disabled={testPing.isPending || !pingLenderId}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
                style={{
                  background: "oklch(0.578 0.098 186)",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  opacity: testPing.isPending || !pingLenderId ? 0.65 : 1,
                }}
              >
                {testPing.isPending ? (
                  <><Loader2 size={15} className="animate-spin" /> Pinging…</>
                ) : (
                  <><Send size={15} /> Fire Test Ping</>
                )}
              </button>
            </div>

            {pingResult && (
              <PingResultCard result={pingResult} onClear={() => setPingResult(null)} />
            )}

            {!lenders || lenders.length === 0 ? (
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: "oklch(0.76 0.16 75 / 0.08)", border: "1px solid oklch(0.76 0.16 75 / 0.25)" }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: "oklch(0.55 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                  No lenders configured yet.
                </p>
                <p className="text-xs" style={{ color: "oklch(0.62 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Go to the Lenders tab and click "Seed Mock Lenders" first.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* ── LEADS TAB ── */}
        {activeTab === "leads" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
                  Recent Leads
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                  Test leads are marked with a badge. Use the delete button to remove test data.
                </p>
              </div>
            </div>
            {loadingLeads ? (
              <div className="flex justify-center py-12">
                <Loader2 size={24} className="animate-spin" style={{ color: "oklch(0.578 0.098 186)" }} />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {(leads ?? []).map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "white",
                      border: `1px solid ${lead.isTest ? "oklch(0.76 0.16 75 / 0.35)" : "oklch(0.88 0.008 80)"}`,
                    }}
                  >
                    <button
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: lead.status === "matched" ? "oklch(0.578 0.098 186 / 0.12)" : lead.status === "no_match" ? "oklch(0.65 0.12 50 / 0.12)" : "oklch(0.76 0.16 75 / 0.12)",
                            color: lead.status === "matched" ? "oklch(0.578 0.098 186)" : lead.status === "no_match" ? "oklch(0.55 0.12 50)" : "oklch(0.55 0.12 75)",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {lead.status}
                        </span>
                        {lead.isTest && (
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{ background: "oklch(0.76 0.16 75 / 0.15)", color: "oklch(0.55 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <TestTube size={10} />
                            TEST
                          </span>
                        )}
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "oklch(0.15 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                            {lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : "Partial Lead"}
                          </p>
                          <p className="text-xs" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                            {lead.email ?? "No email"} · {lead.creditScore} · {lead.vehicleType} · {lead.state ?? "?"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: "oklch(0.62 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                        {expandedLead === lead.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>
                    {expandedLead === lead.id && (
                      <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: "oklch(0.93 0.004 80)" }}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {[
                            ["Phone", lead.phone],
                            ["Zip", lead.zipCode],
                            ["Income", lead.monthlyIncome ? `$${lead.monthlyIncome}/mo` : "—"],
                            ["Employment", lead.employmentStatus ?? "—"],
                            ["Bankruptcy", lead.hasBankruptcy ? "Yes" : "No"],
                            ["Repo", lead.hasRepossession ? "Yes" : "No"],
                            ["UTM Source", lead.utmSource ?? "—"],
                            ["Landing Page", lead.landingPage ? lead.landingPage.substring(0, 30) + "…" : "—"],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <p style={{ color: "oklch(0.62 0.04 251)" }}>{label}</p>
                              <p className="font-semibold" style={{ color: "oklch(0.18 0.04 251)" }}>{value}</p>
                            </div>
                          ))}
                        </div>
                        {/* Action buttons */}
                        <div className="flex gap-2 pt-2 border-t" style={{ borderColor: "oklch(0.93 0.004 80)" }}>
                          <button
                            onClick={() => markAsTest.mutate({ id: lead.id, isTest: !lead.isTest })}
                            disabled={markAsTest.isPending}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{
                              background: lead.isTest ? "oklch(0.96 0.005 80)" : "oklch(0.76 0.16 75 / 0.12)",
                              color: lead.isTest ? "oklch(0.52 0.04 251)" : "oklch(0.55 0.12 75)",
                              border: `1px solid ${lead.isTest ? "oklch(0.88 0.008 80)" : "oklch(0.76 0.16 75 / 0.30)"}`,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            <TestTube size={11} />
                            {lead.isTest ? "Unmark as Test" : "Mark as Test"}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete lead from ${lead.firstName ?? "unknown"}? This cannot be undone.`)) {
                                deleteLeadMutation.mutate({ id: lead.id });
                              }
                            }}
                            disabled={deleteLeadMutation.isPending}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{
                              background: "oklch(0.65 0.12 50 / 0.08)",
                              color: "oklch(0.55 0.12 50)",
                              border: "1px solid oklch(0.65 0.12 50 / 0.25)",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            <Trash2 size={11} />
                            Delete Lead
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(leads ?? []).length === 0 && (
                  <div className="text-center py-12" style={{ color: "oklch(0.52 0.04 251)", fontFamily: "'DM Sans', sans-serif" }}>
                    No leads yet. Submit a test application to see data here.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
