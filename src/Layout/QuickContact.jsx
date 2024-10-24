import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const QuickContact = () => {
  return (
    <>
      <div className="flex items-center justify-around flex-col text-sm">
        
       
          <div className="flex items-center justify-center ">
            {" "}
            <p className="mx-2">
              <CiLocationOn className="text-green-500 text-lg" />
            </p>{" "}
            <p>Rowmari,Kurigram</p>
          </div>
          <div className="flex items-center justify-center ">
            {" "}
            <p className="mx-2">
              <FaPhone className="text-green-500 text-lg" />
            </p>{" "}
            <p>+880 1727-475744</p>
          </div>
          <div className="flex items-center justify-center">
            <MdEmail className="text-green-500  text-lg" />{" "}
            <a
              className="text-white mx-2"
              href="mailto:rswaofficial.est2009@gmail.com"
            >
              rswaofficial.est2009@gmail.com
            </a>
          </div>
        
      </div>
    </>
  );
};

export default QuickContact;
