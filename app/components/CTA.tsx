"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center"
          style={{
            background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #365314 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-lime-400/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-300/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span
                className="text-sm font-medium text-lime-200 tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Free to get started — no credit card needed
              </span>
            </motion.div>

            <h2
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Ready to grow{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a3e635, #86efac)" }}
              >
                smarter?
              </span>
            </h2>

            <p
              className="text-green-100/70 text-lg max-w-xl mx-auto mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join thousands of farmers already making better decisions with Agro Vision. It only takes a few minutes to set up.
            </p>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05, backgroundColor: "#a3e635" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-lime-400 text-[#0f3d1a] font-black px-10 py-4 rounded-2xl text-lg shadow-xl shadow-black/20 transition-colors"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Start Now — It's Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
