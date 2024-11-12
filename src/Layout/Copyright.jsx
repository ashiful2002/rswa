import React from "react";

const Copyright = () => {
  const FullYear = new Date().getFullYear();

  return (
    <>
      <div>
        <p className="text-sm">
          Copyright © {FullYear}
          <a href="#" className="mx-2 text-green-400">
            RSWA
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Copyright;
