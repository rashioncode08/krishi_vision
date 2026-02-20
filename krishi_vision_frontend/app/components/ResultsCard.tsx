"use client";

interface Treatment {
    text: string;
    eco_friendly: boolean;
}

interface PredictionResult {
    prediction: {
        disease: string;
        crop: string;
        confidence: number;
        confidence_percent: number;
    };
    details: {
        description: string;
        treatment: Treatment[];
        prevention: string[];
    };
}

interface ResultsCardProps {
    result: PredictionResult;
}

export default function ResultsCard({ result }: ResultsCardProps) {
    const { prediction, details } = result;
    const isHealthy = prediction.disease.toLowerCase().includes("healthy");

    const getConfidenceColor = (pct: number) => {
        if (pct >= 90) return "#16a34a";
        if (pct >= 75) return "#eab308";
        return "#f97316";
    };
    const confColor = getConfidenceColor(prediction.confidence_percent);

    return (
        <div className="animate-fade-in-up" style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
            {/* Main result card */}
            <div
                style={{
                    padding: "32px",
                    marginBottom: 24,
                    background: isHealthy ? "#f0fdf4" : "white",
                    border: `1px solid ${isHealthy ? "#bbf7d0" : "#e2e8e5"}`,
                    borderRadius: 18,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: "1.5rem" }}>{isHealthy ? "✅" : "🔬"}</span>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1a14", margin: 0 }}>
                        {prediction.disease}
                    </h3>
                </div>

                <p style={{ fontSize: "0.85rem", color: "#6b8077", marginBottom: 16 }}>
                    Crop: <strong style={{ color: "#16a34a" }}>{prediction.crop}</strong>
                </p>

                {/* Confidence bar */}
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374a3f" }}>Confidence Level</span>
                        <span style={{ fontSize: "1.1rem", fontWeight: 800, color: confColor }}>
                            {prediction.confidence_percent}%
                        </span>
                    </div>
                    <div className="confidence-bar-track">
                        <div
                            className="confidence-bar-fill"
                            style={{ "--target-width": `${prediction.confidence_percent}%` } as React.CSSProperties}
                        />
                    </div>
                </div>

                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#374a3f" }}>{details.description}</p>
            </div>

            {/* Treatment & Prevention */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 20,
                }}
            >
                {/* Treatment */}
                <div
                    style={{
                        padding: "28px",
                        background: "white",
                        border: "1px solid #e2e8e5",
                        borderRadius: 18,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: "1.3rem" }}>💊</span>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f1a14", margin: 0 }}>
                            Treatment Options
                        </h4>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                        {details.treatment.map((t, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", lineHeight: 1.5, color: "#374a3f" }}>
                                <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>→</span>
                                <div>
                                    {t.text}
                                    {t.eco_friendly && (
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                fontSize: "0.7rem",
                                                padding: "2px 8px",
                                                borderRadius: 20,
                                                background: "#f0fdf4",
                                                color: "#16a34a",
                                                fontWeight: 600,
                                                border: "1px solid #dcfce7",
                                            }}
                                        >
                                            🌱 Eco
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Prevention */}
                <div
                    style={{
                        padding: "28px",
                        background: "white",
                        border: "1px solid #e2e8e5",
                        borderRadius: 18,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: "1.3rem" }}>🛡️</span>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f1a14", margin: 0 }}>
                            Prevention Tips
                        </h4>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                        {details.prevention.map((tip, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", lineHeight: 1.5, color: "#374a3f" }}>
                                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
