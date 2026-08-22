import type { AqiCategory, AqiCategoryMeta } from "@/types";

export const AQI_CATEGORIES: Record<AqiCategory, AqiCategoryMeta> = {
  good: {
    category: "good",
    label: "Good",
    range: [0, 50],
    color: "#34D8A3",
    textColor: "#067647",
    glow: "rgba(52,216,163,0.35)",
    description: "Air quality is satisfactory with minimal risk.",
    advisory: "Safe for all outdoor activity, including exercise.",
  },
  moderate: {
    category: "moderate",
    label: "Moderate",
    range: [51, 100],
    color: "#F5C84C",
    textColor: "#8A6200",
    glow: "rgba(245,200,76,0.35)",
    description: "Acceptable, though some pollutants pose a moderate concern.",
    advisory: "Unusually sensitive people should consider limiting prolonged exertion.",
  },
  "unhealthy-sensitive": {
    category: "unhealthy-sensitive",
    label: "Unhealthy for Sensitive Groups",
    range: [101, 150],
    color: "#F5924C",
    textColor: "#C2540D",
    glow: "rgba(245,146,76,0.35)",
    description: "Sensitive groups may experience health effects.",
    advisory: "Children, elderly, and those with respiratory conditions should reduce outdoor exertion.",
  },
  unhealthy: {
    category: "unhealthy",
    label: "Unhealthy",
    range: [151, 200],
    color: "#F0615F",
    textColor: "#C81E1E",
    glow: "rgba(240,97,95,0.4)",
    description: "Everyone may begin to experience health effects.",
    advisory: "Limit outdoor exertion. Sensitive groups should avoid it entirely.",
  },
  "very-unhealthy": {
    category: "very-unhealthy",
    label: "Very Unhealthy",
    range: [201, 300],
    color: "#C084FC",
    textColor: "#7C3AED",
    glow: "rgba(192,132,252,0.4)",
    description: "Health alert — the risk of effects is significantly increased.",
    advisory: "Avoid outdoor activity. Wear an N95 mask if you must go outside.",
  },
  hazardous: {
    category: "hazardous",
    label: "Hazardous",
    range: [301, 500],
    color: "#EF476F",
    textColor: "#B91C3D",
    glow: "rgba(239,71,111,0.45)",
    description: "Emergency conditions — the entire population is at risk.",
    advisory: "Remain indoors with air purification. Seal windows and doors.",
  },
};

export function categoryForAqi(aqi: number): AqiCategory {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthy-sensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very-unhealthy";
  return "hazardous";
}

/** Vivid fill color — for markers, chart lines, and low-alpha tint backgrounds. */
export function aqiColor(aqi: number): string {
  return AQI_CATEGORIES[categoryForAqi(aqi)].color;
}

/** AA-contrast-safe color for rendering AQI severity as literal text/icon foreground. */
export function aqiTextColor(aqi: number): string {
  return AQI_CATEGORIES[categoryForAqi(aqi)].textColor;
}
