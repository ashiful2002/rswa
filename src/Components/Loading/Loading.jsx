import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#f8f9fa"
        color="#15803d"
      />
      finding..
    </div>
  );
};
// dccb75

export default Loading;
