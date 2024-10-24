import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";

const SocialSection = () => {
  return (
    <>
      <div className="flex items-center justify-center rounded-full hover:bg-green-500">
        <a href="https://www.facebook.com/profile.php?id=100094207557939">
          <FaFacebook className="text-xl text-white" />
        </a>
      </div>
      <div className="flex items-center justify-center rounded-full hover:bg-green-500">
        <a href="https://www.facebook.com/groups/RSWA2009">
          <FaFacebookF className="text-xl text-white" />
        </a>
      </div>
      <div className="flex items-center justify-center rounded-full hover:bg-green-500">
        <a href="https://www.instagram.com/RSWA/">
          <FaInstagram className="text-xl text-white" />
        </a>
      </div>
    </>
  );
};

export default SocialSection;
