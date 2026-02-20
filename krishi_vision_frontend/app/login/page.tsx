"use client";

import { useState } from "react";

// ─── Farmer Illustration SVG ────────────────────────────────
function FarmerIllustration() {
    return (
        <svg width="320" height="400" viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground / field */}
            <ellipse cx="160" cy="370" rx="140" ry="20" fill="#556B2F" opacity={0.1} />

            {/* Crop plants in background */}
            <g opacity={0.3}>
                <path d="M60 370 Q65 320 55 290 Q70 300 75 370" fill="#556B2F" />
                <path d="M80 370 Q85 310 75 275 Q90 290 95 370" fill="#556B2F" />
                <path d="M240 370 Q245 325 235 295 Q250 305 255 370" fill="#556B2F" />
                <path d="M260 370 Q265 315 255 280 Q270 295 275 370" fill="#556B2F" />
            </g>

            {/* Body */}
            <rect x="130" y="200" width="60" height="100" rx="8" fill="#556B2F" />

            {/* Arms */}
            <rect x="100" y="210" width="35" height="14" rx="7" fill="#556B2F" />
            <rect x="185" y="215" width="40" height="14" rx="7" fill="#556B2F" transform="rotate(-20 185 215)" />

            {/* Legs */}
            <rect x="137" y="295" width="18" height="60" rx="6" fill="#3E2723" />
            <rect x="165" y="295" width="18" height="60" rx="6" fill="#3E2723" />

            {/* Shoes */}
            <rect x="133" y="348" width="26" height="12" rx="6" fill="#3E2723" />
            <rect x="161" y="348" width="26" height="12" rx="6" fill="#3E2723" />

            {/* Head */}
            <circle cx="160" cy="175" r="30" fill="#D4A017" opacity={0.3} />
            <circle cx="160" cy="175" r="26" fill="#E8C872" />

            {/* Turban */}
            <path d="M134 165 Q135 140 160 135 Q185 140 186 165 Q175 155 160 153 Q145 155 134 165Z" fill="#D4A017" />
            <path d="M140 165 Q145 150 160 147 Q175 150 180 165" fill="#D4A017" opacity={0.7} />

            {/* Face */}
            <circle cx="150" cy="175" r="3" fill="#3E2723" /> {/* Left eye */}
            <circle cx="170" cy="175" r="3" fill="#3E2723" /> {/* Right eye */}
            <path d="M155 185 Q160 190 165 185" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" /> {/* Smile */}
            <path d="M148 170 L155 168" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" /> {/* Left brow */}
            <path d="M165 168 L172 170" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" /> {/* Right brow */}

            {/* Phone in right hand */}
            <rect x="210" y="195" width="24" height="40" rx="4" fill="#3E2723" transform="rotate(-15 210 195)" />
            <rect x="213" y="200" width="18" height="28" rx="2" fill="#87CEEB" opacity={0.6} transform="rotate(-15 213 200)" />

            {/* Leaf scanning effect from phone */}
            <g opacity={0.6}>
                <path d="M238 200 Q250 190 248 175 Q245 185 235 190Z" fill="#556B2F" />
                <circle cx="245" cy="185" r="12" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.8}>
                    <animateTransform attributeName="transform" type="rotate" from="0 245 185" to="360 245 185" dur="3s" repeatCount="indefinite" />
                </circle>
            </g>

            {/* Leaf in scanning */}
            <path d="M240 182 Q252 170 248 158 Q244 170 235 175Z" fill="#556B2F" opacity={0.8} />
            <line x1="243" y1="178" x2="247" y2="165" stroke="#556B2F" strokeWidth="0.8" opacity={0.5} />
        </svg>
    );
}

