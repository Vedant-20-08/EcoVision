import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TimeRange } from "@/types";

const LABELS: Record<TimeRange, string> = {
  "24h": "24H",
  "7d": "7D",
  "30d": "30D",
  "90d": "Quarter",
  "1y": "1Y",
};

export function RangeTabs({
  value,
  onChange,
  ranges = ["24h", "7d", "30d", "1y"],
}: {
  value: TimeRange;
  onChange: (r: TimeRange) => void;
  ranges?: TimeRange[];
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TimeRange)}>
      <TabsList>
        {ranges.map((r) => (
          <TabsTrigger key={r} value={r}>
            {LABELS[r]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-aurora">{eyebrow}</p>}
        <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-ink-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
