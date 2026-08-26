import React from "react";
import SocialSection from "./SocialSection";

const Social = () => {
  return (
    <div>
      <h5 className="mb-4 mt-5 text-left text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
        Social Media Links
      </h5>
      <div className="flex flex-col items-start gap-1 text-sm">
        <SocialSection />
      </div>
    </div>
  );
};

export default Social;
