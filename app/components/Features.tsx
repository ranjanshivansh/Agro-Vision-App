"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Disease Detection",
    description:
      "Snap a photo of any leaf or plant. Our vision AI diagnoses disease within seconds and suggests targeted treatment.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#dcfce7" />
        <path d="M16 28c2-6 8-10 16-8" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30" cy="18" r="3" fill="#16a34a" />
        <path d="M20 32l2-2" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 34l1-3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Weather Forecast",
    description:
      "Hyper-local 14-day forecasts built for agriculture. Plan your irrigation, harvest, and field operations with confidence.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#dcfce7" />
        <circle cx="22" cy="22" r="5" fill="#16a34a" />
        <path d="M22 13v2M22 29v2M13 22h2M29 22h2" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 30c2 0 4-1.5 4-4s-2-4-4-4h-1a6 6 0 10-5.8 7.5" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Advisory",
    description:
      "Get personalised crop recommendations, fertiliser schedules, and pest alerts powered by machine learning models.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#dcfce7" />
        <rect x="14" y="16" width="20" height="14" rx="4" stroke="#16a34a" strokeWidth="2" />
        <path d="M19 30v3M24 30v3M29 30v3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="23" r="1.5" fill="#16a34a" />
        <circle cx="24" cy="23" r="1.5" fill="#16a34a" />
        <circle cx="28" cy="23" r="1.5" fill="#16a34a" />
      </svg>
    ),
  },
  {
    title: "Farm Dashboard",
    description:
      "Unified real-time dashboard tracking soil health, crop stages, alerts and financial insights across all your fields.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#dcfce7" />
        <rect x="13" y="14" width="9" height="9" rx="2" stroke="#16a34a" strokeWidth="2" />
        <rect x="26" y="14" width="9" height="5" rx="2" stroke="#16a34a" strokeWidth="2" />
        <rect x="26" y="23" width="9" height="10" rx="2" stroke="#16a34a" strokeWidth="2" />
        <rect x="13" y="27" width="9" height="6" rx="2" stroke="#16a34a" strokeWidth="2" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100/60 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-100/60 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-600 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Features
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0f3d1a] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Everything your farm{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #84cc16)" }}
            >
              needs
            </span>
          </h2>
          <p
            className="text-green-900/60 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Four powerful modules working together to give every farmer an unfair advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 60px -10px rgba(22,163,74,0.18)" }}
              className="bg-[#f8fdf8] border border-green-100 rounded-3xl p-6 cursor-default transition-shadow"
            >
              <div className="mb-4">{f.icon}</div>
              <h3
                className="text-lg font-bold text-[#0f3d1a] mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm text-green-900/60 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
