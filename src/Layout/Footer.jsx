import React from "react";

import logo from "../assets/logo.png";
import SocialSection from "./SocialSection";
import { Divider } from "antd";
import { FaUpLong } from "react-icons/fa6";
import QuickContact from "./QuickContact";
import { Button } from "react-bootstrap";

const Footer = () => {
  const FullYear = new Date().getFullYear();

  return (
    <div>
      <div className="flex flex-col items-center justify-around rounded-sm bg-neutral-700 text-center font-light capitalize tracking-widest text-white md:flex-row-reverse">
        <div>
          <p className="hoverEffect hover:rounded-full">
            <a href="#" className="text-xl text-white hover:text-green-400">
              <FaUpLong className="mt-4" />
            </a>
          </p>
        </div>
        <div className="">
          <h5 className="h6 mb-4 text-sm font-thin">social midea links</h5>
          <div className="flex flex-col items-center justify-center gap-3">
            <SocialSection />
          </div>
        </div>
        <div className="mx-1">
          <div className="mb-6 mt-8">
            <h6 className="h6 text-sm font-thin">Quick Contact</h6>
          </div>

          <Button
            className="mb-2"
            variant="success"
            onClick={() => navigate("/")}
          >
            {" "}
          </Button>
          <div className="flex flex-col items-center justify-between">
            <div className="my-2">
              <div className="allCenter">
                <img src={logo} width={60} alt="RSWA" className="mb-2" />
              </div>
              <p className="text-sm">
                If you have any Query please feel free to contact us.
              </p>
            </div>
            <div>
              <QuickContact />
            </div>
          </div>
        </div>
        <Divider plain />
        <div>
          <p className="text-sm">
            Copyright © {FullYear}
            <a href="#" className="mx-2 text-green-400">
              RSWA
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
