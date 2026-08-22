import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Stakeholders } from "@/components/landing/Stakeholders";
import { LiveAqiPreview } from "@/components/landing/LiveAqiPreview";
import { AiInsightPreview } from "@/components/landing/AiInsightPreview";
import { DashboardShowcase } from "@/components/landing/DashboardShowcase";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-night-900">
      <LandingNavbar />
      <Hero />
      <Features />
      <Stakeholders />
      <LiveAqiPreview />
      <AiInsightPreview />
      <DashboardShowcase />
      <LandingFooter />
    </div>
  );
}
