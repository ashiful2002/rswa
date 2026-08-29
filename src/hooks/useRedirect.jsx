import { useLocation, useNavigate } from "react-router-dom";
import useUserRole from "./useUserRole/UseUserRole";

const useRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role: hookRole } = useUserRole();

  const redirect = (delay = 0, customRole) => {
    const activeRole = customRole || hookRole;
    const isAdminOrStaff =
      activeRole === "super_admin" ||
      activeRole === "admin" ||
      activeRole === "moderator";
    const defaultPath = isAdminOrStaff ? "/dashboard" : "/";

    let target = location.state?.from?.pathname;
    if (target === "/dashboard" && !isAdminOrStaff) {
      target = "/";
    }
    if (!target) {
      target = defaultPath;
    }

    if (delay > 0) {
      setTimeout(() => navigate(target, { replace: true }), delay);
    } else {
      navigate(target, { replace: true });
    }
  };

  const isAdminOrStaff =
    hookRole === "super_admin" ||
    hookRole === "admin" ||
    hookRole === "moderator";
  const defaultPath = isAdminOrStaff ? "/dashboard" : "/";
  let from = location.state?.from?.pathname;
  if (from === "/dashboard" && !isAdminOrStaff) {
    from = "/";
  }
  if (!from) {
    from = defaultPath;
  }

  return { from, redirect };
};

export default useRedirect;
