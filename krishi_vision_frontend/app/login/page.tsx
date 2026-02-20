"use client";

import { useState } from "react";
import Logo from "../components/Logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/";
        }, 1500);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #f8faf9 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background design elements inherited from homepage */}
            <div
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
                    top: "-10%",
                    right: "-10%",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 70%)",
                    bottom: "-5%",
                    left: "-5%",
                    pointerEvents: "none",
                }}
            />

            {/* Login Card */}
            <div
                className="animate-fade-in-up"
                style={{
                    background: "white",
                    border: "1px solid #e2e8e5",
                    borderRadius: 24,
                    padding: "48px 40px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
                    maxWidth: 440,
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Header Section */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                        <Logo size={56} />
                    </div>
                    <h1
                        style={{
                            fontSize: "1.8rem",
                            fontWeight: 800,
                            color: "#0f1a14",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            margin: "0 0 8px 0",
                        }}
                    >
                        Welcome Back
                    </h1>
                    <p style={{ fontSize: "0.9rem", color: "#6b8077", margin: 0 }}>
                        Log in to manage your crop analyses
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                color: "#374a3f",
                                marginBottom: 8,
                            }}
                        >
                            Email Address
                        </label>
                        <div
                            style={{
                                position: "relative",
                                borderRadius: 12,
                                border: `2px solid ${focusedField === "email" ? "#16a34a" : "#e2e8e5"}`,
                                background: focusedField === "email" ? "#f0fdf4" : "#ffffff",
                                transition: "all 0.3s ease",
                                boxShadow: focusedField === "email" ? "0 0 0 3px rgba(22,163,74,0.1)" : "none",
                            }}
                        >
                            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: focusedField === "email" ? "#16a34a" : "#6b8077" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <path d="M2 7l10 7 10-7" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="farmer@krishivision.com"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px 14px 48px",
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "0.95rem",
                                    color: "#0f1a14",
                                    outline: "none",
                                }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: "#374a3f",
                                }}
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                style={{
                                    fontSize: "0.8rem",
                                    color: "#16a34a",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    transition: "opacity 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                borderRadius: 12,
                                border: `2px solid ${focusedField === "password" ? "#16a34a" : "#e2e8e5"}`,
                                background: focusedField === "password" ? "#f0fdf4" : "#ffffff",
                                transition: "all 0.3s ease",
                                boxShadow: focusedField === "password" ? "0 0 0 3px rgba(22,163,74,0.1)" : "none",
                            }}
                        >
                            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: focusedField === "password" ? "#16a34a" : "#6b8077" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="3" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Enter your password"
                                style={{
                                    width: "100%",
                                    padding: "14px 48px 14px 48px",
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "0.95rem",
                                    color: "#0f1a14",
                                    outline: "none",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: 16,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#6b8077",
                                    padding: 0,
                                    display: "flex",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    {showPassword ? (
                                        <>
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary"
                        style={{
                            width: "100%",
                            padding: "16px",
                            marginTop: 32,
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            cursor: isLoading ? "wait" : "pointer",
                            opacity: isLoading ? 0.8 : 1,
                        }}
                    >
                        {isLoading ? (
                            <>
                                <div
                                    style={{
                                        width: 18,
                                        height: 18,
                                        border: "2px solid rgba(255,255,255,0.4)",
                                        borderTopColor: "white",
                                        borderRadius: "50%",
                                        animation: "spin-slow 0.8s linear infinite",
                                    }}
                                />
                                Managing Farm...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: 24 }}>
                    <p style={{ fontSize: "0.85rem", color: "#6b8077", margin: 0 }}>
                        New to KrishiVision?{" "}
                        <a
                            href="#"
                            style={{
                                color: "#16a34a",
                                fontWeight: 700,
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#15803d")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#16a34a")}
                        >
                            Create Account
                        </a>
                    </p>
                </div>
            </div>

            {/* Back to Home Link */}
            <div style={{ marginTop: 32, position: "relative", zIndex: 1 }}>
                <a
                    href="/"
                    style={{
                        fontSize: "0.9rem",
                        color: "#6b8077",
                        textDecoration: "none",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b8077")}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Home
                </a>
            </div>

            <style>{`
            @keyframes spin-slow {
                to { transform: rotate(360deg); }
            }
            `}</style>
        </div>
    );
}
