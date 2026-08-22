import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HotspotMap } from "@/components/maps/HotspotMap";

export default function GovernmentMapPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Maps"
        title="AQI Hotspot Map"
        description="Toggle data layers to isolate pollution sources by category."
      />
      <Card>
        <CardHeader>
          <CardTitle>National Hotspot Overlay</CardTitle>
          <CardDescription>Farms, highways, construction, and industrial emission sources.</CardDescription>
        </CardHeader>
        <CardContent>
          <HotspotMap height={560} />
        </CardContent>
      </Card>
    </div>
  );
}
