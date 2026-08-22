import * as React from "react";
import type { AqiReading, TimeRange } from "@/types";
import { generateAqiSeries } from "@/data/generators";

interface UseAqiSeriesResult {
  data: AqiReading[];
  loading: boolean;
  current: AqiReading | null;
}

/** Simulates an async fetch for a region's AQI series, with a brief loading window for skeletons. */
export function useAqiSeries(regionId: string, baseAqi: number, range: TimeRange): UseAqiSeriesResult {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<AqiReading[]>([]);

  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setData(generateAqiSeries(regionId, baseAqi, range));
      setLoading(false);
    }, 420);
    return () => clearTimeout(timeout);
  }, [regionId, baseAqi, range]);

  return { data, loading, current: data.length ? data[data.length - 1] : null };
}
