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
      <div className="flex flex-col items-center justify-around md:flex-row-reverse">
        <div>
          <ArrowCom />
        </div>
        <div>
          <Social />
        </div>
        <div>
          <HelpfulLinks />
        </div>
        <div>
          <QuiCont />
        </div>
        <div>
          <Divider />
        </div>
      </div>
      <div>
        <Copyright />
      </div>
    </div>
  );
};

export default Footer;
