import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { AiInsightCard } from "@/components/dashboard/shared/AiInsightCard";
import { REGIONS } from "@/data/regions";
import { generateIncidentSummary, AI_RECOMMENDATIONS } from "@/data/aiInsights";

export function AiInsightPreview() {
  const delhi = REGIONS.find((r) => r.id === "del")!;
  const lucknow = REGIONS.find((r) => r.id === "luc")!;
  const topRecs = AI_RECOMMENDATIONS.slice(0, 2);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Intelligence layer"
          title="AI that explains the 'why', not just the number"
          description="Every reading is paired with automated reasoning — incident summaries, source attribution, and recommended action."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AiInsightCard title="Automated Incident Summary" badge="Live" accent="aurora" delayIndex={0}>
            {generateIncidentSummary(delhi)}
          </AiInsightCard>
          <AiInsightCard title="Automated Incident Summary" badge="Live" accent="signal" delayIndex={1}>
            {generateIncidentSummary(lucknow)}
          </AiInsightCard>
          {topRecs.map((rec, i) => (
            <AiInsightCard
              key={rec.id}
              title={rec.trigger}
              badge={`${rec.confidence}% confidence`}
              accent={i % 2 === 0 ? "aurora" : "signal"}
              delayIndex={i + 2}
            >
              <span className="font-medium text-ink-100">{rec.action}.</span> {rec.detail}
            </AiInsightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
