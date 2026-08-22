import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LowAqiZone } from "@/types";
import { aqiTextColor } from "@/data/aqiCategories";
import { cn } from "@/lib/utils";

const GROWTH_VARIANT: Record<LowAqiZone["growthPotential"], "success" | "warning" | "outline"> = {
  high: "success",
  medium: "warning",
  low: "outline",
};

export function ZoneFinderList({ zones }: { zones: LowAqiZone[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Zones</CardTitle>
        <CardDescription>Ranked by lowest ambient AQI and development suitability.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {zones.map((z, i) => (
          <div key={z.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-xs font-semibold text-ink-400">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{z.name}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={cn("h-3 w-3", s < Math.round(z.suitabilityRating) ? "fill-aurora text-aurora" : "text-ink-600")}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={GROWTH_VARIANT[z.growthPotential]}>{z.growthPotential} growth</Badge>
              <span className="font-display text-sm font-semibold tabular-nums" style={{ color: aqiTextColor(z.aqiScore) }}>
                {z.aqiScore}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
