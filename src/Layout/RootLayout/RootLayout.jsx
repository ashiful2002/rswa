import React, { Suspense } from "react";
import BsNavbar from "../BsNAvbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Loading from "../../Components/Loading/Loading";

const RootLayout = () => {
  return (
    <div>
      <BsNavbar />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default RootLayout;
