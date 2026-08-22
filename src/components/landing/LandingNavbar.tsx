import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Radar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Stakeholders", href: "#stakeholders" },
  { label: "Live AQI", href: "#live-aqi" },
  { label: "Platform", href: "#showcase" },
];

export function LandingNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-night-900/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-aurora/10">
            <Radar className="h-4.5 w-4.5 text-aurora" />
            <span className="absolute inset-0 rounded-lg border border-aurora/30 animate-pulse-glow" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-white">The Night&apos;s Watch</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-300 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button size="sm" onClick={() => navigate("/register")}>
            Get Access
          </Button>
        </div>

        <button className="p-2 text-ink-200 md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-night-900/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1.5 text-sm text-ink-300">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/login")}>
                Sign in
              </Button>
              <Button className="flex-1" onClick={() => navigate("/register")}>
                Get Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
