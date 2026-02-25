"use client";
import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────── */
type Severity = "low" | "medium" | "high";
type Status = "Monitoring" | "Treating" | "Action Required";

interface AnalysisResult {
  crop: string;
  disease: string;
  confidence: number;
  severity: Severity;
  status: Status;
  advisory: string;
  weather: { temperature: string; rainfall: string; humidity: string };
}

/* ─── Mock result (replace with real API call) ───────────── */
const MOCK_RESULTS: AnalysisResult[] = [
  {
    crop: "Rice",
    disease: "Early Blight (Alternaria solani)",
    confidence: 94,
    severity: "medium",
    status: "Treating",
    advisory:
      "Early Blight has been detected on your crop. Apply copper-based fungicide spray early in the morning or late evening. Remove and destroy infected leaves immediately to prevent spread. Ensure proper spacing between plants for good air circulation. Avoid overhead irrigation — use drip irrigation if possible. Monitor the crop every 2–3 days and reapply fungicide after rainfall.",
    weather: { temperature: "34°C", rainfall: "12 mm", humidity: "72%" },
  },
  {
    crop: "Maze",
    disease: "Bacterial Leaf Blight",
    confidence: 88,
    severity: "high",
    status: "Action Required",
    advisory:
      "Bacterial Leaf Blight is a serious infection. Immediately stop overhead watering. Apply streptomycin-based bactericide as recommended by your agricultural officer. Avoid working in the field when plants are wet to prevent spread. Consider removing heavily infected plants to protect the rest of the crop. Report to your local Krishi Vigyan Kendra for further support.",
    weather: { temperature: "31°C", rainfall: "22 mm", humidity: "85%" },
  },
  {
    crop: "tomato",
    disease: "No Disease Detected",
    confidence: 97,
    severity: "low",
    status: "Monitoring",
    advisory:
      "Your crop appears healthy! Continue regular monitoring every 5–7 days. Maintain balanced fertilization and ensure adequate irrigation. Watch for early signs of yellowing or spots. Preventive application of neem-based spray can help ward off pests and fungal infections. Keep the field weed-free for best results.",
    weather: { temperature: "29°C", rainfall: "5 mm", humidity: "60%" },
  },
];

/* ─── Helper: random mock ────────────────────────────────── */
const getMockResult = (): Promise<AnalysisResult> =>
  new Promise((res) =>
    setTimeout(
      () => res(MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]),
      2600,
    ),
  );

/* ─── Severity styling ───────────────────────────────────── */
const severityMap: Record<
  Severity,
  { pill: string; bar: string; width: string }
