import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Car, Factory, HardHat, CloudSun, Radio, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALERTS as INITIAL_ALERTS } from "@/data/alerts";
import { formatTimestamp } from "@/lib/utils";
import type { AlertItem, AlertSourceIcon, AlertSeverity } from "@/types";

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

type FilterKey = "all" | AlertSeverity;

export function AlertCenter() {
  const [alerts, setAlerts] = React.useState<AlertItem[]>(INITIAL_ALERTS);
  const [filter, setFilter] = React.useState<FilterKey>("all");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);
  const unacknowledged = alerts.filter((a) => !a.acknowledged).length;

  function acknowledge(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-white">Notification Feed</h3>
            <p className="text-sm text-ink-400">{unacknowledged} unacknowledged of {alerts.length} total</p>
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="high">High</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative space-y-0 border-l border-white/10 pl-6">
          <AnimatePresence initial={false}>
            {filtered.map((a) => {
              const Icon = SOURCE_ICONS[a.source];
              return (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="relative pb-5 last:pb-0"
                >
                  <span
                    className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-night-900"
                    style={{
                      backgroundColor: a.acknowledged ? "#3B4664" : "#F0615F",
                      boxShadow: a.acknowledged ? "none" : "0 0 8px #F0615F",
                    }}
                  />
                  <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-ink-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{a.title}</h4>
                        <Badge variant={SEVERITY_VARIANT[a.severity]}>{a.severity}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-ink-400">{a.description}</p>
                      <p className="mt-1.5 text-xs text-ink-500">{formatTimestamp(a.timestamp)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={a.acknowledged ? "ghost" : "outline"}
                      disabled={a.acknowledged}
                      onClick={() => acknowledge(a.id)}
                      className="shrink-0 gap-1.5"
                    >
                      {a.acknowledged ? <CheckCircle2 className="h-3.5 w-3.5 text-aqiText-good" /> : <Circle className="h-3.5 w-3.5" />}
                      {a.acknowledged ? "Acknowledged" : "Acknowledge"}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-ink-500">No alerts in this priority tier.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
