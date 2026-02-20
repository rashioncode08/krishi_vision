"use client";

import { useEffect, useState, useMemo } from "react";

// ─── Types ──────────────────────────────────────────────────
interface WeatherData {
    latitude: number;
    longitude: number;
    hourly: {
        time: string[];
        temperature_2m: number[];
        weathercode: number[];
    };
    daily: {
        time: string[];
        sunrise: string[];
        sunset: string[];
        rain_sum: number[];
        showers_sum: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
    };
}

// ─── Weather code → icon/label mapping ──────────────────────
function weatherInfo(code: number): { icon: string; label: string } {
    if (code === 0) return { icon: "☀️", label: "Clear sky" };
    if (code <= 3) return { icon: "⛅", label: "Partly cloudy" };
    if (code <= 48) return { icon: "🌫️", label: "Foggy" };
    if (code <= 57) return { icon: "🌧️", label: "Drizzle" };
    if (code <= 67) return { icon: "🌧️", label: "Rain" };
    if (code <= 77) return { icon: "❄️", label: "Snow" };
    if (code <= 82) return { icon: "🌦️", label: "Rain showers" };
    if (code <= 86) return { icon: "🌨️", label: "Snow showers" };
    if (code <= 99) return { icon: "⛈️", label: "Thunderstorm" };
    return { icon: "🌤️", label: "Unknown" };
}

// ─── SVG Temperature Chart ──────────────────────────────────
function TempChart({ hours, temps }: { hours: string[]; temps: number[] }) {
    const W = 700, H = 180, PX = 40, PY = 20;
    const chartW = W - PX * 2, chartH = H - PY * 2;

    const min = Math.floor(Math.min(...temps) - 2);
    const max = Math.ceil(Math.max(...temps) + 2);
    const range = max - min || 1;

    const points = temps.map((t, i) => ({
        x: PX + (i / (temps.length - 1)) * chartW,
        y: PY + chartH - ((t - min) / range) * chartH,
    }));

    const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const area = `${line} L${points[points.length - 1].x},${PY + chartH} L${points[0].x},${PY + chartH} Z`;

    // Y-axis labels (5 steps)
    const yLabels = Array.from({ length: 5 }, (_, i) => {
        const val = min + (range * i) / 4;
        const y = PY + chartH - (i / 4) * chartH;
        return { val: Math.round(val), y };
    });

    // X-axis labels (every 4 hours)
    const xLabels = hours
        .map((h, i) => ({ label: h, x: points[i]?.x }))
        .filter((_, i) => i % 4 === 0);

    // Find current hour index
    const now = new Date();
    const currentHourIdx = hours.findIndex((h) => {
        const d = new Date();
        d.setHours(parseInt(h), 0, 0, 0);
        return parseInt(h) === now.getHours();
    });

    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
            {/* Grid lines */}
            {yLabels.map((yl, i) => (
                <g key={i}>
                    <line x1={PX} y1={yl.y} x2={W - PX} y2={yl.y} stroke="#e2e8e5" strokeWidth={0.5} strokeDasharray="4,4" />
                    <text x={PX - 8} y={yl.y + 4} textAnchor="end" fontSize={10} fill="#6b8077">
                        {yl.val}°
                    </text>
                </g>
            ))}

            {/* X-axis labels */}
            {xLabels.map((xl, i) => (
                <text key={i} x={xl.x} y={H - 2} textAnchor="middle" fontSize={10} fill="#6b8077">
                    {xl.label}
                </text>
            ))}

            {/* Area fill */}
            <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#tempGrad)" />

            {/* Line */}
            <path d={line} fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

            {/* Dots at every 4th point */}
            {points.filter((_, i) => i % 4 === 0).map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={3} fill="white" stroke="#22c55e" strokeWidth={2} />
            ))}

            {/* Current hour marker */}
            {currentHourIdx >= 0 && currentHourIdx < points.length && (
                <g>
                    <circle cx={points[currentHourIdx].x} cy={points[currentHourIdx].y} r={5} fill="#16a34a" stroke="white" strokeWidth={2} />
                    <text
                        x={points[currentHourIdx].x}
                        y={points[currentHourIdx].y - 12}
                        textAnchor="middle"
                        fontSize={11}
                        fontWeight={700}
                        fill="#16a34a"
                    >
                        {temps[currentHourIdx]}°C
                    </text>
                </g>
            )}
        </svg>
    );
}

