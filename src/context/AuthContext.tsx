import * as React from "react";
import type { AuthUser, UserRole } from "@/types";
import { validateEmailForRole } from "@/lib/roleAccess";

export interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email: string, password: string) => AuthResult;
  logout: () => void;
  register: (name: string, email: string, role: UserRole, organization?: string) => AuthResult;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "nightswatch.session";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "User";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

const ROLE_DEFAULTS: Record<UserRole, { organization: string }> = {
  public: { organization: "Citizen Account" },
  government: { organization: "Government Agency" },
  analyst: { organization: "Analyst / Builder Firm" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  React.useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = React.useCallback((role: UserRole, email: string, password: string): AuthResult => {
    if (!password || password.length < 4) {
      return { success: false, error: "Enter your password." };
    }
    const check = validateEmailForRole(email, role);
    if (!check.valid) {
      return { success: false, error: check.error };
    }
    const resolvedName = nameFromEmail(email);
    setUser({
      id: `usr-${role}-${Date.now()}`,
      name: resolvedName,
      email: email.trim().toLowerCase(),
      role,
      organization: ROLE_DEFAULTS[role].organization,
      avatarInitials: initials(resolvedName),
    });
    return { success: true };
  }, []);

  const register = React.useCallback(
    (name: string, email: string, role: UserRole, organization?: string): AuthResult => {
      const check = validateEmailForRole(email, role);
      if (!check.valid) {
        return { success: false, error: check.error };
      }
      const resolvedName = name.trim() || nameFromEmail(email);
      setUser({
        id: `usr-${role}-${Date.now()}`,
        name: resolvedName,
        email: email.trim().toLowerCase(),
        role,
        organization: organization || ROLE_DEFAULTS[role].organization,
        avatarInitials: initials(resolvedName),
      });
      return { success: true };
    },
    []
  );

  const logout = React.useCallback(() => setUser(null), []);

  const value = React.useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout, register }),
    [user, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
