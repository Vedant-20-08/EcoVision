import type { UserRole } from "@/types";
import {
  LayoutDashboard,
  LineChart,
  Bell,
  FileBarChart,
  Map as MapIcon,
  Settings,
  ShieldAlert,
  Mail,
  Building2,
  Sparkles,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  public: [
    { label: "Dashboard", path: "/public", icon: LayoutDashboard },
    { label: "Analytics", path: "/public/analytics", icon: LineChart },
    { label: "Maps", path: "/public/map", icon: MapIcon },
    { label: "Alerts", path: "/public/alerts", icon: Bell },
    { label: "Reports", path: "/public/reports", icon: FileBarChart },
    { label: "Settings", path: "/public/settings", icon: Settings },
  ],
  government: [
    { label: "Command Center", path: "/government", icon: LayoutDashboard },
    { label: "Hotspot Map", path: "/government/map", icon: MapIcon },
    { label: "Alert Center", path: "/government/alerts", icon: ShieldAlert },
    { label: "Email Alerts", path: "/government/email", icon: Mail },
    { label: "Suitability", path: "/government/suitability", icon: Building2 },
    { label: "Reports", path: "/government/reports", icon: FileBarChart },
    { label: "Settings", path: "/government/settings", icon: Settings },
  ],
  analyst: [
    { label: "Dashboard", path: "/analyst", icon: LayoutDashboard },
    { label: "Feasibility", path: "/analyst/feasibility", icon: Compass },
    { label: "Root Cause", path: "/analyst/root-cause", icon: LineChart },
    { label: "Zone Finder", path: "/analyst/zones", icon: MapIcon },
    { label: "AI Advisor", path: "/analyst/advisor", icon: Sparkles },
    { label: "Reports", path: "/analyst/reports", icon: FileBarChart },
    { label: "Settings", path: "/analyst/settings", icon: Settings },
  ],
};

export const ROLE_LABEL: Record<UserRole, string> = {
  public: "Citizen Portal",
  government: "Government Command Center",
  analyst: "Analyst Workspace",
};
