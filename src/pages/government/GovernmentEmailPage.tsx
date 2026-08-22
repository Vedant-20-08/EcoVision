import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { EmailComposer } from "@/components/dashboard/government/EmailComposer";

export default function GovernmentEmailPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Email Alert System"
        title="Compose & Dispatch Advisories"
        description="Frontend simulation — drafts, previews, and a running send history."
      />
      <EmailComposer />
    </div>
  );
}
