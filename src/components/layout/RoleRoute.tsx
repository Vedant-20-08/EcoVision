import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { roleHomePath } from "@/lib/roleAccess";
import type { UserRole } from "@/types";

/**
 * Guards a nested route tree so only a signed-in user with the matching role
 * can render it — even via a direct URL. A signed-in user of a *different*
 * role is redirected to their own dashboard rather than to login, since
 * they're authenticated, just not authorized for this section.
 */
export function RoleRoute({ allow }: { allow: UserRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allow) return <Navigate to={roleHomePath(user.role)} replace />;

  return <Outlet />;
}
