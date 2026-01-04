import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import GoogleSignInButton from "./GoogleLoginButton/GoogleLoginButton";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign In</h2>

        {/* Username */}
        {/* <div className="mb-4">
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
        </div> */}

        {/* Password */}
        {/* <div className="mb-4">
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
        </div> */}

        {/* Submit */}
        {/* <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Log in
        </button> */}
        <GoogleSignInButton />
        {/* Sign up */}
        {/* <p className="text-center text-gray-600">
          New User?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up now!
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default Signin;
