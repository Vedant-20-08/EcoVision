import { Link } from "react-router-dom";
import { AlertTriangle, TrendingUp, ShieldAlert, Gauge, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { KpiCard } from "@/components/dashboard/shared/KpiCard";
import { AiInsightCard } from "@/components/dashboard/shared/AiInsightCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HotspotMap } from "@/components/maps/HotspotMap";
import { REGIONS } from "@/data/regions";
import { AI_RECOMMENDATIONS, generateIncidentSummary } from "@/data/aiInsights";
import { useAuth } from "@/context/AuthContext";

const avgAqi = Math.round(REGIONS.reduce((s, r) => s + r.aqi, 0) / REGIONS.length);
const criticalZones = REGIONS.filter((r) => r.aqi > 200).length;
const risingZones = REGIONS.filter((r) => r.trend === "rising").length;
const mostCritical = [...REGIONS].sort((a, b) => b.aqi - a.aqi)[0];

export default function GovernmentDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={user?.organization}
        title="Government Command Center"
        description="National air quality operations — monitor, decide, act."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Average AQI" value={avgAqi} icon={Gauge} accent="#0B7D70" delayIndex={0} />
        <KpiCard label="Critical Zones" value={criticalZones} icon={AlertTriangle} accent="#EF476F" delayIndex={1} />
        <KpiCard label="Rising Zones" value={risingZones} icon={TrendingUp} accent="#F5C84C" delayIndex={2} />
        <KpiCard label="Active Alerts" value={REGIONS.filter((r) => Math.abs(r.change24h) > 5).length} icon={ShieldAlert} accent="#4F46E5" delayIndex={3} />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>AQI Hotspot Map</CardTitle>
            <CardDescription>Farms, highways, construction, and industrial layers.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/government/map">
              Full map <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <HotspotMap height={380} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Top AI Recommendations</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/government/suitability">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {AI_RECOMMENDATIONS.slice(0, 2).map((rec, i) => (
              <AiInsightCard key={rec.id} title={rec.trigger} badge={`${rec.confidence}% confidence`} accent={i % 2 === 0 ? "signal" : "aurora"} delayIndex={i}>
                <span className="font-medium text-ink-100">{rec.action}.</span> {rec.detail}
              </AiInsightCard>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Incident Summary — {mostCritical.name}</h2>
          <AiInsightCard title="Automated Incident Summary" badge="Auto-generated" accent="aurora">
            {generateIncidentSummary(mostCritical)}
          </AiInsightCard>
        </div>
      </div>
    </div>
  );
}
