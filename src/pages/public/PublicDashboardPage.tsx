import * as React from "react";
import { Link } from "react-router-dom";
import { Activity, Heart, Wind, TrendingUp, ArrowRight } from "lucide-react";
import { SectionHeader, RangeTabs } from "@/components/dashboard/shared/RangeTabs";
import { KpiCard } from "@/components/dashboard/shared/KpiCard";
import { AiInsightCard } from "@/components/dashboard/shared/AiInsightCard";
import { AqiBadge } from "@/components/dashboard/shared/AqiBadge";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { AqiTrendChart } from "@/components/charts/AqiTrendChart";
import { AqiZoneMap } from "@/components/maps/AqiZoneMap";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAqiSeries } from "@/hooks/useAqiSeries";
import { useAuth } from "@/context/AuthContext";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import { AQI_CATEGORIES } from "@/data/aqiCategories";
import { healthGuidanceForCategory } from "@/data/aiInsights";
import type { TimeRange } from "@/types";

export default function PublicDashboardPage() {
  const { user } = useAuth();
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const [range, setRange] = React.useState<TimeRange>("24h");
  const region = getRegion(regionId);
  const { data, loading, current } = useAqiSeries(region.id, region.aqi, range);
  const guidance = healthGuidanceForCategory(region.category);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Citizen Portal"
        title={`Good ${new Date().getHours() < 18 ? "day" : "evening"}, ${user?.name.split(" ")[0]}`}
        description="Here's today's air quality picture for your city."
        action={<RegionSelector value={regionId} onChange={setRegionId} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Current AQI"
          value={current?.aqi ?? region.aqi}
          icon={Activity}
          accent={AQI_CATEGORIES[region.category].textColor}
          delayIndex={0}
        />
        <KpiCard
          label="Category"
          value={0}
          textValue={AQI_CATEGORIES[region.category].label}
          icon={Wind}
          accent="#4F46E5"
          delayIndex={1}
        />
        <KpiCard
          label="24h Trend"
          value={Math.abs(region.change24h)}
          suffix="%"
          delta={region.change24h}
          direction={region.trend === "rising" ? "up" : region.trend === "falling" ? "down" : "flat"}
          invertDeltaColor
          icon={TrendingUp}
          accent="#F5C84C"
          delayIndex={2}
        />
        <KpiCard
          label="Health Risk"
          value={0}
          textValue={region.aqi > 150 ? "Elevated" : region.aqi > 100 ? "Moderate" : "Low"}
          icon={Heart}
          accent="#F0615F"
          delayIndex={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>AQI Trend Analysis</CardTitle>
              <CardDescription>{region.name}, {region.state}</CardDescription>
            </div>
            <RangeTabs value={range} onChange={setRange} />
          </CardHeader>
          <CardContent>
            <AqiTrendChart data={data} range={range} loading={loading} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Zone Map</CardTitle>
            <CardDescription>Tap a marker for details.</CardDescription>
          </CardHeader>
          <CardContent>
            <AqiZoneMap height={280} onSelect={(r) => setRegionId(r.id)} />
            <Button variant="ghost" size="sm" className="mt-3 w-full justify-center" asChild>
              <Link to="/public/map">
                Open full map <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">AI Health Guidance</h2>
          <AqiBadge aqi={region.aqi} showRange />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guidance.map((g, i) => (
            <AiInsightCard key={g.id} title={g.title} accent={i % 2 === 0 ? "aurora" : "signal"} delayIndex={i}>
              {g.detail}
            </AiInsightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
