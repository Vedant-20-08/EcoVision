import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { SiteAdvisorList } from "@/components/dashboard/analyst/SiteAdvisorList";
import { AI_SITE_REPORTS } from "@/data/aiInsights";

export default function AnalystAdvisorPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="AI Site Advisor"
        title="Site Recommendations"
        description="AI-generated guidance for construction planning across monitored regions."
      />
      <SiteAdvisorList reports={AI_SITE_REPORTS} />
    </div>
  );
}
