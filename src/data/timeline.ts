import type { AqiTimelineRecord } from "@/types";
import { REGIONS } from "./regions";
import { generateAqiSeries } from "./generators";

const NOTE_BANK: Record<string, string[]> = {
  good: ["No significant anomalies.", "Clear skies, favorable dispersion.", "Baseline conditions."],
  moderate: ["Slight uptick from traffic hours.", "Within seasonal norms.", "Minor dust contribution noted."],
  "unhealthy-sensitive": ["Sensitive-group advisory issued.", "Localized construction dust detected."],
  unhealthy: ["Traffic congestion correlated spike.", "Low wind speed limiting dispersion."],
  "very-unhealthy": ["Crop residue burning detected nearby.", "Temperature inversion overnight."],
  hazardous: ["Multi-source compounding event.", "Emergency advisory triggered."],
};

function noteFor(status: string, seed: number): string {
  const bank = NOTE_BANK[status] ?? NOTE_BANK.moderate;
  return bank[seed % bank.length];
}

export function generateTimelineRecords(): AqiTimelineRecord[] {
  const records: AqiTimelineRecord[] = [];
  REGIONS.forEach((region, rIdx) => {
    const series = generateAqiSeries(region.id, region.aqi, "30d");
    series.forEach((reading, i) => {
      records.push({
        id: `${region.id}-${i}`,
        timestamp: reading.timestamp,
        aqi: reading.aqi,
        status: reading.category,
        region: region.name,
        notes: noteFor(reading.category, rIdx + i),
      });
    });
  });
  return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const TIMELINE_RECORDS = generateTimelineRecords();
