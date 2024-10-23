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
        <div className="">
          <h6 className="font-thin text-sm mb-4 mt-8">Quick Contact</h6>
          <div className="flex justify-around items-center">
            <div className="">
              {/* <iframe

                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142900.14060944278!2d89.74343069370751!3d25.580170515623735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd4d68f59bde91%3A0x7d341ddcc8cfec74!2z4Kaw4KeM4Kau4Ka-4Kaw4KeAIOCmieCmquCmnOCnh-CmsuCmvg!5e1!3m2!1sbn!2sbd!4v1729715979451!5m2!1sbn!2sbd"
                width="600"
                height="450"
                
                allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe> */}
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
