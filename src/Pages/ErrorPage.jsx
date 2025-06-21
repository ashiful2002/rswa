import React from "react";
import PageTitle from "../Components/PageTitle";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="mx-auto px-4">
      <PageTitle title="Error" />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-6xl font-extrabold text-green-600 mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Oops! Page Not Found.
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
