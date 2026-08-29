import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import GoogleSignInButton from "./GoogleLoginButton/GoogleLoginButton";
import SEO from "../../Components/shared/SEO";
import useAuth from "../../hooks/useAuth";
import useRedirect from "../../hooks/useRedirect";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

const Signin = () => {
  const { signin } = useAuth();
  const { redirect } = useRedirect();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signin(formData.email, formData.password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      window.firebaseToken = token;

      let loggedInRole = "donor";
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.USERS}/${user.email?.toLowerCase()}/role`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        loggedInRole =
          response?.data?.data?.role || response?.data?.role || "donor";
      } catch (roleErr) {
        console.error("Failed to load user role on login:", roleErr);
      }

      Swal.fire({
        icon: "success",
        title: "Signed In Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      redirect(0, loggedInRole);
    } catch (err) {
      console.error("Sign in error:", err);
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: err.message || "Invalid email or password.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12 transition-colors duration-200 dark:bg-slate-950">
      <SEO
        title="Sign In | RSWA"
        description="Sign in to your RSWA account to access donor features, volunteer updates, and management tools."
      />

      <div className="w-full max-w-md rounded-3xl border border-slate-200 p-8 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            Welcome Back
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Sign in to continue to RSWA Portal
          </p>
        </div>

        {/* Google Authentication Button */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          <span className="absolute px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            Or Sign In With Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Username */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="email"
            >
              Email or Username
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
              <FaUser className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
              <FaLock className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign up Link */}
          <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Sign up now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
