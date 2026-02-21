"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ hideLogin }: { hideLogin?: boolean }) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("user_name");
        if (token) {
            setIsLoggedIn(true);
            setUserName(name || "Farmer");
        }

        const mq = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        handler(mq); // set initial value
        if (mq.addEventListener) {
            mq.addEventListener("change", handler as EventListener);
        } else {
            mq.addListener(handler as (e: MediaQueryListEvent) => void);
        }
        return () => {
            if (mq.removeEventListener) {
                mq.removeEventListener("change", handler as EventListener);
            } else {
                mq.removeListener(handler as (e: MediaQueryListEvent) => void);
            }
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        setIsLoggedIn(false);
        router.push("/");
    };

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            onClick={() => setIsMobileMenuOpen(false)}
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
            {children}
        </Link>
    );

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
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
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
            </Link>

            {/* ---- Right: Nav ---- */}
            <nav style={{ display: "flex", alignItems: "center", gap: isMobile ? "12px" : "28px" }}>
                {/* Nav links — hidden on mobile */}
                {!isMobile && (
                    <>
                        {!isLoggedIn ? (
                            <NavLink href="/#how-it-works">How It Works</NavLink>
                        ) : (
                            <>
                                <NavLink href="/dashboard">Dashboard</NavLink>
                                <NavLink href="/dashboard#weather">Weather</NavLink>
                                <NavLink href="/dashboard#scan-history">History</NavLink>
                            </>
                        )}
                    </>
                )}

                {!hideLogin && mounted && (
                    <>
                        {isLoggedIn ? (
                            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
                                {!isMobile && (
                                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#16a34a" }}>
                                        👋🏼 Namaste, {userName.split(" ")[0]}
                                    </span>
                                )}
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: isMobile ? "7px 16px" : "9px 22px",
                                        fontSize: isMobile ? "0.78rem" : "0.82rem",
                                        fontWeight: 600,
                                        color: "#ef4444",
                                        background: "transparent",
                                        border: "2px solid #ef4444",
                                        borderRadius: 50,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#ef4444";
                                        e.currentTarget.style.color = "white";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "#ef4444";
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
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
                            </Link>
                        )}
                    </>
                )}

                {/* Scan Leaf button — hidden on mobile */}
                {!isMobile && mounted && isLoggedIn && (
                    <Link
                        href="/dashboard#upload-section"
                        className="btn-primary"
                        style={{ padding: "9px 22px", fontSize: "0.82rem", textDecoration: "none" }}
                    >
                        🔬 Scan Leaf
                    </Link>
                )}

                {/* Mobile Menu Toggle - Only if logged in or mobile menu is needed */}
                {isMobile && (
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "6px",
                            color: "#16a34a",
                            background: "transparent",
                            border: "none",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                    >
                        {isMobileMenuOpen ? "✖" : "☰"}
                    </button>
                )}
            </nav>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && isMobile && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "white",
                    borderBottom: "1px solid #e2e8e5",
                    padding: "16px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                }}>
                    {!isLoggedIn ? (
                        <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#374a3f", textDecoration: "none", fontSize: "1rem", fontWeight: 600, padding: "8px 0", borderBottom: "1px solid #f0fdf4" }}>How It Works</Link>
                    ) : (
                        <>
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#374a3f", textDecoration: "none", fontSize: "1rem", fontWeight: 600, padding: "8px 0", borderBottom: "1px solid #f0fdf4" }}>Dashboard</Link>
                            <Link href="/dashboard#weather" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#374a3f", textDecoration: "none", fontSize: "1rem", fontWeight: 600, padding: "8px 0", borderBottom: "1px solid #f0fdf4" }}>Weather</Link>
                            <Link href="/dashboard#scan-history" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#374a3f", textDecoration: "none", fontSize: "1rem", fontWeight: 600, padding: "8px 0", borderBottom: "1px solid #f0fdf4" }}>History</Link>
                        </>
                    )}

                    {mounted && isLoggedIn && (
                        <Link
                            href="/dashboard#upload-section"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="btn-primary"
                            style={{ display: "flex", width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem", textAlign: "center", textDecoration: "none" }}
                        >
                            � Scan Leaf
                        </Link>
                    )}

                    {mounted && isLoggedIn && (
                        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#16a34a", padding: "8px 0" }}>
                            �🏼 Namaste, {userName.split(" ")[0]}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
