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
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid #e2e8e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <Logo size={38} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 800,
                            color: "#16a34a",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                        }}
                    >
                        KrishiVision
                    </span>
                    <span
                        style={{
                            fontSize: "0.55rem",
                            fontWeight: 600,
                            color: "#6b8077",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                        }}
                    >
                        AI Crop Intelligence
                    </span>
                </div>
            </a>

            <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                {[
                    { href: "#how-it-works", label: "How It Works" },
                    { href: "#upload-section", label: "Diagnose" },
                    { href: "#weather", label: "Weather" },
                    { href: "#scan-history", label: "Dashboard" },
                ].map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        style={{
                            color: "#374a3f",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#374a3f")}
                    >
                        {link.label}
                    </a>
                ))}
                <button
                    onClick={scrollToUpload}
                    className="btn-primary"
                    style={{ padding: "9px 22px", fontSize: "0.82rem" }}
                >
                    🔬 Scan Leaf
                </button>
            </nav>
        </header>
    );
}
