import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Landmark, HardHat, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { Button } from "@/components/ui/button";

const STAKEHOLDERS = [
  {
    icon: Users,
    role: "Citizens",
    accent: "aurora",
    headline: "Know before you go outside.",
    points: ["Real-time AQI for your city", "AI health guidance for the day", "Simple, jargon-free explanations"],
    cta: "/register",
  },
  {
    icon: Landmark,
    role: "Government Agencies",
    accent: "signal",
    headline: "A command center for public health decisions.",
    points: ["National hotspot monitoring", "Automated alert escalation", "Construction & site suitability review"],
    cta: "/register",
  },
  {
    icon: HardHat,
    role: "Analysts & Builders",
    accent: "aurora",
    headline: "De-risk site selection with data.",
    points: ["Construction feasibility scoring", "Root-cause pollution breakdown", "AI-backed site recommendations"],
    cta: "/register",
  },
];

export function Stakeholders() {
  const navigate = useNavigate();
  return (
    <section id="stakeholders" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Built for everyone"
          title="Three roles. Three purpose-built experiences."
          description="Not just different cards — different workflows, navigation, and KPIs for each stakeholder group."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STAKEHOLDERS.map((s, i) => (
            <motion.div
              key={s.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass rounded-xl2 p-7 border-t-2 ${s.accent === "aurora" ? "border-t-aurora/50" : "border-t-signal/50"}`}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: s.accent === "aurora" ? "rgba(45,217,192,0.1)" : "rgba(110,124,255,0.1)",
                  color: s.accent === "aurora" ? "#0B7D70" : "#4F46E5",
                }}
              >
                <s.icon className="h-5.5 w-5.5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-ink-500">{s.role}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-white">{s.headline}</h3>
              <ul className="mt-4 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-300">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: s.accent === "aurora" ? "#0B7D70" : "#4F46E5" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-6 px-0 text-sm text-ink-200 hover:bg-transparent hover:text-white" onClick={() => navigate(s.cta)}>
                Explore workspace <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
