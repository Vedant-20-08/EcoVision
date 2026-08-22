import { CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import type { LowAqiZone } from "@/types";

export function ZoneFinderMap({ zones, height = 380 }: { zones: LowAqiZone[]; height?: number }) {
  return (
    <BaseMap center={[22.9734, 78.6569]} zoom={4.4} height={height} className="overflow-hidden rounded-xl2 border border-white/10">
      {zones.map((z) => (
        <CircleMarker
          key={z.id}
          center={[z.lat, z.lng]}
          radius={10}
          pathOptions={{ color: "#34D8A3", fillColor: "#34D8A3", fillOpacity: 0.35, weight: 2 }}
        >
          <LeafletTooltip direction="top" opacity={1}>
            <div className="text-xs"><strong>{z.name}</strong> · AQI {z.aqiScore}</div>
          </LeafletTooltip>
          <Popup>
            <div className="text-xs">
              <p className="font-semibold">{z.name}</p>
              <p>AQI Score: {z.aqiScore}</p>
              <p>Growth potential: {z.growthPotential}</p>
              <p>Suitability: {z.suitabilityRating}/5</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </BaseMap>
  );
}
