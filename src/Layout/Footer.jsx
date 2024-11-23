import React from "react";

import logo from "../assets/logo.png";
import SocialSection from "./SocialSection";
import { Divider } from "antd";
import { FaUpLong } from "react-icons/fa6";
import QuickContact from "./QuickContact";
import { Button } from "react-bootstrap";
import Social from "./Social";
import ArrowCom from "../Components/ArrowCom";
import QuiCont from "./QuiCont";
import Copyright from "./Copyright";
import HelpfulLinks from "./HelpfulLinks";

const Footer = () => {
  return (
    <div className=" rounded-sm bg-neutral-800 text-center font-light capitalize tracking-widest text-white">
      <div className="container flex flex-col sm:items-start justify-around  my-3 md:flex-row">
        <div className="">
          <QuiCont />
        </div>
        < >
          <div className="">
            <QuickContact />{" "}
          </div>

          <div className="">
            <Social />
          </div>
        </>
        <div className="">
          <HelpfulLinks />
        </div>

        <div>
          <Divider />
        </div>
      </div>
      <div className="">
        <Copyright />
      </div>
      <div className="">
        <ArrowCom />
      </div>
    </div>
  );
};

export default Footer;
