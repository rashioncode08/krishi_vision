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
    const [activeTab, setActiveTab] = useState<"history" | "stats">("history");

    useEffect(() => {
        async function fetchData() {
            try {
                const [historyRes, statsRes] = await Promise.all([
                    fetch(`${API_URL}/history`),
                    fetch(`${API_URL}/stats`),
                ]);
                const historyData = await historyRes.json();
                const statsData = await statsRes.json();

                if (historyData.success) setScans(historyData.scans);
                if (statsData.success) setStats({ total_scans: statsData.total_scans, by_disease: statsData.by_disease });
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
            <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        border: "3px solid var(--border-subtle)",
                        borderTopColor: "var(--kv-green-400)",
                        borderRadius: "50%",
                        animation: "spin-slow 1s linear infinite",
                        margin: "0 auto",
                    }}
                />
            </section>
        );
    }

    if (stats?.total_scans === 0) return null; // Don't show section if no scans yet

    return (
        <section id="scan-history" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }} className="animate-fade-in-up">
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
                    Scan Database
                </p>
                <h2
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: "var(--text-primary)",
                    }}
                >
                    Recent Scans & Statistics
                </h2>
            </div>

            {/* Stats cards row */}
            {stats && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: 16,
                        marginBottom: 32,
                    }}
                    className="animate-fade-in-up"
                >
                    <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
                        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--kv-green-400)" }}>
                            {stats.total_scans}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>Total Scans</div>
                    </div>
                    <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
                        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--kv-green-400)" }}>
                            {stats.by_disease.length}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>Diseases Found</div>
                    </div>
                    <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
                        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--kv-green-400)" }}>
                            {stats.by_disease.length > 0 ? stats.by_disease[0].disease : "—"}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>Most Common</div>
                    </div>
                </div>
            )}

            {/* Tab buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {(["history", "stats"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid",
                            borderColor: activeTab === tab ? "var(--kv-green-400)" : "var(--border-subtle)",
                            background: activeTab === tab ? "rgba(34,197,94,0.15)" : "transparent",
                            color: activeTab === tab ? "var(--kv-green-400)" : "var(--text-muted)",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {tab === "history" ? "📋 Recent Scans" : "📊 Disease Stats"}
                    </button>
                ))}
            </div>

            {/* History tab */}
            {activeTab === "history" && (
                <div className="glass-card animate-fade-in" style={{ overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr
                                style={{
                                    borderBottom: "1px solid var(--border-subtle)",
                                    textAlign: "left",
                                }}
                            >
                                {["Disease", "Crop", "Confidence", "Time"].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            padding: "14px 16px",
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            color: "var(--kv-green-400)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
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
                                    <td colSpan={4} style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>
                                        No scans yet — upload a leaf to get started!
                                    </td>
                                </tr>
                            ) : (
                                scans.map((scan) => (
                                    <tr
                                        key={scan.id}
                                        style={{
                                            borderBottom: "1px solid var(--border-subtle)",
                                            transition: "background 0.2s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.05)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <td style={{ padding: "12px 16px", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                            {scan.disease}
                                        </td>
                                        <td style={{ padding: "12px 16px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                                            {scan.crop}
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span
                                                style={{
                                                    padding: "4px 12px",
                                                    borderRadius: "var(--radius-full)",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 700,
                                                    background: "rgba(34,197,94,0.15)",
                                                    color: "var(--kv-green-400)",
                                                }}
                                            >
                                                {(scan.confidence * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                            {new Date(scan.scanned_at).toLocaleString()}
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
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {stats.by_disease.map((d, i) => (
                        <div key={i} className="glass-card" style={{ padding: "16px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <div>
                                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                                        {d.disease}
                                    </span>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginLeft: 10 }}>{d.crop}</span>
                                </div>
                                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--kv-green-400)" }}>
                                    {d.total_scans} scan{d.total_scans !== 1 ? "s" : ""}
                                </span>
                            </div>
                            <div className="confidence-bar-track" style={{ height: 6 }}>
                                <div
                                    className="confidence-bar-fill"
                                    style={
                                        {
                                            "--target-width": `${Math.min((d.total_scans / (stats.total_scans || 1)) * 100 * 3, 100)}%`,
                                            height: 6,
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
