import React from "react";
import logo from "../assets/logo.png";

const QuiCont = () => {
  return (
    <div className="mx-1">
      <div className="flex flex-col items-center justify-between sm:items-start">
        <div className="flex items-center justify-center">
          <div className="my-2 flex flex-col items-center justify-center sm:items-start">
            <div className="flex items-center justify-center">
              <img src={logo} width={60} alt="RSWA" className="mb-3" />
            </div>
            <div>
              <p className="w-60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                If you have any query, please feel free to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuiCont;
