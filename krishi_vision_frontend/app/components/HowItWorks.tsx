"use client";

const steps = [
    {
        number: "01",
        icon: "📸",
        title: "Upload a Photo",
        description: "Take a photo of a sick leaf from your crop and upload it — or use your phone camera directly.",
    },
    {
        number: "02",
        icon: "🔧",
        title: "Image Prepared",
        description: "The app automatically resizes and cleans up the image so the AI model can read it properly.",
    },
    {
        number: "03",
        icon: "🧠",
        title: "AI Analyses",
        description: "A deep learning model scans the image and compares it to thousands of known disease patterns.",
    },
    {
        number: "04",
        icon: "📊",
        title: "Result Generated",
        description: "The model picks the most likely disease and calculates how confident it is in the answer.",
    },
    {
        number: "05",
        icon: "✅",
        title: "Get Your Answer",
        description: "See the disease name, confidence level, treatment advice, and prevention tips instantly.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            style={{
                padding: "100px 24px",
                maxWidth: 1100,
                margin: "0 auto",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: 64 }} className="animate-fade-in-up">
                <p
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--kv-green-400)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: 12,
                    }}
                >
                    How It Works
                </p>
                <h2
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: "var(--text-primary)",
                    }}
                >
                    Five Steps. Under One Minute.
                </h2>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 24,
                }}
            >
                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className="glass-card animate-fade-in-up"
                        style={{
                            padding: "32px 24px",
                            textAlign: "center",
                            animationDelay: `${i * 100}ms`,
                            opacity: 0,
                            animationFillMode: "forwards",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "2.5rem",
                                marginBottom: 16,
                            }}
                        >
                            {step.icon}
                        </div>
                        <div
                            style={{
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                color: "var(--kv-green-400)",
                                letterSpacing: "0.1em",
                                marginBottom: 8,
                            }}
                        >
                            STEP {step.number}
                        </div>
                        <h3
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                marginBottom: 10,
                            }}
                        >
                            {step.title}
                        </h3>
                        <p
                            style={{
                                fontSize: "0.85rem",
                                lineHeight: 1.6,
                                color: "var(--text-muted)",
                            }}
                        >
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
