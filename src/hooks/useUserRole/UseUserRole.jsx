import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user?.role);

  const {
    data: role = "user",
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data?.role || "user";
    },
  });
  return { role, roleLoading: isLoading, isError, error, refetch };
};

export default useUserRole;
