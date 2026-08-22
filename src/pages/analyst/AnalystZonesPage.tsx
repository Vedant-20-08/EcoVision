import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { ZoneFinderMap } from "@/components/maps/ZoneFinderMap";
import { ZoneFinderList } from "@/components/dashboard/analyst/ZoneFinderList";
import { LOW_AQI_ZONES } from "@/data/feasibility";

export default function AnalystZonesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Zone Finder"
        title="Low AQI Zone Finder"
        description="Areas with the cleanest air and strongest growth fundamentals."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ZoneFinderMap zones={LOW_AQI_ZONES} height={460} />
        <ZoneFinderList zones={LOW_AQI_ZONES} />
      </div>
    </div>
  );
}
