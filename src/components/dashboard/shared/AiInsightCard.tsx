import * as React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AiInsightCardProps {
  title: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
  accent?: "aurora" | "signal";
  delayIndex?: number;
}

export function AiInsightCard({ title, children, badge, className, accent = "signal", delayIndex = 0 }: AiInsightCardProps) {
  const accentColor = accent === "aurora" ? "#0B7D70" : "#4F46E5";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: delayIndex * 0.06 }}
      className={cn(
        "relative overflow-hidden rounded-xl2 border p-5",
        accent === "aurora" ? "border-aurora/20 bg-aurora/[0.04]" : "border-signal/20 bg-signal/[0.05]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative flex items-start gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
        >
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
            {badge && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
              >
                {badge}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-sm text-ink-300">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
