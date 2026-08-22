import type { AlertItem, EmailAlertRecord } from "@/types";
import { REGIONS } from "./regions";

function severityFromChange(change: number): AlertItem["severity"] {
  const c = Math.abs(change);
  if (c > 18) return "critical";
  if (c > 12) return "high";
  if (c > 6) return "medium";
  return "low";
}

const SOURCE_CYCLE: AlertItem["source"][] = ["traffic", "farm", "industry", "construction", "weather"];

export const ALERTS: AlertItem[] = REGIONS.filter((r) => Math.abs(r.change24h) > 5)
  .map((r, i) => {
    const source = SOURCE_CYCLE[i % SOURCE_CYCLE.length];
    const rising = r.change24h > 0;
    return {
      id: `alert-${r.id}`,
      title: `${rising ? "AQI spike" : "AQI improvement"} detected in ${r.name}`,
      description: `${r.name} recorded a ${Math.abs(r.change24h)}% ${rising ? "increase" : "decrease"} in the last 24 hours, correlated with ${source} activity.`,
      region: r.name,
      severity: severityFromChange(r.change24h),
      source,
      timestamp: new Date(Date.now() - i * 47 * 60 * 1000).toISOString(),
      acknowledged: i % 3 === 0,
      aqiChange: r.change24h,
    };
  })
  .sort((a, b) => Math.abs(b.aqiChange) - Math.abs(a.aqiChange));

export const EMAIL_HISTORY: EmailAlertRecord[] = [
  {
    id: "em-1",
    subject: "URGENT: Hazardous AQI Threshold Breached — Delhi NCR",
    recipients: ["ncr-control-room@cpcb.gov.in", "district-magistrate.delhi@gov.in"],
    body: "AQI in Delhi NCR has crossed 260 (Very Unhealthy). GRAP Stage III protocols recommended. Construction and demolition activity should be paused in flagged zones pending review.",
    sentAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    status: "sent",
    region: "Delhi NCR",
  },
  {
    id: "em-2",
    subject: "Advisory: Rising Farm Burning Signatures — Punjab Border Belt",
    recipients: ["agri-dept-punjab@gov.in", "pollution-control-board@gov.in"],
    body: "Satellite fire radiative power readings indicate a 34% week-over-week increase in stubble burning detections. Field inspection teams recommended for high-density clusters.",
    sentAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    status: "sent",
    region: "Chandigarh",
  },
  {
    id: "em-3",
    subject: "Weekly Regional Air Quality Digest — Lucknow",
    recipients: ["uppcb-regional@gov.in"],
    body: "Weekly summary attached. AQI averaged 214 across the reporting window, with traffic congestion as the dominant contributor at 41%.",
    sentAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    status: "sent",
    region: "Lucknow",
  },
];
