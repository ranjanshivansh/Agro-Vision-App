"use client";

import { useEffect, useState } from "react";

// ── Mock Data ────────────────────────────────────────────────────────────────

type AdvisoryType = {
  crop: string;
  disease: string;
  severity: "low" | "medium" | "high";
  location: string;
  season: string;
  lastScanned: string;
  advisoryText: string;
  treatment: { step: string; action: string }[];
  weather: {
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  history: any[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const severityConfig: Record<AdvisoryType["severity"], {
  bg: string;
  text: string;
  border: string;
  dot: string;
  bar: string;
  width: string;
}> = {
  low:    { bg: "bg-emerald-50",  text: "text-emerald-700",  border: "border-emerald-200", dot: "bg-emerald-400",  bar: "bg-emerald-400",  width: "w-1/4"  },
  medium: { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400",   bar: "bg-amber-400",   width: "w-1/2"  },
  high:   { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     dot: "bg-red-400",     bar: "bg-red-500",     width: "w-full" },
};

const statusConfig: Record<string, string> = {
  Treated:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Monitoring: "bg-blue-50 text-blue-700 border-blue-200",
  Resolved:   "bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]",
};

// ── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  Bulb: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21h6M12 3a6 6 0 016 6c0 2.22-1.2 4.16-3 5.2V17H9v-2.8C7.2 13.16 6 11.22 6 9a6 6 0 016-6z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Plant: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2h-1c1-1 2.24-1.61 3-2z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  Rain: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 15.25M8 19v2M12 20v2M16 19v2" />
    </svg>
  ),
  Humidity: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
    </svg>
  ),
  Temp: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
    </svg>
  ),
  Warn: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Arrow: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

// ── Skeleton Shimmer Base ────────────────────────────────────────────────────
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-xl bg-[#e8f5e9] ${className}`}
  >
    <div
      className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
      }}
    />
  </div>
);

// ── Summary Card Skeleton ────────────────────────────────────────────────────
const SummaryCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 overflow-hidden">
    {/* accent bar */}
    <div className="h-1 w-full bg-[#e8f5e9]" />
    <div className="p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* avatar */}
        <Shimmer className="w-14 h-14 shrink-0 rounded-2xl" />

        {/* details */}
        <div className="flex-1 min-w-0 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Shimmer className="h-6 w-24 rounded-lg" />
            <Shimmer className="h-5 w-28 rounded-full" />
          </div>
          <Shimmer className="h-4 w-40 rounded-lg" />
          <Shimmer className="h-3.5 w-32 rounded-lg" />
        </div>

        {/* severity meter */}
        <div className="sm:text-right min-w-[110px] space-y-2">
          <Shimmer className="h-3 w-16 rounded ml-auto" />
          <Shimmer className="h-2 w-full rounded-full" />
          <Shimmer className="h-3 w-10 rounded ml-auto" />
        </div>
      </div>
    </div>
  </div>
);

