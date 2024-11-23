import React from "react";
import { Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const HelpfulLinks = () => {
  return (
    <div className="">
      <h6 className="h6 mt-5 mb-4 text-left ">Helpful Numbers</h6>

      <div className="flex flex-col text-sm items-start justify-center">
        
        <div>
          <div className="flex " id="number">
            <p className="">emergency :</p>
            <p className="">
              <a
                href="tel:999"
                className="mx-2 -mb-4 flex items-start justify-around text-white no-underline"
                target="_blank"
              >
                <p className="mx-2">
                  <FaPhone className="text-lg text-green-500" />
                </p>

                <p className="hover:text-green-500 ml-2">999</p>
              </a>
            </p>
          </div>
          <div className="flex" id="number">
            <p className="">Thana :</p>
            <p className="">
              <a
                href="tel:01*********"
                className="mx-2 -mb-4 flex items-start justify-around text-white no-underline"
                target="_blank"
              >
                <p className="mx-2">
                  <FaPhone className="text-lg text-green-500" />
                </p>

                <p className="hover:text-green-500">+880 ********</p>
              </a>
            </p>
          </div>

          <div className="flex" id="number">
            <p>hospital :</p>
            <p>
              <a
                href="tel:01*********"
                className="mx-2 -mb-4 flex items-start justify-around text-white no-underline"
                target="_blank"
              >
                <p className="mx-2">
                  <FaPhone className="text-lg text-green-500" />
                </p>

                <p className="hover:text-green-500">+880 *********</p>
              </a>
            </p>
          </div>
          <div className="flex" id="number">
            <p>fire servise :</p>
            <p>
              <a
                href="tel:01404700760"
                className="mx-2 flex -mb-4 items-start justify-around text-white no-underline"
                target="_blank"
              >
                <p className="mx-2">
                  <FaPhone className="text-lg text-green-500" />
                </p>

                <p className="hover:text-green-500">+880 1404-700760</p>
              </a>
            </p>
          </div>

          <div className="flex" >
            <p>
              <Link to="/otherLinks" className="text-green-500">
                <p>
                  other importent numbers
                  <FaRegArrowAltCircleRight className="ml-3 inline" />
                </p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpfulLinks;
