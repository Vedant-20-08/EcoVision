import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { cn, formatNumber } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number;
  decimals?: number;
  unit?: string;
  delta?: number;
  direction?: "up" | "down" | "flat";
  icon?: LucideIcon;
  accent?: string;
  suffix?: string;
  invertDeltaColor?: boolean; // e.g. rising AQI is "bad" (red) not "good" (green)
  delayIndex?: number;
  /** When set, renders this text instead of the animated numeric value (e.g. "Elevated", "Good"). */
  textValue?: string;
}

export function KpiCard({
  label,
  value,
  decimals = 0,
  unit,
  delta,
  direction = "flat",
  icon: Icon,
  accent = "#0B7D70",
  suffix,
  invertDeltaColor = false,
  delayIndex = 0,
  textValue,
}: KpiCardProps) {
  const animated = useCountUp(textValue ? 0 : value, 1100);

  const isGood = invertDeltaColor ? direction === "down" : direction === "up";
  const deltaColor =
    direction === "flat" ? "text-ink-400" : isGood ? "text-aqiText-good" : "text-aqiText-unhealthy";
  const DeltaIcon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delayIndex * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="card-hover relative overflow-hidden p-5">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: accent }}
        />
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
          {Icon && (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${accent}1A`, color: accent }}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          {textValue ? (
            <span className="font-display text-2xl font-semibold text-white">{textValue}</span>
          ) : (
            <>
              <span className="font-display text-3xl font-semibold text-white tabular-nums">
                {formatNumber(animated, decimals)}
              </span>
              {(unit || suffix) && <span className="text-sm text-ink-400">{unit || suffix}</span>}
            </>
          )}
        </div>
        {delta !== undefined && (
          <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", deltaColor)}>
            <DeltaIcon className="h-3.5 w-3.5" />
            <span>{formatNumber(Math.abs(delta), decimals)}% vs. yesterday</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
