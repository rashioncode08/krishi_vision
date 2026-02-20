"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

const RAW_API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname !== "localhost"
        ? "https://krishi-vision.vercel.app"
        : "http://localhost:8000");
const API_URL = RAW_API_URL.replace(/\/+$/, "");

export default function Login() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            if (isLogin) {
                // Login Request
                const params = new URLSearchParams();
                params.append("username", formData.email);
                params.append("password", formData.password);

                const res = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: params,
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ detail: "Login failed" }));
                    throw new Error(err.detail);
                }

                const data = await res.json();
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user_name", data.full_name);
                router.push("/dashboard");

            } else {
                // Register Request
                const res = await fetch(`${API_URL}/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        full_name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ detail: "Registration failed" }));
                    throw new Error(err.detail);
                }

                const data = await res.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_name", data.full_name);
                router.push("/dashboard");
            }
        } catch (err: any) {
            setErrorMsg(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #dcfce7 0%, #f0fdf4 50%, #ffffff 100%)", display: "flex", flexDirection: "column" }}>
            <Header hideLogin />

            <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px 40px" }}>
                <div className="animate-fade-in-up" style={{
                    width: "100%",
                    maxWidth: 440,
                    background: "white",
                    borderRadius: 20,
                    boxShadow: "0 12px 40px rgba(21, 128, 61, 0.12)",
                    border: "1px solid #bbf7d0",
                    padding: "36px 24px",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    {/* Subtle decoration */}
                    <div style={{ position: "absolute", top: -60, right: -60, width: 140, height: 140, background: "radial-gradient(circle, #dcfce7 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

                    <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
                        <div style={{ width: 48, height: 48, background: "var(--primary)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>
                            🌾
                        </div>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginBottom: 8 }}>
                            {isLogin ? "Welcome Back" : "Join KrishiVision"}
                        </h1>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                            {isLogin ? "Sign in to access your farm dashboard." : "Create an account to protect your crops."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
                        {!isLogin && (
                            <div>
                                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 6 }}>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ram Kumar"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #e2e8e5", background: "#f8faf9", fontSize: "0.95rem", color: "var(--text-main)", transition: "all 0.2s", outline: "none" }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px #dcfce7"; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8e5"; e.currentTarget.style.boxShadow = "none"; }}
                                />
                            </div>
                        )}
                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 6 }}>Email address</label>
                            <input
                                type="email"
                                required
                                placeholder="farmer@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #e2e8e5", background: "#f8faf9", fontSize: "0.95rem", color: "var(--text-main)", transition: "all 0.2s", outline: "none" }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px #dcfce7"; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8e5"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 6 }}>Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #e2e8e5", background: "#f8faf9", fontSize: "0.95rem", color: "var(--text-main)", transition: "all 0.2s", outline: "none" }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px #dcfce7"; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8e5"; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>

                        {errorMsg && (
                            <div className="animate-fade-in" style={{ padding: "12px 16px", background: "#fef2f2", color: "#dc2626", borderRadius: 10, fontSize: "0.85rem", fontWeight: 500, border: "1px solid #fee2e2" }}>
                                ⚠️ {errorMsg}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1rem", marginTop: 8 }}>
                            {loading ? "Authenticating..." : (isLogin ? "Sign In" : "Create Account")}
                        </button>
                    </form>

                    <div style={{ textAlign: "center", marginTop: 24, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            {isLogin ? "Don't have an account?" : "Already an user?"}
                        </span>{" "}
                        <button
                            type="button"
                            onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}
                            style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", padding: 0 }}
                        >
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
