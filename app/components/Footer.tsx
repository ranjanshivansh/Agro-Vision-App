"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0f3d1a] text-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="text-3xl font-black mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-white">Agro</span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a3e635, #86efac)" }}
              >
                {" "}Vision
              </span>
            </div>
            <p
              className="text-green-300/60 text-sm max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Smart farming advisory powered by AI. Growing a better tomorrow, one field at a time.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-6 text-sm text-green-300/70"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {["Features", "How It Works", "Pricing", "Blog", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-lime-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="text-green-400/40 text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} Agro Vision. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-green-400/40 text-xs hover:text-lime-400 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
