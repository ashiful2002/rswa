import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth";

const useUserRole = () => {
  const { user, role: contextRole, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: queryRole, isFetching } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email && !contextRole,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}/role`);
        return res.data?.data?.role || res.data?.role || "donor";
      } catch (err) {
        console.error("Error fetching user role:", err);
        return "donor";
      }
    },
  });

  const role = contextRole || queryRole || "donor";
  const roleLoading = loading || (isFetching && !contextRole);

  return { role, roleLoading };
};

export default useUserRole;
