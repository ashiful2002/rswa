import { useLocation, useNavigate } from "react-router-dom";

const useRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const redirect = (delay = 0) => {
    if (delay > 0) {
      setTimeout(() => navigate(from, { replace: true }), delay);
    } else {
      navigate(from, { replace: true });
    }
  };

  return { from, redirect };
};

export default useRedirect;
