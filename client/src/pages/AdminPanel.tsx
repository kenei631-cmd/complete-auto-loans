/**
 * AdminPanel — Complete Auto Loans
 * Lender config management + lead list. Protected: admin role only.
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

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"lenders" | "leads">("lenders");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

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
          <button onClick={() => navigate("/")} className="px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: "oklch(0.311 0.065 251)", fontFamily: "'DM Sans', sans-serif" }}>
            Go Home
          </button>
        </div>
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
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "lenders" | "leads")}
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

        {/* ── LEADS TAB ── */}
        {activeTab === "leads" && (
          <div>
            <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.15 0.04 251)" }}>
              Recent Leads
            </h2>
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
                    style={{ background: "white", border: "1px solid oklch(0.88 0.008 80)" }}
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
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
