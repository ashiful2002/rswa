import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import GoogleSignInButton from "../SignIn/GoogleLoginButton/GoogleLoginButton";
import SEO from "../../Components/shared/SEO";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12 transition-colors duration-200 dark:bg-slate-950">
      <SEO
        title="Sign Up | RSWA"
        description="Create an account to register as a blood donor, join volunteer programs, and support RSWA social initiatives."
      />

      <div className="w-full max-w-md rounded-3xl border border-slate-200 p-8 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            Create Account
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Join RSWA community and make an impact
          </p>
        </div>

        {/* Google Authentication Button */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          <span className="absolute px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            Or Register With Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="username"
            >
              Full Name / Username
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
              <FaUser className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
              <FaEnvelope className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
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
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
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

          {/* Confirm Password */}
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
              <FaLock className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99]"
          >
            Create Account
          </button>

          {/* Already have an account */}
          <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
