import type { AqiReading, TimeRange } from "@/types";
import { categoryForAqi } from "./aqiCategories";
import { seededRandom, clamp } from "@/lib/utils";

export const RANGE_CONFIG: Record<TimeRange, { points: number; stepMs: number; label: string }> = {
  "24h": { points: 24, stepMs: 60 * 60 * 1000, label: "Last 24 Hours" },
  "7d": { points: 28, stepMs: 6 * 60 * 60 * 1000, label: "Last 7 Days" },
  "30d": { points: 30, stepMs: 24 * 60 * 60 * 1000, label: "Last 30 Days" },
  "90d": { points: 30, stepMs: 3 * 24 * 60 * 60 * 1000, label: "Last Quarter" },
  "1y": { points: 24, stepMs: 15 * 24 * 60 * 60 * 1000, label: "Last Year" },
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) || 1;
}

/** Generates a deterministic, believable AQI + pollutant time series for a region. */
export function generateAqiSeries(regionId: string, baseAqi: number, range: TimeRange): AqiReading[] {
  const { points, stepMs } = RANGE_CONFIG[range];
  const rand = seededRandom(hashString(regionId) + range.length * 7);
  const now = Date.now();
  const readings: AqiReading[] = [];

  // Diurnal-ish wave + slow drift + noise, clamped to plausible bounds
  for (let i = points - 1; i >= 0; i--) {
    const t = now - i * stepMs;
    const phase = (i / points) * Math.PI * 2;
    const diurnal = range === "24h" ? Math.sin(phase * 3) * 18 : Math.sin(phase * 2) * 24;
    const drift = Math.sin((i / points) * Math.PI) * 12;
    const noise = (rand() - 0.5) * 20;
    const aqi = Math.round(clamp(baseAqi + diurnal + drift + noise, 8, 480));

    readings.push({
      timestamp: new Date(t).toISOString(),
      aqi,
      pm25: Math.round(clamp(aqi * 0.62 + (rand() - 0.5) * 8, 3, 400)),
      pm10: Math.round(clamp(aqi * 0.9 + (rand() - 0.5) * 14, 5, 500)),
      no2: Math.round(clamp(aqi * 0.28 + (rand() - 0.5) * 6, 2, 180)),
      so2: Math.round(clamp(aqi * 0.14 + (rand() - 0.5) * 4, 1, 90)),
      co: Math.round(clamp(aqi * 0.03 + (rand() - 0.5) * 0.6, 0.2, 12) * 10) / 10,
      o3: Math.round(clamp(60 + (rand() - 0.5) * 40, 5, 160)),
      hcho: Math.round(clamp(aqi * 0.05 + (rand() - 0.5) * 2, 0.5, 40) * 10) / 10,
      category: categoryForAqi(aqi),
    });
  }

  return readings;
}

export function currentAqiFromSeries(series: AqiReading[]): AqiReading {
  return series[series.length - 1];
}
