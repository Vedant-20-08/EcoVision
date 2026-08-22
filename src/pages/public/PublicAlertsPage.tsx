import { motion } from "framer-motion";
import { Flame, Car, Factory, HardHat, CloudSun, Radio, BellOff } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALERTS } from "@/data/alerts";
import { formatTimestamp } from "@/lib/utils";
import type { AlertSourceIcon, AlertSeverity } from "@/types";

const SOURCE_ICONS: Record<AlertSourceIcon, React.ElementType> = {
  traffic: Car,
  farm: Flame,
  industry: Factory,
  construction: HardHat,
  weather: CloudSun,
  system: Radio,
};

const SEVERITY_VARIANT: Record<AlertSeverity, "critical" | "danger" | "warning" | "success"> = {
  critical: "critical",
  high: "danger",
  medium: "warning",
  low: "success",
};

export default function PublicAlertsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Alerts"
        title="Air Quality Alerts"
        description="Recent AQI events affecting monitored cities near you."
      />

      {ALERTS.length === 0 ? (
        <Card className="p-10 text-center">
          <BellOff className="mx-auto h-8 w-8 text-ink-500" />
          <p className="mt-3 text-sm text-ink-400">No active alerts right now.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {ALERTS.map((a, i) => {
            const Icon = SOURCE_ICONS[a.source];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Card className="card-hover">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-ink-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-sm font-semibold text-white">{a.title}</h3>
                        <Badge variant={SEVERITY_VARIANT[a.severity]}>{a.severity}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-ink-400">{a.description}</p>
                      <p className="mt-2 text-xs text-ink-500">{formatTimestamp(a.timestamp)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
