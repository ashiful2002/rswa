import React from "react";
import { qContactDetails } from "../constants/index";

const QuickContact = () => {
  return (
    <div>
      <h5 className="mb-4 mt-5 text-left text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
        Quick Contact
      </h5>

      <div>
        <div className="-ml-3 flex flex-col items-start justify-around gap-2 text-sm">
          {qContactDetails.map(({ id, url, icon: Icon, title }) => (
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
      </div>
    </div>
  );
};

export default QuickContact;
