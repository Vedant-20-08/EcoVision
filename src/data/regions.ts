import type { Region } from "@/types";
import { categoryForAqi } from "./aqiCategories";
import { seededRandom } from "@/lib/utils";

interface RegionSeed {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  baseAqi: number;
}

const REGION_SEEDS: RegionSeed[] = [
  { id: "del", name: "Delhi NCR", state: "Delhi", lat: 28.6139, lng: 77.209, population: 32900000, baseAqi: 261 },
  { id: "guw", name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: 1100000, baseAqi: 118 },
  { id: "mum", name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, population: 20700000, baseAqi: 132 },
  { id: "blr", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: 13600000, baseAqi: 84 },
  { id: "hyd", name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, population: 10500000, baseAqi: 96 },
  { id: "kol", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: 15100000, baseAqi: 172 },
  { id: "chn", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: 11500000, baseAqi: 78 },
  { id: "pun", name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: 7400000, baseAqi: 108 },
  { id: "jai", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: 4000000, baseAqi: 154 },
  { id: "luc", name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: 3800000, baseAqi: 214 },
  { id: "ptn", name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, population: 2500000, baseAqi: 246 },
  { id: "ind", name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, population: 3300000, baseAqi: 92 },
  { id: "ahm", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: 8400000, baseAqi: 141 },
  { id: "chd", name: "Chandigarh", state: "Punjab", lat: 30.7333, lng: 76.7794, population: 1200000, baseAqi: 168 },
  { id: "bho", name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: 2400000, baseAqi: 88 },
  { id: "vns", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: 1800000, baseAqi: 198 },
];

const rand = seededRandom(42);

export const REGIONS: Region[] = REGION_SEEDS.map((seed) => {
  const jitter = (rand() - 0.5) * 14;
  const aqi = Math.max(8, Math.round(seed.baseAqi + jitter));
  const change24h = Math.round((rand() - 0.45) * 22 * 10) / 10;
  return {
    id: seed.id,
    name: seed.name,
    state: seed.state,
    lat: seed.lat,
    lng: seed.lng,
    aqi,
    category: categoryForAqi(aqi),
    population: seed.population,
    trend: change24h > 3 ? "rising" : change24h < -3 ? "falling" : "stable",
    change24h,
  };
});

export function getRegion(id: string): Region {
  return REGIONS.find((r) => r.id === id) ?? REGIONS[0];
}

export const DEFAULT_REGION = REGIONS[0];
