import React from "react";

const Copyright = () => {
  const FullYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around">
        <p className="text-sm">
          Copyright © {FullYear}
          <a href="#" className="mx-2 text-green-400">
            RSWA
          </a>
          . All Rights Reserved.
        </p>
        <p className="text-sm">
          <a
            href="https://ashiful-islam.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >developed by</a>
          
        </p>
      </div>
    </>
  );
};

export default Copyright;
