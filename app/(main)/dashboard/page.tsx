"use client";
import { motion } from "framer-motion";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────── */
interface ActivityItem {
  id: number;
  crop: string;
  disease: string;
  severity: "Low" | "Medium" | "High";
  date: string;
  status: "Treated" | "Monitoring" | "Action Required";
}

interface Alert {
  id: number;
  type: "warning" | "danger" | "info";
  message: string;
  time: string;
}

/* ─── Static Data ────────────────────────────────────────── */
const recentActivity: ActivityItem[] = [
  { id: 1, crop: "Tomato",   disease: "Early Blight",      severity: "Medium", date: "28 Mar 2026", status: "Treating" as any },
  { id: 2, crop: "Rice",     disease: "Bacterial Leaf Blight", severity: "High",   date: "26 Mar 2026", status: "Action Required" },
  { id: 3, crop: "Maize",    disease: "No Disease Detected", severity: "Low",  date: "24 Mar 2026", status: "Monitoring" },
  { id: 4, crop: "Groundnut", disease: "Leaf Spot",          severity: "Low",   date: "21 Mar 2026", status: "Treated" },
];

const alerts: Alert[] = [
  { id: 1, type: "warning", message: "Heavy rainfall expected in your region tomorrow.", time: "2 hrs ago" },
  { id: 2, type: "danger",  message: "High disease risk detected for Rice crops this week.", time: "5 hrs ago" },
  { id: 3, type: "info",    message: "Best window for pesticide spray: 29 Mar, 6 AM – 8 AM.", time: "1 day ago" },
];

