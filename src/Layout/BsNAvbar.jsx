import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "../Components/shared/ThemeToggle";

function BsNavbar() {
  const { user, SignOutUser } = useAuth();
  const [expanded, setExpanded] = useState(false);

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
      className="border-b border-slate-100 bg-white/95 py-2 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" onClick={closeMenu} className="inline-block">
            <img
              src={logo}
              alt="RSWA Logo"
              className="h-auto w-14 object-contain transition-transform duration-200 hover:scale-105 sm:w-16"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="rounded-lg border border-slate-200 p-2 focus:shadow-none focus:outline-none dark:border-slate-700"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="my-md-0 my-2 ms-auto items-start gap-1">
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

            {user && (
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

          <div className="ms-md-3 mt-md-0 mt-2 flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <button
                onClick={handleLogOut}
                className="cursor-pointer rounded-full border-0 bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 active:scale-95"
              >
                Log out
              </button>
            ) : (
              <></>
              // <Link
              //   to="/signin"
              //   onClick={closeMenu}
              //   className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium text-sm px-5 py-2 rounded-full transition-all duration-200 shadow-sm border-0 no-underline inline-block text-center"
              // >
              //   Sign in
              // </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BsNavbar;
