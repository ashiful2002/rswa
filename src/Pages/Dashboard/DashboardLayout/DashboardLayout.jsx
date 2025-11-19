import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.png";
const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${"w-"} flex flex-col bg-white shadow-md transition-all duration-300`}
      >
        <div className="flex flex-col justify-between gap-2 border-b p-4">
          <NavLink to="/">
            <h2>Bakk to main page</h2>{" "}
          </NavLink>{" "}
          <NavLink
            to="/dashboard"
            className={`text-xl font-bold text-gray-700 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Dashboard
          </NavLink>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/manage-blood"
                className="block rounded p-2 text-gray-700 hover:bg-gray-200"
              >
                Manage Blood
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard/another"
                className="block rounded p-2 text-gray-700 hover:bg-gray-200"
              >
                Another Page
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
