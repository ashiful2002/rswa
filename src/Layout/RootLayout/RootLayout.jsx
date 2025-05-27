import React from "react";
import BsNavbar from "../BsNAvbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const RootLayout = () => {
  return (
    <div>
      <BsNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
