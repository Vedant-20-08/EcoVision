import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PlayCircle, Satellite, MapPinned, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WatchGlobe } from "./WatchGlobe";
import { FloatingStatCard } from "./FloatingStatCard";
import { REGIONS } from "@/data/regions";

const nationalAvg = Math.round(REGIONS.reduce((s, r) => s + r.aqi, 0) / REGIONS.length);

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="absolute inset-0 bg-grid-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora-line" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-aurora/25 bg-aurora/[0.06] px-3.5 py-1.5 text-xs font-medium text-aurora"
          >
            <Radio className="h-3.5 w-3.5" />
            Live satellite-fused AQI intelligence · National coverage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            A sentinel over
            <br />
            <span className="text-gradient-aurora">every breath of air.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg"
          >
            The Night&apos;s Watch fuses satellite HCHO signatures, ground sensors, traffic,
            weather, and industrial telemetry into a single command layer — giving citizens,
            government agencies, and urban planners one trustworthy view of air quality across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={() => navigate("/register")} className="group">
              Enter the Platform
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}>
              <PlayCircle className="h-4 w-4" />
              See the Dashboards
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center gap-6 text-xs text-ink-500"
          >
            <div className="flex items-center gap-1.5">
              <Satellite className="h-3.5 w-3.5" /> ISRO-grade satellite fusion
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinned className="h-3.5 w-3.5" /> {REGIONS.length} cities monitored
            </div>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <WatchGlobe />
          <FloatingStatCard
            icon={Satellite}
            label="Cities under watch"
            value={REGIONS.length}
            className="left-0 top-4 sm:-left-4"
            delay={0.5}
          />
          <FloatingStatCard
            icon={Radio}
            label="National AQI (avg)"
            value={nationalAvg}
            className="bottom-6 right-0 sm:-right-6"
            delay={0.65}
            floatDelay={1.2}
          />
          <FloatingStatCard
            icon={MapPinned}
            label="Readings fused / day"
            value={2400000}
            className="left-2 bottom-0 hidden sm:block"
            delay={0.8}
            floatDelay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
