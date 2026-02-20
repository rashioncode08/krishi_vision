"use client";

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
                padding: "16px 24px",
                background: "rgba(5, 13, 9, 0.8)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Leaf icon */}
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--kv-green-600), var(--kv-green-400))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                    }}
                >
                    🌿
                </div>
                <span
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, var(--kv-green-300), var(--kv-green-500))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "-0.02em",
                    }}
                >
                    KrishiVision
                </span>
            </div>

            <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <a
                    href="#how-it-works"
                    style={{
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    How It Works
                </a>
                <button onClick={scrollToUpload} className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>
                    Scan a Leaf
                </button>
            </nav>
        </header>
    );
}
