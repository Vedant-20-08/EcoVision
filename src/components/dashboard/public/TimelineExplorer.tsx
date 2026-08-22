import * as React from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AqiBadge } from "@/components/dashboard/shared/AqiBadge";
import { TIMELINE_RECORDS } from "@/data/timeline";
import { formatTimestamp } from "@/lib/utils";
import type { AqiCategory } from "@/types";

const STATUS_OPTIONS: Array<{ value: AqiCategory | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "good", label: "Good" },
  { value: "moderate", label: "Moderate" },
  { value: "unhealthy-sensitive", label: "Unhealthy (Sensitive)" },
  { value: "unhealthy", label: "Unhealthy" },
  { value: "very-unhealthy", label: "Very Unhealthy" },
  { value: "hazardous", label: "Hazardous" },
];

const PAGE_SIZE = 8;

export function TimelineExplorer({ regionFilter }: { regionFilter?: string }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<AqiCategory | "all">("all");
  const [sortDesc, setSortDesc] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    let rows = TIMELINE_RECORDS;
    if (regionFilter) rows = rows.filter((r) => r.region === regionFilter);
    if (status !== "all") rows = rows.filter((r) => r.status === status);
    if (query) {
      const q = query.toLowerCase();
      rows = rows.filter((r) => r.region.toLowerCase().includes(q) || r.notes.toLowerCase().includes(q));
    }
    const sorted = [...rows].sort((a, b) =>
      sortDesc ? b.aqi - a.aqi : a.aqi - b.aqi
    );
    return sorted;
  }, [query, status, sortDesc, regionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => setPage(1), [query, status, regionFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AQI Timeline Explorer</CardTitle>
        <CardDescription>Search and filter historical AQI records across the network.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <Input
              placeholder="Search region or notes…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as AqiCategory | "all")}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wide text-ink-500">
                <th className="px-4 py-3 font-medium">Timestamp</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 font-medium">
                  <button className="flex items-center gap-1" onClick={() => setSortDesc((s) => !s)}>
                    AQI <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r) => (
                <tr key={r.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-400">{formatTimestamp(r.timestamp)}</td>
                  <td className="px-4 py-3 text-ink-200">{r.region}</td>
                  <td className="px-4 py-3 font-display font-semibold text-white tabular-nums">{r.aqi}</td>
                  <td className="px-4 py-3">
                    <AqiBadge aqi={r.aqi} />
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink-400">{r.notes}</td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-ink-500">
                    No records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
          <span>
            Showing {pageRows.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{(page - 1) * PAGE_SIZE + pageRows.length} of {filtered.length}
          </span>
          <div className="flex gap-1.5">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-white/10 px-2.5 py-1 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md border border-white/10 px-2.5 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
