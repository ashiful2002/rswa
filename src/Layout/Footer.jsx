import React from "react";
import QuickContact from "./QuickContact";
import Social from "./Social";
import ArrowCom from "../Components/ArrowCom";
import QuiCont from "./QuiCont";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer className="  border-t border-slate-200/80 bg-slate-100/80 text-slate-700 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col justify-around gap-8 sm:items-start md:flex-row">
          <div>
            <QuiCont />
          </div>
          <div>
            <QuickContact />
          </div>
          <div>
            <Social />
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200/60 pt-6 dark:border-slate-800/80">
          <Copyright />
        </div>
      </div>
      {/* <ArrowCom /> */}
    </footer>
  );
};

export default Footer;
