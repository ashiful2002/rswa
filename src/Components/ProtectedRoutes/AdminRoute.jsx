import React from "react";
import Loading from "../Loading/Loading";
import { Navigate } from "react-router";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  console.log(user, "user from admin ");

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (!user || role !== "superAdmin") {
    return <Navigate to="/forbidden" replace />;
  }
  return children;
};

export default AdminRoute;
