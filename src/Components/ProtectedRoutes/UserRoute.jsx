import React from "react";

import { Navigate, useLocation } from "react-router";
import Loading from "../../Components/Loading/Loading";
 import useUserRole from "../../hooks/useUserRole/UseUserRole";
import useAuth from "../../Hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "user") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default UserRoute;
