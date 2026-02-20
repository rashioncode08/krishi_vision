"use client";

import { StepIcon } from "./Illustrations";

const STEPS = [
    { step: 1, title: "Capture", desc: "Take a photo of the diseased leaf or upload from gallery" },
    { step: 2, title: "Analyze", desc: "Our AI scans and identifies the disease pattern instantly" },
    { step: 3, title: "Diagnose", desc: "Get the disease name with confidence percentage" },
    { step: 4, title: "Treat", desc: "Receive eco-friendly treatment recommendations" },
    { step: 5, title: "Prevent", desc: "Learn prevention tips to protect future crops" },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }} className="animate-fade-in-up">
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
                    Simple Process
                </p>
                <h2
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                        fontWeight: 800,
                        color: "#0f1a14",
                        lineHeight: 1.2,
                    }}
                >
                    How It Works
                </h2>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: 20,
                }}
            >
                {STEPS.map((s, i) => (
                    <div
                        key={s.step}
                        className="animate-fade-in-up"
                        style={{
                            background: "white",
                            border: "1px solid #e2e8e5",
                            borderRadius: 18,
                            padding: "32px 20px",
                            textAlign: "center",
                            transition: "all 0.3s ease",
                            animationDelay: `${i * 0.1}s`,
                            cursor: "default",
                            position: "relative",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 8px 32px rgba(34,197,94,0.12)";
                            e.currentTarget.style.borderColor = "#22c55e";
                            e.currentTarget.style.transform = "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = "#e2e8e5";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        {/* Step number */}
                        <div
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 14,
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                color: "#bbf7d0",
                                fontFamily: "monospace",
                            }}
                        >
                            0{s.step}
                        </div>

                        {/* SVG Icon */}
                        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                            <StepIcon step={s.step} />
                        </div>

                        <h3
                            style={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#0f1a14",
                                marginBottom: 8,
                            }}
                        >
                            {s.title}
                        </h3>
                        <p style={{ fontSize: "0.82rem", color: "#6b8077", lineHeight: 1.5 }}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
