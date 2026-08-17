import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase.init";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        }

        if (status === 401) {
          auth.signOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
