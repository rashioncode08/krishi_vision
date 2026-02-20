"use client";

export default function Logo({ size = 36 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="KrishiVision Logo"
        >
            {/* Outer circle — tech ring */}
            <circle
                cx="24"
                cy="24"
                r="22"
                stroke="url(#ring-gradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
            />
            {/* Leaf shape */}
            <path
                d="M24 8C18 14 12 20 14 30C16 36 20 40 24 40C28 40 32 36 34 30C36 20 30 14 24 8Z"
                fill="url(#leaf-gradient)"
                opacity="0.9"
            />
            {/* Leaf center vein */}
            <path
                d="M24 12V36"
                stroke="rgba(5,30,15,0.4)"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            {/* Leaf side veins */}
            <path
                d="M24 18L19 22M24 23L18 28M24 28L20 32"
                stroke="rgba(5,30,15,0.3)"
                strokeWidth="0.8"
                strokeLinecap="round"
            />
            <path
                d="M24 18L29 22M24 23L30 28M24 28L28 32"
                stroke="rgba(5,30,15,0.3)"
                strokeWidth="0.8"
                strokeLinecap="round"
            />
            {/* AI scan eye */}
            <ellipse
                cx="24"
                cy="24"
                rx="5.5"
                ry="4"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.95"
            />
            <circle cx="24" cy="24" r="2" fill="white" opacity="0.95" />
            <circle cx="24" cy="24" r="0.8" fill="#050d09" />
            {/* Scan beams */}
            <line x1="15" y1="24" x2="18" y2="24" stroke="var(--kv-green-300, #86efac)" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
            <line x1="30" y1="24" x2="33" y2="24" stroke="var(--kv-green-300, #86efac)" strokeWidth="1" opacity="0.7" strokeLinecap="round" />

            <defs>
                <linearGradient id="leaf-gradient" x1="14" y1="8" x2="34" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="ring-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
            </defs>
        </svg>
    );
}
