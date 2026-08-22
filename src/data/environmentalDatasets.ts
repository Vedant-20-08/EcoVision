import type {
  TrafficDataPoint,
  FarmActivityPoint,
  WeatherDataPoint,
  ConstructionActivityPoint,
  IndustrialActivityPoint,
} from "@/types";
import { REGIONS } from "./regions";
import { seededRandom, clamp } from "@/lib/utils";

const rand = seededRandom(101);

// ---------------------------------------------------------------------------
// Traffic Data — congestion & vehicle emission telemetry per region
// ---------------------------------------------------------------------------
export const TRAFFIC_DATA: TrafficDataPoint[] = REGIONS.map((r) => ({
  regionId: r.id,
  timestamp: new Date().toISOString(),
  congestionIndex: Math.round(clamp(40 + (r.aqi / 5) + (rand() - 0.5) * 20, 10, 98)),
  vehicleCount: Math.round(r.population * 0.00021 * (0.7 + rand() * 0.6)),
  emissionFactor: Math.round((1.2 + rand() * 2.4) * 10) / 10,
}));

// ---------------------------------------------------------------------------
// Farm Activity — stubble/crop burning detections (satellite fire hotspots)
// ---------------------------------------------------------------------------
export const FARM_ACTIVITY_DATA: FarmActivityPoint[] = REGIONS.map((r) => {
  const burning = rand() > 0.55 && ["del", "luc", "chd", "ptn", "jai"].includes(r.id);
  return {
    regionId: r.id,
    timestamp: new Date().toISOString(),
    burningDetected: burning,
    fireRadiativePower: burning ? Math.round(80 + rand() * 260) : Math.round(rand() * 15),
    hectaresAffected: burning ? Math.round(120 + rand() * 900) : Math.round(rand() * 20),
  };
});

// ---------------------------------------------------------------------------
// Weather Data — meteorological context that modulates dispersion
// ---------------------------------------------------------------------------
export const WEATHER_DATA: WeatherDataPoint[] = REGIONS.map((r) => {
  const windSpeedKmh = Math.round(clamp(4 + rand() * 22, 2, 35));
  const inversionRisk = windSpeedKmh < 8 ? "high" : windSpeedKmh < 16 ? "medium" : "low";
  return {
    regionId: r.id,
    timestamp: new Date().toISOString(),
    windSpeedKmh,
    windDirectionDeg: Math.round(rand() * 360),
    humidityPct: Math.round(clamp(35 + rand() * 50, 20, 95)),
    temperatureC: Math.round(clamp(18 + rand() * 20, 8, 42)),
    inversionRisk,
  };
});

// ---------------------------------------------------------------------------
// Construction Activity — active dust-generating sites near each region
// ---------------------------------------------------------------------------
const SITE_NAMES = [
  "Metro Corridor Extension",
  "Riverside Housing Phase II",
  "IT Park Expansion",
  "Elevated Flyover Works",
  "Township Development Block C",
  "Industrial Access Road",
];

export const CONSTRUCTION_ACTIVITY_DATA: ConstructionActivityPoint[] = REGIONS.flatMap((r, idx) =>
  Array.from({ length: 2 }).map((_, i) => ({
    regionId: r.id,
    siteId: `${r.id}-site-${i + 1}`,
    siteName: SITE_NAMES[(idx + i) % SITE_NAMES.length],
    lat: r.lat + (rand() - 0.5) * 0.18,
    lng: r.lng + (rand() - 0.5) * 0.18,
    dustIndex: Math.round(30 + rand() * 65),
    active: rand() > 0.25,
  }))
);

// ---------------------------------------------------------------------------
// Industrial Activity — emission-load facilities and compliance status
// ---------------------------------------------------------------------------
const FACILITY_NAMES = [
  "Northside Thermal Plant",
  "Riverbank Chemical Works",
  "Precision Steel Foundry",
  "Delta Textile Processing",
  "Coastal Refinery Unit 4",
];
const SECTORS = ["Power", "Chemicals", "Metals", "Textiles", "Petrochemicals"];

export const INDUSTRIAL_ACTIVITY_DATA: IndustrialActivityPoint[] = REGIONS.flatMap((r, idx) =>
  Array.from({ length: 2 }).map((_, i) => {
    const roll = rand();
    return {
      regionId: r.id,
      facilityId: `${r.id}-fac-${i + 1}`,
      facilityName: FACILITY_NAMES[(idx + i) % FACILITY_NAMES.length],
      lat: r.lat + (rand() - 0.5) * 0.22,
      lng: r.lng + (rand() - 0.5) * 0.22,
      emissionLoad: Math.round(20 + rand() * 80),
      sector: SECTORS[(idx + i) % SECTORS.length],
      complianceStatus: (roll > 0.7 ? "flagged" : roll > 0.4 ? "under-review" : "compliant") as
        | "compliant"
        | "flagged"
        | "under-review",
    };
  })
);

export function trafficFor(regionId: string) {
  return TRAFFIC_DATA.find((d) => d.regionId === regionId);
}
export function farmActivityFor(regionId: string) {
  return FARM_ACTIVITY_DATA.find((d) => d.regionId === regionId);
}
export function weatherFor(regionId: string) {
  return WEATHER_DATA.find((d) => d.regionId === regionId);
}
export function constructionSitesFor(regionId: string) {
  return CONSTRUCTION_ACTIVITY_DATA.filter((d) => d.regionId === regionId);
}
export function industrialSitesFor(regionId: string) {
  return INDUSTRIAL_ACTIVITY_DATA.filter((d) => d.regionId === regionId);
}
