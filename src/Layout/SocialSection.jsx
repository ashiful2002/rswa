import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";

const SocialSection = () => {
  return (
    <>
      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a
          href="https://www.facebook.com/profile.php?id=100094207557939"
          target="_blank"
        >
          <FaFacebook className="text-xl text-white" />
        </a>{" "}
        <span className="ml-2 text-sm lowercase">page</span>
      </div>
      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a href="https://www.facebook.com/groups/RSWA2009" target="_blank">
          <FaFacebookF className="text-xl text-white" />
        </a>{" "}
        <span className="ml-2 text-sm lowercase">group</span>
      </div>
      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a href="https://www.instagram.com/RSWA/" target="_blank">
          <FaInstagram className="text-xl text-white" />
        </a>{" "}
        <span className="ml-2 text-sm lowercase">instagram</span>
      </div>
      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a href=" https://wa.me/+8801727475744" target="_blank">
          <FaWhatsapp className="text-xl text-white" />
        </a>{" "}
        <span className="ml-2 text-sm lowercase">Whatsapp</span>
      </div>
    </>
  );
};

export default SocialSection;
