"use client";

import { useEffect, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type Severity = "low" | "medium" | "high";
type Status   = "action_required" | "treating" | "monitoring" | "resolved";

interface Report {
  id: number;
  crop: string;
  disease: string;
  severity: Severity;
  status: Status;
  createdAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function cropEmoji(crop: string): string {
  const map: Record<string, string> = {
    rice: "🌾", tomato: "🍅", maize: "🌽", wheat: "🌿",
    groundnut: "🥜", cotton: "🌱", sugarcane: "🎋", soybean: "🫘",
  };
  return map[crop.toLowerCase()] ?? "🌱";
}

const severityStyles: Record<Severity, { pill: string; bar: string; label: string }> = {
  low:    { pill: "bg-emerald-50 text-emerald-700 border-emerald-200",  bar: "bg-emerald-400", label: "Low"    },
  medium: { pill: "bg-amber-50   text-amber-700   border-amber-200",    bar: "bg-amber-400",   label: "Medium" },
  high:   { pill: "bg-red-50     text-red-700     border-red-200",      bar: "bg-red-500",     label: "High"   },
};

const statusStyles: Record<Status, { pill: string; label: string }> = {
  action_required: { pill: "bg-red-50    text-red-700    border-red-200",    label: "Action Required" },
  treating:        { pill: "bg-amber-50  text-amber-700  border-amber-200",  label: "Treating"        },
  monitoring:      { pill: "bg-blue-50   text-blue-700   border-blue-200",   label: "Monitoring"      },
  resolved:        { pill: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Resolved"     },
};

// ── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-[#f0f7f0]">
      {[...Array(4)].map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded-full bg-[#e8f5e9] animate-pulse" style={{ width: i === 0 ? "60%" : i === 1 ? "80%" : "50%" }} />
          {i === 0 && <div className="h-3 rounded-full bg-[#e8f5e9] animate-pulse mt-1.5 w-24" />}
        </td>
      ))}
    </tr>
  );
}

