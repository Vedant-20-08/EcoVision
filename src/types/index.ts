// ============================================================================
// THE NIGHT'S WATCH — Core Type Definitions
// ============================================================================

export type UserRole = "public" | "government" | "analyst";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  avatarInitials: string;
}

export type AqiCategory =
  | "good"
  | "moderate"
  | "unhealthy-sensitive"
  | "unhealthy"
  | "very-unhealthy"
  | "hazardous";

export interface AqiCategoryMeta {
  category: AqiCategory;
  label: string;
  range: [number, number];
  /** Vivid color for fills, markers, chart lines, and low-alpha tint backgrounds. */
  color: string;
  /** AA-contrast-safe color for rendering this severity as literal text/icon foreground. */
  textColor: string;
  glow: string;
  description: string;
  advisory: string;
}

export type TimeRange = "24h" | "7d" | "30d" | "90d" | "1y";

export interface AqiReading {
  timestamp: string; // ISO
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  hcho: number; // formaldehyde — satellite-derived
  category: AqiCategory;
}

export interface AqiTimelineRecord {
  id: string;
  timestamp: string;
  aqi: number;
  status: AqiCategory;
  region: string;
  notes: string;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  aqi: number;
  category: AqiCategory;
  population: number;
  trend: "rising" | "falling" | "stable";
  change24h: number; // percent
}

export type SourceType = "traffic" | "farm" | "industry" | "construction";

export interface TrafficDataPoint {
  regionId: string;
  timestamp: string;
  congestionIndex: number; // 0-100
  vehicleCount: number;
  emissionFactor: number;
}

export interface FarmActivityPoint {
  regionId: string;
  timestamp: string;
  burningDetected: boolean;
  fireRadiativePower: number;
  hectaresAffected: number;
}

export interface WeatherDataPoint {
  regionId: string;
  timestamp: string;
  windSpeedKmh: number;
  windDirectionDeg: number;
  humidityPct: number;
  temperatureC: number;
  inversionRisk: "low" | "medium" | "high";
}

export interface ConstructionActivityPoint {
  regionId: string;
  siteId: string;
  siteName: string;
  lat: number;
  lng: number;
  dustIndex: number;
  active: boolean;
}

export interface IndustrialActivityPoint {
  regionId: string;
  facilityId: string;
  facilityName: string;
  lat: number;
  lng: number;
  emissionLoad: number;
  sector: string;
  complianceStatus: "compliant" | "flagged" | "under-review";
}

export interface RootCauseContribution {
  source: SourceType;
  label: string;
  percentage: number;
  color: string;
}

export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type AlertSourceIcon = "traffic" | "farm" | "industry" | "construction" | "weather" | "system";

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  region: string;
  severity: AlertSeverity;
  source: AlertSourceIcon;
  timestamp: string;
  acknowledged: boolean;
  aqiChange: number;
}

export interface EmailAlertRecord {
  id: string;
  subject: string;
  recipients: string[];
  body: string;
  sentAt: string;
  status: "sent" | "draft" | "scheduled";
  region: string;
}

export interface AiRecommendation {
  id: string;
  trigger: string;
  sourceType: SourceType;
  region: string;
  action: string;
  confidence: number; // 0-100
  impactScore: number; // 0-100
  detail: string;
}

export type SiteType = "school" | "hospital" | "residence" | "farm";

export interface SuitabilityResult {
  siteType: SiteType;
  region: string;
  verdict: "APPROVED" | "NOT RECOMMENDED";
  score: number;
  reasoning: string[];
}

export interface FeasibilityResult {
  region: string;
  aqiScore: number;
  aqiStability: number; // 0-100, higher = more stable
  riskIndex: number; // 0-100, higher = riskier
  recommendation: string;
  verdict: "APPROVED" | "CAUTION" | "NOT RECOMMENDED";
}

export interface LowAqiZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  aqiScore: number;
  growthPotential: "low" | "medium" | "high";
  suitabilityRating: number; // 0-5
}

export interface AiSiteReport {
  id: string;
  region: string;
  headline: string;
  recommendations: string[];
  confidence: number;
}

export interface HealthGuidance {
  id: string;
  icon: "jog" | "mask" | "windows" | "caution" | "clear";
  title: string;
  detail: string;
  severity: AqiCategory;
}

export interface KpiTrend {
  label: string;
  value: number;
  unit?: string;
  delta: number; // percent change
  direction: "up" | "down" | "flat";
}

export interface WhatIfScenario {
  id: string;
  label: string;
  description: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderUnit: string;
  computeImprovement: (value: number, baseAqi: number) => number;
}
