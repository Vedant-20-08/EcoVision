import { motion } from "framer-motion";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES } from "@/data/aqiCategories";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export function LiveAqiPreview() {
  const doubled = [...REGIONS, ...REGIONS];
  return (
    <section id="live-aqi" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live preview"
          title="Right now, across India"
          description="A sample of live-fused readings from the network. Full history, forecasts, and drill-downs live inside the platform."
        />
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night-900 to-transparent" />
        <motion.div className="flex w-max gap-4 animate-marquee">
          {doubled.map((r, i) => {
            const meta = AQI_CATEGORIES[r.category];
            const Icon = r.trend === "rising" ? ArrowUpRight : r.trend === "falling" ? ArrowDownRight : Minus;
            return (
              <div key={`${r.id}-${i}`} className="glass flex w-64 shrink-0 items-center gap-4 rounded-xl2 px-5 py-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
                  style={{ backgroundColor: `${meta.color}1A`, color: meta.color, border: `1px solid ${meta.color}4D` }}
                >
                  {r.aqi}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{r.name}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-400">
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
