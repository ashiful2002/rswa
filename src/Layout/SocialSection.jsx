import React from "react";
import { SocialDesc } from "../constants";

const SocialSection = () => {
  return (
    <div className="-ml-3 flex flex-col items-start justify-around gap-2 text-sm">
      {SocialDesc.map(({ icon: Icon, title, url, id }) => (
        <div key={id} className="flex items-start justify-between">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mx-2 flex items-center gap-2 text-slate-700 no-underline transition-colors hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <Icon className="text-lg text-emerald-600 dark:text-emerald-400" />
            <span>{title}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialSection;
