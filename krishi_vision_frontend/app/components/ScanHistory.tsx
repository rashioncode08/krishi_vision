"use client";

import { useEffect, useState } from "react";

const RAW_API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
        ? "https://krishi-vision.vercel.app"
        : "http://localhost:8000");
const API_URL = RAW_API_URL.replace(/\/+$/, "");

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
                        border: "3px solid #dcfce7",
                        borderTopColor: "#22c55e",
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
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>
                    📡 Live Database
                </p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, color: "#0f1a14", marginBottom: 8 }}>
                    Scan Dashboard
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#6b8077", maxWidth: 500, margin: "0 auto" }}>
                    Real-time data from the KrishiVision PostgreSQL database — every scan is logged and analyzed.
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }} className="animate-fade-in-up">
                {[
                    { value: stats?.total_scans || 0, label: "Total Scans", icon: "🔬", color: "#16a34a" },
                    { value: stats?.by_disease.length || 0, label: "Diseases Found", icon: "🧬", color: "#eab308" },
                    { value: diseases.length, label: "In Disease Library", icon: "📚", color: "#3b82f6" },
                    { value: stats?.by_disease?.[0]?.disease || "—", label: "Most Detected", icon: "⚡", color: "#f97316" },
                ].map((card, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            border: "1px solid #e2e8e5",
                            borderRadius: 16,
                            padding: "24px 20px",
                            textAlign: "center",
                            transition: "all 0.3s",
                            cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}18`;
                            e.currentTarget.style.borderColor = card.color;
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = "#e2e8e5";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>{card.icon}</div>
                        <div style={{ fontSize: typeof card.value === "number" ? "2rem" : "0.95rem", fontWeight: 800, color: card.color, lineHeight: 1.1 }}>
                            {card.value}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#6b8077", marginTop: 6, fontWeight: 500 }}>{card.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#f0fdf4", borderRadius: 14, padding: 4, border: "1px solid #dcfce7" }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            flex: 1,
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "none",
                            background: activeTab === tab.key ? "white" : "transparent",
                            color: activeTab === tab.key ? "#16a34a" : "#6b8077",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                        }}
                    >
                        {tab.icon} {tab.label}
                        <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 20, background: activeTab === tab.key ? "#f0fdf4" : "white", color: activeTab === tab.key ? "#16a34a" : "#6b8077" }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* History tab */}
            {activeTab === "history" && (
                <div className="animate-fade-in" style={{ background: "white", border: "1px solid #e2e8e5", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f1a14" }}>🗄️ scan_history table</span>
                        <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a", fontWeight: 600, border: "1px solid #dcfce7" }}>
                            PostgreSQL • Live
                        </span>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #e2e8e5", background: "#f8faf9" }}>
                                {["#", "Disease", "Crop", "Confidence", "Scanned At"].map((h) => (
                                    <th key={h} style={{ padding: "12px 16px", fontSize: "0.7rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scans.length === 0 ? (
                                <tr><td colSpan={5} style={{ padding: 48, textAlign: "center", color: "#6b8077", fontSize: "0.85rem" }}>
                                    <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</div>No scans yet — upload a leaf to see results here
                                </td></tr>
                            ) : (
                                scans.map((scan) => (
                                    <tr key={scan.id} style={{ borderBottom: "1px solid #f0f0f0", transition: "background 0.15s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                        <td style={{ padding: "11px 16px", fontSize: "0.75rem", color: "#6b8077", fontFamily: "monospace" }}>{scan.id}</td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f1a14" }}>{scan.disease}</span>
                                        </td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 6, background: "#f0fdf4", color: "#374a3f", fontWeight: 500, border: "1px solid #dcfce7" }}>{scan.crop}</span>
                                        </td>
                                        <td style={{ padding: "11px 16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{ width: 60, height: 5, borderRadius: 3, background: "#e2e8e5", overflow: "hidden" }}>
                                                    <div style={{ width: `${scan.confidence * 100}%`, height: "100%", borderRadius: 3, background: scan.confidence > 0.9 ? "#22c55e" : scan.confidence > 0.7 ? "#eab308" : "#f97316" }} />
                                                </div>
                                                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16a34a", fontFamily: "monospace" }}>{(scan.confidence * 100).toFixed(1)}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "11px 16px", fontSize: "0.75rem", color: "#6b8077" }}>
                                            {new Date(scan.scanned_at).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
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
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 2, background: "white", border: "1px solid #e2e8e5", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f1a14" }}>📈 disease_stats table</span>
                        <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20, background: "#fef9c3", color: "#a16207", fontWeight: 600 }}>Aggregated</span>
                    </div>
                    {stats.by_disease.length === 0 ? (
                        <div style={{ padding: 48, textAlign: "center", color: "#6b8077" }}>
                            <div style={{ fontSize: "2rem", marginBottom: 12 }}>📊</div>No analytics data yet — run some scans!
                        </div>
                    ) : (
                        stats.by_disease.map((d, i) => (
                            <div key={i} style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", transition: "all 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: "0.7rem", fontWeight: 800, width: 22, height: 22, borderRadius: 6, background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #dcfce7" }}>{i + 1}</span>
                                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a14" }}>{d.disease}</span>
                                        <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 6, background: "#f0fdf4", color: "#6b8077", border: "1px solid #dcfce7" }}>{d.crop}</span>
                                    </div>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#16a34a" }}>{d.total_scans}×</span>
                                </div>
                                <div style={{ height: 5, borderRadius: 3, background: "#e2e8e5", overflow: "hidden" }}>
                                    <div style={{ width: `${Math.min((d.total_scans / (stats.total_scans || 1)) * 100 * 2, 100)}%`, height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #4ade80, #22c55e)", transition: "width 1s ease" }} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Diseases tab */}
            {activeTab === "diseases" && (
                <div className="animate-fade-in" style={{ background: "white", border: "1px solid #e2e8e5", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f1a14" }}>🦠 diseases table</span>
                        <span style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20, background: "#dbeafe", color: "#1d4ed8", fontWeight: 600 }}>{diseases.length} records</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 1, background: "#e2e8e5" }}>
                        {diseases.map((d, i) => (
                            <div key={d.id} style={{ padding: "16px 20px", background: "white", transition: "all 0.2s", cursor: "default", borderLeft: `3px solid ${d.disease.includes("Healthy") ? "#22c55e" : "#f97316"}` }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontSize: "0.65rem", color: "#6b8077", fontFamily: "monospace" }}>{String(i + 1).padStart(2, "0")}</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1a14" }}>{d.disease}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 6, background: "#f0fdf4", color: "#6b8077", border: "1px solid #dcfce7" }}>{d.crop}</span>
                                    <span style={{ fontSize: "0.6rem", color: "#6b8077", fontFamily: "monospace", opacity: 0.5 }}>{d.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DB indicator */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.7rem", color: "#6b8077", opacity: 0.6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.4)", animation: "pulse-glow 2s ease-in-out infinite" }} />
                Connected to Neon PostgreSQL • Auto-refreshing
            </div>
        </section>
    );
}
