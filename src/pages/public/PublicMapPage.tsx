import * as React from "react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AqiZoneMap } from "@/components/maps/AqiZoneMap";
import { AqiHeatmapTimeline } from "@/components/dashboard/public/AqiHeatmapTimeline";
import { AqiBadge } from "@/components/dashboard/shared/AqiBadge";
import { REGIONS } from "@/data/regions";
import type { Region } from "@/types";
import { cn } from "@/lib/utils";

export default function PublicMapPage() {
  const [selected, setSelected] = React.useState<Region | null>(null);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Maps"
        title="Interactive AQI Map"
        description="Color-coded safe, moderate, and dangerous zones across the monitoring network."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>National Zone Map</CardTitle>
            <CardDescription>Click a marker to inspect a city.</CardDescription>
          </CardHeader>
          <CardContent>
            <AqiZoneMap height={480} onSelect={setSelected} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selected ? selected.name : "All Regions"}</CardTitle>
            <CardDescription>{selected ? `${selected.state} · AQI ${selected.aqi}` : "Select a city on the map"}</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[420px] space-y-1.5 overflow-y-auto no-scrollbar">
            {REGIONS.slice()
              .sort((a, b) => b.aqi - a.aqi)
              .map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    selected?.id === r.id ? "bg-aurora/10 border border-aurora/30" : "hover:bg-white/[0.04] border border-transparent"
                  )}
                >
                  <span className="text-ink-200">{r.name}</span>
                  <AqiBadge aqi={r.aqi} />
                </button>
              ))}
          </CardContent>
        </Card>
      </div>

      <AqiHeatmapTimeline />
    </div>
  );
}