// ─── Decorative Wheat SVG ───────────────────────────────────
function WheatIcon({ size = 32 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
            <path d="M16 28V10" stroke="#556B2F" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 18 Q10 14 12 8 Q16 12 16 18Z" fill="#556B2F" opacity={0.7} />
            <path d="M16 18 Q22 14 20 8 Q16 12 16 18Z" fill="#556B2F" opacity={0.7} />
            <path d="M16 14 Q11 10 13 5 Q16 9 16 14Z" fill="#556B2F" opacity={0.5} />
            <path d="M16 14 Q21 10 19 5 Q16 9 16 14Z" fill="#556B2F" opacity={0.5} />
            <circle cx="16" cy="6" r="2" fill="#D4A017" />
        </svg>
    );
}

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
                background: "#FAF8F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
            }}
        >
            {/* Background farm field blur */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse at 30% 80%, rgba(85,107,47,0.08) 0%, transparent 50%), " +
                        "radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.06) 0%, transparent 50%), " +
                        "radial-gradient(ellipse at 50% 50%, rgba(85,107,47,0.03) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Decorative wheat patterns */}
            <div style={{ position: "absolute", top: 40, left: 40, opacity: 0.15, transform: "rotate(-15deg)" }}>
                <WheatIcon size={64} />
            </div>
            <div style={{ position: "absolute", bottom: 60, right: 50, opacity: 0.12, transform: "rotate(20deg)" }}>
                <WheatIcon size={80} />
            </div>
            <div style={{ position: "absolute", top: 120, right: 120, opacity: 0.08, transform: "rotate(-30deg)" }}>
                <WheatIcon size={48} />
            </div>

            {/* Main container */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 60,
                    maxWidth: 900,
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Left: Farmer Illustration (hidden on small screens via inline media query hack) */}
                <div
                    className="login-illustration"
                    style={{
                        flex: "0 0 320px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <FarmerIllustration />
                    <p
                        style={{
                            fontSize: "0.82rem",
                            color: "#556B2F",
                            fontWeight: 600,
                            textAlign: "center",
                            lineHeight: 1.5,
                            maxWidth: 240,
                        }}
                    >
                        Scan your crop leaves with AI to detect diseases instantly
                    </p>
                </div>

                {/* Right: Login Card */}
                <div
                    style={{
                        flex: 1,
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        borderRadius: 24,
                        padding: "48px 40px",
                        boxShadow:
                            "0 8px 40px rgba(62,39,35,0.08), 0 2px 12px rgba(62,39,35,0.04)",
                        border: "1px solid rgba(85,107,47,0.1)",
                        maxWidth: 440,
                        width: "100%",
                    }}
                >
                    {/* Logo */}
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    background: "linear-gradient(135deg, #556B2F, #6B8E3D)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(85,107,47,0.3)",
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" stroke="white" strokeWidth="1.5" />
                                    <path d="M12 6 Q8 10 10 14 Q12 10 12 6Z" fill="white" opacity={0.9} />
                                    <path d="M12 6 Q16 10 14 14 Q12 10 12 6Z" fill="white" opacity={0.7} />
                                    <circle cx="12" cy="16" r="2" fill="#D4A017" />
                                </svg>
                            </div>
                            <div>
                                <h1
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 800,
                                        color: "#556B2F",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1,
                                        margin: 0,
                                    }}
                                >
                                    KRISHI VISION
                                </h1>
                            </div>
                        </div>
                        <p
                            style={{
                                fontSize: "0.82rem",
                                color: "#3E2723",
                                opacity: 0.6,
                                fontWeight: 500,
                                marginTop: 4,
                            }}
                        >
                            Smart Vision for a Healthier Harvest
                        </p>
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            width: 60,
                            height: 3,
                            background: "linear-gradient(90deg, #556B2F, #D4A017)",
                            borderRadius: 10,
                            margin: "0 auto 32px",
                        }}
                    />

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div style={{ marginBottom: 20 }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    color: "#3E2723",
                                    marginBottom: 8,
                                    letterSpacing: "0.02em",
                                }}
                            >
                                Email Address
                            </label>
                            <div
                                style={{
                                    position: "relative",
                                    borderRadius: 12,
                                    border: `2px solid ${focusedField === "email" ? "#D4A017" : "rgba(85,107,47,0.25)"}`,
                                    background: focusedField === "email" ? "#FFFCF0" : "#FAFAF7",
                                    transition: "all 0.3s ease",
                                    boxShadow: focusedField === "email" ? "0 0 0 3px rgba(212,160,23,0.12)" : "none",
                                }}
                            >
                                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#556B2F" strokeWidth="2">
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
                                        padding: "14px 16px 14px 42px",
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "0.9rem",
                                        color: "#3E2723",
                                        outline: "none",
                                        borderRadius: 12,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 8 }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    color: "#3E2723",
                                    marginBottom: 8,
                                    letterSpacing: "0.02em",
                                }}
                            >
                                Password
                            </label>
                            <div
                                style={{
                                    position: "relative",
                                    borderRadius: 12,
                                    border: `2px solid ${focusedField === "password" ? "#D4A017" : "rgba(85,107,47,0.25)"}`,
                                    background: focusedField === "password" ? "#FFFCF0" : "#FAFAF7",
                                    transition: "all 0.3s ease",
                                    boxShadow: focusedField === "password" ? "0 0 0 3px rgba(212,160,23,0.12)" : "none",
                                }}
                            >
                                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#556B2F" strokeWidth="2">
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
                                        padding: "14px 48px 14px 42px",
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "0.9rem",
                                        color: "#3E2723",
                                        outline: "none",
                                        borderRadius: 12,
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        opacity: 0.4,
                                        padding: 4,
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#556B2F" strokeWidth="2">
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

                        {/* Forgot Password */}
                        <div style={{ textAlign: "right", marginBottom: 28 }}>
                            <a
                                href="#"
                                style={{
                                    fontSize: "0.78rem",
                                    color: "#D4A017",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    transition: "opacity 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: "100%",
                                padding: "16px 24px",
                                background: isLoading
                                    ? "#7A8F5A"
                                    : "linear-gradient(135deg, #556B2F, #6B8E3D)",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 700,
                                border: "none",
                                borderRadius: 50,
                                cursor: isLoading ? "wait" : "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 16px rgba(85,107,47,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                letterSpacing: "0.02em",
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = "linear-gradient(135deg, #D4A017, #E8B828)";
                                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(212,160,23,0.35)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = "linear-gradient(135deg, #556B2F, #6B8E3D)";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(85,107,47,0.3)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div
                                        style={{
                                            width: 18,
                                            height: 18,
                                            border: "2px solid rgba(255,255,255,0.3)",
                                            borderTopColor: "white",
                                            borderRadius: "50%",
                                            animation: "spin-slow 0.8s linear infinite",
                                        }}
                                    />
                                    Signing in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(85,107,47,0.15)" }} />
                        <span style={{ fontSize: "0.72rem", color: "#3E2723", opacity: 0.4, fontWeight: 500 }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(85,107,47,0.15)" }} />
                    </div>

                    {/* Create Account */}
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.85rem", color: "#3E2723", opacity: 0.6 }}>
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                style={{
                                    color: "#556B2F",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A017")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#556B2F")}
                            >
                                Create New Account
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom attribution */}
            <div
                style={{
                    position: "absolute",
                    bottom: 20,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontSize: "0.7rem",
                    color: "#3E2723",
                    opacity: 0.3,
                }}
            >
                © {new Date().getFullYear()} Krishi Vision — Empowering Farmers with Smart Vision
            </div>

            {/* Inline CSS for responsive hiding + spin animation */}
            <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .login-illustration { display: none !important; }
        }
      `}</style>
        </div>
    );
}
