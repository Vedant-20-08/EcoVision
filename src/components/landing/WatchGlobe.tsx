import { motion } from "framer-motion";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";

// Approximate normalized (x%, y%) positions within the globe circle for a
// handful of major monitored cities, arranged to suggest the subcontinent.
const HOTSPOTS: Array<{ id: string; x: number; y: number }> = [
  { id: "del", x: 46, y: 30 },
  { id: "jai", x: 38, y: 34 },
  { id: "luc", x: 52, y: 34 },
  { id: "mum", x: 33, y: 54 },
  { id: "kol", x: 63, y: 46 },
  { id: "hyd", x: 46, y: 58 },
  { id: "chn", x: 48, y: 72 },
  { id: "blr", x: 41, y: 68 },
];

export function WatchGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Ambient glow behind everything */}
      <div className="absolute inset-[-15%] rounded-full bg-aurora/10 blur-3xl" />
      <div className="absolute inset-[-8%] rounded-full bg-signal/10 blur-2xl" />

      {/* Outer dashed orbit ring */}
      <motion.div
        className="absolute inset-[-6%] rounded-full border border-dashed border-white/[0.08]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[2%] rounded-full border border-white/[0.06]"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* The sphere */}
      <div
        className="absolute inset-[8%] rounded-full border border-aurora/20 shadow-glow overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #223252 0%, #141c30 42%, #0a0e18 78%)",
        }}
      >
        {/* Latitude grid, slowly rotating to imply spin */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[30, 55, 80, 105, 130, 155].map((cy) => (
            <ellipse key={cy} cx="100" cy={cy} rx="92" ry="14" fill="none" stroke="rgba(127,239,221,0.12)" strokeWidth="0.6" />
          ))}
          {[20, 60, 100, 140, 180].map((cx) => (
            <ellipse
              key={cx}
              cx="100"
              cy="100"
              rx="20"
              ry="95"
              fill="none"
              stroke="rgba(127,239,221,0.08)"
              strokeWidth="0.6"
              transform={`rotate(${(cx / 200) * 180} 100 100)`}
            />
          ))}
        </motion.svg>

        {/* Sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

        {/* AQI hotspot pulses */}
        {HOTSPOTS.map((h, i) => {
          const region = REGIONS.find((r) => r.id === h.id);
          if (!region) return null;
          const color = AQI_CATEGORIES[categoryForAqi(region.aqi)].color;
          return (
            <div
              key={h.id}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{ backgroundColor: color, boxShadow: `0 0 10px 2px ${color}` }}
              />
              <motion.span
                className="absolute -inset-2 rounded-full"
                style={{ border: `1px solid ${color}` }}
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
              />
            </div>
          );
        })}

        {/* Radar sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, rgba(45,217,192,0.28), transparent 28%)",
          }}
        />
      </div>

      {/* Crosshair core */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora shadow-[0_0_16px_4px_rgba(45,217,192,0.6)]" />
    </div>
  );
}
