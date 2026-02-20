"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import ImageUpload from "./components/ImageUpload";
import LoadingAnalysis from "./components/LoadingAnalysis";
import ResultsCard from "./components/ResultsCard";
import ScanHistory from "./components/ScanHistory";
import WeatherDashboard from "./components/WeatherDashboard";
import { HeroIllustration, LeafScanSVG } from "./components/Illustrations";
import MobileScannerOverlay from "./components/MobileScannerOverlay";

const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://krishi-vision.vercel.app"
    : "http://localhost:8000");
const API_URL = RAW_API_URL.replace(/\/+$/, "");

type AppState = "idle" | "analyzing" | "results" | "error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PredictionResult = any;

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<PredictionResult>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showMobileScanner, setShowMobileScanner] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleImageSelected = useCallback(async (file: File, previewUrl: string) => {
    setPreview(previewUrl);
    setState("analyzing");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Server error" }));
        throw new Error(err.detail || `Error ${res.status}`);
      }

      const data = await res.json();
      await new Promise((r) => setTimeout(r, 2000));
      setResult(data);
      setState("results");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to analyze image. Is the backend running?");
      setState("error");
    }
  }, []);

  const handleReset = useCallback(() => {
    setState("idle");
    setPreview("");
    setResult(null);
    setErrorMsg("");
  }, []);

  const handleMobileScanClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setShowMobileScanner(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-secondary)" }}>
      <Header />

      {/* ========== Hero Section ========== */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #f8faf9 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
            pointerEvents: "none",
          }}
        />

        <div className="animate-fade-in-up" style={{ maxWidth: 700, position: "relative" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "#f0fdf4",
              border: "1px solid #dcfce7",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#16a34a",
              marginBottom: 28,
            }}
          >
            AI-Powered Crop Protection
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              color: "#0f1a14",
            }}
          >
            Scan a Leaf.
            <br />
            <span style={{ color: "#16a34a" }}>Save a Crop.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.7,
              color: "#6b8077",
              maxWidth: 500,
              margin: "0 auto 36px",
            }}
          >
            Upload a photo of a diseased leaf and get an instant AI diagnosis
            with treatment advice — in under a minute.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="#upload-section" 
              onClick={handleMobileScanClick}
              className="btn-primary" 
              style={{ fontSize: "1.05rem", padding: "16px 36px" }}
            >
              Start Scanning
            </a>
            <a href="#how-it-works" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
              Learn More
            </a>
          </div>

          {/* Hero Illustration */}
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <HeroIllustration />
          </div>

          {/* Stats */}
          <div
            style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}
            className="animate-fade-in delay-500"
          >
            {[
              { value: "27", label: "Diseases Detected" },
              { value: "<1min", label: "Analysis Time" },
              { value: "95%+", label: "Accuracy" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b8077", marginTop: 6, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <HowItWorks />

      <div className="section-divider" />

      {/* ========== Upload Section ========== */}
      <section
        id="upload-section"
        style={{
          padding: "100px 24px 120px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-fade-in-up">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <LeafScanSVG />
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#22c55e",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}
          >
            Disease Detection
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#0f1a14",
              lineHeight: 1.2,
            }}
          >
            Upload Your Leaf Photo
          </h2>
        </div>

        {state === "idle" && <ImageUpload onImageSelected={handleImageSelected} />}
        {state === "analyzing" && <LoadingAnalysis preview={preview} />}
        {state === "results" && result && (
          <div className="animate-fade-in">
            <ResultsCard result={result} />
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={handleReset} className="btn-primary" style={{ padding: "14px 32px" }}>
                Scan Another Leaf
              </button>
            </div>
          </div>
        )}
        {state === "error" && (
          <div className="animate-fade-in" style={{ textAlign: "center" }}>
            <div
              style={{
                maxWidth: 500,
                margin: "0 auto",
                padding: "32px",
                background: "white",
                border: "1px solid #fecaca",
                borderRadius: 18,
                boxShadow: "0 4px 16px rgba(239,68,68,0.08)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f1a14", marginBottom: 8 }}>
                Analysis Failed
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#6b8077", marginBottom: 24, lineHeight: 1.6 }}>
                {errorMsg}
              </p>
              <button onClick={handleReset} className="btn-primary">Try Again</button>
            </div>
          </div>
        )}
      </section>

      <div className="section-divider" />

      <WeatherDashboard />

      <div className="section-divider" />

      <ScanHistory />

      {/* ========== Footer ========== */}
      <footer
        style={{
          padding: "48px 24px 32px",
          borderTop: "1px solid #e2e8e5",
          textAlign: "center",
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#16a34a" }}>KrishiVision</span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#6b8077", marginBottom: 16, lineHeight: 1.6 }}>
          AI-powered crop disease detection — protecting harvests with technology.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {["Next.js", "FastAPI", "PostgreSQL", "MobileNetV2"].map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "0.65rem",
                padding: "3px 10px",
                borderRadius: 6,
                background: "#f0fdf4",
                color: "#374a3f",
                border: "1px solid #dcfce7",
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <p style={{ fontSize: "0.7rem", color: "#6b8077", opacity: 0.6 }}>
          © {new Date().getFullYear()} KrishiVision. Built for farmers.
        </p>
      </footer>

      {showMobileScanner && (
        <MobileScannerOverlay
          onClose={() => setShowMobileScanner(false)}
          onProcessImage={(file) => {
            const previewUrl = URL.createObjectURL(file);
            handleImageSelected(file, previewUrl);
            
            // On mobile, scroll down to the processing section automatically
            setTimeout(() => {
              document.getElementById("upload-section")?.scrollIntoView({ behavior: "auto" });
            }, 100);
          }}
        />
      )}
    </div>
  );
}
