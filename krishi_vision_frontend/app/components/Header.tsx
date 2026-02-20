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

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("user_name");
        if (token) {
            setIsLoggedIn(true);
            setUserName(name || "Farmer");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        setIsLoggedIn(false);
        router.push("/");
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
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
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
            </Link>

            <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                {!isLoggedIn ? (
                    <>
                        <a href="/#how-it-works" style={{ color: "#374a3f", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>How It Works</a>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" style={{ color: "#374a3f", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Dashboard</Link>
                        <a href="/dashboard#weather" style={{ color: "#374a3f", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Weather</a>
                        <a href="/dashboard#scan-history" style={{ color: "#374a3f", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>History</a>
                    </>
                )}

                {!hideLogin && mounted && (
                    <>
                        {isLoggedIn ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#16a34a" }}>
                                    👋🏼 Namaste, {userName.split(" ")[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: "8px 16px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "#ef4444",
                                        background: "#fef2f2",
                                        border: "1px solid #fee2e2",
                                        borderRadius: 50,
                                        cursor: "pointer",
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                style={{
                                    padding: "9px 22px",
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: "#16a34a",
                                    border: "2px solid #16a34a",
                                    borderRadius: 50,
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                🔑 Login
                            </Link>
                        )}
                    </>
                )}

                {mounted && isLoggedIn && (
                    <Link
                        href="/dashboard#upload-section"
                        className="btn-primary"
                        style={{ padding: "9px 22px", fontSize: "0.82rem", textDecoration: "none" }}
                    >
                        🔬 Scan Leaf
                    </Link>
                )}
            </nav>
        </header>
    );
}
