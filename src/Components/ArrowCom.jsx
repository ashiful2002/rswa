import React from "react";
import { FaUpLong } from "react-icons/fa6";

const ArrowCom = () => {
  return (
    <>
      <div>
        <p className="hoverEffect hover:scale-125 hover:rounded-full">
          <a href="#" className="text-xl text-white hover:text-green-400">
            <FaUpLong className="mt-4 text-2xl" />
          </a>
        </p>
      </div>
    </>
  );
};

export default ArrowCom;
