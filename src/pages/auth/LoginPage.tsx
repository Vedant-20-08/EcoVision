import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import { roleHomePath, emailHintForRole } from "@/lib/roleAccess";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = React.useState<UserRole>("public");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const result = login(role, email, password);
      if (!result.success) {
        setLoading(false);
        setError(result.error ?? "Sign in failed. Check your details and try again.");
        return;
      }
      navigate(roleHomePath(role));
    }, 550);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue monitoring air quality intelligence."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-aurora hover:underline">
            Create one
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-aurora hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
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
              Sign in
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-ink-500">
          Access is role-gated: your email must match the selected role's domain policy.
        </p>
      </form>
    </AuthShell>
  );
}
