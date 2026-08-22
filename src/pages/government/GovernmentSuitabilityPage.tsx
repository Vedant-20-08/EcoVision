import * as React from "react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { SuitabilityTool } from "@/components/dashboard/government/SuitabilityTool";
import { RecommendationList } from "@/components/dashboard/government/RecommendationList";
import { WhatIfSimulator } from "@/components/dashboard/shared/WhatIfSimulator";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { AI_RECOMMENDATIONS } from "@/data/aiInsights";
import { getRegion, DEFAULT_REGION } from "@/data/regions";

export default function GovernmentSuitabilityPage() {
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const region = getRegion(regionId);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Decision Support"
        title="Construction Suitability & Policy Simulation"
        description="Evaluate proposed sites and model the impact of interventions before acting."
      />

      <SuitabilityTool />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">AI Recommendation Engine</h2>
          </div>
          <RecommendationList recommendations={AI_RECOMMENDATIONS} />
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Policy What-If Simulator</h2>
            <RegionSelector value={regionId} onChange={setRegionId} className="w-48" />
          </div>
          <WhatIfSimulator region={region} />
        </div>
      </div>
    </div>
  );
}
