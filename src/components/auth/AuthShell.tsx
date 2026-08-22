import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Radar } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-night-900 px-4 py-12">
      <div className="absolute inset-0 bg-grid-glow" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-aurora/[0.06] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aurora/10">
            <Radar className="h-4.5 w-4.5 text-aurora" />
          </div>
          <span className="font-display text-base font-semibold text-white">The Night&apos;s Watch</span>
        </Link>

        <div className="glass-strong rounded-xl2 p-7 sm:p-8">
          <h1 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h1>
          <p className="mt-1.5 text-sm text-ink-400">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-ink-400">{footer}</div>}
      </motion.div>
    </div>
  );
}
