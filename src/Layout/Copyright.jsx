import React from "react";

const Copyright = () => {
  const FullYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-around gap-2 text-slate-600 dark:text-slate-400 sm:flex-row">
      <p className="text-sm">
        Copyright © {FullYear}{" "}
        <a
          href="#"
          className="mx-1 font-semibold text-emerald-600 no-underline hover:underline dark:text-emerald-400"
        >
          RSWA
        </a>
        . All Rights Reserved.
      </p>
      <p className="text-sm">
        <a
          href="https://ashiful-islam.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 no-underline transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          Developed by Mukto
        </a>
      </p>
    </div>
  );
};

export default Copyright;
