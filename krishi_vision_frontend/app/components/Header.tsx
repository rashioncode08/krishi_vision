"use client";

import Logo from "./Logo";

export default function Header() {
    const scrollToUpload = () => {
        document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                padding: "12px 32px",
                background: "rgba(5, 13, 9, 0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(34, 197, 94, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {/* Logo + Brand */}
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <Logo size={38} />
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <span
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #4ade80, #22c55e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                        }}
                    >
                        KrishiVision
                    </span>
                    <span
                        style={{
                            fontSize: "0.55rem",
                            fontWeight: 500,
                            color: "var(--text-muted)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            opacity: 0.7,
                        }}
                    >
                        AI Crop Intelligence
                    </span>
                </div>
            </a>

            {/* Nav links */}
            <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                {[
                    { href: "#how-it-works", label: "How It Works" },
                    { href: "#upload-section", label: "Diagnose" },
                    { href: "#scan-history", label: "Dashboard" },
                ].map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        style={{
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            transition: "color 0.2s",
                            position: "relative",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                        {link.label}
                    </a>
                ))}
                <button
                    onClick={scrollToUpload}
                    style={{
                        padding: "9px 22px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#050d09",
                        background: "linear-gradient(135deg, #4ade80, #22c55e)",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 0 20px rgba(34,197,94,0.2)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(34,197,94,0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.2)";
                    }}
                >
                    🔬 Scan Leaf
                </button>
            </nav>
        </header>
    );
}
