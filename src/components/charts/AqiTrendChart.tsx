import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import type { AqiReading, TimeRange } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { aqiColor, aqiTextColor } from "@/data/aqiCategories";
import { formatTimestamp } from "@/lib/utils";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const reading: AqiReading = payload[0].payload;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs">
      <p className="text-ink-400">{formatTimestamp(reading.timestamp)}</p>
      <p className="mt-1 font-display text-base font-semibold" style={{ color: aqiTextColor(reading.aqi) }}>
        AQI {reading.aqi}
      </p>
      <p className="text-ink-400">PM2.5 {reading.pm25} · PM10 {reading.pm10}</p>
    </div>
  );
}

function tickFormatter(range: TimeRange) {
  return (iso: string) => {
    const d = new Date(iso);
    if (range === "24h") return d.toLocaleTimeString("en-IN", { hour: "2-digit" });
    if (range === "1y") return d.toLocaleDateString("en-IN", { month: "short" });
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };
}

export function AqiTrendChart({
  data,
  range,
  loading,
  height = 280,
  gradientId = "aqiGradient",
}: {
  data: AqiReading[];
  range: TimeRange;
  loading?: boolean;
  height?: number;
  gradientId?: string;
}) {
  if (loading) {
    return <Skeleton style={{ height }} className="w-full rounded-xl" />;
  }

  const last = data[data.length - 1];
  const lineColor = last ? aqiColor(last.aqi) : "#0B7D70";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={range}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.45} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(16,19,28,0.08)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={tickFormatter(range)}
              stroke="rgba(16,19,28,0.16)"
              tick={{ fill: "#6E7488", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              stroke="rgba(16,19,28,0.16)"
              tick={{ fill: "#6E7488", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={38}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke={lineColor}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              animationDuration={800}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ r: 4, fill: lineColor, stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  );
}
