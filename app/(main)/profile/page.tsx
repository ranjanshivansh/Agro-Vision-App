"use client";

import { useEffect, useState, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  location: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

// ── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Location: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Plant: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2h-1c1-1 2.24-1.61 3-2z" />
    </svg>
  ),
};

// ── Toast Component ──────────────────────────────────────────────────────────
function ToastNotification({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isSuccess = toast.type === "success";
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold animate-in slide-in-from-top-2 transition-all duration-300 ${
      isSuccess
        ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-100"
        : "bg-red-50 border-red-200 text-red-800 shadow-red-100"
    }`}>
      <span className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
        {isSuccess ? <Icons.Check /> : <Icons.Alert />}
      </span>
      {toast.message}
      <button onClick={onDismiss} className="ml-2 opacity-50 hover:opacity-100 transition-opacity text-lg leading-none">×</button>
    </div>
  );
}

// ── Input Field ──────────────────────────────────────────────────────────────
function InputField({
  label, value, onChange, type = "text", placeholder, disabled = false,
  readonly = false, icon, rightEl, error,
}: {
  label: string; value: string; onChange?: (v: string) => void;
  type?: string; placeholder?: string; disabled?: boolean;
  readonly?: boolean; icon?: React.ReactNode; rightEl?: React.ReactNode; error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#1b5e20] uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81c784]">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          className={`w-full py-3 rounded-xl border text-sm transition-all duration-200
            ${icon ? "pl-10" : "pl-4"}
            ${rightEl ? "pr-12" : "pr-4"}
            ${readonly || disabled
              ? "bg-[#f1f8e9]/40 border-[#e8f5e9] text-[#4a7a4a] cursor-not-allowed"
              : "bg-[#f1f8e9]/60 border-[#c8e6c9] text-[#1a3a1a] focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 focus:border-[#4caf50]"
            }
            ${error ? "border-red-300 focus:ring-red-200 focus:border-red-400" : ""}
          `}
        />
        {rightEl && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><Icons.Alert />{error}</p>}
    </div>
  );
}

// ── Password Field ───────────────────────────────────────────────────────────
function PasswordField({
  label, value, onChange, disabled, error, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; error?: string; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <InputField
      label={label}
      value={value}
      onChange={onChange}
      type={show ? "text" : "password"}
      placeholder={placeholder ?? "••••••••"}
      disabled={disabled}
      icon={<Icons.Lock />}
      error={error}
      rightEl={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-[#81c784] hover:text-[#4caf50] transition-colors"
          tabIndex={-1}
        >
          {show ? <Icons.EyeOff /> : <Icons.Eye />}
        </button>
      }
    />
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <div className="h-3 w-20 rounded bg-[#e8f5e9] mb-2" />
          <div className="h-11 rounded-xl bg-[#e8f5e9]" />
        </div>
      ))}
      <div className="h-11 rounded-xl bg-[#c8e6c9] mt-2" />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [user, setUser]             = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [toast, setToast]           = useState<Toast | null>(null);

  // Location state
  const [location, setLocation]         = useState("");
  const [savingLocation, setSavingLocation] = useState(false);
  const [locationError, setLocationError]   = useState("");

  // Password state
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [pwErrors, setPwErrors]     = useState<Record<string, string>>({});
  const [savingPw, setSavingPw]     = useState(false);

  const showToast = useCallback((type: Toast["type"], message: string) => {
    setToast({ type, message });
  }, []);

  // ── Fetch user ─────────────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoadingUser(true);
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);
        const data: User = await res.json();
        setUser(data);
        setLocation(data.location);
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  // ── Update Location ────────────────────────────────────────────────────────
  async function handleUpdateLocation() {
    if (!location.trim()) {
      setLocationError("Location cannot be empty.");
      return;
    }
    setLocationError("");
    setSavingLocation(true);
    try {
      const res = await fetch("/api/user/location", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update location.");
      setUser((prev) => prev ? { ...prev, location: location.trim() } : prev);
      showToast("success", "Location updated successfully!");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSavingLocation(false);
    }
  }

  // ── Change Password ────────────────────────────────────────────────────────
  function validatePassword(): boolean {
    const errs: Record<string, string> = {};
    if (!currentPw) errs.currentPw = "Current password is required.";
    if (!newPw)     errs.newPw     = "New password is required.";
    else if (newPw.length < 6) errs.newPw = "Password must be at least 6 characters.";
    if (!confirmPw) errs.confirmPw = "Please confirm your new password.";
    else if (newPw !== confirmPw) errs.confirmPw = "Passwords do not match.";
    if (currentPw && newPw && currentPw === newPw) errs.newPw = "New password must differ from current.";
    setPwErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleChangePassword() {
    if (!validatePassword()) return;
    setSavingPw(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Failed to change password.");
      }
      setCurrentPw(""); setNewPw(""); setConfirmPw(""); setPwErrors({});
      showToast("success", "Password changed successfully!");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Change failed.");
    } finally {
      setSavingPw(false);
    }
  }

  // ── Strength meter ─────────────────────────────────────────────────────────
  const strength = newPw.length === 0 ? 0 : newPw.length < 6 ? 1 : newPw.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400"][strength];

  const locationChanged = user ? location.trim() !== user.location : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f0faf0] to-[#d4edda] px-4 sm:px-6 lg:px-8 py-8 mt-17">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,85,34,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,85,34,0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Toast */}
      {toast && <ToastNotification toast={toast} onDismiss={() => setToast(null)} />}

      <div className="relative z-10 max-w-2xl mx-auto space-y-5">

        {/* ── Page Header ── */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] flex items-center justify-center shadow-lg shadow-[#2e7d32]/30 text-white">
            <Icons.User />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1b5e20] tracking-tight leading-none">Profile Settings</h1>
            <p className="text-[#4a7a4a] text-xs mt-0.5">Manage your account information and security</p>
          </div>
        </div>

        {/* ── Fetch error ── */}
        {fetchError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-700">
            <span className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-red-500"><Icons.Alert /></span>
            <div>
              <p className="font-bold text-sm">Could not load profile</p>
              <p className="text-xs opacity-80">{fetchError}</p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* CARD 1 — Profile Info                                            */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 sm:px-8 py-5 border-b border-[#f0f7f0]">
            <div className="w-8 h-8 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
              <Icons.User />
            </div>
            <div>
              <h2 className="font-bold text-[#1b5e20] text-base leading-none">Profile Information</h2>
              <p className="text-[#81c784] text-xs mt-0.5">Your personal details on Agro Vision</p>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-6 space-y-5">
            {loadingUser ? (
              <ProfileSkeleton />
            ) : !fetchError ? (
              <>
                {/* Avatar */}
                <div className="flex items-center gap-4 pb-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] flex items-center justify-center text-2xl text-white font-black shadow-lg shadow-[#2e7d32]/25 flex-shrink-0">
                    {user?.name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="font-black text-[#1b5e20] text-lg leading-none">{user?.name}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <p className="text-[#81c784] text-xs font-medium">Active Farmer Account</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[#a5d6a7]">
                      <Icons.Plant />
                      <p className="text-xs">Agro Vision Member</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#f0f7f0]" />

                {/* Name (readonly) */}
                <InputField
                  label="Full Name"
                  value={user?.name ?? ""}
                  readonly
                  icon={<Icons.User />}
                  placeholder="Your name"
                />

                {/* Email (readonly) */}
                <InputField
                  label="Email Address"
                  value={user?.email ?? ""}
                  readonly
                  icon={<Icons.Mail />}
                  placeholder="your@email.com"
                />

                {/* Location (editable) */}
                <div>
                  <InputField
                    label="Location (City)"
                    value={location}
                    onChange={(v) => { setLocation(v); setLocationError(""); }}
                    icon={<Icons.Location />}
                    placeholder="e.g. Vellore, Tamil Nadu"
                    error={locationError}
                  />
                  {locationChanged && (
                    <p className="text-[10px] text-[#81c784] mt-1 flex items-center gap-1">
                      <Icons.Edit /> Unsaved changes
                    </p>
                  )}
                </div>

                {/* Update button */}
                <button
                  onClick={handleUpdateLocation}
                  disabled={savingLocation || !locationChanged}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2e7d32] to-[#388e3c] hover:from-[#1b5e20] hover:to-[#2e7d32] text-white font-bold text-sm shadow-lg shadow-[#2e7d32]/25 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {savingLocation ? (
                    <><Icons.Spinner /> Saving…</>
                  ) : (
                    <><Icons.Check /> Update Location</>
                  )}
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* CARD 2 — Security Settings                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white/80 backdrop-blur border border-white/70 rounded-3xl shadow-xl shadow-[#2e7d32]/8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 sm:px-8 py-5 border-b border-[#f0f7f0]">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Icons.Shield />
            </div>
            <div>
              <h2 className="font-bold text-[#1b5e20] text-base leading-none">Security Settings</h2>
              <p className="text-[#81c784] text-xs mt-0.5">Change your password to keep your account safe</p>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-6 space-y-5">
            {/* Current Password */}
            <PasswordField
              label="Current Password"
              value={currentPw}
              onChange={(v) => { setCurrentPw(v); setPwErrors((e) => ({ ...e, currentPw: "" })); }}
              disabled={savingPw}
              error={pwErrors.currentPw}
              placeholder="Enter current password"
            />

            {/* New Password */}
            <div>
              <PasswordField
                label="New Password"
                value={newPw}
                onChange={(v) => { setNewPw(v); setPwErrors((e) => ({ ...e, newPw: "" })); }}
                disabled={savingPw}
                error={pwErrors.newPw}
                placeholder="Min. 6 characters"
              />
              {/* Strength bar */}
              {newPw.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-[#e8f5e9]"}`} />
                    ))}
                  </div>
                  <p className={`text-[10px] font-semibold ${
                    strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-500" : "text-emerald-600"
                  }`}>{strengthLabel}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <PasswordField
              label="Confirm New Password"
              value={confirmPw}
              onChange={(v) => { setConfirmPw(v); setPwErrors((e) => ({ ...e, confirmPw: "" })); }}
              disabled={savingPw}
              error={pwErrors.confirmPw}
              placeholder="Re-enter new password"
            />

            {/* Match indicator */}
            {newPw && confirmPw && !pwErrors.confirmPw && (
              <div className={`flex items-center gap-1.5 text-xs font-semibold -mt-2 ${newPw === confirmPw ? "text-emerald-600" : "text-red-500"}`}>
                {newPw === confirmPw ? <Icons.Check /> : <Icons.Alert />}
                {newPw === confirmPw ? "Passwords match" : "Passwords do not match"}
              </div>
            )}

            {/* Tips */}
            <div className="bg-[#f8fffe] border border-[#e8f5e9] rounded-2xl px-4 py-3">
              <p className="text-[10px] font-bold text-[#81c784] uppercase tracking-widest mb-2">Password Tips</p>
              <ul className="space-y-1">
                {["At least 6 characters", "Mix letters, numbers and symbols", "Avoid using your name or email"].map((tip) => (
                  <li key={tip} className="flex items-center gap-2 text-xs text-[#4a7a4a]">
                    <span className="w-1 h-1 rounded-full bg-[#81c784] flex-shrink-0" />{tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Change Password button */}
            <button
              onClick={handleChangePassword}
              disabled={savingPw || loadingUser || !!fetchError}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2e7d32] to-[#388e3c] hover:from-[#1b5e20] hover:to-[#2e7d32] text-white font-bold text-sm shadow-lg shadow-[#2e7d32]/25 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {savingPw ? (
                <><Icons.Spinner /> Changing password…</>
              ) : (
                <><Icons.Lock /> Change Password</>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#81c784] pb-2">
          🌱 Agro Vision · Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}
