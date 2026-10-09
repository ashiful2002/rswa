import { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../hooks/useAuth";
import DashboardSkeleton from "../Dashboard/DashboardSkeleton";

/**
 * Route protection wrapper for features accessible to Moderators, Admins, and Super Admins.
 * Allows roles: 'super_admin', 'admin', 'moderator'
 */
const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <DashboardSkeleton />;
  }

  // Not logged in -> redirect to signin with return location
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Allowed roles: super_admin, admin, moderator
  const isAllowed =
    role === "super_admin" || role === "admin" || role === "moderator";

  if (!isAllowed) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>;
};

export default SuperAdminRoute;
