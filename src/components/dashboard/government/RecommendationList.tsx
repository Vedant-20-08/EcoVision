import { motion } from "framer-motion";
import { Flame, Car, Factory, HardHat, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AiRecommendation, SourceType } from "@/types";

const SOURCE_ICONS: Record<SourceType, React.ElementType> = {
  traffic: Car,
  farm: Flame,
  industry: Factory,
  construction: HardHat,
};

const SOURCE_COLORS: Record<SourceType, string> = {
  traffic: "#4F46E5",
  farm: "#8A6200",
  industry: "#C81E1E",
  construction: "#067647",
};

export function RecommendationList({ recommendations }: { recommendations: AiRecommendation[] }) {
  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => {
        const Icon = SOURCE_ICONS[rec.sourceType];
        const color = SOURCE_COLORS[rec.sourceType];
        return (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <Card className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-semibold text-white">{rec.trigger}</h3>
                      <span className="text-xs text-ink-500">{rec.region}</span>
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-aurora">
                      <Sparkles className="h-3.5 w-3.5" /> {rec.action}
                    </p>
                    <p className="mt-1 text-xs text-ink-400">{rec.detail}</p>

                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex justify-between text-[11px] text-ink-500">
                          <span>Confidence</span>
                          <span className="font-medium text-ink-300">{rec.confidence}%</span>
                        </div>
                        <Progress value={rec.confidence} />
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-[11px] text-ink-500">
                          <span>Impact score</span>
                          <span className="font-medium text-ink-300">{rec.impactScore}%</span>
                        </div>
                        <Progress value={rec.impactScore} indicatorClassName="bg-signal" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
