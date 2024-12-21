import React from "react";
import { SocialDesc } from "../constants";

const SocialSection = () => {
  return (
    <div className="-ml-3 flex flex-col items-start justify-around text-sm">
      {SocialDesc.map(({ icon: Icon, title, url, id }) => (
        <div key={id} className="flex items-start justify-between">
          <a
            href={url}
            target="_blank"
            className="mx-2 flex items-center justify-around text-white no-underline"
          >
            <p className="mx-2">
              <Icon className="text-lg text-green-500" />
            </p>

            <p className="hover:text-green-500">{title}</p>
          </a>{" "}
        </div>
      ))}
    </div>
  );
};

export default SocialSection;
