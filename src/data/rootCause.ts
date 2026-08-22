import type { RootCauseContribution } from "@/types";
import { trafficFor, farmActivityFor, industrialSitesFor, constructionSitesFor } from "./environmentalDatasets";

const SOURCE_COLORS: Record<RootCauseContribution["source"], string> = {
  traffic: "#6E7CFF",
  farm: "#F5C84C",
  industry: "#F0615F",
  construction: "#34D8A3",
};

export function rootCauseForRegion(regionId: string): RootCauseContribution[] {
  const traffic = trafficFor(regionId)?.congestionIndex ?? 40;
  const farm = farmActivityFor(regionId);
  const farmWeight = farm?.burningDetected ? 55 + (farm.fireRadiativePower % 20) : 8;
  const industry = industrialSitesFor(regionId).reduce((s, f) => s + f.emissionLoad, 0);
  const construction = constructionSitesFor(regionId)
    .filter((s) => s.active)
    .reduce((s, c) => s + c.dustIndex, 0);

  const raw = [
    { source: "traffic" as const, weight: traffic },
    { source: "farm" as const, weight: farmWeight },
    { source: "industry" as const, weight: industry },
    { source: "construction" as const, weight: construction },
  ];
  const total = raw.reduce((s, r) => s + r.weight, 0) || 1;

  const labels: Record<RootCauseContribution["source"], string> = {
    traffic: "Vehicular Traffic",
    farm: "Agricultural Burning",
    industry: "Industrial Emissions",
    construction: "Construction Dust",
  };

  return raw
    .map((r) => ({
      source: r.source,
      label: labels[r.source],
      percentage: Math.round((r.weight / total) * 100),
      color: SOURCE_COLORS[r.source],
    }))
    .sort((a, b) => b.percentage - a.percentage);
}
