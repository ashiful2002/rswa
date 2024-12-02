import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";

const SocialSection = () => {
  return (
    <>
      <div className="flex items-center justify-center rounded-full px-2 py-1 shadow-xl hover:bg-green-500">
        <a
          href="https://www.facebook.com/profile.php?id=100094207557939"
          target="_blank"
          className="no-underline"
        >
          <FaFacebook className="inline text-xl text-white" />{" "}
          <span className="ml-2 lowercase text-white">page</span>
        </a>{" "}
      </div>
      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a
          href="https://www.facebook.com/groups/RSWA2009"
          target="_blank"
          className="no-underline"
        >
          <FaFacebookF className="inline text-xl text-white" />
          <span className="ml-2 lowercase text-white">group</span>
        </a>{" "}
      </div>

      <div className="flex items-center justify-center rounded-full px-2 py-1 hover:bg-green-500">
        <a
          href="https://wa.me/+8801727475744"
          target="_blank"
          className="no-underline"
        >
          <FaWhatsapp className="inline text-xl text-white" />{" "}
          <span className="ml-2 lowercase text-white">Whatsapp</span>
        </a>{" "}
      </div>
    </>
  );
};

export default SocialSection;
