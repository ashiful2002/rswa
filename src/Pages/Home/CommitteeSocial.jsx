import React from "react";
import { FaFacebook, FaPhone, FaWhatsapp } from "react-icons/fa";

const CommitteeSocial = () => {
  return (
    <div>
      <div className="flex gap-5 text-2xl ">
        <a href="tel:01759907907" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-green-600"/>
        </a>
        <a href="tel:01759907907" target="_blank" rel="noopener noreferrer" >
          <FaPhone className="text-green-600"/>
        </a>
        <a href="tel:01759907907" target="_blank" rel="noopener noreferrer" >
          <FaWhatsapp className="text-green-600"/>
        </a>
      </div>
    </div>
  );
};

export default CommitteeSocial;
