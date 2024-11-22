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
    <div className="rounded-sm bg-neutral-700 text-center font-light capitalize tracking-widest text-white">
      <div className=" flex flex-col sm:items-start justify-around  m-3 md:flex-row-reverse">
        <div className="">
          <ArrowCom />
        </div>
        <div className="">
          <Social />
        </div>
        <div className="">
          <HelpfulLinks />
        </div>
        <div className="">
          <QuiCont />
        </div>
        <div>
          <Divider />
        </div>
      </div>
      <div className="">
        <Copyright />
      </div>
    </div>
  );
};

export default Footer;
