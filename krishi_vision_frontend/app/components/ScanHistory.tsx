"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Scan {
    id: number;
    disease: string;
    crop: string;
    confidence: number;
    filename: string | null;
    scanned_at: string;
}

interface DiseaseStat {
    disease: string;
    crop: string;
    total_scans: number;
    last_scanned: string;
}

export default function ScanHistory() {
    const [scans, setScans] = useState<Scan[]>([]);
    const [stats, setStats] = useState<{ total_scans: number; by_disease: DiseaseStat[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"history" | "stats" | "diseases">("history");
    const [diseases, setDiseases] = useState<{ id: string; disease: string; crop: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [historyRes, statsRes, diseasesRes] = await Promise.all([
                    fetch(`${API_URL}/history`),
                    fetch(`${API_URL}/stats`),
                    fetch(`${API_URL}/diseases`),
                ]);
                const historyData = await historyRes.json();
                const statsData = await statsRes.json();
                const diseasesData = await diseasesRes.json();

                if (historyData.success) setScans(historyData.scans);
                if (statsData.success) setStats({ total_scans: statsData.total_scans, by_disease: statsData.by_disease });
                if (diseasesData.diseases) setDiseases(diseasesData.diseases);
            } catch {
                console.error("Could not fetch scan data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <section style={{ padding: "80px 24px", textAlign: "center" }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        border: "3px solid var(--border-subtle)",
                        borderTopColor: "#4ade80",
                        borderRadius: "50%",
                        animation: "spin-slow 1s linear infinite",
                        margin: "0 auto",
                    }}
                />
            </section>
        );
    }

    const tabs = [
        { key: "history" as const, label: "Recent Scans", icon: "📋", count: scans.length },
        { key: "stats" as const, label: "Analytics", icon: "📊", count: stats?.by_disease.length || 0 },
        { key: "diseases" as const, label: "Disease Library", icon: "🦠", count: diseases.length },
    ];

    return (
        <section id="scan-history" style={{ padding: "80px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-fade-in-up">
                <p
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#4ade80",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        marginBottom: 12,
                    }}
                >
                    📡 Live Database
                </p>
                <h2
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                    }}
                >
                    Scan Dashboard
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: 500, margin: "0 auto" }}>
                    Real-time data from the KrishiVision PostgreSQL database — every scan is logged and analyzed.
                </p>
            </div>

            {/* Overview stat cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                    marginBottom: 32,
                }}
                className="animate-fade-in-up"
            >
                {[
                    { value: stats?.total_scans || 0, label: "Total Scans", icon: "🔬", color: "#4ade80" },
                    { value: stats?.by_disease.length || 0, label: "Diseases Found", icon: "🧬", color: "#facc15" },
                    { value: diseases.length, label: "In Disease Library", icon: "📚", color: "#60a5fa" },
                    {
                        value: stats?.by_disease?.[0]?.disease || "—",
                        label: "Most Detected",
                        icon: "⚡",
                        color: "#f97316",
                    },
                ].map((card, i) => (
                    <div
                        key={i}
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            padding: "24px 20px",
                            textAlign: "center",
                            transition: "all 0.3s",
                            cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.borderColor = card.color;
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>{card.icon}</div>
                        <div
                            style={{
                                fontSize: typeof card.value === "number" ? "2rem" : "1rem",
                                fontWeight: 800,
                                color: card.color,
                                lineHeight: 1.1,
                            }}
                        >
                            {card.value}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>
                            {card.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tab buttons */}
            <div
                style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 24,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 14,
                    padding: 4,
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            flex: 1,
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "none",
                            background: activeTab === tab.key ? "rgba(74,222,128,0.12)" : "transparent",
                            color: activeTab === tab.key ? "#4ade80" : "var(--text-muted)",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        {tab.icon} {tab.label}
                        <span
                            style={{
                                fontSize: "0.7rem",
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: activeTab === tab.key ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)",
                                color: activeTab === tab.key ? "#4ade80" : "var(--text-muted)",
                            }}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* History tab */}
            {activeTab === "history" && (
                <div
                    className="animate-fade-in"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 16,
                        overflow: "hidden",
                    }}
                >
                    {/* Table header */}
                    <div
                        style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            🗄️ scan_history table
                        </span>
                        <span
                            style={{
                                fontSize: "0.7rem",
                                padding: "3px 10px",
                                borderRadius: 20,
                                background: "rgba(74,222,128,0.1)",
                                color: "#4ade80",
                                fontWeight: 600,
                            }}
                        >
                            PostgreSQL • Live
                        </span>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                {["#", "Disease", "Crop", "Confidence", "Scanned At"].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: "12px 16px",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            color: "#4ade80",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            textAlign: "left",
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scans.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        style={{
                                            padding: 48,
                                            textAlign: "center",
                                            color: "var(--text-muted)",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</div>
                                        No scans yet — upload a leaf to see results here
                                    </td>
                                </tr>
                            ) : (
                                scans.map((scan, idx) => (
                                    <tr
                                        key={scan.id}
                                        style={{
                                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                                            transition: "background 0.15s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.04)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <td style={{ padding: "11px 16px", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                                            {scan.id}
                                        </td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                                {scan.disease}
                                            </span>
                                        </td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <span
                                                style={{
                                                    fontSize: "0.75rem",
                                                    padding: "3px 10px",
                                                    borderRadius: 6,
                                                    background: "rgba(255,255,255,0.05)",
                                                    color: "var(--text-secondary)",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {scan.crop}
                                            </span>
                                        </td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div
                                                    style={{
                                                        width: 60,
                                                        height: 5,
                                                        borderRadius: 3,
                                                        background: "rgba(255,255,255,0.06)",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: `${scan.confidence * 100}%`,
                                                            height: "100%",
                                                            borderRadius: 3,
                                                            background:
                                                                scan.confidence > 0.9
                                                                    ? "#4ade80"
                                                                    : scan.confidence > 0.7
                                                                        ? "#facc15"
                                                                        : "#f97316",
                                                        }}
                                                    />
                                                </div>
                                                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#4ade80", fontFamily: "monospace" }}>
                                                    {(scan.confidence * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "11px 16px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                            {new Date(scan.scanned_at).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Stats tab */}
            {activeTab === "stats" && stats && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div
                        style={{
                            padding: "14px 20px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "16px 16px 0 0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            📈 disease_stats table
                        </span>
                        <span
                            style={{
                                fontSize: "0.7rem",
                                padding: "3px 10px",
                                borderRadius: 20,
                                background: "rgba(250,204,21,0.1)",
                                color: "#facc15",
                                fontWeight: 600,
                            }}
                        >
                            Aggregated
                        </span>
                    </div>
                    {stats.by_disease.length === 0 ? (
                        <div
                            style={{
                                padding: 48,
                                textAlign: "center",
                                color: "var(--text-muted)",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "0 0 16px 16px",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: 12 }}>📊</div>
                            No analytics data yet — run some scans!
                        </div>
                    ) : (
                        stats.by_disease.map((d, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "16px 20px",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: i === stats.by_disease.length - 1 ? "0 0 16px 16px" : 0,
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span
                                            style={{
                                                fontSize: "0.7rem",
                                                fontWeight: 800,
                                                width: 20,
                                                height: 20,
                                                borderRadius: 6,
                                                background: "rgba(74,222,128,0.15)",
                                                color: "#4ade80",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{d.disease}</span>
                                        <span
                                            style={{
                                                fontSize: "0.72rem",
                                                padding: "2px 8px",
                                                borderRadius: 6,
                                                background: "rgba(255,255,255,0.05)",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {d.crop}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4ade80" }}>
                                        {d.total_scans}×
                                    </span>
                                </div>
                                <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                    <div
                                        style={{
                                            width: `${Math.min((d.total_scans / (stats.total_scans || 1)) * 100 * 2, 100)}%`,
                                            height: "100%",
                                            borderRadius: 3,
                                            background: "linear-gradient(90deg, #4ade80, #22c55e)",
                                            transition: "width 1s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Diseases tab */}
            {activeTab === "diseases" && (
                <div
                    className="animate-fade-in"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 16,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            🦠 diseases table
                        </span>
                        <span
                            style={{
                                fontSize: "0.7rem",
                                padding: "3px 10px",
                                borderRadius: 20,
                                background: "rgba(96,165,250,0.1)",
                                color: "#60a5fa",
                                fontWeight: 600,
                            }}
                        >
                            {diseases.length} records
                        </span>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: 1,
                            background: "rgba(255,255,255,0.03)",
                        }}
                    >
                        {diseases.map((d, i) => (
                            <div
                                key={d.id}
                                style={{
                                    padding: "16px 20px",
                                    background: "rgba(5,13,9,0.5)",
                                    transition: "all 0.2s",
                                    cursor: "default",
                                    borderLeft: `3px solid ${d.disease.includes("Healthy") ? "#4ade80" : "#f97316"}`,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(5,13,9,0.5)")}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{String(i + 1).padStart(2, "0")}</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                                        {d.disease}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span
                                        style={{
                                            fontSize: "0.7rem",
                                            padding: "2px 8px",
                                            borderRadius: 6,
                                            background: "rgba(255,255,255,0.05)",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        {d.crop}
                                    </span>
                                    <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "monospace", opacity: 0.5 }}>
                                        {d.id}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DB connection indicator */}
            <div
                style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    opacity: 0.6,
                }}
            >
                <div
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#4ade80",
                        boxShadow: "0 0 8px rgba(74,222,128,0.5)",
                        animation: "pulse-glow 2s ease-in-out infinite",
                    }}
                />
                Connected to Neon PostgreSQL • Auto-refreshing
            </div>
        </section>
    );
}
