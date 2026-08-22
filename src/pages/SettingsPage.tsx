import * as React from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, MapPin, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/dashboard/shared/RangeTabs";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { ROLE_LABEL } from "@/lib/navigation";

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [criticalAlerts, setCriticalAlerts] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(false);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={ROLE_LABEL[user.role]} title="Settings" description="Manage your profile, notifications, and preferences." />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account details for this session.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-base">{user.avatarInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display text-base font-semibold text-white">{user.name}</p>
                <p className="text-sm text-ink-400">{user.organization}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="settings-name">Full name</Label>
                <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-email">Email</Label>
                <Input id="settings-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <Button
              className="mt-5"
              size="sm"
              onClick={() => toast({ title: "Profile updated", description: "Your changes have been saved." })}
            >
              Save changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }}>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Switch between Night&apos;s Watch visual modes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                {theme === "nightwatch" ? <Moon className="h-4.5 w-4.5 text-aurora" /> : <Sun className="h-4.5 w-4.5 text-signal" />}
                <div>
                  <p className="text-sm font-medium text-white">{theme === "nightwatch" ? "Night Watch" : "Eclipse"}</p>
                  <p className="text-xs text-ink-500">
                    {theme === "nightwatch" ? "Teal-accented default theme" : "Violet-accented alternate theme"}
                  </p>
                </div>
              </div>
              <Switch checked={theme === "eclipse"} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what you want to be alerted about.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm text-ink-100">Critical AQI alerts</p>
                  <p className="text-xs text-ink-500">Threshold breaches and rapid AQI changes</p>
                </div>
              </div>
              <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm text-ink-100">Weekly digest</p>
                  <p className="text-xs text-ink-500">A summary email every Monday morning</p>
                </div>
              </div>
              <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm text-ink-100">Share precise location</p>
                  <p className="text-xs text-ink-500">Improves accuracy of your local AQI reading</p>
                </div>
              </div>
              <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
