import React from "react";

const Copyright = () => {
  const FullYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          Copyright © {FullYear}
          <a href="/" className="mx-2 text-green-400">
            RSWA
          </a>
          . All Rights Reserved.
        </p>
        {/* <p className="text-sm">developed by mukto</p> */}
      </div>
    </>
  );
};

export default Copyright;
