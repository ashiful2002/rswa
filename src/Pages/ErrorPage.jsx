import React from "react";
import PageTitle from "../Components/PageTitle";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mx-auto px-4">
      <PageTitle title="Error" />
      <div className="flex h-[80vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 animate-pulse text-6xl font-extrabold text-green-600">
          404
        </h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">
          Oops! Page Not Found.
        </h2>
        <p className="mb-8 max-w-md text-gray-600">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-green-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
