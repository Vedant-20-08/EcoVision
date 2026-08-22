import * as React from "react";
import { CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BaseMap } from "@/components/maps/BaseMap";
import { REGIONS } from "@/data/regions";
import { generateAqiSeries } from "@/data/generators";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";

const CHECKPOINT_LABELS = ["1y ago", "9mo ago", "6mo ago", "3mo ago", "30d ago", "7d ago", "24h ago", "Now"];

// Precompute a snapshot of every region's AQI at each checkpoint along a 1-year series.
const SNAPSHOTS = REGIONS.map((region) => {
  const series = generateAqiSeries(region.id, region.aqi, "1y");
  const step = Math.floor((series.length - 1) / (CHECKPOINT_LABELS.length - 1));
  const points = CHECKPOINT_LABELS.map((_, i) => series[Math.min(series.length - 1, i * step)]);
  return { region, points };
});

export function AqiHeatmapTimeline({ height = 440 }: { height?: number }) {
  const [index, setIndex] = React.useState(CHECKPOINT_LABELS.length - 1);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setIndex((i) => (i >= CHECKPOINT_LABELS.length - 1 ? 0 : i + 1));
    }, 1100);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AQI Heatmap Timeline</CardTitle>
        <CardDescription>Scrub through the last year to watch pollution intensity shift across the network.</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseMap center={[22.9734, 78.6569]} zoom={4.2} height={height} className="overflow-hidden rounded-xl2 border border-white/10">
          {SNAPSHOTS.map(({ region, points }) => {
            const reading = points[index];
            const meta = AQI_CATEGORIES[categoryForAqi(reading.aqi)];
            const radius = 8 + reading.aqi / 24;
            return (
              <CircleMarker
                key={region.id}
                center={[region.lat, region.lng]}
                radius={radius}
                pathOptions={{ color: meta.color, fillColor: meta.color, fillOpacity: 0.4, weight: 2 }}
              >
                <LeafletTooltip direction="top" offset={[0, -radius]} opacity={1}>
                  <div className="text-xs">
                    <strong>{region.name}</strong> · AQI {reading.aqi} · {CHECKPOINT_LABELS[index]}
                  </div>
                </LeafletTooltip>
                <Popup>
                  <div className="text-xs">
                    <p className="font-semibold">{region.name}</p>
                    <p>AQI {reading.aqi} ({meta.label}) — {CHECKPOINT_LABELS[index]}</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </BaseMap>

        <div className="mt-5 flex items-center gap-4">
          <Button size="icon" variant="outline" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <div className="flex-1">
            <Slider
              min={0}
              max={CHECKPOINT_LABELS.length - 1}
              step={1}
              value={[index]}
              onValueChange={([v]) => {
                setPlaying(false);
                setIndex(v);
              }}
            />
            <div className="mt-2 flex justify-between text-[10px] text-ink-500">
              {CHECKPOINT_LABELS.map((l, i) => (
                <motion.span key={l} animate={{ color: i === index ? "#0B7D70" : "#6E7488" }} className="font-medium">
                  {l}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
