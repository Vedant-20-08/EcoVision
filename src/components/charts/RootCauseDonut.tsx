import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { RootCauseContribution } from "@/types";

export function RootCauseDonut({ data, height = 220 }: { data: RootCauseContribution[]; height?: number }) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div style={{ width: height, height }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={3}
              animationDuration={900}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.source} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #DDE1EC",
                borderRadius: 8,
                fontSize: 12,
                color: "#10131C",
              }}
              formatter={(value, name) => [`${value}%`, name] as [string, string]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2.5">
        {data.map((d) => (
          <div key={d.source} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-ink-200">{d.label}</span>
            </div>
            <span className="font-display font-semibold text-white tabular-nums">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
