import React from "react";
import Loading from "../Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  const isAllowed =
    Boolean(user) &&
    (role === "super_admin" || role === "admin" || role === "moderator");

  if (!user || !isAllowed) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
