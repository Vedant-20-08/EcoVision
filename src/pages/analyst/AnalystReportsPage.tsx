import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { ReportExportCenter } from "@/components/dashboard/shared/ReportExportCenter";

export default function AnalystReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow="Reports" title="Site Intelligence Reports" description="Export feasibility and root-cause findings for client deliverables." />
      <ReportExportCenter reports={["Site Feasibility Report", "Root Cause Attribution", "Zone Comparison Matrix"]} />
    </div>
  );
}
