import React from "react";
import { Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const HelpfulLinks = () => {
  return (
    <div>
      <div>
        <h6 className="h6 my-4 text-sm font-thin">Helpful Numbers</h6>
      </div>
      <div className="ml-3 flex flex-col items-start justify-center gap-1">
       
        <div className="flex" id="number">
          <p>Thana :</p>
          <p>
            <a
              href="tel:000000000"
              className="mx-2 flex items-start justify-around text-white no-underline"
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
              href="tel:000000000"
              className="mx-2 flex items-start justify-around text-white no-underline"
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
              className="mx-2 flex items-start justify-around text-white no-underline"
              target="_blank"
            >
              <p className="mx-2">
                <FaPhone className="text-lg text-green-500" />
              </p>

              <p className="hover:text-green-500">+880 1404-700760</p>
            </a>
          </p>
        </div>

        <div>
          <p>
            <Link to="/otherLinks" className="text-green-500">
              <p>
                other importent numbers
                <FaRegArrowAltCircleRight className="inline ml-3"  />
              </p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpfulLinks;
