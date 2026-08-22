import * as React from "react";
import { motion } from "framer-motion";
import { Send, Eye, Mail, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RegionSelector } from "@/components/dashboard/shared/RegionSelector";
import { EMAIL_HISTORY as INITIAL_HISTORY } from "@/data/alerts";
import { getRegion, DEFAULT_REGION } from "@/data/regions";
import { generateIncidentSummary } from "@/data/aiInsights";
import { useToast } from "@/hooks/use-toast";
import { formatTimestamp } from "@/lib/utils";
import type { EmailAlertRecord } from "@/types";

export function EmailComposer() {
  const { toast } = useToast();
  const [regionId, setRegionId] = React.useState(DEFAULT_REGION.id);
  const [recipients, setRecipients] = React.useState("district-control-room@gov.in");
  const [subject, setSubject] = React.useState("");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [history, setHistory] = React.useState<EmailAlertRecord[]>(INITIAL_HISTORY);

  const region = getRegion(regionId);
  const body = generateIncidentSummary(region);
  const resolvedSubject = subject || `Air Quality Advisory — ${region.name}`;

  function handleSend() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setPreviewOpen(false);
      const record: EmailAlertRecord = {
        id: `em-${Date.now()}`,
        subject: resolvedSubject,
        recipients: recipients.split(",").map((r) => r.trim()).filter(Boolean),
        body,
        sentAt: new Date().toISOString(),
        status: "sent",
        region: region.name,
      };
      setHistory((h) => [record, ...h]);
      toast({ title: "Alert sent", description: `${resolvedSubject} delivered to ${record.recipients.length} recipient(s).` });
      setSubject("");
    }, 900);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compose Alert</CardTitle>
          <CardDescription>Draft an advisory sourced from live regional conditions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Region</Label>
            <RegionSelector value={regionId} onChange={setRegionId} className="w-full" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="recipients">Recipients</Label>
            <Input id="recipients" value={recipients} onChange={(e) => setRecipients(e.target.value)} placeholder="comma-separated emails" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={`Air Quality Advisory — ${region.name}`} />
          </div>
          <div className="space-y-1.5">
            <Label>Auto-generated body</Label>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm text-ink-300">{body}</div>
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="outline" onClick={() => setPreviewOpen(true)} className="gap-1.5">
              <Eye className="h-4 w-4" /> Preview Email
            </Button>
            <Button onClick={handleSend} disabled={sending} className="gap-1.5">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
          <CardDescription>{history.length} advisories sent</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[420px] space-y-3 overflow-y-auto no-scrollbar">
          {history.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-white">{e.subject}</p>
                  <span className="shrink-0 rounded-full bg-aqi-good/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-aqiText-good">
                    {e.status}
                  </span>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-500">
                  <Mail className="h-3 w-3" /> {e.recipients.join(", ")}
                </p>
                <p className="mt-1 text-xs text-ink-500">{formatTimestamp(e.sentAt)}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>This is how the advisory will appear to recipients.</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-white/10 bg-night-800 p-4">
            <p className="text-xs text-ink-500">To: {recipients}</p>
            <p className="mt-1 font-display text-sm font-semibold text-white">{resolvedSubject}</p>
            <div className="my-3 h-px bg-white/10" />
            <p className="text-sm leading-relaxed text-ink-300">{body}</p>
          </div>
          <Button onClick={handleSend} disabled={sending} className="mt-4 w-full gap-1.5">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Now
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
