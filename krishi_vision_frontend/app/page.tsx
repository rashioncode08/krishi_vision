"use client";

import Header from "./components/Header";
import Image from "next/image";
import Link from "next/link";
import HowItWorks from "./components/HowItWorks";

export default function LandingPage() {
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
          padding: "100px 16px 60px",
          background: "linear-gradient(180deg, #dcfce7 0%, #f0fdf4 40%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            top: "-20%",
            right: "-20%",
            pointerEvents: "none",
          }}
        />

        <div className="animate-fade-in-up" style={{ maxWidth: 900, position: "relative" }}>
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
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#16a34a",
              marginBottom: 28,
            }}
          >
            🇮🇳 Built for Indian Farmers • 100% Free AI
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              color: "#0f1a14",
            }}
          >
            Smart Farming Starts with
            <br />
            <span style={{ color: "#16a34a" }}>Healthy Crops.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              lineHeight: 1.7,
              color: "#4b5563",
              maxWidth: 600,
              margin: "0 auto 40px",
              fontWeight: 500
            }}
          >
            KrishiVision is your AI crop doctor. Upload a photo of a diseased leaf and our Google Gemini AI engine will diagnose the issue and provide modern treatment advice instantly.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" className="btn-primary" style={{ fontSize: "1.1rem", padding: "18px 40px", boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)" }}>
              🌾 Get Started Free
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ fontSize: "1.1rem", padding: "18px 40px", background: "white" }}>
              How it works
            </a>
          </div>

          {/* Hero Illustration */}
          <div style={{ marginTop: 60, display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: 800,
              aspectRatio: "16/9",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              border: "8px solid white"
            }}>
              <Image
                src="/hero-farmer.png"
                alt="Happy Indian Farmer Illustration"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Floating stats badge */}
            <div style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              background: "white",
              padding: "12px 20px",
              borderRadius: 16,
              boxShadow: "0 10px 30px rgba(22,163,74,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #bbf7d0",
              transform: "scale(0.9)",
              transformOrigin: "bottom right"
            }} className="animate-fade-in delay-500">
              <div style={{ fontSize: "1.5rem", background: "#f0fdf4", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>🔬</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#15803d", lineHeight: 1.2 }}>95%+</div>
                <div style={{ fontSize: "0.75rem", color: "#166534", fontWeight: 600 }}>Diagnosis Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div className="section-divider" />

      {/* ========== Footer ========== */}
      <footer
        style={{
          padding: "60px 24px 40px",
          borderTop: "1px solid #e2e8e5",
          textAlign: "center",
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🌿
          </div>
          <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#16a34a" }}>KrishiVision</span>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#6b8077", marginBottom: 24, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
          Empowering Indian farmers with cutting-edge AI crop disease detection and modern agricultural advisory.
        </p>

        <Link href="/login" className="btn-primary" style={{ padding: "12px 28px", display: "inline-block", marginBottom: 32 }}>
          Create Farm Account
        </Link>

        <p style={{ fontSize: "0.75rem", color: "#6b8077", opacity: 0.6, marginTop: 20 }}>
          © {new Date().getFullYear()} KrishiVision. Proudly built for India. 🇮🇳
        </p>
      </footer>
    </div>
  );
}
