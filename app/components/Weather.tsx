"use client";

import { useEffect, useState } from "react";

function SunIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="13" fill="#FBBF24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="30.5"
          y="4"
          width="3"
          height="8"
          rx="1.5"
          fill="#FCD34D"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  );
}

function CloudRainIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M50 40a12 12 0 00-2-23.8A16 16 0 008 28a10 10 0 002 20h40z"
        fill="#94A3B8"
      />
      <path
        d="M22 50l-2 6M32 50l-2 6M42 50l-2 6"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloudIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="20" cy="32" r="8" fill="#FCD34D" opacity="0.7" />
      <path
        d="M46 42a10 10 0 00-2-19.8A14 14 0 0012 30a8 8 0 001 16h33z"
        fill="#CBD5E1"
      />
      <path
        d="M44 42a10 10 0 00-2-19.8A14 14 0 0010 30a8 8 0 001 16h33z"
        fill="#E2E8F0"
      />
    </svg>
  );
}

function WeatherIcon({
  condition,
  className,
}: {
  condition: string;
  className?: string;
}) {
  if (condition === "Clear" || condition === "Sunny")
    return <SunIcon className={className} />;
  if (
    condition === "Rain" ||
    condition === "Rainy" ||
    condition === "Heavy Rain"
  )
    return <CloudRainIcon className={className} />;
  return <CloudIcon className={className} />;
}

function HumidityIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2M9.6 4.6A2 2 0 1111 8H2m10.6 11.4A2 2 0 1014 16H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 15.25M8 19v2M12 20v2M16 19v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ─── Skeleton primitives ────────────────────────────────────────────────────

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white/20 ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Shimmer className="h-7 w-48 rounded-xl" />
        <Shimmer className="h-3.5 w-32 rounded-md" />
      </div>
      <Shimmer className="h-8 w-16 rounded-full" />
    </div>
  );
}

