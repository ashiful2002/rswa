import React from "react";
import {
  BallTriangle,
  FallingLines,
  MagnifyingGlass,
} from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {/* <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      /> */}
    </div>
  );
};
// dccb75

export default Loading;
