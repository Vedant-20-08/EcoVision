import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function FloatingStatCard({
  icon: Icon,
  label,
  value,
  suffix,
  decimals = 0,
  className,
  delay = 0,
  floatDelay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
  floatDelay?: number;
}) {
  const animated = useCountUp(value, 1600);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="glass-strong flex items-center gap-3 rounded-xl2 px-4 py-3 shadow-glow"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aurora/10 text-aurora">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold leading-none text-white tabular-nums">
            {formatNumber(animated, decimals)}
            {suffix}
          </p>
          <p className="mt-1 text-[11px] text-ink-400 whitespace-nowrap">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
