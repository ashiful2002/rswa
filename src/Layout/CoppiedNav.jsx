import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

import { navigation } from "../constants/index";
import PrimaryBtn from "../Components/PrimaryButton";
import { Link, Outlet } from "react-router-dom";

const CoppiedNav = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log("is working");
  };
  const handleMenuIteem = () => {
    setToggle(false);
  };
  return (
    <>
      <div className="max-w-full bg-green-700">
        <header className="mx-auto mb-5 flex items-center justify-between rounded-xl bg-green-700 capitalize text-white shadow-slate-500">
          <div>
            <a href="/">
              <img
                width={60}
                className="ml-2 rounded sm:ml-4"
                src={logo}
                alt="ashiful islam"
              />
            </a>
          </div>
          {
            <span onClick={handleToggle} className="mr-4">
              {toggle ? (
                <ImCross className="text-2xl md:hidden" />
              ) : (
                <FaBars className="text-2xl md:hidden" />
              )}
            </span>
          }
          <nav
            className={`${
              toggle
                ? "absolute top-20 flex w-screen list-none flex-col items-center gap-1 overflow-hidden bg-neutral-800 py-4"
                : "hidden"
            } list-none md:flex md:w-auto md:items-center`}
          >
            <>
              {" "}
              {navigation.map(({ id, title, url }) => {
                return (
                  <>
                    <Link
                      className="text-white no-underline"
                      onClick={handleMenuIteem}
                      href={url}
                    >
                      {title}
                      <li
                        className="w-full cursor-pointer rounded p-4 hover:bg-slate-900 sm:m-2"
                        key={id}
                      ></li>
                    </Link>
                  </>
                );
              })}
            </>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default CoppiedNav;
