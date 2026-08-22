import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { ReportExportCenter } from "@/components/dashboard/shared/ReportExportCenter";

export default function PublicReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Reports" title="Your Air Quality Reports" description="Download personal AQI history for any city you follow." />
      <ReportExportCenter reports={["My City — 30-Day AQI Summary", "Health Advisory Log", "Annual Exposure Estimate"]} />
    </div>
  );
}
