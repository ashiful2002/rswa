import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { qContactDetails } from "../constants/index";
const QuickContact = () => {
  return (
    <div className="">
      <h5 className="h6 mb-4 mt-5 text-left text-sm">Quick contact</h5>

      <div>
        <div className="-ml-3 flex flex-col items-start justify-around text-sm">
          {qContactDetails.map(({ id, url, icon: Icon, title }) => (
            <div key={id} className="flex items-start justify-between">
              <a
                href={url}
                target="_blank"
                className="mx-2 flex items-center justify-around text-white no-underline"
              >
                <p className="mx-2">
                  <Icon className="text-lg text-green-500" />
                </p>

                <p className="hover:text-green-500">{title}</p>
              </a>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickContact;
