import { Link, useNavigate } from "react-router-dom";
import { Radar } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  { title: "Platform", links: ["Features", "Live AQI", "Dashboards", "API (coming soon)"] },
  { title: "Stakeholders", links: ["Citizens", "Government", "Analysts & Builders"] },
  { title: "Resources", links: ["Documentation", "Methodology", "Data Sources"] },
];

export function LandingFooter() {
  const navigate = useNavigate();
  return (
    <footer className="relative border-t border-white/[0.06] py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aurora/10">
                <Radar className="h-4.5 w-4.5 text-aurora" />
              </div>
              <span className="font-display text-sm font-semibold text-white">The Night&apos;s Watch</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-400">
              AI-powered air quality intelligence and environmental feasibility platform, built for
              India&apos;s cities, agencies, and builders.
            </p>
            <Button size="sm" className="mt-5" onClick={() => navigate("/register")}>
              Get Access
            </Button>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-default text-sm text-ink-400 transition-colors hover:text-ink-200">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">© {new Date().getFullYear()} The Night&apos;s Watch. Built for the ISRO Bharatiya Antariksh Hackathon.</p>
          <p className="text-xs text-ink-500">Mock data · Frontend prototype · Backend integration ready</p>
        </div>
      </div>
    </footer>
  );
}
