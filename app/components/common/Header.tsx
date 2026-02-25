"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4"
        />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    label: "Upload",
    href: "/upload",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
  {
    label: "Weather",
    href: "/weather",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    label: "Advisory",
    href: "/advisory",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "/reports",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length === 1 ? parts[0][0] : parts[0][0] + parts[1][0];
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0b3d1a]/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-green-900/30"
          : "bg-[#0b3d1a]/70 backdrop-blur-md border-b border-green-900/20",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-8 h-8 rounded-xl bg-linear-to-br from-green-500 to-lime-400 flex items-center justify-center shadow-md shadow-green-300/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-white"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M12 3C7 3 4 7 4 12c0 2 1 4 3 5.5M12 3c5 0 8 4 8 9 0 2-1 4-3 5.5M12 3v18M8 8c1.5 1.5 2.5 3.5 2.5 6M16 8c-1.5 1.5-2.5 3.5-2.5 6"
                />
              </svg>
            </motion.div>
            <span
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-[#0f3d1a]">Agro</span>
              <span className="bg-linear-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
                {" "}
                Vision
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={[
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition",
                      isActive
                        ? "text-lime-300 bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 relative">
              {status === "loading" ? (
                // 🔥 Skeleton Loader
                <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
              ) : !session ? (
                <>
                  <Link href="/signin">
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg transition">
                      Sign In
                    </button>
                  </Link>

                  <Link href="/signup">
                    <button className="px-3 py-1.5 text-sm font-medium text-white border border-green-500 hover:bg-green-500 rounded-lg transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Avatar */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center"
                  >
                    {getInitials(session.user.name)}
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg border p-2">
                      <button
                        onClick={() => router.push("/profile")}
                        className="w-full text-black text-left px-3 py-2 text-sm hover:bg-green-100 rounded-lg"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile button (only one) */}
            <div className="sm:hidden">
              {status === "loading" ? (
                // 🔥 Skeleton Loader
                <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
              ) : !session ? (
                <>
                  <Link href="/login">
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg whitespace-nowrap">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Avatar */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center"
                  >
                    {getInitials(session.user.name)}
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg border p-2">
                      <button
                        onClick={() => router.push("/profile")}
                        className="w-full text-black text-left px-3 py-2 text-sm hover:bg-green-100 rounded-lg"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0b3d1a]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-white/80 py-2 block">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
