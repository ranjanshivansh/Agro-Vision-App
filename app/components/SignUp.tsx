"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Signup failed");
      return;
    }

    toast.success("Account created 🌱");

    router.push("/signin");

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#e8f5e9] via-[#f0faf0] to-[#d4edda] flex flex-col">
      {/* Grid texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,85,34,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,85,34,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
     

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Badge */}
          

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#2e7d32]/10 border border-white/60 overflow-hidden">
            {/* Card Header */}
            <div className="bg-linear-to-r from-[#1b5e20] to-[#2e7d32] px-8 pt-8 pb-7">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Create your account
              </h1>
              <p className="text-[#a5d6a7] text-sm mt-1">
                Join 12,000+ farmers growing smarter with AI
              </p>
              {/* Stats strip */}
              <div className="flex gap-5 mt-5">
                {[
                  { val: "12,000+", label: "Farms" },
                  { val: "97.4%", label: "Accuracy" },
                  { val: "80+", label: "Crops" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-white font-bold text-sm">{s.val}</p>
                    <p className="text-[#a5d6a7] text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1b5e20] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81c784]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#c8e6c9] bg-[#f1f8e9]/60 text-[#1a3a1a] placeholder-[#a5d6a7] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/40 focus:border-[#4caf50] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1b5e20] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81c784]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#c8e6c9] bg-[#f1f8e9]/60 text-[#1a3a1a] placeholder-[#a5d6a7] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/40 focus:border-[#4caf50] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#1b5e20] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81c784]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#c8e6c9] bg-[#f1f8e9]/60 text-[#1a3a1a] placeholder-[#a5d6a7] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/40 focus:border-[#4caf50] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#81c784] hover:text-[#4caf50] transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password strength indicator */}
                {formData.password.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          formData.password.length >= i * 2
                            ? formData.password.length < 4
                              ? "bg-red-400"
                              : formData.password.length < 6
                              ? "bg-yellow-400"
                              : "bg-[#4caf50]"
                            : "bg-[#e8f5e9]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-[#1b5e20] uppercase tracking-wider mb-1.5">
                  Location (City/Village)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81c784]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#c8e6c9] bg-[#f1f8e9]/60 text-[#1a3a1a] placeholder-[#a5d6a7] text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50]/40 focus:border-[#4caf50] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 w-4 h-4 rounded border-[#a5d6a7] text-[#2e7d32] accent-[#2e7d32] cursor-pointer"
                />
                <span className="text-xs text-[#4a7a4a] leading-relaxed">
                  I agree to the{" "}
                  <Link href="#" className="text-[#2e7d32] font-semibold underline underline-offset-2 hover:text-[#1b5e20]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#2e7d32] font-semibold underline underline-offset-2 hover:text-[#1b5e20]">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#2e7d32] to-[#388e3c] hover:from-[#1b5e20] hover:to-[#2e7d32] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#2e7d32]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              {/* <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-[#c8e6c9]" />
                <span className="text-xs text-[#81c784] font-medium">or continue with</span>
                <div className="flex-1 h-px bg-[#c8e6c9]" />
              </div> */}

              {/* Social Buttons */}
              {/* <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Google",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Phone",
                    icon: (
                      <svg className="w-4 h-4 text-[#2e7d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#c8e6c9] bg-white/60 hover:bg-white hover:border-[#81c784] text-[#1a3a1a] text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    {s.icon}
                    {s.label}
                  </button>
                ))}
              </div> */}

              {/* Sign in link */}
              <p className="text-center text-sm text-[#4a7a4a]">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#2e7d32] font-bold hover:text-[#1b5e20] underline underline-offset-2 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-[#81c784] mt-6">
            🌱 Trusted by farmers across 15+ states in India
          </p>
        </div>
      </div>
    </div>
  );
}
