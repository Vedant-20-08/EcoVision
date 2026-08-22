import { CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";
import type { Region } from "@/types";

export function AqiZoneMap({ onSelect, height = 440 }: { onSelect?: (r: Region) => void; height?: number }) {
  return (
    <BaseMap center={[22.9734, 78.6569]} zoom={4.4} height={height} className="overflow-hidden rounded-xl2 border border-white/10">
      {REGIONS.map((region) => {
        const meta = AQI_CATEGORIES[categoryForAqi(region.aqi)];
        const radius = 10 + region.aqi / 22;
        return (
          <CircleMarker
            key={region.id}
            center={[region.lat, region.lng]}
            radius={radius}
            pathOptions={{
              color: meta.color,
              fillColor: meta.color,
              fillOpacity: 0.35,
              weight: 2,
            }}
            eventHandlers={{ click: () => onSelect?.(region) }}
          >
            <LeafletTooltip direction="top" offset={[0, -radius]} opacity={1}>
              <div className="text-xs font-medium">
                <strong>{region.name}</strong> — AQI {region.aqi} · {meta.label}
              </div>
            </LeafletTooltip>
            <Popup>
              <div className="text-xs">
                <p className="font-semibold">{region.name}, {region.state}</p>
                <p>Current AQI: {region.aqi} ({meta.label})</p>
                <p className="mt-1 text-[11px] opacity-80">{meta.advisory}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </BaseMap>
  );
}
