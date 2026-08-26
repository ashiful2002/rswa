import React, { useState } from "react";
import { navigation } from "../constants";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Layout = () => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    console.log("btn is clicking");
    setToggle(!toggle);
  };
  const handleMenuIteem = () => {
    setToggle(false);
  };
  return (
    <div>
      <nav className="flex items-center justify-between bg-green-400 p-2">
        <div>
          <h1 className="p-3 text-4xl font-bold text-white">
            <a href="/">ABCD</a>
          </h1>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-4 capitalize text-white">
            <span onClick={handleToggle} className="text-3xl sm:hidden">
              {toggle ? <FaBars /> : <RxCross2 className="font-bolder" />}
            </span>
            <div className="`${toggle ? 'flex bg-blue-900' : 'hidden'} ` absolute top-20 w-screen list-none flex-col items-center gap-1 overflow-hidden py-4 md:flex md:w-auto md:items-center"></div>

            {navigation.map((item) => (
              <li
                key={item.id}
                onClick={handleMenuIteem}
                className={`w-full cursor-pointer rounded p-4 hover:bg-slate-900 sm:m-2`}
              >
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
