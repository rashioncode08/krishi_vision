"use client";

import { useState, useCallback } from "react";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import ImageUpload from "./components/ImageUpload";
import LoadingAnalysis from "./components/LoadingAnalysis";
import ResultsCard from "./components/ResultsCard";
import ScanHistory from "./components/ScanHistory";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type AppState = "idle" | "analyzing" | "results" | "error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PredictionResult = any;

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<PredictionResult>(null);
  const [errorMsg, setErrorMsg] = useState("");

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

      // Simulate a minimum 2-second analysis time for UX
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

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
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
          position: "relative",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
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
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--kv-green-400)",
              marginBottom: 28,
            }}
          >
            🌾 AI-Powered Crop Protection
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>Scan a Leaf.</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--kv-green-400), var(--kv-earth-400))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Save a Crop.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: 550,
              margin: "0 auto 36px",
            }}
          >
            Upload a photo of a diseased leaf and get an instant AI diagnosis
            with treatment advice — in under a minute.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#upload-section"
              className="btn-primary"
              style={{ fontSize: "1.05rem", padding: "16px 36px" }}
            >
              🔍 Start Scanning
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary"
              style={{ fontSize: "1.05rem", padding: "16px 36px" }}
            >
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 56,
              flexWrap: "wrap",
            }}
            className="animate-fade-in delay-500"
          >
            {[
              { value: "15+", label: "Diseases Detected" },
              { value: "<1min", label: "Analysis Time" },
              { value: "95%+", label: "Accuracy" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    color: "var(--kv-green-400)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Divider ========== */}
      <div className="section-divider" />

      {/* ========== How It Works ========== */}
      <HowItWorks />

      {/* ========== Divider ========== */}
      <div className="section-divider" />

      {/* ========== Upload / Analysis Section ========== */}
      <section
        id="upload-section"
        style={{
          padding: "100px 24px 120px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-fade-in-up">
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--kv-green-400)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            Disease Detection
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "var(--text-primary)",
            }}
          >
            Upload Your Leaf Photo
          </h2>
        </div>

        {/* State-driven content */}
        {state === "idle" && (
          <ImageUpload onImageSelected={handleImageSelected} />
        )}

        {state === "analyzing" && (
          <LoadingAnalysis preview={preview} />
        )}

        {state === "results" && result && (
          <ResultsCard result={result} preview={preview} onReset={handleReset} />
        )}

        {state === "error" && (
          <div className="animate-fade-in" style={{ textAlign: "center" }}>
            <div
              className="glass-card"
              style={{
                maxWidth: 500,
                margin: "0 auto",
                padding: "32px",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>⚠️</div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Analysis Failed
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                {errorMsg}
              </p>
              <button onClick={handleReset} className="btn-primary">
                Try Again
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========== Divider ========== */}
      <div className="section-divider" />

      {/* ========== Scan History & Stats ========== */}
      <ScanHistory />

      {/* ========== Footer ========== */}
      <footer
        style={{
          padding: "40px 24px",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: "1.2rem" }}>🌿</span>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, var(--kv-green-300), var(--kv-green-500))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KrishiVision
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          AI-powered crop disease detection. Built for farmers, powered by technology.
        </p>
      </footer>
    </div>
  );
}
