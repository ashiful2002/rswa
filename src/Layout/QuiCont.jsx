import React from "react";
import logo from "../assets/logo.png";

import QuickContact from "./QuickContact";

const QuiCont = () => {
  return (
    <>
      <div className="mx-1">
        <div className="mb-6 mt-8">
          <h6 className="h6 text-sm font-thin">Quick Contact</h6>
        </div>
        
        <div className="flex flex-col items-center justify-between">
          <div className="my-2">
            <div className="allCenter">
              <img src={logo} width={60} alt="RSWA" className="mb-2" />
            </div>
            <p className="text-sm w-60">
              If you have any Query please feel free to contact us.
            </p>
          </div>
          <div>
            <QuickContact />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuiCont;
