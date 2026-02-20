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
            {/* Circle bg */}
            <circle cx="24" cy="24" r="23" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            {/* Leaf shape */}
            <path
                d="M24 8C18 14 12 20 14 30C16 36 20 40 24 40C28 40 32 36 34 30C36 20 30 14 24 8Z"
                fill="url(#logo-leaf)"
            />
            {/* Leaf veins */}
            <path d="M24 12V36" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            <path d="M24 18L19 22M24 23L18 28M24 28L20 32" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
            <path d="M24 18L29 22M24 23L30 28M24 28L28 32" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
            {/* AI eye */}
            <ellipse cx="24" cy="24" rx="5.5" ry="4" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="2" fill="white" />
            <circle cx="24" cy="24" r="0.8" fill="#166534" />
            <defs>
                <linearGradient id="logo-leaf" x1="14" y1="8" x2="34" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
            </defs>
        </svg>
    );
}
