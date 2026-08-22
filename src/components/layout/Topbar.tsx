import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Moon, Sun, LogOut, Settings, User, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALERTS } from "@/data/alerts";
import { REGIONS } from "@/data/regions";
import { AQI_CATEGORIES, categoryForAqi } from "@/data/aqiCategories";
import { ROLE_LABEL } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const nationalAvg = Math.round(REGIONS.reduce((s, r) => s + r.aqi, 0) / REGIONS.length);
const nationalMeta = AQI_CATEGORIES[categoryForAqi(nationalAvg)];

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const unacknowledged = ALERTS.filter((a) => !a.acknowledged).length;
  const results = query ? REGIONS.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())) : [];

  if (!user) return null;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/[0.06] bg-night-900/70 px-4 backdrop-blur-xl sm:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-ink-300 hover:bg-white/[0.06] lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden text-sm text-ink-400 lg:block">
        <span className="font-display font-medium text-white">{ROLE_LABEL[user.role]}</span>
      </div>

      {/* Global Search */}
      <div className="relative ml-2 flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
          placeholder="Search regions, reports, alerts…"
          className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-colors focus:border-aurora/40 focus:bg-white/[0.05]"
        />
        <AnimatePresence>
          {searchOpen && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute left-0 top-11 w-full overflow-hidden rounded-lg border border-white/10 bg-night-800/95 backdrop-blur-xl shadow-glass"
            >
              {results.slice(0, 5).map((r) => (
                <button
                  key={r.id}
                  className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-ink-200 hover:bg-white/[0.06]"
                  onMouseDown={() => {
                    setQuery("");
                    setSearchOpen(false);
                  }}
                >
                  <span>{r.name}, {r.state}</span>
                  <span className="font-display text-xs font-semibold" style={{ color: AQI_CATEGORIES[r.category].color }}>
                    AQI {r.aqi}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* National AQI Status Indicator */}
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 md:flex">
        <span
          className="h-2 w-2 rounded-full animate-pulse-glow"
          style={{ backgroundColor: nationalMeta.color, boxShadow: `0 0 8px ${nationalMeta.color}` }}
        />
        <span className="text-xs text-ink-400">National AQI</span>
        <span className="font-display text-sm font-semibold" style={{ color: nationalMeta.color }}>
          {nationalAvg}
        </span>
      </div>

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-300 transition-colors hover:bg-white/[0.06] hover:text-white"
        title={theme === "nightwatch" ? "Switch to Eclipse" : "Switch to Night Watch"}
      >
        {theme === "nightwatch" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
      </button>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-300 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Bell className="h-4.5 w-4.5" />
            {unacknowledged > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqi-hazardous opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aqi-hazardous" />
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications ({unacknowledged} new)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ALERTS.slice(0, 4).map((a) => (
            <DropdownMenuItem key={a.id} className="flex-col items-start gap-0.5 py-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-semibold text-white">{a.region}</span>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase",
                    a.severity === "critical" && "text-aqiText-hazardous",
                    a.severity === "high" && "text-aqiText-unhealthy",
                    a.severity === "medium" && "text-aqiText-moderate",
                    a.severity === "low" && "text-aqiText-good"
                  )}
                >
                  {a.severity}
                </span>
              </div>
              <p className="text-xs text-ink-400 line-clamp-2">{a.title}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-white/[0.06]">
            <Avatar>
              <AvatarFallback>{user.avatarInitials}</AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden h-3.5 w-3.5 text-ink-400 sm:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="normal-case">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs font-normal text-ink-500">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-aqiText-unhealthy focus:text-aqiText-unhealthy"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
