"use client";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Simple to Use",
    description:
      "No technical expertise required. If you can use a smartphone, you can use Agro Vision — designed for farmers, not engineers.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4l2.5 7.5H26l-6 4.5 2.3 7.5L16 19l-6.3 4.5L12 16 6 11.5h7.5L16 4z" fill="#16a34a" />
      </svg>
    ),
  },
  {
    title: "AI at the Core",
    description:
      "Trained on decades of agronomic research and real farm data. Our models get smarter with every interaction.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="5" fill="#16a34a" />
        <circle cx="6" cy="10" r="3" stroke="#16a34a" strokeWidth="2" />
        <circle cx="26" cy="10" r="3" stroke="#16a34a" strokeWidth="2" />
        <circle cx="6" cy="22" r="3" stroke="#16a34a" strokeWidth="2" />
        <circle cx="26" cy="22" r="3" stroke="#16a34a" strokeWidth="2" />
        <path d="M9 11l5 4M23 11l-5 4M9 21l5-4M23 21l-5-4" stroke="#16a34a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Works Offline",
    description:
      "Poor connectivity in rural areas? No problem. Core features work offline and sync when you're back online.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 20h16M12 24h8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 14c3.3-3.3 7.8-5 12-5s8.7 1.7 12 5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 17.5c2.2-2.2 5-3.5 8-3.5s5.8 1.3 8 3.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="21" r="1.5" fill="#16a34a" />
      </svg>
    ),
  },
  {
    title: "Multi-Language",
    description:
      "Available in 12+ regional languages so every farmer can access advice in their native tongue.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#16a34a" strokeWidth="2" />
        <path d="M16 5c-3 3-5 6.5-5 11s2 8 5 11M16 5c3 3 5 6.5 5 11s-2 8-5 11" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M5 16h22" stroke="#16a34a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Affordable Plans",
    description:
      "Pricing designed for smallholder farmers. Start free, upgrade only when you're seeing real results.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="8" width="22" height="16" rx="3" stroke="#16a34a" strokeWidth="2" />
        <path d="M5 13h22" stroke="#16a34a" strokeWidth="2" />
        <circle cx="10" cy="19" r="1.5" fill="#16a34a" />
      </svg>
    ),
  },
  {
    title: "Expert Support",
    description:
      "A team of agronomists and AI engineers available via chat and call. Real humans, real answers.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="10" r="4" stroke="#16a34a" strokeWidth="2" />
        <path d="M6 22c0 1.1.9 2 2 2h16a2 2 0 002-2" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
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
            Why Agro Vision
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0f3d1a] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Built for real{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #84cc16)" }}
            >
              farmers
            </span>
          </h2>
          <p
            className="text-green-900/60 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Not just another ag-tech app. Every feature is designed with ground-level farming realities in mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="flex gap-4 p-6 bg-[#f8fdf8] border border-green-100 rounded-3xl cursor-default"
            >
              <div className="shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                {b.icon}
              </div>
              <div>
                <h3
                  className="font-bold text-[#0f3d1a] mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-sm text-green-900/60 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
