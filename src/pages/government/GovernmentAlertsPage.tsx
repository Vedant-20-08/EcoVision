import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { AlertCenter } from "@/components/dashboard/government/AlertCenter";

export default function GovernmentAlertsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Alert Management"
        title="Alert Management Center"
        description="Threshold-triggered alerts — AQI change greater than 10%, or category-exceeding events."
      />
      <AlertCenter />
    </div>
  );
}
