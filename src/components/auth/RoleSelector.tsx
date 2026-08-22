import { motion } from "framer-motion";
import { Users, Landmark, HardHat } from "lucide-react";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const ROLES: Array<{ value: UserRole; label: string; group: string; icon: React.ElementType; description: string }> = [
  { value: "public", label: "Public", group: "Group A", icon: Users, description: "Citizens & residents" },
  { value: "government", label: "Government", group: "Group B", icon: Landmark, description: "Agencies & regulators" },
  { value: "analyst", label: "Analyst / Builder", group: "Group C", icon: HardHat, description: "Planners & developers" },
];

export function RoleSelector({ value, onChange }: { value: UserRole; onChange: (r: UserRole) => void }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-ink-400">I am accessing as</p>
      <div className="grid grid-cols-3 gap-2.5">
        {ROLES.map((r) => {
          const active = value === r.value;
          return (
            <motion.button
              key={r.value}
              type="button"
              onClick={() => onChange(r.value)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3.5 text-center transition-all",
                active
                  ? "border-aurora/40 bg-aurora/[0.08] shadow-glow"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              )}
            >
              <r.icon className={cn("h-5 w-5", active ? "text-aurora" : "text-ink-400")} />
              <span className={cn("text-xs font-semibold", active ? "text-white" : "text-ink-300")}>{r.label}</span>
              <span className="text-[10px] text-ink-500">{r.group}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
