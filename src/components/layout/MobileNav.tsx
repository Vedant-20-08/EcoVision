import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Radar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NAV_BY_ROLE } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return null;
  const items = NAV_BY_ROLE[user.role];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-night-950/70 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-night-900 border-r border-white/10 lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aurora/10">
                  <Radar className="h-4.5 w-4.5 text-aurora" />
                </div>
                <span className="font-display text-sm font-semibold text-white">Night&apos;s Watch</span>
              </div>
              <button onClick={onClose} className="rounded-lg p-1.5 text-ink-400 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-2">
              {items.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                      active ? "bg-aurora/[0.12] text-white border border-aurora/20" : "text-ink-400 hover:bg-white/[0.05]"
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