// ── Mobile Card ──────────────────────────────────────────────────────────────
function MobileCard({ report }: { report: Report }) {
  const sev = severityStyles[report.severity];
  const sta = statusStyles[report.status];
  return (
    <div className="bg-white/70 border border-[#e8f5e9] rounded-2xl p-4 hover:bg-white hover:shadow-md hover:border-[#c8e6c9] transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-lg shrink-0">
            {cropEmoji(report.crop)}
          </div>
          <div>
            <p className="font-bold text-[#1b5e20] text-sm leading-none">{report.crop}</p>
            <p className="text-[#81c784] text-xs mt-0.5">{formatDate(report.createdAt)}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${sta.pill}`}>
          {sta.label}
        </span>
      </div>
      <p className="text-[#2d4a2d] text-sm mb-3 pl-0.5">{report.disease}</p>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${sev.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${sev.bar}`} />
          {sev.label}
        </span>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [reports, setReports]       = useState<Report[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [filter, setFilter]         = useState<"all" | Severity>("all");
  const [statusFilter, setStatus]   = useState<"all" | Status>("all");
  const [search, setSearch]         = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/reports");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data: Report[] = await res.json();
        setReports(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = reports.filter((r) => {
    const matchSev    = filter === "all"       || r.severity === filter;
    const matchStatus = statusFilter === "all" || r.status   === statusFilter;
    const matchSearch =
      search === "" ||
      r.crop.toLowerCase().includes(search.toLowerCase()) ||
      r.disease.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchStatus && matchSearch;
  });

  // ── Counts ─────────────────────────────────────────────────────────────────
  const counts = {
    high:   reports.filter((r) => r.severity === "high").length,
    medium: reports.filter((r) => r.severity === "medium").length,
    low:    reports.filter((r) => r.severity === "low").length,
    action: reports.filter((r) => r.status   === "action_required").length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8f5e9] via-[#f0faf0] to-[#d4edda] px-4 sm:px-6 lg:px-8 py-8 mt-18">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,85,34,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,85,34,0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-5">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b5e20] tracking-tight">Recent Disease Reports</h1>
            <p className="text-[#4a7a4a] text-sm mt-0.5">
              {loading ? "Loading…" : `${reports.length} total reports · ${counts.action} require action`}
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-[#2e7d32] to-[#388e3c] text-white text-sm font-bold shadow-lg shadow-[#2e7d32]/25 hover:from-[#1b5e20] hover:to-[#2e7d32] transition-all duration-200 hover:-translate-y-0.5 w-fit">
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Summary Pills ── */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "High Severity",    value: counts.high,   bg: "bg-red-50    border-red-200",   text: "text-red-700",     dot: "bg-red-500"     },
              { label: "Medium Severity",  value: counts.medium, bg: "bg-amber-50  border-amber-200", text: "text-amber-700",   dot: "bg-amber-400"   },
              { label: "Low Severity",     value: counts.low,    bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-400" },
              { label: "Action Required",  value: counts.action, bg: "bg-red-50    border-red-200",   text: "text-red-700",     dot: "bg-red-400"     },
            ].map((s) => (
              <div key={s.label} className={`flex items-center gap-3 border rounded-2xl px-4 py-3 shadow-sm ${s.bg}`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
                <div>
                  <p className={`text-xl font-black leading-none ${s.text}`}>{s.value}</p>
                  <p className={`text-[10px] font-semibold mt-0.5 ${s.text} opacity-70`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters & Search ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#81c784]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search crop or disease…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c8e6c9] bg-white/70 text-[#1a3a1a] placeholder-[#a5d6a7] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 focus:border-[#4caf50] transition-all"
            />
          </div>

          {/* Severity filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2.5 rounded-xl border border-[#c8e6c9] bg-white/70 text-[#1a3a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 focus:border-[#4caf50] transition-all cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatus(e.target.value as typeof statusFilter)}
            className="px-4 py-2.5 rounded-xl border border-[#c8e6c9] bg-white/70 text-[#1a3a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 focus:border-[#4caf50] transition-all cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="action_required">Action Required</option>
            <option value="treating">Treating</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* ── Main Table Card ── */}
        <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 overflow-hidden">

          {/* Card Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#f0f7f0]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
              <p className="text-xs font-bold text-[#1b5e20] uppercase tracking-widest">RECENT DISEASE REPORTS</p>
            </div>
            <span className="text-xs text-[#81c784] font-semibold">
              {loading ? "…" : `${filtered.length} results`}
            </span>
          </div>

          {/* ── ERROR STATE ── */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <p className="font-bold text-red-600 text-base mb-1">Failed to load reports</p>
              <p className="text-red-400 text-sm mb-5">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold hover:bg-red-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ── DESKTOP TABLE ── */}
          {!error && (
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8fffe] border-b border-[#f0f7f0]">
                    {["CROP", "DISEASE", "SEVERITY", "STATUS"].map((col) => (
                      <th key={col} className="px-5 py-3.5 text-left text-[10px] font-black text-[#81c784] uppercase tracking-widest">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Loading skeletons */}
                  {loading && [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

                  {/* Empty state */}
                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <span className="text-5xl">🌿</span>
                          <p className="font-bold text-[#1b5e20] text-base">No reports found</p>
                          <p className="text-[#81c784] text-sm">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Data rows */}
                  {!loading && filtered.map((report) => {
                    const sev = severityStyles[report.severity];
                    const sta = statusStyles[report.status];
                    return (
                      <tr
                        key={report.id}
                        className="border-b border-[#f8fffe] hover:bg-[#f8fffe] transition-colors duration-150 group cursor-pointer"
                      >
                        {/* Crop */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform duration-200">
                              {cropEmoji(report.crop)}
                            </div>
                            <div>
                              <p className="font-bold text-[#1b5e20] text-sm leading-none">{report.crop}</p>
                              <p className="text-[#81c784] text-xs mt-0.5">{formatDate(report.createdAt)}</p>
                            </div>
                          </div>
                        </td>

                        {/* Disease */}
                        <td className="px-5 py-4">
                          <p className="text-[#2d4a2d] text-sm font-medium">{report.disease}</p>
                        </td>

                        {/* Severity */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${sev.pill}`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sev.bar}`} />
                            {sev.label}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border ${sta.pill}`}>
                            {sta.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── MOBILE CARDS ── */}
          {!error && (
            <div className="sm:hidden p-4 space-y-3">
              {loading &&
                [...Array(4)].map((_, i) => (
                  <div key={i} className="bg-[#f8fffe] border border-[#e8f5e9] rounded-2xl p-4 animate-pulse space-y-2.5">
                    <div className="flex gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#e8f5e9]" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 rounded-full bg-[#e8f5e9] w-28" />
                        <div className="h-3 rounded-full bg-[#e8f5e9] w-16" />
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-[#e8f5e9] w-40" />
                    <div className="h-6 rounded-full bg-[#e8f5e9] w-20" />
                  </div>
                ))}

              {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-14 text-center">
                  <span className="text-5xl">🌿</span>
                  <p className="font-bold text-[#1b5e20]">No reports found</p>
                  <p className="text-[#81c784] text-sm">Try adjusting your filters</p>
                </div>
              )}

              {!loading && filtered.map((report) => (
                <MobileCard key={report.id} report={report} />
              ))}
            </div>
          )}

          {/* Card Footer */}
          {!loading && !error && filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 sm:px-7 py-3.5 border-t border-[#f0f7f0] bg-[#f8fffe]">
              <p className="text-xs text-[#81c784]">
                Showing <span className="font-bold text-[#2e7d32]">{filtered.length}</span> of{" "}
                <span className="font-bold text-[#2e7d32]">{reports.length}</span> reports
              </p>
              <p className="text-[10px] text-[#a5d6a7]">🌱 Agro Vision · Data refreshes every 30 min</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
