import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

import { navigation } from "../constants/index";
import PrimaryBtn from "../Components/PrimaryButton";
import { Outlet } from "react-router-dom";

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
        <header className=" mx-auto flex justify-between items-center capitalize bg-green-700 text-white rounded-xl shadow-slate-500">
          <div>
            <a href="/">
              <img
                width={60}
                className="rounded ml-2 sm:ml-4"
                src={logo}
                alt="ashiful islam"
              />
            </a>
          </div>
          {
            <span onClick={handleToggle} className="mr-4 ">
              {toggle ? (
                <ImCross className="md:hidden text-2xl" />
              ) : (
                <FaBars className="md:hidden text-2xl" />
              )}
            </span>
          }
          <nav
            className={`${
              toggle
                ? "flex  absolute top-20 w-screen flex-col list-none overflow-hidden gap-1 items-center py-4 bg-blue-900"
                : "hidden"
            } md:flex md:items-center md:w-auto list-none `}
          >
            <>
              {" "}
              {navigation.map(({ id, title, url }) => {
                return (
                  <li
                    className="sm:m-2 cursor-pointer hover:bg-slate-900 p-4 rounded w-full"
                    onClick={handleMenuIteem}
                    key={id}
                  >
                    <a href={url}>{title}</a>
                  </li>
                );
              })}
              <li
                onClick={handleMenuIteem}
                className="sm:m-2 cursor-pointer  p-4 rounded w-full"
              >
                <a href="#join_us">
                  <PrimaryBtn btnText="Join us" />
                </a>
              </li>
            </>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default CoppiedNav;
