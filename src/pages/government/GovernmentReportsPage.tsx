import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { ReportExportCenter } from "@/components/dashboard/shared/ReportExportCenter";

export default function GovernmentReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Reports" title="Regulatory Reports" description="Generate submission-ready reports for regional authorities." />
      <ReportExportCenter
        reports={["National AQI Compliance Summary", "Alert Response Log", "Source Attribution Report", "Construction Suitability Register"]}
      />
    </div>
  );
}
