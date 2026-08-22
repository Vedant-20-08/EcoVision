import * as React from "react";
import { SectionHeader, RangeTabs } from "@/components/dashboard/shared/RangeTabs";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { AqiTrendChart } from "@/components/charts/AqiTrendChart";
import { TimelineExplorer } from "@/components/dashboard/public/TimelineExplorer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAqiSeries } from "@/hooks/useAqiSeries";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import type { TimeRange } from "@/types";

const POLLUTANTS: Array<{ key: "pm25" | "pm10" | "no2" | "so2" | "co" | "o3"; label: string; unit: string }> = [
  { key: "pm25", label: "PM2.5", unit: "µg/m³" },
  { key: "pm10", label: "PM10", unit: "µg/m³" },
  { key: "no2", label: "NO₂", unit: "ppb" },
  { key: "so2", label: "SO₂", unit: "ppb" },
  { key: "co", label: "CO", unit: "ppm" },
  { key: "o3", label: "O₃", unit: "ppb" },
];

export default function PublicAnalyticsPage() {
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const [range, setRange] = React.useState<TimeRange>("7d");
  const region = getRegion(regionId);
  const { data, loading, current } = useAqiSeries(region.id, region.aqi, range);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Analytics"
        title="AQI Trend Analysis"
        description="Explore historical patterns and pollutant-level breakdowns."
        action={<RegionSelector value={regionId} onChange={setRegionId} />}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>{region.name}, {region.state}</CardTitle>
            <CardDescription>Switch ranges to see how conditions have evolved.</CardDescription>
          </div>
          <RangeTabs value={range} onChange={setRange} ranges={["24h", "7d", "30d", "90d", "1y"]} />
        </CardHeader>
        <CardContent>
          <AqiTrendChart data={data} range={range} loading={loading} height={340} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {POLLUTANTS.map((p) => (
          <Card key={p.key} className="p-4">
            <p className="text-xs uppercase tracking-wide text-ink-500">{p.label}</p>
            <p className="mt-1.5 font-display text-xl font-semibold text-white tabular-nums">
              {loading || !current ? "—" : current[p.key]}
            </p>
            <p className="text-[11px] text-ink-500">{p.unit}</p>
          </Card>
        ))}
      </div>

      <TimelineExplorer regionFilter={region.name} />
    </div>
  );
}
