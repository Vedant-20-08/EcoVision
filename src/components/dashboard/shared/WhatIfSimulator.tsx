import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { WHAT_IF_SCENARIOS } from "@/data/whatIf";
import { aqiTextColor } from "@/data/aqiCategories";
import type { Region } from "@/types";

export function WhatIfSimulator({ region }: { region: Region }) {
  const [scenarioId, setScenarioId] = React.useState(WHAT_IF_SCENARIOS[0].id);
  const scenario = WHAT_IF_SCENARIOS.find((s) => s.id === scenarioId) ?? WHAT_IF_SCENARIOS[0];
  const [value, setValue] = React.useState(scenario.sliderDefault);

  React.useEffect(() => {
    setValue(scenario.sliderDefault);
  }, [scenario]);

  const improvement = scenario.computeImprovement(value, region.aqi);
  const projectedAqi = Math.max(5, region.aqi - improvement);

  return (
    <Card>
      <CardHeader>
        <CardTitle>What-If Simulator</CardTitle>
        <CardDescription>Model the AQI impact of a policy intervention in {region.name}.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={scenarioId} onValueChange={setScenarioId}>
          <TabsList className="flex-wrap h-auto">
            {WHAT_IF_SCENARIOS.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="text-xs">
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <p className="mt-4 text-sm text-ink-400">{scenario.description}</p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ink-300">{scenario.label}</span>
            <span className="font-display font-semibold text-white tabular-nums">
              {value}
              {scenario.sliderUnit}
            </span>
          </div>
          <Slider
            min={scenario.sliderMin}
            max={scenario.sliderMax}
            step={1}
            value={[value]}
            onValueChange={([v]) => setValue(v)}
          />
        </div>

        <motion.div
          key={`${scenarioId}-${value}`}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-aurora/20 bg-aurora/[0.04] p-4"
        >
          <div>
            <p className="text-xs text-ink-500">Current AQI</p>
            <p className="mt-1 font-display text-2xl font-semibold" style={{ color: aqiTextColor(region.aqi) }}>
              {region.aqi}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xs text-ink-500">
              <Sparkles className="h-3 w-3 text-aurora" /> Projected AQI
            </p>
            <p className="mt-1 font-display text-2xl font-semibold" style={{ color: aqiTextColor(projectedAqi) }}>
              {projectedAqi}
              <span className="ml-2 text-sm font-medium text-aqiText-good">−{improvement}</span>
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
