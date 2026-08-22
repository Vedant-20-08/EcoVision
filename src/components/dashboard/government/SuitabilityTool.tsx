import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { School, Hospital, Home, Wheat, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { cn } from "@/lib/utils";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import { evaluateSuitability } from "@/data/feasibility";
import type { SiteType } from "@/types";

const SITE_TYPES: Array<{ value: SiteType; label: string; icon: React.ElementType }> = [
  { value: "school", label: "School", icon: School },
  { value: "hospital", label: "Hospital", icon: Hospital },
  { value: "residence", label: "Residence", icon: Home },
  { value: "farm", label: "Farm", icon: Wheat },
];

export function SuitabilityTool() {
  const [siteType, setSiteType] = React.useState<SiteType>("school");
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const region = getRegion(regionId);
  const result = evaluateSuitability(region, siteType);
  const approved = result.verdict === "APPROVED";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Construction Suitability Analysis</CardTitle>
        <CardDescription>Evaluate historical AQI against site-type safety thresholds.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid grid-cols-4 gap-2">
            {SITE_TYPES.map((s) => {
              const active = siteType === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setSiteType(s.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-xs font-medium transition-all",
                    active ? "border-aurora/40 bg-aurora/[0.08] text-white shadow-glow" : "border-white/10 bg-white/[0.02] text-ink-400 hover:border-white/20"
                  )}
                >
                  <s.icon className={cn("h-4.5 w-4.5", active && "text-aurora")} />
                  {s.label}
                </button>
              );
            })}
          </div>
          <RegionSelector value={regionId} onChange={setRegionId} className="w-full sm:w-56" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${siteType}-${regionId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "mt-6 rounded-xl border p-5",
              approved ? "border-aqi-good/30 bg-aqi-good/[0.05]" : "border-aqi-hazardous/30 bg-aqi-hazardous/[0.05]"
            )}
          >
            <div className="flex items-center gap-3">
              {approved ? <CheckCircle2 className="h-6 w-6 text-aqiText-good" /> : <XCircle className="h-6 w-6 text-aqiText-hazardous" />}
              <div>
                <p className={cn("font-display text-lg font-bold", approved ? "text-aqiText-good" : "text-aqiText-hazardous")}>
                  {result.verdict}
                </p>
                <p className="text-xs text-ink-500">
                  {region.name} · Suitability score {result.score}/100
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {result.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
