import { AiInsightCard } from "@/components/dashboard/shared/AiInsightCard";
import type { AiSiteReport } from "@/types";

export function SiteAdvisorList({ reports }: { reports: AiSiteReport[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {reports.map((r, i) => (
        <AiInsightCard key={r.id} title={r.region} badge={`${r.confidence}% confidence`} accent={i % 2 === 0 ? "aurora" : "signal"} delayIndex={i}>
          <p className="font-medium text-ink-100">{r.headline}</p>
          <ul className="mt-2 space-y-1.5">
            {r.recommendations.map((rec, j) => (
              <li key={j} className="flex items-start gap-2 text-xs text-ink-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                {rec}
              </li>
            ))}
          </ul>
        </AiInsightCard>
      ))}
    </div>
  );
}