> = {
  low: {
    pill: "bg-green-100 text-green-700 border-green-200",
    bar: "bg-green-500",
    width: "w-1/4",
  },
  medium: {
    pill: "bg-yellow-100 text-yellow-700 border-yellow-200",
    bar: "bg-yellow-500",
    width: "w-1/2",
  },
  high: {
    pill: "bg-red-100 text-red-700 border-red-200",
    bar: "bg-red-500",
    width: "w-3/4",
  },
};
const statusMap: Record<Status, string> = {
  Monitoring: "bg-blue-50 text-blue-700 border-blue-200",
  Treating: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Action Required": "bg-red-50 text-red-700 border-red-200",
};

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [crop, setCrop] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── file handler ── */
  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be under 10 MB.");
      return;
    }
    setError("");
    setResult(null);
    setFileName(selectedFile.name);
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  }, []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  /* ── analyze ── */
  const analyze = async () => {
    if (!crop) {
      setError("Please enter crop name");
      return;
    }

    if (!image || !file) {
      setError("Please upload an image");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file); // 🔥 real file
      formData.append("crop", crop);

      const res = await fetch("/api/analysis", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed");
        return;
      }

      // 🔥 set result directly
      setResult({
        ...data,
        crop,
        weather: data.weather,
      });
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── reset ── */
  const reset = () => {
    setImage(null);
    setFileName("");
    setResult(null);
    setFile(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const formattedSeverity = result
  ? (result.severity.charAt(0).toUpperCase() +
      result.severity.slice(1)) as Severity
  : null;

const sev = formattedSeverity ? severityMap[formattedSeverity] : null;
  const stat = result ? statusMap[result.status] : null;

  return (
    <div
      className="min-h-screen bg-[#f3f8f3]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* subtle grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#166534 1px,transparent 1px),linear-gradient(90deg,#166534 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* ════════════ 1. PAGE HEADER ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">
              AI Disease Detection
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black text-[#0f3d1a]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Crop Disease Detection
          </h1>
          <p className="text-green-900/60 text-base sm:text-lg max-w-xl mx-auto">
            Upload a photo of your crop leaf or plant. Our AI will detect
            diseases and give you clear advice.
          </p>
        </motion.div>

        {/* ════════════ 2. UPLOAD CARD ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="bg-white rounded-3xl shadow-md shadow-green-100 border border-green-100 p-6 sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-5">
            Step 1 — Choose Your Image
          </p>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Crop Name
            </label>

            <input
              type="text"
              placeholder="Enter crop (e.g., Tomato, Rice)"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full text-green-500 px-4 py-2.5 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-[#f9fdf9]"
            />
          </div>
          {!image ? (
            /* ── Drop zone ── */
            <motion.div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              animate={{
                borderColor: dragging ? "#16a34a" : "#bbf7d0",
                backgroundColor: dragging ? "#f0fdf4" : "#fafffe",
              }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-10 sm:p-16 cursor-pointer group transition-all"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onInputChange}
              />

              <motion.div
                animate={{ scale: dragging ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-2xl bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </motion.div>

              <div className="text-center">
                <p className="text-base font-bold text-[#0f3d1a] mb-1">
                  {dragging
                    ? "Drop your image here"
                    : "Drag & drop your crop photo"}
                </p>
                <p className="text-sm text-green-900/50">
                  or tap to browse your device
                </p>
                <p className="text-xs text-green-700/40 mt-2">
                  Supports JPG, PNG, WEBP · Max 10 MB
                </p>
              </div>

              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-green-700/20 transition-colors mt-2"
              >
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Browse Image
              </motion.span>
            </motion.div>
          ) : (
            /* ── Preview ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden border border-green-200 bg-[#f3f8f3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Crop preview"
                  className="w-full max-h-80 object-contain"
                />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-50 border border-red-200 rounded-full flex items-center justify-center text-red-500 transition-colors shadow-sm"
                  title="Remove image"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 px-1">
                <svg
                  className="w-4 h-4 text-green-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-green-800 font-medium truncate">
                  {fileName}
                </p>
                <button
                  onClick={reset}
                  className="ml-auto text-xs text-green-600 hover:text-red-500 font-semibold shrink-0 transition-colors"
                >
                  Change
                </button>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-red-600 font-medium flex items-center gap-2"
            >
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
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* ════════════ 3. ANALYSE BUTTON ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={analyze}
            disabled={!image || !crop || loading}
            whileHover={image && !loading ? { scale: 1.04 } : {}}
            whileTap={image && !loading ? { scale: 0.97 } : {}}
            className={[
              "relative inline-flex items-center justify-center gap-3 font-black text-lg px-12 py-4 rounded-2xl shadow-xl transition-all duration-200",
              "w-full sm:w-auto",
              image && !loading
                ? "bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-700/30 cursor-pointer"
                : "bg-green-100 text-green-400 cursor-not-allowed shadow-none",
            ].join(" ")}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Analysing your crop…
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Analyse Crop
              </>
            )}
          </motion.button>
        </motion.div>

        {/* ════════════ 4. LOADING STATE ════════════ */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border border-green-100 shadow-md shadow-green-100 p-8 flex flex-col items-center gap-5 text-center"
            >
              {/* animated leaf dots */}
              <div className="flex gap-2">
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-6, 6, -6] }}
                    transition={{
                      duration: 0.9,
                      delay: d,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-linear-to-br from-green-500 to-lime-400"
                  />
                ))}
              </div>
              <div>
                <p className="text-base font-bold text-[#0f3d1a]">
                  AI is analysing your crop image…
                </p>
                <p className="text-sm text-green-900/50 mt-1">
                  This usually takes a few seconds. Please wait.
                </p>
              </div>
              {/* progress bar */}
              <div className="w-full max-w-xs bg-green-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                  className="h-full bg-linear-to-r from-green-500 to-lime-400 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════════ 5. RESULT SECTION ════════════ */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* ─ Result header ─ */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-600">
                    Analysis Complete
                  </p>
                  <p className="text-sm text-green-900/50">
                    Results are ready — review them below
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="ml-auto text-xs font-semibold text-green-600 hover:text-green-800 border border-green-200 hover:border-green-400 bg-white px-3 py-1.5 rounded-xl transition-colors"
                >
                  New Upload
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* ─ Disease Card ─ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="bg-white rounded-3xl border border-green-100 shadow-md shadow-green-100 p-6 space-y-4"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-green-600">
                    Disease Detected
                  </p>

                  <div>
                    <h2
                      className="text-xl font-black text-[#0f3d1a] leading-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {result.crop} with {result.disease}
                    </h2>

                    {/* confidence */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-green-900/60 font-medium">
                          AI Confidence
                        </span>
                        <span className="font-black text-green-700">
                          {result.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                          className="h-full rounded-full bg-linear-to-r from-green-500 to-lime-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${sev?.pill || "bg-gray-100 text-gray-600"}`}
                    >
                      {result.severity} Severity
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${stat}`}
                    >
                      {result.status}
                    </span>
                  </div>

                  {/* severity bar */}
                  <div className="space-y-1.5">
                    <p className="text-xs text-green-900/50 font-medium">
                      Severity Level
                    </p>
                    <div className="flex gap-1.5">
                      {(["low", "medium", "high"] as Severity[]).map((s) => (
                        <div
                          key={s}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            result.severity === "low" && s === "low"
                              ? "bg-green-500"
                              : result.severity === "medium" && s !== "high"
                                ? "bg-yellow-400"
                                : result.severity === "high"
                                  ? "bg-red-400"
                                  : "bg-green-100"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-green-900/40 font-medium">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </motion.div>

                {/* ─ Weather Card ─ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-linear-to-br from-[#14532d] to-[#166534] rounded-3xl shadow-md shadow-green-900/20 p-6 text-white space-y-4 relative overflow-hidden"
                >
                  {/* bubble */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lime-400/10 rounded-full pointer-events-none" />

                  <p className="text-xs font-bold uppercase tracking-widest text-lime-300 relative z-10">
                    Current Weather
                  </p>
                  <p
                    className="text-5xl font-black relative z-10"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {result.weather.temperature}
                  </p>

                  <div className="grid grid-cols-2 gap-3 relative z-10">
                    {[
                      {
                        label: "Rainfall",
                        value: result.weather.rainfall+" mm",
                        icon: "🌧️",
                      },
                      {
                        label: "Humidity",
                        value: result.weather.humidity+" %",
                        icon: "💧",
                      },
                    ].map((w) => (
                      <div
                        key={w.label}
                        className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center"
                      >
                        <p className="text-xl mb-1">{w.icon}</p>
                        <p className="text-sm font-bold">{w.value}</p>
                        <p className="text-xs text-white/60 mt-0.5">
                          {w.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 flex items-start gap-2">
                    <span className="text-base mt-0.5">⚠️</span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Check weather conditions before applying any treatment for
                      best effectiveness.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ─ AI Advisory Card ─ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="bg-white rounded-3xl border border-green-100 shadow-md shadow-green-100 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-green-500 to-lime-400 flex items-center justify-center shadow-md shadow-green-300/40 shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-green-600">
                      AI Advisory
                    </p>
                    <p className="text-sm text-green-900/50">
                      What you should do next
                    </p>
                  </div>
                </div>

                <p className="text-base text-green-900/80 leading-relaxed">
                  {result.advisory}
                </p>

                {/* action tips */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      icon: "👁️",
                      label: "Monitor Daily",
                      color: "bg-blue-50 border-blue-200",
                    },
                  ].map((tip) => (
                    <div
                      key={tip.label}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${tip.color}`}
                    >
                      <span className="text-xl select-none">{tip.icon}</span>
                      <span className="text-sm font-semibold text-[#0f3d1a]">
                        {tip.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ─ CTA row ─ */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.a
                  href="/advisory"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-green-700/20 transition-colors text-sm"
                >
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  Get Full AI Advisory
                </motion.a>
                <motion.a
                  href="/reports"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-green-200 hover:border-green-400 text-green-800 font-bold py-3.5 rounded-2xl transition-colors text-sm"
                >
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
                  View All Reports
                </motion.a>
                <motion.button
                  onClick={reset}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#f3f8f3] border border-green-200 hover:border-green-400 text-green-700 font-bold py-3.5 rounded-2xl transition-colors text-sm"
                >
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
                  Upload Another
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─ footer note ─ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-green-700/30 pb-4"
        >
          Agro Vision · AI Disease Detection · Results are advisory — consult
          your local agricultural officer for confirmation.
        </motion.p>
      </div>
    </div>
  );
}
