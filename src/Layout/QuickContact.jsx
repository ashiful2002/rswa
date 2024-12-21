import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const QuickContact = () => {
  return (
    <div className="">
      <h5 className="h6 mb-4 mt-5 text-left text-sm">Quick contact</h5>

      <div>
        <div className="-ml-3 flex flex-col items-start justify-around text-sm">
          <div className="items-satrt flex justify-between">
            <a
              href="https://maps.app.goo.gl/KTsGv78EpHn1HU7A9"
              target="_blank"
              className="mx-2 flex items-start justify-around text-white no-underline"
            >
              <p className="mx-2">
                <CiLocationOn className="text-lg text-green-500" />
              </p>

              <p className="hover:text-green-500">Rowmari,Kurigram</p>
            </a>{" "}
          </div>

          <div className="items-satrt flex justify-center">
           
            <a
              href="tel:01727-475744"
              className="mx-2 flex items-start justify-around text-white no-underline"
              target="_blank"
            >
              <p className="mx-2">
                <FaPhone className="text-lg text-green-500" />
              </p>

              <p className="hover:text-green-500">+880 1727-475744</p>
            </a>
          </div>

          <div className="items-satrt flex justify-center">
            <a
              className="mx-2 flex items-start justify-around text-white no-underline"
              href="mailto:rswaofficial.est2009@gmail.com"
            >
              <p className="mx-2">
               
                <MdEmail className="text-lg text-green-500" />
              </p>

              <span className="lowercase hover:text-green-500">
                
                rswaofficial.est2009@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickContact;
