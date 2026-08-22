import * as React from "react";
import { SectionHeader, RangeTabs } from "@/components/dashboard/shared/RangeTabs";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { RootCauseDonut } from "@/components/charts/RootCauseDonut";
import { AqiTrendChart } from "@/components/charts/AqiTrendChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { rootCauseForRegion } from "@/data/rootCause";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import { useAqiSeries } from "@/hooks/useAqiSeries";
import type { TimeRange } from "@/types";

export default function AnalystRootCausePage() {
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const [range, setRange] = React.useState<TimeRange>("30d");
  const region = getRegion(regionId);
  const rootCause = rootCauseForRegion(regionId);
  const { data, loading } = useAqiSeries(region.id, region.aqi, range);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Root Cause Analysis"
        title="What's Driving Pollution Here"
        description="Attribute AQI levels to traffic, farm burning, industry, and construction."
        action={<RegionSelector value={regionId} onChange={setRegionId} />}
      />

      <Card>
        <CardHeader>
          <CardTitle>{region.name} — Source Attribution</CardTitle>
          <CardDescription>Estimated contribution by pollution source.</CardDescription>
        </CardHeader>
        <CardContent>
          <RootCauseDonut data={rootCause} height={240} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Historical AQI Intelligence</CardTitle>
            <CardDescription>Full range coverage from 24h to 1 year.</CardDescription>
          </div>
          <RangeTabs value={range} onChange={setRange} ranges={["24h", "7d", "30d", "90d", "1y"]} />
        </CardHeader>
        <CardContent>
          <AqiTrendChart data={data} range={range} loading={loading} height={320} />
        </CardContent>
      </Card>
    </div>
  );
}
