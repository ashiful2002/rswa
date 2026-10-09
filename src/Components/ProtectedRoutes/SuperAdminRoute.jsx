import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../hooks/useAuth";
import DashboardSkeleton from "../Dashboard/DashboardSkeleton";

/**
 * Route protection wrapper for Super Admin only features.
 * Ensures only authenticated users with the 'super_admin' role can access the wrapped page.
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

  // Logged in but not super_admin -> redirect to dashboard home
  if (role !== "super_admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default SuperAdminRoute;
