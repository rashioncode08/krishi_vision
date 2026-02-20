"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        handler(mq); // set initial value
        mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
        return () => mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
    }, []);

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
                padding: isMobile ? "10px 16px" : "12px 32px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid #e2e8e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {/* ---- Left: Logo ---- */}
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <Logo size={isMobile ? 32 : 38} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                        style={{
                            fontSize: isMobile ? "1rem" : "1.15rem",
                            fontWeight: 800,
                            color: "#16a34a",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                        }}
                    >
                        KrishiVision
                    </span>
                </div>
            </a>

            {/* ---- Right: Nav (desktop) / Login only (mobile) ---- */}
            <nav style={{ display: "flex", alignItems: "center", gap: isMobile ? "12px" : "28px" }}>
                {/* Nav links — hidden on mobile */}
                {!isMobile &&
                    [
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

                {/* Login button — always visible */}
                <a
                    href="/login"
                    style={{
                        padding: isMobile ? "7px 16px" : "9px 22px",
                        fontSize: isMobile ? "0.78rem" : "0.82rem",
                        fontWeight: 600,
                        color: "#16a34a",
                        border: "2px solid #16a34a",
                        borderRadius: 50,
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#16a34a";
                        e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#16a34a";
                    }}
                >
                    Login
                </a>

                {/* Scan Leaf button — hidden on mobile */}
                {!isMobile && (
                    <button
                        onClick={scrollToUpload}
                        className="btn-primary"
                        style={{ padding: "9px 22px", fontSize: "0.82rem" }}
                    >
                        Scan Leaf
                    </button>
                )}
            </nav>
        </header>
    );
}
