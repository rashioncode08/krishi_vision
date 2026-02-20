"use client";

/* ── Hero illustration: a farm scene with tree, leaves, and scanning ── */
export function HeroIllustration() {
    return (
        <svg width="400" height="280" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float">
            {/* Ground */}
            <ellipse cx="200" cy="260" rx="180" ry="16" fill="#dcfce7" opacity="0.5" />

            {/* Tree trunk */}
            <path d="M195 260V140" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
            <path d="M205 260V145" stroke="#a16207" strokeWidth="6" strokeLinecap="round" opacity="0.5" />

            {/* Tree roots */}
            <path d="M195 255C185 260 170 262 160 258" stroke="#92400e" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <path d="M200 258C210 262 225 264 235 260" stroke="#92400e" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

            {/* Branches */}
            <path d="M195 180C175 170 155 162 140 155" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
            <path d="M198 160C215 148 235 140 250 135" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
            <path d="M196 200C180 195 165 188 148 185" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <path d="M200 145C200 130 195 115 190 105" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

            {/* Tree canopy leaves — clusters */}
            <circle cx="140" cy="145" r="25" fill="url(#canopy1)" />
            <circle cx="190" cy="100" r="28" fill="url(#canopy2)" />
            <circle cx="250" cy="125" r="24" fill="url(#canopy1)" />
            <circle cx="165" cy="120" r="20" fill="url(#canopy3)" />
            <circle cx="220" cy="105" r="22" fill="url(#canopy2)" />
            <circle cx="148" cy="175" r="18" fill="url(#canopy3)" />

            {/* Detailed leaf with veins (main feature) */}
            <g transform="translate(280, 80) rotate(15)">
                <path d="M0 0C-15 20 -20 45 -15 65C-10 78 -3 85 0 85C3 85 10 78 15 65C20 45 15 20 0 0Z" fill="url(#detail-leaf)" />
                {/* Main vein */}
                <path d="M0 8V78" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                {/* Side veins */}
                <path d="M0 20L-8 30" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 20L8 30" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 32L-10 44" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 32L10 44" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 44L-8 56" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 44L8 56" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
                <path d="M0 56L-6 64" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
                <path d="M0 56L6 64" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
                {/* Scan circle around leaf */}
                <circle cx="0" cy="42" r="30" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
                {/* AI scan dot */}
                <circle cx="0" cy="42" r="4" fill="#22c55e" opacity="0.4" />
            </g>

            {/* Small stems with leaves */}
            <g transform="translate(60, 200)">
                <path d="M0 60V20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 35C-8 30 -15 22 -18 15" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="-22" cy="12" rx="8" ry="5" fill="#4ade80" transform="rotate(-30 -22 12)" opacity="0.7" />
                <path d="M0 25C6 20 12 14 14 8" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="17" cy="5" rx="7" ry="4.5" fill="#86efac" transform="rotate(25 17 5)" opacity="0.7" />
            </g>

            {/* Small grass tufts */}
            <path d="M100 258C102 248 105 252 107 258" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <path d="M260 256C262 246 265 250 267 256" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <path d="M310 258C312 250 315 254 317 258" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

            {/* Floating spores / particles */}
            <circle cx="320" cy="60" r="3" fill="#bbf7d0" opacity="0.5" />
            <circle cx="340" cy="90" r="2" fill="#dcfce7" opacity="0.6" />
            <circle cx="70" cy="100" r="2.5" fill="#bbf7d0" opacity="0.4" />
            <circle cx="50" cy="130" r="2" fill="#dcfce7" opacity="0.5" />

            <defs>
                <radialGradient id="canopy1"><stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="#22c55e" /></radialGradient>
                <radialGradient id="canopy2"><stop offset="0%" stopColor="#86efac" /><stop offset="100%" stopColor="#4ade80" /></radialGradient>
                <radialGradient id="canopy3"><stop offset="0%" stopColor="#bbf7d0" /><stop offset="100%" stopColor="#22c55e" /></radialGradient>
                <linearGradient id="detail-leaf" x1="-20" y1="0" x2="20" y2="85" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
            </defs>
        </svg>
    );
}

