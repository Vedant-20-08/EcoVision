import { cn } from "@/lib/utils";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";

export function AqiBadge({ aqi, className, showRange = false }: { aqi: number; className?: string; showRange?: boolean }) {
  const meta = AQI_CATEGORIES[categoryForAqi(aqi)];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className
      )}
      style={{
        borderColor: `${meta.color}66`,
        backgroundColor: `${meta.color}1A`,
        color: meta.textColor,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
      {meta.label}
      {showRange && <span className="opacity-60">· {meta.range[0]}–{meta.range[1]}</span>}
    </span>
  );
}

export function aqiCategoryMeta(aqi: number) {
  return AQI_CATEGORIES[categoryForAqi(aqi)];
}
