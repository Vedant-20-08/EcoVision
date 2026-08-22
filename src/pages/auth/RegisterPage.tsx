import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Building2, ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import { roleHomePath, emailHintForRole } from "@/lib/roleAccess";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<UserRole>("public");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 4) {
      setError("Choose a password with at least 4 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, role, organization);
      if (!result.success) {
        setLoading(false);
        setError(result.error ?? "We couldn't create your account. Check your details and try again.");
        return;
      }
      navigate(roleHomePath(role));
    }, 550);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Get access to real-time air quality intelligence tailored to your role."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-aurora hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <RoleSelector
          value={role}
          onChange={(r) => {
            setRole(r);
            setError(null);
          }}
        />

        <div className="flex items-start gap-2 rounded-lg border border-signal/20 bg-signal/[0.05] px-3 py-2.5 text-xs text-ink-400">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
          {emailHintForRole(role)}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <Input id="name" required placeholder="Aarav Mehta" className="pl-9" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="org">
              {role === "government" ? "Agency" : role === "analyst" ? "Firm" : "Organization"} <span className="text-ink-500">(optional)</span>
            </Label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <Input id="org" placeholder="e.g. CPCB, Urban Intel" className="pl-9" value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <Input
              id="email"
              type="email"
              required
              placeholder={role === "government" ? "you@agency.gov.in" : role === "analyst" ? "you@yourfirm.com" : "you@example.com"}
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <Input
              id="password"
              type="password"
              required
              placeholder="Create a strong password"
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-aqi-hazardous/30 bg-aqi-hazardous/[0.06] px-3 py-2.5 text-sm text-aqiText-hazardous">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full group" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
