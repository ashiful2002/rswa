import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useRedirect from "../../../hooks/useRedirect";

const GoogleSignin = () => {
  const { GoogleSignin } = useAuth();
  const { redirect } = useRedirect();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    GoogleSignin()
      .then(async (res) => {
        const user = res.user;
        const token = await user.getIdToken();
        window.firebaseToken = token;

        const userData = {
          displayName: user.displayName,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "donor",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        try {
          await axiosSecure.post("/users", userData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (postErr) {
          console.error("Failed to sync user with backend:", postErr);
        }

        redirect();
      })
      .catch((err) => {
        console.error("Google login error:", err);
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="shadow-xs flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700/80"
    >
      <svg
        aria-label="Google logo"
        width="18"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="shrink-0"
      >
        <g>
          <path d="m0 0H512V512H0" fill="transparent" />
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          />
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          />
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          />
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          />
        </g>
      </svg>
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleSignin;
