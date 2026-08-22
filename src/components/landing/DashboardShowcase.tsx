import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES } from "@/data/aqiCategories";
import { rootCauseForRegion } from "@/data/rootCause";
import type { SourceType } from "@/types";

const ROOT_CAUSE_TEXT_COLOR: Record<SourceType, string> = {
  traffic: "#4F46E5",
  farm: "#8A6200",
  industry: "#C81E1E",
  construction: "#067647",
};
import { LayoutDashboard, ShieldAlert, Compass } from "lucide-react";

type ShowcaseRole = "public" | "government" | "analyst";

const TABS: Array<{ value: ShowcaseRole; label: string; icon: React.ElementType }> = [
  { value: "public", label: "Public", icon: LayoutDashboard },
  { value: "government", label: "Government", icon: ShieldAlert },
  { value: "analyst", label: "Analyst", icon: Compass },
];

function MiniKpi({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-lg p-3">
      <p className="text-[10px] uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold" style={{ color }}>{value}</p>
    </div>
  );
}

export function DashboardShowcase() {
  const [role, setRole] = React.useState<ShowcaseRole>("public");
  const delhi = REGIONS.find((r) => r.id === "del")!;
  const rootCause = rootCauseForRegion("del").slice(0, 4);

  return (
    <section id="showcase" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Inside the platform"
          title="One data layer. Three command experiences."
          action={
            <Tabs value={role} onValueChange={(v) => setRole(v as ShowcaseRole)}>
              <TabsList>
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
                    <t.icon className="h-3.5 w-3.5" /> {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          }
        />

        <div className="mt-10 overflow-hidden rounded-xl2 border border-white/10 bg-night-850 shadow-glow">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-night-800 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-aqi-hazardous/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-aqi-moderate/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-aqi-good/60" />
            <span className="ml-3 text-xs text-ink-500">nightswatch.app/{role}</span>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {role === "public" && (
                  <div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <MiniKpi label="Current AQI" value={String(delhi.aqi)} color={AQI_CATEGORIES[delhi.category].textColor} />
                      <MiniKpi label="Category" value={AQI_CATEGORIES[delhi.category].label} color="#4F46E5" />
                      <MiniKpi label="Health Risk" value="Elevated" color="#C81E1E" />
                      <MiniKpi label="24h Trend" value={`${delhi.change24h}%`} color="#0B7D70" />
                    </div>
                    <div className="mt-4 h-28 rounded-lg bg-gradient-to-t from-aurora/10 to-transparent border border-white/5" />
                  </div>
                )}
                {role === "government" && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-2 space-y-3">
                      <MiniKpi label="Active Alerts" value="7" color="#C81E1E" />
                      <div className="h-32 rounded-lg border border-white/5 bg-signal/[0.05]" />
                    </div>
                    <div className="space-y-2">
                      {rootCause.map((r) => (
                        <div key={r.source} className="flex items-center justify-between rounded-lg glass px-3 py-2 text-xs">
                          <span className="text-ink-300">{r.label}</span>
                          <span className="font-semibold" style={{ color: ROOT_CAUSE_TEXT_COLOR[r.source] }}>{r.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {role === "analyst" && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    <MiniKpi label="AQI Score" value={String(delhi.aqi)} color={AQI_CATEGORIES[delhi.category].textColor} />
                    <MiniKpi label="Risk Index" value="High" color="#C81E1E" />
                    <MiniKpi label="Verdict" value="Caution" color="#8A6200" />
                    <div className="col-span-3 h-28 rounded-lg border border-white/5 bg-aurora/[0.05]" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
