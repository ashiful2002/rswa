import { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../hooks/useAuth";
import DashboardSkeleton from "../Dashboard/DashboardSkeleton";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <DashboardSkeleton />;
  }

  const isAllowed =
    Boolean(user) &&
    (role === "super_admin" || role === "admin" || role === "moderator");

  if (!user || !isAllowed) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>;
};

export default AdminRoute;
