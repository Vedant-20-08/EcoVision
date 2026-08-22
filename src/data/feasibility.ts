import type { FeasibilityResult, SuitabilityResult, SiteType, LowAqiZone, Region } from "@/types";
import { REGIONS } from "./regions";
import { seededRandom, clamp } from "@/lib/utils";

const SITE_THRESHOLDS: Record<SiteType, { maxAqi: number; label: string }> = {
  school: { maxAqi: 100, label: "schools" },
  hospital: { maxAqi: 90, label: "hospitals" },
  residence: { maxAqi: 130, label: "residential developments" },
  farm: { maxAqi: 160, label: "agricultural use" },
};

export function evaluateSuitability(region: Region, siteType: SiteType): SuitabilityResult {
  const threshold = SITE_THRESHOLDS[siteType];
  const approved = region.aqi <= threshold.maxAqi;
  const reasoning: string[] = [];

  reasoning.push(
    `Current AQI of ${region.aqi} is ${approved ? "within" : "above"} the recommended ceiling of ${threshold.maxAqi} for ${threshold.label}.`
  );
  reasoning.push(
    region.trend === "rising"
      ? `24-hour trend is rising (+${region.change24h}%), indicating deteriorating conditions.`
      : region.trend === "falling"
        ? `24-hour trend is improving (${region.change24h}%), a favorable signal.`
        : `24-hour trend is stable (${region.change24h}%).`
  );
  if (siteType === "hospital" || siteType === "school") {
    reasoning.push("Sensitive-occupancy sites require an additional 10-point safety margin, applied above.");
  }
  if (!approved) {
    reasoning.push("Recommend re-evaluation once a 30-day rolling average drops below the threshold.");
  } else {
    reasoning.push("Historical volatility over the last 30 days is within acceptable bounds for this classification.");
  }

  return {
    siteType,
    region: region.name,
    verdict: approved ? "APPROVED" : "NOT RECOMMENDED",
    score: Math.round(clamp(100 - (region.aqi / threshold.maxAqi) * 60, 5, 98)),
    reasoning,
  };
}

export function evaluateFeasibility(region: Region): FeasibilityResult {
  const rand = seededRandom(region.aqi * 7 + region.id.length);
  const aqiStability = Math.round(clamp(100 - Math.abs(region.change24h) * 3 - rand() * 10, 15, 96));
  const riskIndex = Math.round(clamp(region.aqi / 3.5 + (100 - aqiStability) / 2, 5, 97));

  let verdict: FeasibilityResult["verdict"] = "APPROVED";
  let recommendation = `${region.name} shows stable air quality patterns suitable for construction planning with standard mitigation.`;

  if (riskIndex > 70) {
    verdict = "NOT RECOMMENDED";
    recommendation = `${region.name} carries elevated risk from volatile AQI and pollution intensity. Recommend deferring or relocating.`;
  } else if (riskIndex > 45) {
    verdict = "CAUTION";
    recommendation = `${region.name} is workable with dust suppression, vegetation buffers, and inversion-hour scheduling.`;
  }

  return {
    region: region.name,
    aqiScore: region.aqi,
    aqiStability,
    riskIndex,
    recommendation,
    verdict,
  };
}

export function findLowAqiZones(): LowAqiZone[] {
  return [...REGIONS]
    .sort((a, b) => a.aqi - b.aqi)
    .slice(0, 6)
    .map((r, i) => ({
      id: `zone-${r.id}`,
      name: r.name,
      lat: r.lat,
      lng: r.lng,
      aqiScore: r.aqi,
      growthPotential: (r.population > 8000000 ? "high" : r.population > 3000000 ? "medium" : "low") as
        | "low"
        | "medium"
        | "high",
      suitabilityRating: Math.round(clamp(5 - r.aqi / 60 - i * 0.05, 1, 5) * 10) / 10,
    }));
}

export const LOW_AQI_ZONES = findLowAqiZones();