// ─── Main Component ─────────────────────────────────────────
export default function WeatherDashboard() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [locationName, setLocationName] = useState("Loading...");

    useEffect(() => {
        async function fetchWeather(lat: number, lon: number) {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset,rain_sum,showers_sum,temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto&past_days=1`;
                const res = await fetch(url);
                if (!res.ok) throw new Error("Weather API error");
                const data: WeatherData = await res.json();
                setWeather(data);
                setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
            } catch {
                setError("Could not fetch weather data");
            } finally {
                setLoading(false);
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
                () => fetchWeather(26.91, 75.79), // Fallback: Jaipur
                { timeout: 5000 }
            );
        } else {
            fetchWeather(26.91, 75.79);
        }
    }, []);

    // ─── Derived data ───────────────────────────────────────
    const todayData = useMemo(() => {
        if (!weather) return null;
        const now = new Date();
        const currentHour = now.getHours();

        // Today's hourly temps (next 24h)
        const todayStart = weather.hourly.time.findIndex((t) => {
            const d = new Date(t);
            return d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
        });

        const hourlySlice = weather.hourly.temperature_2m.slice(todayStart, todayStart + 24);
        const hourLabels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

        // Current temp
        const currentTemp = weather.hourly.temperature_2m[todayStart + currentHour] ?? hourlySlice[0];
        const currentCode = weather.hourly.weathercode?.[todayStart + currentHour] ?? 0;

        // Daily forecast (skip yesterday)
        const forecast = weather.daily.time.slice(1).map((date, i) => ({
            date,
            high: weather.daily.temperature_2m_max[i + 1],
            low: weather.daily.temperature_2m_min[i + 1],
            rain: (weather.daily.rain_sum[i + 1] || 0) + (weather.daily.showers_sum[i + 1] || 0),
            sunrise: weather.daily.sunrise[i + 1],
            sunset: weather.daily.sunset[i + 1],
            code: weather.daily.weathercode?.[i + 1] ?? 0,
        }));

        // Rain alerts
        const rainyDays = forecast.filter((d) => d.rain > 0);

        return { currentTemp, currentCode, hourlySlice, hourLabels, forecast, rainyDays };
    }, [weather]);

    // ─── Loading state ──────────────────────────────────────
    if (loading) {
        return (
            <section id="weather" style={{ padding: "80px 24px", textAlign: "center" }}>
                <div
                    style={{
                        width: 28, height: 28, border: "3px solid #dcfce7", borderTopColor: "#22c55e",
                        borderRadius: "50%", animation: "spin-slow 1s linear infinite", margin: "0 auto",
                    }}
                />
                <p style={{ marginTop: 12, fontSize: "0.85rem", color: "#6b8077" }}>Loading weather data...</p>
            </section>
        );
    }

    if (error || !todayData) {
        return (
            <section id="weather" style={{ padding: "80px 24px", textAlign: "center" }}>
                <p style={{ color: "#6b8077" }}>⚠️ {error || "Weather unavailable"}</p>
            </section>
        );
    }

    const { currentTemp, currentCode, hourlySlice, hourLabels, forecast, rainyDays } = todayData;
    const currentWeather = weatherInfo(currentCode);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

    return (
        <section id="weather" style={{ padding: "80px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-fade-in-up">
                <p
                    style={{
                        fontSize: "0.8rem", fontWeight: 700, color: "#22c55e",
                        textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12,
                    }}
                >
                    🌦️ Farm Weather
                </p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, color: "#0f1a14", marginBottom: 8 }}>
                    Weather Intelligence
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#6b8077", maxWidth: 500, margin: "0 auto" }}>
                    Real-time weather data to help you plan farming activities and protect your crops.
                </p>
            </div>

            {/* Current Conditions + Rain Alert */}
            <div
                style={{ display: "grid", gridTemplateColumns: rainyDays.length > 0 ? "2fr 1fr" : "1fr", gap: 16, marginBottom: 24 }}
                className="animate-fade-in-up"
            >
                {/* Current weather card */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #f0fdf4, #ffffff)",
                        border: "1px solid #dcfce7",
                        borderRadius: 20,
                        padding: "32px 28px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ position: "absolute", top: -30, right: -30, fontSize: "8rem", opacity: 0.08, pointerEvents: "none" }}>
                        {currentWeather.icon}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <div
                            style={{
                                width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
                                boxShadow: "0 0 8px rgba(34,197,94,0.4)", animation: "pulse-glow 2s ease-in-out infinite",
                            }}
                        />
                        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6b8077" }}>
                            Live — {locationName}
                        </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                        <div>
                            <div style={{ fontSize: "4rem", fontWeight: 800, color: "#0f1a14", lineHeight: 1 }}>
                                {Math.round(currentTemp)}°
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "#6b8077", marginTop: 4 }}>Celsius</div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{currentWeather.icon}</div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374a3f", marginTop: 6 }}>
                                {currentWeather.label}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#6b8077", marginTop: 2 }}>{formattedDate}</div>
                        </div>
                    </div>
                    {/* Today's high/low */}
                    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                        {[
                            { label: "High", value: `${Math.round(forecast[0]?.high ?? 0)}°C`, color: "#ef4444" },
                            { label: "Low", value: `${Math.round(forecast[0]?.low ?? 0)}°C`, color: "#3b82f6" },
                            { label: "Rain", value: `${forecast[0]?.rain ?? 0} mm`, color: "#0ea5e9" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{ fontSize: "0.68rem", color: "#6b8077", marginBottom: 2 }}>{item.label}</div>
                                <div style={{ fontSize: "1rem", fontWeight: 700, color: item.color }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rain alert card */}
                {rainyDays.length > 0 && (
                    <div
                        style={{
                            background: "linear-gradient(135deg, #eff6ff, #ffffff)",
                            border: "1px solid #bfdbfe",
                            borderRadius: 20,
                            padding: "24px 20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ fontSize: "2rem", marginBottom: 8 }}>🌧️</div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1d4ed8", marginBottom: 4 }}>
                            Rain Alert
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "#6b8077", lineHeight: 1.5, marginBottom: 12 }}>
                            Rain expected on {rainyDays.length} day{rainyDays.length > 1 ? "s" : ""} this week.
                            Plan irrigation and harvesting accordingly.
                        </p>
                        {rainyDays.slice(0, 3).map((d) => (
                            <div
                                key={d.date}
                                style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "6px 10px", borderRadius: 8, background: "rgba(59,130,246,0.06)",
                                    marginBottom: 4, fontSize: "0.75rem",
                                }}
                            >
                                <span style={{ color: "#374a3f", fontWeight: 500 }}>
                                    {new Date(d.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                                </span>
                                <span style={{ fontWeight: 700, color: "#2563eb" }}>{d.rain.toFixed(1)} mm</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 24-hour Temperature Chart */}
            <div
                className="animate-fade-in-up delay-200"
                style={{
                    background: "white",
                    border: "1px solid #e2e8e5",
                    borderRadius: 20,
                    padding: "24px 20px 16px",
                    marginBottom: 24,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a14" }}>📈 24-Hour Temperature</span>
                        <span style={{ fontSize: "0.72rem", color: "#6b8077", marginLeft: 8 }}>Today</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 12, height: 3, borderRadius: 2, background: "#22c55e" }} />
                        <span style={{ fontSize: "0.68rem", color: "#6b8077" }}>Temperature °C</span>
                    </div>
                </div>
                <TempChart hours={hourLabels} temps={hourlySlice} />
            </div>

            {/* 7-Day Forecast */}
            <div className="animate-fade-in-up delay-400">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f1a14" }}>📅 7-Day Forecast</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
                    {forecast.slice(0, 7).map((day, i) => {
                        const dayName = i === 0
                            ? "Today"
                            : new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" });
                        const info = weatherInfo(day.code);
                        const sunriseTime = day.sunrise ? new Date(day.sunrise).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—";
                        const sunsetTime = day.sunset ? new Date(day.sunset).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—";

                        return (
                            <div
                                key={day.date}
                                style={{
                                    background: i === 0 ? "linear-gradient(135deg, #f0fdf4, #ffffff)" : "white",
                                    border: `1px solid ${i === 0 ? "#dcfce7" : "#e2e8e5"}`,
                                    borderRadius: 16,
                                    padding: "20px 16px",
                                    textAlign: "center",
                                    transition: "all 0.3s",
                                    cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,197,94,0.1)";
                                    e.currentTarget.style.borderColor = "#86efac";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.borderColor = i === 0 ? "#dcfce7" : "#e2e8e5";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: i === 0 ? "#16a34a" : "#6b8077", marginBottom: 8 }}>
                                    {dayName}
                                </div>
                                <div style={{ fontSize: "2rem", lineHeight: 1, marginBottom: 6 }}>{info.icon}</div>
                                <div style={{ fontSize: "0.7rem", color: "#6b8077", marginBottom: 10 }}>{info.label}</div>

                                {/* High / Low */}
                                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ef4444" }}>
                                        {Math.round(day.high)}°
                                    </span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#93c5fd" }}>
                                        {Math.round(day.low)}°
                                    </span>
                                </div>

                                {/* Sunrise/Sunset */}
                                <div style={{ fontSize: "0.62rem", color: "#6b8077", lineHeight: 1.6 }}>
                                    🌅 {sunriseTime}
                                    <br />
                                    🌇 {sunsetTime}
                                </div>

                                {/* Rain indicator */}
                                {day.rain > 0 && (
                                    <div
                                        style={{
                                            marginTop: 8,
                                            fontSize: "0.65rem",
                                            fontWeight: 600,
                                            color: "#2563eb",
                                            padding: "3px 8px",
                                            borderRadius: 6,
                                            background: "#eff6ff",
                                        }}
                                    >
                                        💧 {day.rain.toFixed(1)} mm
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
