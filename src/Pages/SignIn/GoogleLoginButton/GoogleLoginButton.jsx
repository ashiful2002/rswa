import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const GoogleSignInButton = () => {
  const { GoogleSignin } = useAuth() || {}; // fallback

  const handleGoogleSignIn = async () => {
    if (!GoogleSignin) return;
    try {
      const result = await GoogleSignin();
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors mb-4"
    >
      <FcGoogle className="text-xl" />
      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
