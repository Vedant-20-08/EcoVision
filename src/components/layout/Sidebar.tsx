import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, ChevronsRight, Radar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NAV_BY_ROLE } from "@/lib/navigation";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [pinned, setPinned] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);

  if (!user) return null;
  const items = NAV_BY_ROLE[user.role];
  const expanded = pinned || hovered;

  return (
    <TooltipProvider delayDuration={200}>
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: expanded ? 240 : 72 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 hidden shrink-0 flex-col border-r border-white/[0.06] bg-night-900/80 backdrop-blur-xl lg:flex"
      >
        <div className="flex h-16 items-center gap-2.5 px-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-aurora/10">
            <Radar className="h-4.5 w-4.5 text-aurora" />
            <span className="absolute inset-0 rounded-lg border border-aurora/30 animate-pulse-glow" />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap font-display text-sm font-semibold text-white"
              >
                Night&apos;s Watch
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {items.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            const link = (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-ink-400 hover:text-ink-100 hover:bg-white/[0.04]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-aurora/[0.12] border border-aurora/20"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <Icon className={cn("relative h-4.5 w-4.5 shrink-0", active && "text-aurora")} />
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && expanded && (
                  <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-aurora shadow-[0_0_8px_#2DD9C0]" />
                )}
              </NavLink>
            );

            if (expanded) return link;
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          <button
            onClick={() => setPinned((p) => !p)}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg text-ink-400 transition-colors hover:bg-white/[0.05] hover:text-ink-100"
          >
            {pinned ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
            <AnimatePresence>
              {expanded && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs">
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
