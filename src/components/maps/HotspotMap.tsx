import * as React from "react";
import { CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";
import { FARM_ACTIVITY_DATA, CONSTRUCTION_ACTIVITY_DATA, INDUSTRIAL_ACTIVITY_DATA } from "@/data/environmentalDatasets";
import { Switch } from "@/components/ui/switch";
import { Flame, HardHat, Factory, Route } from "lucide-react";

type LayerKey = "farms" | "highways" | "construction" | "industrial";

const LAYER_META: Record<LayerKey, { label: string; icon: React.ElementType; color: string }> = {
  farms: { label: "Farm Burning", icon: Flame, color: "#8A6200" },
  highways: { label: "Highways / Traffic", icon: Route, color: "#4F46E5" },
  construction: { label: "Construction Sites", icon: HardHat, color: "#067647" },
  industrial: { label: "Industrial Zones", icon: Factory, color: "#C81E1E" },
};

export function HotspotMap({ height = 480 }: { height?: number }) {
  const [layers, setLayers] = React.useState<Record<LayerKey, boolean>>({
    farms: true,
    highways: true,
    construction: true,
    industrial: true,
  });

  const toggle = (k: LayerKey) => setLayers((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        {(Object.keys(LAYER_META) as LayerKey[]).map((k) => {
          const meta = LAYER_META[k];
          const Icon = meta.icon;
          return (
            <label key={k} className="flex cursor-pointer items-center gap-2 text-sm">
              <Switch checked={layers[k]} onCheckedChange={() => toggle(k)} />
              <Icon className="h-3.5 w-3.5" style={{ color: meta.color }} />
              <span className="text-ink-300">{meta.label}</span>
            </label>
          );
        })}
      </div>

      <BaseMap center={[22.9734, 78.6569]} zoom={4.4} height={height} className="overflow-hidden rounded-xl2 border border-white/10">
        {REGIONS.map((region) => {
          const meta = AQI_CATEGORIES[categoryForAqi(region.aqi)];
          return (
            <CircleMarker
              key={region.id}
              center={[region.lat, region.lng]}
              radius={9}
              pathOptions={{ color: meta.color, fillColor: meta.color, fillOpacity: 0.3, weight: 1.5, dashArray: "3 3" }}
            >
              <LeafletTooltip direction="top" opacity={1}>
                <div className="text-xs"><strong>{region.name}</strong> · AQI {region.aqi}</div>
              </LeafletTooltip>
            </CircleMarker>
          );
        })}

        {layers.farms &&
          FARM_ACTIVITY_DATA.filter((f) => f.burningDetected).map((f) => {
            const region = REGIONS.find((r) => r.id === f.regionId)!;
            return (
              <CircleMarker
                key={`farm-${f.regionId}`}
                center={[region.lat + 0.25, region.lng + 0.2]}
                radius={7}
                pathOptions={{ color: LAYER_META.farms.color, fillColor: LAYER_META.farms.color, fillOpacity: 0.7 }}
              >
                <Popup>
                  <div className="text-xs">
                    <p className="font-semibold">Active burning near {region.name}</p>
                    <p>Fire radiative power: {f.fireRadiativePower} MW</p>
                    <p>{f.hectaresAffected} hectares affected</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

        {layers.construction &&
          CONSTRUCTION_ACTIVITY_DATA.filter((c) => c.active).map((c) => (
            <CircleMarker
              key={c.siteId}
              center={[c.lat, c.lng]}
              radius={5}
              pathOptions={{ color: LAYER_META.construction.color, fillColor: LAYER_META.construction.color, fillOpacity: 0.8 }}
            >
              <Popup>
                <div className="text-xs">
                  <p className="font-semibold">{c.siteName}</p>
                  <p>Dust index: {c.dustIndex}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {layers.industrial &&
          INDUSTRIAL_ACTIVITY_DATA.map((f) => (
            <CircleMarker
              key={f.facilityId}
              center={[f.lat, f.lng]}
              radius={5}
              pathOptions={{ color: LAYER_META.industrial.color, fillColor: LAYER_META.industrial.color, fillOpacity: 0.8 }}
            >
              <Popup>
                <div className="text-xs">
                  <p className="font-semibold">{f.facilityName}</p>
                  <p>Sector: {f.sector}</p>
                  <p>Status: {f.complianceStatus}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </BaseMap>
    </div>
  );
}