const quickActions = [
  {
    label: "Upload Crop Image",
    description: "Detect disease instantly",
    href: "/upload",
    color: "from-green-500 to-emerald-600",
    shadow: "shadow-green-200",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    label: "Get AI Advisory",
    description: "Smart crop recommendations",
    href: "/advisory",
    color: "from-lime-500 to-green-600",
    shadow: "shadow-lime-200",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    label: "View Reports",
    description: "Full history & analytics",
    href: "/reports",
    color: "from-emerald-600 to-teal-600",
    shadow: "shadow-emerald-200",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

/* ─── Severity Badge ─────────────────────────────────────── */
function SeverityBadge({ severity }: { severity: ActivityItem["severity"] }) {
  const map = {
    Low:    "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    High:   "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${map[severity]}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {severity}
    </span>
  );
}

/* ─── Status Badge ───────────────────────────────────────── */
function StatusBadge({ status }: { status: ActivityItem["status"] }) {
  const map: Record<string, string> = {
    Treated:           "bg-green-50 text-green-600",
    Monitoring:        "bg-blue-50 text-blue-600",
    "Action Required": "bg-red-50 text-red-600",
    Treating:          "bg-yellow-50 text-yellow-600",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-lg ${map[status] ?? "bg-gray-100 text-gray-600"}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {status}
    </span>
  );
}

/* ─── Alert Icon ─────────────────────────────────────────── */
function AlertIcon({ type }: { type: Alert["type"] }) {
  if (type === "danger")
    return (
      <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    );
  if (type === "warning")
    return (
      <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  return (
    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/* ─── Fade-up variant ────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const},
});

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f3f8f3] pt-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── subtle grid bg ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#166534 1px,transparent 1px),linear-gradient(90deg,#166534 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ════════════════════════════════════
            1. WELCOME HERO
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0)}>
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#14532d] via-[#166534] to-[#365314] p-6 sm:p-10 shadow-xl shadow-green-900/20">
            {/* blobs */}
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-green-300/10 rounded-full blur-3xl pointer-events-none" />
            {/* dot grid */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "22px 22px" }} />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs font-medium text-lime-200 tracking-wide">Live Dashboard</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Welcome back, Farmer 👋
                </h1>
                <p className="text-green-200/70 text-base max-w-md">
                  Here's what's happening on your farm today. Stay ahead with AI-powered insights.
                </p>
              </div>

              {/* mini date/season chip */}
              <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
                <div className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl px-5 py-3 text-right">
                  <p className="text-xs text-green-300/70 mb-0.5">Today</p>
                  <p className="text-white font-bold text-base">Sunday, 29 Mar 2026</p>
                  <p className="text-lime-300 text-sm font-medium mt-0.5">🌱 Rabi Season</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            2. WEATHER + QUICK ACTIONS (row)
        ════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Weather Card – spans 2 cols */}
          <motion.div {...fadeUp(0.08)} className="lg:col-span-2">
            <div className="h-full bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">Weather Today</p>
                  <p className="text-sm text-green-900/50">Vengavasal, Tamil Nadu</p>
                </div>
                <span className="text-4xl select-none">⛅</span>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-6xl font-black text-[#0f3d1a]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  34°
                </span>
                <div className="pb-2">
                  <p className="text-base font-semibold text-green-800">Partly Cloudy</p>
                  <p className="text-sm text-green-700/50">Feels like 37°C</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Humidity", value: "72%",    icon: "💧" },
                  { label: "Rainfall", value: "12 mm",  icon: "🌧️" },
                  { label: "Wind",     value: "14 km/h", icon: "🌬️" },
                ].map((w) => (
                  <div key={w.label}
                    className="bg-[#f3f8f3] rounded-2xl p-3 text-center border border-green-100">
                    <div className="text-xl mb-1 select-none">{w.icon}</div>
                    <p className="text-sm font-bold text-[#0f3d1a]">{w.value}</p>
                    <p className="text-xs text-green-700/50 mt-0.5">{w.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2.5 flex items-center gap-2">
                <span className="text-lg select-none">⚠️</span>
                <p className="text-xs font-medium text-amber-800">
                  Heavy rain expected tomorrow — plan field operations early.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions – spans 3 cols */}
          <motion.div {...fadeUp(0.14)} className="lg:col-span-3">
            <div className="h-full bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-5">Quick Actions</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
                {quickActions.map((action, i) => (
                  <Link key={action.label} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.08, duration: 0.45 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative overflow-hidden flex flex-col items-center justify-center gap-3 text-center
                        bg-linear-to-br ${action.color} ${action.shadow}
                        shadow-lg rounded-2xl p-5 cursor-pointer h-full min-h-35 transition-shadow duration-200`}
                    >
                      {/* bubble */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        {action.icon}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm leading-tight">{action.label}</p>
                        <p className="text-white/70 text-xs mt-1">{action.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════
            3. ALERTS + ACTIVITY (row)
        ════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Alerts – 2 cols */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
            <div className="h-full bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-green-600">Alerts</p>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {alerts.length}
                </span>
              </div>

              <div className="space-y-3">
                {alerts.map((alert) => {
                  const bg = alert.type === "danger"
                    ? "bg-red-50 border-red-200"
                    : alert.type === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200";
                  return (
                    <motion.div
                      key={alert.id}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-start gap-3 rounded-2xl border p-3.5 ${bg} transition-transform duration-150`}
                    >
                      <AlertIcon type={alert.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 leading-snug">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity – 3 cols */}
          <motion.div {...fadeUp(0.26)} className="lg:col-span-3">
            <div className="h-full bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-green-600">Recent Disease Reports</p>
                <Link href="/reports"
                  className="text-xs font-semibold text-green-600 hover:text-green-800 transition-colors">
                  View All →
                </Link>
              </div>

              {/* Table header (desktop) */}
              <div className="hidden sm:grid grid-cols-4 text-xs font-bold uppercase tracking-wider text-green-700/50 px-3 mb-2">
                <span>Crop</span>
                <span>Disease</span>
                <span>Severity</span>
                <span>Status</span>
              </div>

              <div className="space-y-2.5">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 + i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.01, backgroundColor: "#f8fdf8" }}
                    className="rounded-2xl border border-green-50 bg-[#fafffe] p-3 sm:p-0 sm:bg-transparent sm:border-0 transition-all duration-150"
                  >
                    {/* Mobile card layout */}
                    <div className="sm:hidden space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#0f3d1a]">{item.crop}</p>
                        <SeverityBadge severity={item.severity} />
                      </div>
                      <p className="text-sm text-green-900/60">{item.disease}</p>
                      <div className="flex items-center justify-between">
                        <StatusBadge status={item.status} />
                        <p className="text-xs text-green-700/40">{item.date}</p>
                      </div>
                    </div>

                    {/* Desktop row layout */}
                    <div className="hidden sm:grid grid-cols-4 items-center px-3 py-3 rounded-2xl hover:bg-[#f3f8f3] transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-xs shrink-0">
                          🌿
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0f3d1a]">{item.crop}</p>
                          <p className="text-xs text-green-700/40">{item.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-900/70 truncate pr-2">{item.disease}</p>
                      <SeverityBadge severity={item.severity} />
                      <StatusBadge status={item.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════
            4. FARM HEALTH SUMMARY BAR
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.34)}>
          <div className="bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-6">
              Farm Health Overview
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Soil Health",    score: 82, color: "bg-green-500",  emoji: "🌱" },
                { label: "Crop Coverage",  score: 91, color: "bg-lime-500",   emoji: "🌾" },
                { label: "Pest Risk",      score: 34, color: "bg-red-400",    emoji: "🐛" },
                { label: "Irrigation",     score: 67, color: "bg-blue-400",   emoji: "💧" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base select-none">{metric.emoji}</span>
                      <p className="text-xs font-semibold text-green-900/70">{metric.label}</p>
                    </div>
                    <p className="text-sm font-black text-[#0f3d1a]"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {metric.score}%
                    </p>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.score}%` }}
                      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                      className={`h-2 rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p {...fadeUp(0.4)}
          className="text-center text-xs text-green-700/30 pb-4">
          Agro Vision — AI-Powered Smart Farming · Data refreshed every 30 minutes
        </motion.p>

      </div>
    </div>
  );
}
