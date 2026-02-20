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
    preview: string;
    onReset: () => void;
}

export default function ResultsCard({ result, preview, onReset }: ResultsCardProps) {
    const { prediction, details } = result;
    const isHealthy = prediction.disease.toLowerCase().includes("healthy");

    // Determine confidence color
    const getConfidenceColor = (pct: number) => {
        if (pct >= 90) return "var(--kv-green-400)";
        if (pct >= 75) return "var(--kv-earth-400)";
        return "#f97316";
    };

    const confColor = getConfidenceColor(prediction.confidence_percent);

    return (
        <div className="animate-fade-in-up" style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
            {/* Main result card */}
            <div
                className="glass-card"
                style={{
                    padding: "32px",
                    marginBottom: 24,
                    background: isHealthy
                        ? "rgba(34, 197, 94, 0.08)"
                        : "rgba(15, 35, 22, 0.6)",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: 28,
                        alignItems: "start",
                    }}
                >
                    {/* Thumbnail */}
                    <div
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "var(--radius-lg)",
                            overflow: "hidden",
                            border: `2px solid ${isHealthy ? "var(--kv-green-400)" : "var(--kv-earth-400)"}`,
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={preview}
                            alt="Uploaded leaf"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Disease info */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <span style={{ fontSize: "1.5rem" }}>{isHealthy ? "✅" : "🔬"}</span>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    color: "var(--text-primary)",
                                    margin: 0,
                                }}
                            >
                                {prediction.disease}
                            </h3>
                        </div>

                        <p
                            style={{
                                fontSize: "0.85rem",
                                color: "var(--text-muted)",
                                marginBottom: 16,
                            }}
                        >
                            Crop: <strong style={{ color: "var(--kv-green-300)" }}>{prediction.crop}</strong>
                        </p>

                        {/* Confidence bar */}
                        <div style={{ marginBottom: 16 }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                                    Confidence Level
                                </span>
                                <span
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 800,
                                        color: confColor,
                                    }}
                                >
                                    {prediction.confidence_percent}%
                                </span>
                            </div>
                            <div className="confidence-bar-track">
                                <div
                                    className="confidence-bar-fill"
                                    style={
                                        {
                                            "--target-width": `${prediction.confidence_percent}%`,
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: "0.95rem",
                                lineHeight: 1.7,
                                color: "var(--text-secondary)",
                            }}
                        >
                            {details.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Treatment & Prevention */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                    gap: 24,
                    marginBottom: 32,
                }}
            >
                {/* Treatment Card */}
                <div className="glass-card animate-slide-in" style={{ padding: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: "1.3rem" }}>💊</span>
                        <h4
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                margin: 0,
                            }}
                        >
                            Treatment Options
                        </h4>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                        {details.treatment.map((t, i) => (
                            <li
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 10,
                                    fontSize: "0.9rem",
                                    lineHeight: 1.5,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span style={{ color: "var(--kv-green-400)", fontWeight: 700, flexShrink: 0 }}>→</span>
                                <div>
                                    {t.text}
                                    {t.eco_friendly && (
                                        <span className="eco-badge" style={{ marginLeft: 8 }}>
                                            🌱 Eco-Friendly
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Prevention Card */}
                <div
                    className="glass-card animate-slide-in"
                    style={{ padding: "28px", animationDelay: "150ms" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: "1.3rem" }}>🛡️</span>
                        <h4
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                margin: 0,
                            }}
                        >
                            Prevention Tips
                        </h4>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                        {details.prevention.map((tip, i) => (
                            <li
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 10,
                                    fontSize: "0.9rem",
                                    lineHeight: 1.5,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span style={{ color: "var(--kv-green-400)", fontWeight: 700, flexShrink: 0 }}>•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Scan Again button */}
            <div style={{ textAlign: "center" }}>
                <button onClick={onReset} className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>
                    🔄 Scan Another Leaf
                </button>
            </div>
        </div>
    );
}
