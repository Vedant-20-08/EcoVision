import type { WhatIfScenario } from "@/types";
import { clamp } from "@/lib/utils";

export const WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    id: "traffic-reduction",
    label: "Reduce vehicular traffic",
    description: "Model the AQI impact of reducing peak-hour traffic congestion.",
    sliderMin: 0,
    sliderMax: 60,
    sliderDefault: 20,
    sliderUnit: "%",
    computeImprovement: (value, baseAqi) => Math.round(baseAqi * (value / 100) * 0.32),
  },
  {
    id: "farm-burning",
    label: "Eliminate agricultural burning",
    description: "Model the AQI impact of fully halting crop-residue burning nearby.",
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 50,
    sliderUnit: "%",
    computeImprovement: (value, baseAqi) => Math.round(baseAqi * (value / 100) * 0.28),
  },
  {
    id: "industrial-controls",
    label: "Tighten industrial emission controls",
    description: "Model the AQI impact of enforcing stricter stack-emission compliance.",
    sliderMin: 0,
    sliderMax: 80,
    sliderDefault: 30,
    sliderUnit: "%",
    computeImprovement: (value, baseAqi) => Math.round(baseAqi * (value / 100) * 0.22),
  },
  {
    id: "construction-dust",
    label: "Enforce dust suppression on sites",
    description: "Model the AQI impact of mandatory water-sprinkling and barriers on active sites.",
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 40,
    sliderUnit: "%",
    computeImprovement: (value, baseAqi) => Math.round(clamp(baseAqi * (value / 100) * 0.15, 0, baseAqi)),
  },
];
