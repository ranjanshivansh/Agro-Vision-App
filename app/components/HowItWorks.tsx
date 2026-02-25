"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign Up & Connect",
    description: "Create your farm profile in minutes. Add your location, crop types, and field boundaries.",
  },
  {
    number: "02",
    title: "Capture & Upload",
    description: "Photograph your crops or input field data. Our app guides you through the process step by step.",
  },
  {
    number: "03",
    title: "AI Analysis",
    description: "Our models process your data against millions of agronomic data points to produce accurate insights.",
  },
  {
    number: "04",
    title: "Act on Advice",
    description: "Receive clear, actionable recommendations. Track outcomes and watch your yield improve season over season.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#f0f7f0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#166534 1px, transparent 1px), linear-gradient(90deg, #166534 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-600 bg-green-100 border border-green-200 rounded-full px-4 py-1.5 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            How It Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0f3d1a] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Four steps to a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #16a34a, #84cc16)" }}
            >
              smarter farm
            </span>
          </h2>
          <p
            className="text-green-900/60 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Getting started is simple. From sign-up to your first AI recommendation in under 10 minutes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-linear-to-r from-green-200 via-green-400 to-lime-300" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13, duration: 0.55, ease: "easeOut" }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-white border-2 border-green-300 flex items-center justify-center mb-6 shadow-md shadow-green-100 relative z-10"
                >
                  <span
                    className="text-2xl font-black bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #16a34a, #84cc16)",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {step.number}
                  </span>
                </motion.div>

                <h3
                  className="text-lg font-bold text-[#0f3d1a] mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm text-green-900/60 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}