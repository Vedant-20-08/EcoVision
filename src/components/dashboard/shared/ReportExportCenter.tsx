import * as React from "react";
import { FileText, FileSpreadsheet, FileType, Loader2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ExportFormat = "pdf" | "csv" | "excel";

const FORMATS: Array<{ key: ExportFormat; label: string; icon: React.ElementType; description: string }> = [
  { key: "pdf", label: "PDF", icon: FileText, description: "Formatted regulatory-ready report" },
  { key: "csv", label: "CSV", icon: FileType, description: "Raw readings for further analysis" },
  { key: "excel", label: "Excel", icon: FileSpreadsheet, description: "Spreadsheet with pivot-ready tables" },
];

export function ReportExportCenter({
  reports = ["Regional AQI Summary", "30-Day Trend Report", "Source Attribution Breakdown"],
}: {
  reports?: string[];
}) {
  const { toast } = useToast();
  const [pending, setPending] = React.useState<string | null>(null);

  function handleExport(report: string, format: ExportFormat) {
    const key = `${report}-${format}`;
    setPending(key);
    setTimeout(() => {
      setPending(null);
      toast({
        title: "Export ready",
        description: `${report} (${format.toUpperCase()}) has been generated.`,
      });
    }, 1100);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Export Center</CardTitle>
        <CardDescription>Generate downloadable reports in your preferred format.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div
            key={report}
            className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm font-medium text-ink-100">{report}</p>
            <div className="flex gap-2">
              {FORMATS.map((f) => {
                const key = `${report}-${f.key}`;
                const isPending = pending === key;
                return (
                  <Button
                    key={f.key}
                    size="sm"
                    variant="outline"
                    disabled={pending !== null}
                    onClick={() => handleExport(report, f.key)}
                    className="gap-1.5"
                  >
                    {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <f.icon className="h-3.5 w-3.5" />}
                    {f.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
        <p className="flex items-center gap-1.5 pt-1 text-xs text-ink-500">
          <Download className="h-3.5 w-3.5" /> Exports are simulated in this frontend-only preview.
        </p>
      </CardContent>
    </Card>
  );
}
