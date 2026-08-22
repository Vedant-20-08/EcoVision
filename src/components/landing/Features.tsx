import { motion } from "framer-motion";
import { Satellite, BrainCircuit, MapPinned, ShieldAlert, TrendingUp, FileBarChart } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";

const FEATURES = [
  {
    icon: Satellite,
    title: "Satellite Data Fusion",
    description: "Combines HCHO hotspot signatures, ground sensors, traffic, weather, and industrial telemetry into one unified reading.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Generated Insights",
    description: "Automated root-cause analysis, incident summaries, and site recommendations generated from live conditions.",
  },
  {
    icon: MapPinned,
    title: "Interactive Hotspot Mapping",
    description: "Layered geographic visualization of farms, highways, construction, and industrial emission sources.",
  },
  {
    icon: ShieldAlert,
    title: "Threshold-Based Alerting",
    description: "Automatic escalation when AQI crosses safety thresholds or shifts more than 10% in 24 hours.",
  },
  {
    icon: TrendingUp,
    title: "What-If Simulation",
    description: "Model the AQI impact of policy interventions — reduced traffic, halted burning, tighter emission controls.",
  },
  {
    icon: FileBarChart,
    title: "Exportable Intelligence",
    description: "Generate PDF, CSV, and Excel reports ready for regulatory submission or public disclosure.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything a national air-quality command layer needs"
          description="Built for the full spectrum of decision-makers — from a citizen checking today's jog to a ministry approving a hospital site."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-hover glass rounded-xl2 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aurora/10 text-aurora">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
