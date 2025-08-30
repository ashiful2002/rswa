import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import GoogleSignInButton from "../SignIn/GoogleLoginButton/GoogleLoginButton";

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
    console.log(formData);
  };

  return (
    <div className="max--[80vh] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700" htmlFor="username">
            Username
          </label>
          <div className="flex items-center rounded border px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="mr-2 text-gray-400" />
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700" htmlFor="email">
            Email
          </label>
          <div className="flex items-center rounded border px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="mr-2 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="flex items-center rounded border px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="mr-2 text-gray-400" />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="flex items-center rounded border px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="mr-2 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Sign Up
        </button>
        <GoogleSignInButton />
        {/* Already have an account */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
