"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f0f7f0]">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-125 h-125 rounded-full bg-green-300/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-lime-200/20 blur-[140px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#166534 1px, transparent 1px), linear-gradient(90deg, #166534 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-green-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"/>
        <span className="relative inlne-flex rounded-full h-2 w-2 bg-green-500"/>
        </span>
          <span className="text-sm font-medium text-green-800 tracking-wide">
            AI-Powered Smart Farming
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-[#0f3d1a]">Agro</span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #16a34a 0%, #65a30d 60%, #a3e635 100%)",
            }}
          >
            {" "}
            Vision
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-green-900/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Harness the power of artificial intelligence to protect your crops,
          predict the weather, and grow smarter — right from your phone.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-700/30 transition-colors text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur border border-green-200 text-green-900 font-semibold px-8 py-4 rounded-2xl shadow-sm hover:bg-white transition-colors text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-4"
        >
          {[
            { label: "Farms Served", value: "12,000+" },
            { label: "Accuracy Rate", value: "97.4%" },
            { label: "Crops Monitored", value: "80+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/60 backdrop-blur-md border border-green-100 rounded-2xl px-6 py-4 shadow-md min-w-35"
            >
              <div
                className="text-2xl font-black text-green-800"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-green-700/70 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
