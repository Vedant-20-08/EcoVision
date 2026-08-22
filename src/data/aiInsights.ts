import type { AiRecommendation, HealthGuidance, AiSiteReport, Region, AqiCategory } from "@/types";
import { REGIONS } from "./regions";
import { AQI_CATEGORIES } from "./aqiCategories";

// ---------------------------------------------------------------------------
// Government: AI Recommendation Engine
// ---------------------------------------------------------------------------
const RECOMMENDATION_TEMPLATES: Array<{
  sourceType: AiRecommendation["sourceType"];
  trigger: string;
  action: string;
  detail: string;
}> = [
  {
    sourceType: "farm",
    trigger: "Nearby farm — active fire signature",
    action: "Dispatch field inspection for burning activity",
    detail: "Satellite FRP readings exceed the seasonal threshold within 12km of the reporting station.",
  },
  {
    sourceType: "traffic",
    trigger: "Heavy congestion on primary corridor",
    action: "Divert traffic via secondary arterial routes",
    detail: "Vehicle density and idle-time have driven a sustained NO2 rise over the last 6 hours.",
  },
  {
    sourceType: "construction",
    trigger: "Elevated dust index at active site",
    action: "Order site inspection and dust-suppression compliance check",
    detail: "PM10 readings adjacent to the site are 2.1x the regional baseline.",
  },
  {
    sourceType: "industry",
    trigger: "Industrial zone emission anomaly",
    action: "Schedule emission audit for flagged facility",
    detail: "SO2 concentration pattern matches an unscrubbed stack signature during operating hours.",
  },
];

export function generateRecommendations(regions: Region[] = REGIONS): AiRecommendation[] {
  return regions
    .filter((r) => r.aqi > 90)
    .map((r, i) => {
      const t = RECOMMENDATION_TEMPLATES[i % RECOMMENDATION_TEMPLATES.length];
      const confidence = Math.round(62 + ((r.aqi * 7 + i * 13) % 33));
      const impactScore = Math.round(50 + ((r.aqi * 3 + i * 21) % 45));
      return {
        id: `rec-${r.id}`,
        trigger: t.trigger,
        sourceType: t.sourceType,
        region: r.name,
        action: t.action,
        confidence,
        impactScore,
        detail: t.detail,
      };
    })
    .sort((a, b) => b.impactScore - a.impactScore);
}

export const AI_RECOMMENDATIONS = generateRecommendations();

// ---------------------------------------------------------------------------
// Public: AI Health Guidance
// ---------------------------------------------------------------------------
export function healthGuidanceForCategory(category: AqiCategory): HealthGuidance[] {
  const base = AQI_CATEGORIES[category];
  const guidance: Record<AqiCategory, HealthGuidance[]> = {
    good: [
      { id: "hg-1", icon: "jog", title: "Safe to jog outdoors", detail: "Air quality supports normal outdoor exercise for all groups.", severity: category },
      { id: "hg-2", icon: "clear", title: "Ventilate freely", detail: "Open windows — indoor air exchange is beneficial today.", severity: category },
    ],
    moderate: [
      { id: "hg-3", icon: "jog", title: "Light activity is fine", detail: "Sensitive individuals should pace prolonged outdoor exertion.", severity: category },
      { id: "hg-4", icon: "clear", title: "Ventilation OK in short bursts", detail: "Brief window-opening is safe; avoid peak traffic hours.", severity: category },
    ],
    "unhealthy-sensitive": [
      { id: "hg-5", icon: "caution", title: "Reduce prolonged exertion", detail: "Children, elderly, and asthma patients should shorten outdoor time.", severity: category },
      { id: "hg-6", icon: "mask", title: "Consider a mask outdoors", detail: "An N95 mask reduces exposure during commutes.", severity: category },
    ],
    unhealthy: [
      { id: "hg-7", icon: "mask", title: "Wear a mask outdoors", detail: "N95/N99 masks are recommended for any outdoor exposure today.", severity: category },
      { id: "hg-8", icon: "windows", title: "Close windows", detail: "Keep indoor spaces sealed; use an air purifier if available.", severity: category },
    ],
    "very-unhealthy": [
      { id: "hg-9", icon: "windows", title: "Stay indoors", detail: "Avoid all non-essential outdoor activity until conditions improve.", severity: category },
      { id: "hg-10", icon: "mask", title: "Mask mandatory outdoors", detail: "N95/N99 required for essential travel; limit duration.", severity: category },
    ],
    hazardous: [
      { id: "hg-11", icon: "windows", title: "Remain indoors — seal openings", detail: "This is an emergency-level reading. Avoid outdoor exposure entirely.", severity: category },
      { id: "hg-12", icon: "caution", title: "Monitor vulnerable household members", detail: "Watch for respiratory distress; seek medical help if symptoms appear.", severity: category },
    ],
  };
  void base;
  return guidance[category];
}

// ---------------------------------------------------------------------------
// Analyst: AI Site Advisor
// ---------------------------------------------------------------------------
export function generateSiteReports(regions: Region[] = REGIONS): AiSiteReport[] {
  return regions.slice(0, 6).map((r, i) => {
    const recs: string[] = [];
    if (r.aqi > 150) {
      recs.push(`Consider an alternate site ~2km ${["north", "east", "south-west"][i % 3]} with 30-40% lower ambient AQI.`);
      recs.push("Delay ground-breaking until the seasonal inversion window passes.");
    }
    if (r.aqi > 100) recs.push("Install a vegetation buffer (min. 15m) along the prevailing wind edge.");
    recs.push("Schedule dust-generating phases outside early-morning inversion hours.");
    return {
      id: `site-${r.id}`,
      region: r.name,
      headline:
        r.aqi > 150
          ? `${r.name} shows elevated risk for sustained outdoor construction phases.`
          : `${r.name} is broadly favorable, with seasonal caveats.`,
      recommendations: recs,
      confidence: Math.round(68 + (i * 11) % 27),
    };
  });
}

export const AI_SITE_REPORTS = generateSiteReports();

// ---------------------------------------------------------------------------
// AI Incident Summary
// ---------------------------------------------------------------------------
export function generateIncidentSummary(region: Region): string {
  const direction = region.change24h >= 0 ? "increase" : "decrease";
  const driver =
    region.aqi > 200 ? "crop-residue burning and low overnight wind speed" : region.aqi > 120 ? "traffic congestion and nearby construction dust" : "typical diurnal traffic patterns";
  return `${region.name} experienced a ${Math.abs(region.change24h)}% AQI ${direction} in the last 24 hours, likely driven by ${driver}. Current reading of ${region.aqi} places the region in the "${AQI_CATEGORIES[region.category].label}" band.`;
}