/* ── Step icons with nature/leaf themes ── */
export function StepIcon({ step }: { step: number }) {
    const icons: Record<number, React.ReactElement> = {
        // Step 1: Camera capturing a leaf
        1: (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" fill="#f0fdf4" />
                <rect x="12" y="16" width="28" height="22" rx="4" fill="white" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="26" cy="26" r="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.2" />
                <path d="M26 22C24 24 23 26 24 29C24.5 30.5 25.5 31.5 26 31.5C26.5 31.5 27.5 30.5 28 29C29 26 28 24 26 22Z" fill="#4ade80" />
                <path d="M26 23V30" stroke="#166534" strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
                <rect x="20" y="14" width="12" height="4" rx="2" fill="#dcfce7" />
            </svg>
        ),
        // Step 2: Leaf with scan/analysis lines
        2: (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" fill="#f0fdf4" />
                <path d="M26 10C20 18 16 26 18 34C20 40 23 44 26 44C29 44 32 40 34 34C36 26 32 18 26 10Z" fill="url(#step2-leaf)" />
                <path d="M26 14V40" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                <path d="M26 20L21 25M26 26L20 32M26 32L22 36" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
                <path d="M26 20L31 25M26 26L32 32M26 32L30 36" stroke="#166534" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
                <line x1="16" y1="22" x2="36" y2="22" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
                <line x1="16" y1="30" x2="36" y2="30" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
                <defs><linearGradient id="step2-leaf" x1="16" y1="10" x2="36" y2="44"><stop stopColor="#86efac" /><stop offset="1" stopColor="#16a34a" /></linearGradient></defs>
            </svg>
        ),
        // Step 3: Checkmark with leaf vein pattern
        3: (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" fill="#f0fdf4" />
                <circle cx="26" cy="26" r="16" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
                {/* Vein pattern behind check */}
                <path d="M26 14V38" stroke="#bbf7d0" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M26 20L19 26M26 28L18 34" stroke="#bbf7d0" strokeWidth="0.6" strokeLinecap="round" />
                <path d="M26 20L33 26M26 28L34 34" stroke="#bbf7d0" strokeWidth="0.6" strokeLinecap="round" />
                {/* Check mark */}
                <path d="M19 26L24 31L33 21" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        // Step 4: Seedling / treatment
        4: (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" fill="#f0fdf4" />
                {/* Pot */}
                <path d="M18 36L20 44H32L34 36Z" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.2" />
                <rect x="16" y="34" width="20" height="4" rx="2" fill="#bbf7d0" />
                {/* Stem */}
                <path d="M26 34V18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M26 26C22 22 18 20 16 18C18 22 20 25 26 26Z" fill="#4ade80" />
                <path d="M26 22C30 18 34 16 36 14C34 18 32 21 26 22Z" fill="#86efac" />
                {/* Tiny leaf veins */}
                <path d="M26 26L20 21" stroke="#166534" strokeWidth="0.5" opacity="0.2" />
                <path d="M26 22L32 17" stroke="#166534" strokeWidth="0.5" opacity="0.2" />
                {/* Sparkle */}
                <circle cx="16" cy="15" r="1.5" fill="#facc15" opacity="0.6" />
                <circle cx="38" cy="12" r="1" fill="#facc15" opacity="0.5" />
            </svg>
        ),
        // Step 5: Shield with leaf
        5: (
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="24" fill="#f0fdf4" />
                <path d="M26 8L12 16V28C12 36 18 42 26 46C34 42 40 36 40 28V16L26 8Z" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
                {/* Leaf inside shield */}
                <path d="M26 16C22 22 20 28 21 33C22 36 24 38 26 38C28 38 30 36 31 33C32 28 30 22 26 16Z" fill="#4ade80" opacity="0.7" />
                <path d="M26 18V36" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                <path d="M26 22L23 26M26 27L22 31" stroke="#166534" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
                <path d="M26 22L29 26M26 27L30 31" stroke="#166534" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
            </svg>
        ),
    };
    return icons[step] || null;
}

/* ── Leaf scan SVG for upload section ── */
export function LeafScanSVG() {
    return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="animate-float">
            <circle cx="40" cy="40" r="36" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="2" />
            {/* Main leaf */}
            <path d="M40 14C32 24 26 34 28 48C30 56 35 62 40 62C45 62 50 56 52 48C54 34 48 24 40 14Z" fill="url(#lscan-leaf)" opacity="0.85" />
            {/* Central vein */}
            <path d="M40 18V58" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
            {/* Side veins */}
            <path d="M40 26L34 33M40 34L32 42M40 42L35 49M40 50L37 54" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
            <path d="M40 26L46 33M40 34L48 42M40 42L45 49M40 50L43 54" stroke="#166534" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
            {/* Scan ring */}
            <circle cx="40" cy="40" r="22" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
            <defs>
                <linearGradient id="lscan-leaf" x1="26" y1="14" x2="54" y2="62" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
            </defs>
        </svg>
    );
}