// ── Weather Card Skeleton ────────────────────────────────────────────────────
const WeatherCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 p-5 sm:p-7">
    {/* header */}
    <div className="flex items-center gap-2 mb-5">
      <Shimmer className="w-7 h-7 rounded-xl" />
      <Shimmer className="h-5 w-44 rounded-lg" />
    </div>

    {/* weather stats strip */}
    <div className="grid grid-cols-3 gap-3 mb-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center bg-[#f8fffe] border border-[#e8f5e9] rounded-2xl p-3.5 gap-2"
        >
          <Shimmer className="w-8 h-8 rounded-xl" />
          <Shimmer className="h-5 w-12 rounded-lg" />
          <Shimmer className="h-3 w-16 rounded" />
        </div>
      ))}
    </div>

    {/* warning cards */}
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-start gap-3 border border-[#e8f5e9] rounded-2xl px-4 py-3.5 bg-[#f8fffe]"
        >
          <Shimmer className="shrink-0 w-8 h-8 rounded-xl mt-0.5" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <Shimmer className="h-4 w-32 rounded-lg" />
              <Shimmer className="h-4 w-14 rounded-full" />
            </div>
            <Shimmer className="h-3 w-full rounded" />
            <Shimmer className="h-3 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────
export default function AdvisoryPage() {
  const [advisory, setAdvisory] = useState<AdvisoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1️⃣ get latest report
      const reportRes = await fetch("/api/reports/latest");
      const report = await reportRes.json();

      // 2️⃣ get user location
      const userRes = await fetch("/api/user");
      const user = await userRes.json();

      const location = user.location || "Vellore";

      // 3️⃣ call Gemini
      const advisoryRes = await fetch("/api/advisory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: report.crop,
          disease: report.disease,
          severity: report.severity as AdvisoryType["severity"],
          location,
          weather: {
            temperature: report.temperature,
            humidity: report.humidity,
            rainfall: report.rainfall,
          },
        }),
      });

      const data = await advisoryRes.json();
      const lines = data.text.split("\n");

      const treatmentSteps = lines
        .filter((line: string) => /^\d+\./.test(line))
        .map((line: string) => ({
          step: line.split(".")[0],
          action: line.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "").trim(),
        }));

      setAdvisory({
        crop: report.crop,
        disease: report.disease,
        severity: report.severity,
        location,
        season: "Current Season",
        lastScanned: "Just now",
        advisoryText: data.text,
        treatment: treatmentSteps,
        weather: {
          temperature: report.temperature,
          humidity: report.humidity,
          rainfall: report.rainfall,
        },
        history: [],
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  const sev = advisory
    ? severityConfig[advisory.severity as keyof typeof severityConfig]
    : null;

  return (
    <>
      {/* Keyframe for shimmer animation injected once */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>

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

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">

          {/* ── 1. PAGE HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#2e7d32] to-[#1b5e20] flex items-center justify-center shadow-lg shadow-[#2e7d32]/30 text-white">
                <Icons.Bulb />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#1b5e20] tracking-tight leading-none">AI Advisory</h1>
                <p className="text-[#4a7a4a] text-xs mt-0.5">Personalized recommendations for your crop</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#81c784] bg-white/60 border border-[#c8e6c9] rounded-xl px-3 py-2 w-fit shadow-sm">
              <Icons.Clock />
              Last scanned:{" "}
              <span className="font-semibold text-[#2e7d32]">
                {loading ? "—" : advisory?.lastScanned}
              </span>
            </div>
          </div>

          {/* ── 2. SUMMARY CARD ── */}
          {loading || !advisory ? (
            <SummaryCardSkeleton />
          ) : (
            <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 overflow-hidden">
              <div className={`h-1 w-full ${sev!.bar}`} />
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-linear-to-br from-[#e8f5e9] to-[#c8e6c9] flex items-center justify-center text-2xl shadow-inner">
                    🌾
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-xl font-black text-[#1b5e20]">{advisory.crop}</h2>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${sev!.bg} ${sev!.text} ${sev!.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sev!.dot}`} />
                        {advisory.severity} Severity
                      </span>
                    </div>
                    <p className="text-[#1b5e20] font-semibold text-sm mb-1">
                      Disease: <span className="text-red-600">{advisory.disease}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[#81c784] text-xs">
                      <Icons.Location />
                      {advisory.location} · {advisory.season}
                    </div>
                  </div>
                  <div className="sm:text-right min-w-27.5">
                    <p className="text-[10px] font-bold text-[#81c784] uppercase tracking-widest mb-1.5">Risk Level</p>
                    <div className="w-full h-2 rounded-full bg-[#e8f5e9] overflow-hidden mb-1">
                      <div className={`h-full rounded-full ${sev!.bar} ${sev!.width} transition-all duration-700`} />
                    </div>
                    <p className={`text-xs font-bold ${sev!.text}`}>{advisory.severity}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 3. MAIN ADVISORY CARD ── */}
          <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
                <Icons.Plant />
              </div>
              <h3 className="font-bold text-[#1b5e20] text-base">What You Should Do</h3>
            </div>

            {loading || !advisory ? (
              /* Advisory text + steps skeleton */
              <div className="space-y-3">
                <Shimmer className="h-4 w-full rounded-lg" />
                <Shimmer className="h-4 w-5/6 rounded-lg" />
                <Shimmer className="h-4 w-4/5 rounded-lg" />
                <Shimmer className="h-4 w-full rounded-lg" />
                <Shimmer className="h-4 w-3/4 rounded-lg" />
                <div className="pt-3 space-y-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#f1f8e9]/70 border border-[#c8e6c9]/60 rounded-2xl px-4 py-3">
                      <Shimmer className="shrink-0 w-6 h-6 rounded-full mt-0.5" />
                      <div className="flex-1 space-y-1.5">
                        <Shimmer className="h-3.5 w-full rounded" />
                        <Shimmer className="h-3.5 w-2/3 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="text-[#2d4a2d] text-sm leading-7 mb-6 border-l-2 border-[#a5d6a7] pl-4">
                  {advisory.advisoryText}
                </p>
                <div>
                  <p className="text-[10px] font-bold text-[#81c784] uppercase tracking-widest mb-3">Step-by-Step Treatment</p>
                  <div className="space-y-2.5">
                    {advisory.treatment.map((t) => (
                      <div key={t.step} className="flex items-start gap-3 bg-[#f1f8e9]/70 border border-[#c8e6c9]/60 rounded-2xl px-4 py-3 hover:bg-[#e8f5e9] transition-colors duration-200">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-[#2e7d32] text-white text-xs font-black flex items-center justify-center mt-0.5 shadow">
                          {t.step}
                        </span>
                        <p className="text-[#1a3a1a] text-sm leading-relaxed">{t.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── 5. WEATHER IMPACT CARD ── */}
          {loading || !advisory ? (
            <WeatherCardSkeleton />
          ) : (
            <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Icons.Warn />
                </div>
                <h3 className="font-bold text-[#1b5e20] text-base">Weather Impact Analysis</h3>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: <Icons.Temp />, label: "Temperature", value: `${advisory.weather.temperature}°C`, color: "text-orange-500", bg: "bg-orange-50" },
                  { icon: <Icons.Humidity />, label: "Humidity", value: `${advisory.weather.humidity}%`, color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: <Icons.Rain />, label: "Rainfall", value: `${advisory.weather.rainfall} mm`, color: "text-sky-500", bg: "bg-sky-50" },
                ].map((w) => (
                  <div key={w.label} className="flex flex-col items-center justify-center bg-[#f8fffe] border border-[#e8f5e9] rounded-2xl p-3.5 text-center">
                    <span className={`${w.color} ${w.bg} w-8 h-8 rounded-xl flex items-center justify-center mb-2`}>{w.icon}</span>
                    <p className="font-black text-[#1b5e20] text-base leading-none">{w.value}</p>
                    <p className="text-[#81c784] text-[10px] mt-0.5">{w.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  {
                    level: "danger" as const,
                    icon: <Icons.Humidity />,
                    title: "High Humidity Alert",
                    msg: `Humidity at ${advisory.weather.humidity}% significantly accelerates Leaf Blight spread. Ensure good field drainage and air circulation.`,
                  },
                  {
                    level: "warning" as const,
                    icon: <Icons.Rain />,
                    title: "Rainfall Advisory",
                    msg: `Avoid spraying bactericide before rainfall (expected ${advisory.weather.rainfall}mm). Schedule treatment at least 6 hours after rain stops.`,
                  },
                  {
                    level: "info" as const,
                    icon: <Icons.Temp />,
                    title: "Temperature Note",
                    msg: `Current temperature of ${advisory.weather.temperature}°C is within pathogen optimal range. Early morning spraying recommended.`,
                  },
                ].map((w) => {
                  const styles = {
                    danger: { wrap: "bg-red-50 border-red-200", icon: "bg-red-100 text-red-600", title: "text-red-700", msg: "text-red-600", badge: "bg-red-100 text-red-700 border-red-200", badgeText: "High Risk" },
                    warning: { wrap: "bg-amber-50 border-amber-200", icon: "bg-amber-100 text-amber-600", title: "text-amber-700", msg: "text-amber-600", badge: "bg-amber-100 text-amber-700 border-amber-200", badgeText: "Caution" },
                    info: { wrap: "bg-blue-50 border-blue-200", icon: "bg-blue-100 text-blue-600", title: "text-blue-700", msg: "text-blue-600", badge: "bg-blue-100 text-blue-700 border-blue-200", badgeText: "Info" },
                  }[w.level];
                  return (
                    <div key={w.title} className={`flex items-start gap-3 border rounded-2xl px-4 py-3.5 ${styles!.wrap}`}>
                      <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 ${styles!.icon}`}>{w.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-bold text-sm ${styles!.title}`}>{w.title}</p>
                          <span className={`text-[9px] font-bold uppercase tracking-wider border px-1.5 py-0.5 rounded-full ${styles!.badge}`}>{styles!.badgeText}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${styles!.msg}`}>{w.msg}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="text-center text-[10px] text-[#81c784] pb-2">
            🌱 AI Advisory powered by Agro Vision · Always consult a local agronomist for critical decisions
          </p>
        </div>
      </div>
    </>
  );
}
