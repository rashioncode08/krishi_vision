"use client";

interface LoadingAnalysisProps {
    preview: string;
}

export default function LoadingAnalysis({ preview }: LoadingAnalysisProps) {
    return (
        <div
            className="animate-fade-in"
            style={{
                width: "100%",
                maxWidth: 500,
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            {/* Scanning image */}
            <div
                className="scan-container"
                style={{
                    width: "100%",
                    aspectRatio: "1",
                    maxWidth: 320,
                    margin: "0 auto 32px",
                    background: "white",
                    border: "2px solid #22c55e",
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div className="scan-line" />
                <img
                    src={preview}
                    alt="Analyzing..."
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.9) contrast(1.05)",
                    }}
                />
                {/* Overlay grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(74,222,128,0.05) 30px, rgba(74,222,128,0.05) 31px)," +
                            "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(74,222,128,0.05) 30px, rgba(74,222,128,0.05) 31px)",
                        pointerEvents: "none",
                    }}
                />
            </div>

            {/* Spinner & text */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        border: "3px solid var(--border-subtle)",
                        borderTopColor: "var(--kv-green-400)",
                        borderRadius: "50%",
                        animation: "spin-slow 1s linear infinite",
                    }}
                />
                <div>
                    <p
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginBottom: 4,
                        }}
                    >
                        Analyzing your leaf...
                    </p>
                    <p
                        style={{
                            fontSize: "0.85rem",
                            color: "var(--text-muted)",
                        }}
                    >
                        Our AI is scanning for disease patterns
                    </p>
                </div>
            </div>
        </div>
    );
}
