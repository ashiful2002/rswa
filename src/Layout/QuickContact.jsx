import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const QuickContact = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-around text-sm">
        <div className="flex items-center justify-center  ">
          {" "}
          <p className="mx-2">
            <CiLocationOn className="text-lg text-green-500" />
          </p>
          <a
            href="https://maps.app.goo.gl/KTsGv78EpHn1HU7A9" 
            className="mx-2 text-white no-underline "
          >
            {" "}
            <p className="hover:text-green-500">Rowmari,Kurigram</p>
          </a>{" "}
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <p className="mx-2">
            <FaPhone className="text-lg text-green-500" />
          </p>{" "}
          <a href="tel:01727-475744" className="mx-2 text-white no-underline" target="_blank">
            {" "}
            <p className="hover:text-green-500">+880 1727-475744</p>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <MdEmail className="text-lg text-green-500" />{" "}
          <a
            className="mx-2 text-white"
            href="mailto:rswaofficial.est2009@gmail.com"
          >
           <span className="hover:text-green-500 lowercase"> rswaofficial.est2009@gmail.com</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default QuickContact;
