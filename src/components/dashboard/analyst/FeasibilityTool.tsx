import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { KpiCard } from "@/components/dashboard/shared/KpiCard";
import { cn } from "@/lib/utils";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import { evaluateFeasibility } from "@/data/feasibility";
import { aqiTextColor } from "@/data/aqiCategories";

const VERDICT_STYLES: Record<string, { text: string; bg: string; border: string }> = {
  APPROVED: { text: "text-aqiText-good", bg: "bg-aqi-good/[0.06]", border: "border-aqi-good/30" },
  CAUTION: { text: "text-aqiText-moderate", bg: "bg-aqi-moderate/[0.06]", border: "border-aqi-moderate/30" },
  "NOT RECOMMENDED": { text: "text-aqiText-hazardous", bg: "bg-aqi-hazardous/[0.06]", border: "border-aqi-hazardous/30" },
};

export function FeasibilityTool() {
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const region = getRegion(regionId);
  const result = evaluateFeasibility(region);
  const style = VERDICT_STYLES[result.verdict];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Construction Feasibility Tool</CardTitle>
          <CardDescription>Select a location to evaluate development feasibility.</CardDescription>
        </div>
        <RegionSelector value={regionId} onChange={setRegionId} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <KpiCard label="AQI Score" value={result.aqiScore} accent={aqiTextColor(result.aqiScore)} icon={Compass} delayIndex={0} />
          <KpiCard label="AQI Stability" value={result.aqiStability} suffix="/100" accent="#4F46E5" delayIndex={1} />
          <KpiCard label="Risk Index" value={result.riskIndex} suffix="/100" accent="#F0615F" delayIndex={2} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={regionId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn("mt-5 rounded-xl border p-5", style.bg, style.border)}
          >
            <p className={cn("font-display text-lg font-bold", style.text)}>{result.verdict}</p>
            <p className="mt-2 text-sm text-ink-300">{result.recommendation}</p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
