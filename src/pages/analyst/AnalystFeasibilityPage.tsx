import * as React from "react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { FeasibilityTool } from "@/components/dashboard/analyst/FeasibilityTool";
import { WhatIfSimulator } from "@/components/dashboard/shared/WhatIfSimulator";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { getRegion, DEFAULT_REGION } from "@/data/regions";

export default function AnalystFeasibilityPage() {
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const region = getRegion(regionId);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Feasibility"
        title="Construction Feasibility Tool"
        description="Score any location for development readiness and simulate mitigation impact."
      />
      <FeasibilityTool />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Mitigation What-If Simulator</h2>
          <RegionSelector value={regionId} onChange={setRegionId} className="w-48" />
        </div>
        <WhatIfSimulator region={region} />
      </div>
    </div>
  );
}
