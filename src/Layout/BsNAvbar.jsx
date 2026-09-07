import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole/UseUserRole";
import ThemeToggle from "../Components/shared/ThemeToggle";
import { InstallPWAButton } from "../Components/PWA/InstallPWA";

function BsNavbar() {
  const { user, SignOutUser } = useAuth();
  const { role } = useUserRole();
  const [expanded, setExpanded] = useState(false);

  const canAccessDashboard =
    role === "super_admin" || role === "admin" || role === "moderator";

  const handleLogOut = () => {
    SignOutUser();
    setExpanded(false);
  };

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      sticky="top"
      expand="md"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
      className="/95 border-b border-slate-100 py-2 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95"
    >
      <Container>
        {/* Brand Logo & Name */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 no-underline"
        >
          <img
            src={logo}
            alt="RSWA Logo"
            className="h-16 w-16 object-cover transition-transform hover:scale-105"
          />
          {/* <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            RSWA
          </span> */}
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <InstallPWAButton className="!px-2.5 !py-1 text-[11px]" />
          <ThemeToggle />
          <Navbar.Toggle aria-controls="rswa-navbar-nav" />
        </div>

        {/* Navigation Content */}
        <Navbar.Collapse id="rswa-navbar-nav">
          <Nav className="mx-auto my-2 flex gap-1 md:my-0">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium capitalize no-underline transition-all ${
                    isActive
                      ? "bg-emerald-50/80 font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}

            {user && canAccessDashboard && (
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium capitalize no-underline transition-all ${
                    isActive
                      ? "bg-emerald-50/80 font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </Nav>

          {/* User Auth Buttons / Profile & Theme Toggle */}
          <div className="flex items-center justify-end gap-3 pt-2 md:pt-0">
            <div className="hidden md:flex md:items-center md:gap-2">
              <InstallPWAButton />
              <ThemeToggle />
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-xs font-semibold text-slate-600 dark:text-slate-300 lg:inline">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogOut}
                  className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-red-700 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  onClick={closeMenu}
                  className="rounded-full border border-emerald-600 px-4 py-1.5 text-xs font-semibold text-emerald-600 no-underline transition-all hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white no-underline transition-all hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BsNavbar;
