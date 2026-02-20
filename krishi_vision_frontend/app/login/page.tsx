"use client";

import { useState } from "react";

// ─── Farmer Illustration SVG (Premium Animated) ─────────────
function FarmerIllustration() {
    return (
        <svg width="340" height="420" viewBox="0 0 340 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Skin gradient */}
                <radialGradient id="skinGrad" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0%" stopColor="#F5D6A8" />
                    <stop offset="100%" stopColor="#D4A56A" />
                </radialGradient>
                {/* Turban gradient */}
                <linearGradient id="turbanGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4A017" />
                    <stop offset="100%" stopColor="#B8880F" />
                </linearGradient>
                {/* Shirt gradient */}
                <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B8E3D" />
                    <stop offset="100%" stopColor="#556B2F" />
                </linearGradient>
                {/* Phone screen glow */}
                <radialGradient id="screenGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#A8E6CF" />
                    <stop offset="100%" stopColor="#56B870" />
                </radialGradient>
                {/* Scanning beam */}
                <linearGradient id="scanBeam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D4A017" stopOpacity="0" />
                    <stop offset="50%" stopColor="#D4A017" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* ── Background field ── */}
            <ellipse cx="170" cy="388" rx="150" ry="22" fill="#556B2F" opacity={0.08} />

            {/* Grass tufts */}
            <g opacity={0.25}>
                <path d="M50 388 Q52 360 46 338" stroke="#556B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M55 388 Q58 355 52 330" stroke="#6B8E3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M60 388 Q65 365 58 345" stroke="#556B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M270 388 Q272 362 268 342" stroke="#556B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M278 388 Q281 358 275 335" stroke="#6B8E3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M285 388 Q289 368 282 350" stroke="#556B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Crop stalks with leaves */}
            <g opacity={0.2}>
                <path d="M75 388 Q78 330 72 295" stroke="#556B2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M72 330 Q60 320 55 310" stroke="#556B2F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M72 330 Q55 325 48 318" fill="#556B2F" opacity={0.5} />
                <path d="M78 315 Q88 305 95 300" stroke="#6B8E3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M255 388 Q258 335 252 300" stroke="#556B2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M255 340 Q245 332 238 325" stroke="#556B2F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M258 320 Q268 310 275 305" stroke="#6B8E3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>

            {/* ── Farmer body group with idle animation ── */}
            <g>
                <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="3s" repeatCount="indefinite" />

                {/* Shadow under farmer */}
                <ellipse cx="155" cy="386" rx="45" ry="8" fill="#3E2723" opacity={0.08} />

                {/* ── Legs ── */}
                <path d="M138 310 L134 365 Q134 372 140 372 L148 372 Q152 372 152 368 L150 310" fill="#4A3728" />
                <path d="M162 310 L158 365 Q158 372 164 372 L172 372 Q176 372 176 368 L174 310" fill="#3E2723" />
                {/* Shoes */}
                <path d="M130 368 Q130 378 142 378 L152 378 Q156 378 156 374 L154 368" fill="#3E2723" rx="4" />
                <path d="M156 368 Q156 378 168 378 L178 378 Q182 378 182 374 L180 368" fill="#2D1E15" rx="4" />
                {/* Shoe highlights */}
                <path d="M134 372 Q140 370 150 372" stroke="#5C3D2E" strokeWidth="0.8" opacity={0.3} />
                <path d="M160 372 Q166 370 176 372" stroke="#5C3D2E" strokeWidth="0.8" opacity={0.3} />

                {/* ── Dhoti / lower garment ── */}
                <path d="M125 280 Q130 315 138 312 L174 312 Q182 315 187 280 Z" fill="#F5F0E0" />
                <path d="M132 290 Q155 295 180 290" stroke="#E8DFC8" strokeWidth="0.8" fill="none" />
                <path d="M130 300 Q155 305 182 300" stroke="#E8DFC8" strokeWidth="0.8" fill="none" />

                {/* ── Kurta / shirt ── */}
                <path d="M118 210 Q120 195 155 188 Q190 195 192 210 L195 285 Q190 290 155 292 Q120 290 115 285 Z" fill="url(#shirtGrad)" />
                {/* Shirt collar */}
                <path d="M140 195 Q155 204 170 195" stroke="#4A5F25" strokeWidth="1.5" fill="none" />
                {/* Shirt center line */}
                <line x1="155" y1="200" x2="155" y2="288" stroke="#4A5F25" strokeWidth="0.8" opacity={0.3} />
                {/* Buttons */}
                <circle cx="155" cy="215" r="2" fill="#D4A017" opacity={0.6} />
                <circle cx="155" cy="235" r="2" fill="#D4A017" opacity={0.6} />
                <circle cx="155" cy="255" r="2" fill="#D4A017" opacity={0.6} />
                {/* Shirt folds */}
                <path d="M130 230 Q140 235 135 250" stroke="#4A5F25" strokeWidth="0.6" fill="none" opacity={0.3} />
                <path d="M175 228 Q168 234 172 248" stroke="#4A5F25" strokeWidth="0.6" fill="none" opacity={0.3} />

                {/* ── Left arm (holding leaf) ── */}
                <g>
                    <path d="M118 210 Q100 215 90 235 Q85 248 92 255" fill="url(#shirtGrad)" />
                    {/* Left hand */}
                    <circle cx="92" cy="256" r="10" fill="url(#skinGrad)" />
                    {/* Fingers */}
                    <path d="M86 250 Q82 245 80 248" stroke="#D4A56A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M84 254 Q80 250 78 252" stroke="#D4A56A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                    {/* Leaf in left hand */}
                    <g>
                        <animateTransform attributeName="transform" type="rotate" values="-5,80,240;5,80,240;-5,80,240" dur="2.5s" repeatCount="indefinite" />
                        <path d="M80 240 Q65 225 60 205 Q75 215 85 230 Z" fill="#6B8E3D" />
                        <path d="M80 240 Q70 222 64 210" stroke="#556B2F" strokeWidth="1" fill="none" opacity={0.5} />
                        <path d="M74 228 Q68 222 63 215" stroke="#556B2F" strokeWidth="0.6" fill="none" opacity={0.3} />
                        <path d="M78 234 Q72 228 68 222" stroke="#556B2F" strokeWidth="0.6" fill="none" opacity={0.3} />
                        {/* Disease spots on leaf */}
                        <circle cx="70" cy="220" r="3" fill="#8B5E3C" opacity={0.4} />
                        <circle cx="75" cy="228" r="2" fill="#8B5E3C" opacity={0.3} />
                    </g>
                </g>

                {/* ── Right arm (holding phone) ── */}
                <g>
                    <path d="M192 210 Q210 218 218 240 Q222 255 215 262" fill="url(#shirtGrad)" />
                    {/* Right hand */}
                    <circle cx="215" cy="263" r="10" fill="url(#skinGrad)" />

                    {/* Phone */}
                    <g transform="rotate(-10 220 258)">
                        <rect x="205" y="238" width="30" height="50" rx="5" fill="#2D1E15" />
                        <rect x="208" y="242" width="24" height="40" rx="3" fill="url(#screenGlow)" />
                        {/* Screen content - leaf icon */}
                        <path d="M220 252 Q215 260 218 268 Q220 260 225 255 Z" fill="#556B2F" opacity={0.6} />
                        {/* Scan line animation */}
                        <rect x="208" y="250" width="24" height="2" fill="url(#scanBeam)" rx="1">
                            <animate attributeName="y" values="242;278;242" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                        </rect>
                        {/* Screen reflection */}
                        <path d="M208 242 L220 242 L208 260 Z" fill="white" opacity={0.1} />
                        {/* Home indicator */}
                        <rect x="215" y="280" width="10" height="2" rx="1" fill="#5C3D2E" opacity={0.5} />
                    </g>

                    {/* Finger gripping phone */}
                    <path d="M222 255 Q228 252 230 256" stroke="#D4A56A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>

                {/* ── Neck ── */}
                <rect x="147" y="170" width="16" height="22" rx="4" fill="url(#skinGrad)" />

                {/* ── Head ── */}
                <g>
                    {/* Head shape */}
                    <ellipse cx="155" cy="148" rx="32" ry="35" fill="url(#skinGrad)" />

                    {/* Ears */}
                    <ellipse cx="123" cy="150" rx="6" ry="8" fill="#D4A56A" />
                    <ellipse cx="187" cy="150" rx="6" ry="8" fill="#D4A56A" />

                    {/* ── Turban ── */}
                    <path d="M122 142 Q125 105 155 95 Q185 105 188 142 Q180 130 155 125 Q130 130 122 142Z" fill="url(#turbanGrad)" />
                    {/* Turban wraps */}
                    <path d="M128 138 Q140 125 155 122 Q170 125 182 138" stroke="#C4920E" strokeWidth="2" fill="none" opacity={0.5} />
                    <path d="M126 132 Q140 118 155 115 Q170 118 184 132" stroke="#C4920E" strokeWidth="1.5" fill="none" opacity={0.3} />
                    {/* Turban tail hanging */}
                    <path d="M188 138 Q195 140 198 155 Q196 165 190 170" stroke="url(#turbanGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M188 138 Q195 140 198 155 Q196 165 190 170" stroke="#C4920E" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.3} />
                    {/* Turban jewel */}
                    <circle cx="155" cy="115" r="4" fill="#D4A017" />
                    <circle cx="155" cy="115" r="2.5" fill="#E8C54E" />
                    <circle cx="154" cy="114" r="1" fill="white" opacity={0.6} />

                    {/* ── Face ── */}
                    {/* Eyebrows */}
                    <path d="M138 140 Q143 136 150 139" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M160 139 Q167 136 172 140" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Eyes */}
                    <ellipse cx="145" cy="148" rx="4.5" ry="5" fill="white" />
                    <ellipse cx="165" cy="148" rx="4.5" ry="5" fill="white" />
                    <circle cx="146" cy="148" r="2.5" fill="#3E2723" />
                    <circle cx="166" cy="148" r="2.5" fill="#3E2723" />
                    {/* Eye highlights */}
                    <circle cx="147" cy="147" r="1" fill="white" />
                    <circle cx="167" cy="147" r="1" fill="white" />
                    {/* Blink animation */}
                    <ellipse cx="145" cy="148" rx="5" ry="0.5" fill="url(#skinGrad)" opacity={0}>
                        <animate attributeName="opacity" values="0;0;0;0;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0" dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="165" cy="148" rx="5" ry="0.5" fill="url(#skinGrad)" opacity={0}>
                        <animate attributeName="opacity" values="0;0;0;0;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0" dur="4s" repeatCount="indefinite" />
                    </ellipse>

                    {/* Nose */}
                    <path d="M153 152 Q155 158 157 152" stroke="#C4956A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                    {/* Smile */}
                    <path d="M143 162 Q155 172 167 162" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Smile cheeks */}
                    <circle cx="138" cy="160" r="5" fill="#E8A88C" opacity={0.2} />
                    <circle cx="172" cy="160" r="5" fill="#E8A88C" opacity={0.2} />

                    {/* Mustache */}
                    <path d="M145 160 Q150 156 155 158 Q160 156 165 160" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
            </g>

            {/* ── Scanning particles (floating around phone) ── */}
            <g opacity={0.5}>
                <circle cx="240" cy="245" r="2" fill="#D4A017">
                    <animate attributeName="cy" values="245;230;245" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="248" cy="260" r="1.5" fill="#556B2F">
                    <animate attributeName="cy" values="260;240;260" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="235" cy="250" r="1.8" fill="#6B8E3D">
                    <animate attributeName="cy" values="250;235;250" dur="1.8s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="opacity" values="0;0.7;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="245" cy="270" r="1.2" fill="#D4A017">
                    <animate attributeName="cy" values="270;250;270" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
                    <animate attributeName="opacity" values="0;0.5;0" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
            </g>

            {/* ── Floating leaves ── */}
            <g opacity={0.2}>
                <path d="M40 120 Q35 110 30 105 Q38 108 42 115Z" fill="#556B2F">
                    <animateTransform attributeName="transform" type="translate" values="0,0;15,30;30,60;45,90" dur="8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.2;0.1;0" dur="8s" repeatCount="indefinite" />
                </path>
                <path d="M280 80 Q275 70 270 65 Q278 68 282 75Z" fill="#6B8E3D">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-12,25;-24,50;-36,75" dur="7s" repeatCount="indefinite" begin="2s" />
                    <animate attributeName="opacity" values="0.3;0.2;0.1;0" dur="7s" repeatCount="indefinite" begin="2s" />
                </path>
                <path d="M160 60 Q155 50 150 45 Q158 48 162 55Z" fill="#D4A017">
                    <animateTransform attributeName="transform" type="translate" values="0,0;8,20;16,40;24,60" dur="9s" repeatCount="indefinite" begin="4s" />
                    <animate attributeName="opacity" values="0.2;0.15;0.1;0" dur="9s" repeatCount="indefinite" begin="4s" />
                </path>
            </g>

            {/* ── AI scanning ring around leaf ── */}
            <g transform="translate(68, 215)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.4}>
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="16" fill="none" stroke="#556B2F" strokeWidth="1" strokeDasharray="2,6" opacity={0.3}>
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
            </g>
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
                        flex: "0 0 340px",
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
