import React, { Suspense } from "react";
import BsNavbar from "../BsNAvbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Loading from "../../Components/Loading/Loading";
import { InstallPWABanner } from "../../Components/PWA/InstallPWA";

const RootLayout = () => {
  return (
    <div>
      <BsNavbar />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
      <InstallPWABanner />
    </div>
  );
};

export default RootLayout;