function CurrentCardSkeleton() {
  return (
    <div className="relative bg-gradient-to-br from-[#1b5e20] via-[#256427] to-[#2e7d32] rounded-3xl shadow-2xl shadow-[#1b5e20]/30 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 translate-y-12 -translate-x-12" />

      <div className="relative p-6 sm:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2.5">
            <Shimmer className="h-3.5 w-36 rounded-md" />
            <Shimmer className="h-4 w-24 rounded-md" />
          </div>
          {/* Icon placeholder */}
          <Shimmer className="w-16 h-16 rounded-2xl" />
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-2 mb-1">
          <Shimmer className="h-24 w-44 rounded-2xl" />
        </div>
        <Shimmer className="h-4 w-32 rounded-md mt-2 mb-6" />

        {/* Divider */}
        <div className="h-px bg-white/10 mb-5" />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-2xl px-3.5 py-3 flex items-center gap-2.5"
            >
              <Shimmer className="w-7 h-7 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Shimmer className="h-4 w-14 rounded-md" />
                <Shimmer className="h-2.5 w-10 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div>
      {/* Section label */}
      <Shimmer className="h-3 w-28 rounded-md mb-3 ml-1 bg-[#c8e6c9]" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl p-5 shadow-lg space-y-3"
          >
            {/* Day + date */}
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <Shimmer className="h-4 w-10 rounded-md bg-[#c8e6c9]" />
                <Shimmer className="h-3 w-14 rounded-md bg-[#c8e6c9]" />
              </div>
            </div>

            {/* Icon */}
            <div className="flex justify-center">
              <Shimmer className="w-14 h-14 rounded-2xl bg-[#c8e6c9]" />
            </div>

            {/* Condition text */}
            <Shimmer className="h-3 w-20 rounded-md mx-auto bg-[#c8e6c9]" />

            {/* Temp */}
            <div className="flex items-center justify-center gap-2">
              <Shimmer className="h-8 w-14 rounded-lg bg-[#c8e6c9]" />
              <Shimmer className="h-6 w-10 rounded-lg bg-[#c8e6c9]" />
            </div>

            {/* Rain bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Shimmer className="h-2.5 w-16 rounded bg-[#c8e6c9]" />
                <Shimmer className="h-2.5 w-6 rounded bg-[#c8e6c9]" />
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#e8f5e9] overflow-hidden">
                <Shimmer className="h-full w-1/2 rounded-full bg-[#a5d6a7]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f0faf0] to-[#d4edda] px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,85,34,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,85,34,0.09) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <HeaderSkeleton />
          <CurrentCardSkeleton />
          <ForecastSkeleton />
          {/* Footer */}
          <div className="flex justify-center pb-2">
            <Shimmer className="h-3 w-64 rounded-md bg-[#c8e6c9]" />
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function WeatherPage() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeather(data);
    };
    fetchWeather();
  }, []);

  if (!weather) return <WeatherSkeleton />;

  const { current, forecast, location, date } = weather;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f0faf0] to-[#d4edda] px-4 sm:px-6 lg:px-8 py-10">
        {/* Subtle grid */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,85,34,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,85,34,0.09) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1b5e20] tracking-tight">
                Weather Forecast 🌦️
              </h1>
              <p className="text-[#4a7a4a] text-xs mt-0.5">{date}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#c8e6c9] text-[#2e7d32] text-xs font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50] animate-pulse" />
              Live
            </span>
          </div>

          {/* ── Current Weather Card ── */}
          <div className="relative bg-gradient-to-br from-[#1b5e20] via-[#256427] to-[#2e7d32] rounded-3xl shadow-2xl shadow-[#1b5e20]/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 translate-y-12 -translate-x-12" />

            <div className="relative p-6 sm:p-8">
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg
                      className="w-3.5 h-3.5 text-[#81c784]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-[#a5d6a7] text-xs font-semibold">
                      {location}
                    </span>
                  </div>
                  <p className="text-[#81c784] text-sm">{current.condition}</p>
                </div>
                <WeatherIcon
                  condition={current.condition}
                  className="w-16 h-16 drop-shadow-lg"
                />
              </div>

              {/* Temperature */}
              <div className="flex items-end gap-2 mb-1">
                <span className="text-8xl font-black text-white leading-none tracking-tight">
                  {current.temperature}
                </span>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-[#a5d6a7]">°C</span>
                </div>
              </div>
              <p className="text-[#81c784] text-sm mb-6">
                Feels like {current.feelsLike}°C
              </p>

              <div className="h-px bg-white/10 mb-5" />

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    icon: <HumidityIcon />,
                    label: "Humidity",
                    value: `${current.humidity}%`,
                    color: "text-blue-300",
                  },
                  {
                    icon: <WindIcon />,
                    label: "Wind",
                    value: `${current.wind} km/h`,
                    color: "text-teal-300",
                  },
                  {
                    icon: <RainIcon />,
                    label: "Rainfall",
                    value: `${current.rainfall} mm`,
                    color: "text-sky-300",
                  },
                  {
                    icon: <EyeIcon />,
                    label: "Visibility",
                    value: `${current.visibility} km`,
                    color: "text-purple-300",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/10 rounded-2xl px-3.5 py-3 flex items-center gap-2.5"
                  >
                    <span className={s.color}>{s.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm leading-none">
                        {s.value}
                      </p>
                      <p className="text-[#a5d6a7] text-[10px] mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 4-Day Forecast ── */}
          <div>
            <p className="text-xs font-bold text-[#1b5e20] uppercase tracking-widest mb-3 px-1">
              4-Day Forecast
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {forecast.map((day: any, i: number) => (
                <div
                  key={i}
                  className={`relative bg-white/80 backdrop-blur border rounded-3xl p-5 shadow-lg shadow-[#2e7d32]/8 hover:shadow-xl hover:shadow-[#2e7d32]/15 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                    i === 1 ? "border-[#a5d6a7]" : "border-white/70"
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-[#4caf50]/20 pointer-events-none" />
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-extrabold text-[#1b5e20] text-base">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>
                      <p className="text-[#81c784] text-xs">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    {i === 1 && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                        Rain
                      </span>
                    )}
                  </div>

                  <div className="flex justify-center mb-4">
                    <WeatherIcon
                      condition={day.condition}
                      className="w-14 h-14 drop-shadow"
                    />
                  </div>

                  <p className="text-center text-[#4a7a4a] text-xs mb-4 font-medium">
                    {day.condition}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-black text-[#1b5e20]">
                      {day.max}°
                    </span>
                    <span className="text-lg font-semibold text-[#81c784]">
                      {day.min}°
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#81c784] font-semibold uppercase tracking-wider">
                        Rain chance
                      </span>
                      <span
                        className={`text-xs font-bold ${day.rainChance > 60 ? "text-blue-500" : "text-[#4a7a4a]"}`}
                      >
                        {day.rainChance}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#e8f5e9] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          day.rainChance > 60
                            ? "bg-blue-400"
                            : day.rainChance > 30
                              ? "bg-[#66bb6a]"
                              : "bg-[#a5d6a7]"
                        }`}
                        style={{ width: `${day.rainChance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer note ── */}
          <p className="text-center text-[10px] text-[#81c784] pb-2">
            🌱 Weather data refreshes every 30 minutes · Agro Vision
          </p>
        </div>
      </div>
    </>
  );
}
