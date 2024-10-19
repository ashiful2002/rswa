import React, { useState } from "react";
import { navigation } from "../constants";
import { ImCross } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import { GiBarStool } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Layout = () => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    console.log("btn is clicking");
    setToggle(!toggle);
  };
  const handleMenuIteem = () => {
    setToggle(false)
}
  return (
    <div>
      <nav className="bg-green-400 flex items-center justify-between p-2">
        <div>
          <h1 className="text-4xl font-bold p-3 text-white ">
            <a href="/">ABCD</a>
          </h1>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-4 text-white capitalize">
            <span onClick={handleToggle} className="text-3xl sm:hidden">
              {toggle ? <FaBars /> : <RxCross2 className="font-bolder" />}
            </span>
            <div className="`${toggle ? 'flex  absolute top-20 w-screen flex-col list-none overflow-hidden gap-1 items-center py-4 bg-blue-900' : 'hidden'} md:flex md:items-center md:w-auto list-none `"></div>
           
           
            {navigation.map((item) => (
              <li
                key={item.id} onClick={handleMenuIteem}
                className={`sm:m-2 cursor-pointer hover:bg-slate-900 p-4 rounded w-full`}
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
