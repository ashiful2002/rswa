import React from "react";

import SocialSection from "./SocialSection";
import { Divider } from "antd";
import { FaUpLong } from "react-icons/fa6";
import QuickContact from "./QuickContact";

const Footer = () => {
  const FullYear = new Date().getFullYear();

  return (
    <div>
      <div className="flex flex-col  justify-around items-center md:flex-row-reverse text-center capitalize bg-neutral-700 text-white tracking-widest rounded-sm font-light ">
        <div>
          <p className=" hover:rounded-full hoverEffect">
            <a href="#" className="text-white  hover:text-green-400 text-xl ">
              <FaUpLong className="mt-4" />
            </a>
          </p>
        </div>
        <div className="">
          <h6 className="font-thin text-sm mb-4">social midea links</h6>
          <div className="flex justify-center items-center gap-3">
            <SocialSection />
          </div>
        </div>
        <div className="mx-1">
          <h6 className="font-thin text-sm mb-4 mt-8">Quick Contact</h6>
          <div className="flex justify-between items-center">
            <div className="">
              <h4>RSWA helpline</h4>
              <p className="text-sm text-justify">
                please feel free to contact us if you have any suggestion or
                avdice
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
            <a href="#" className=" text-green-400 mx-2">
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
