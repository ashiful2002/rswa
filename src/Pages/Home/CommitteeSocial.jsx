import React from "react";

const CommitteeSocial = (props) => {
  return (
    <div>
      <div className="flex gap-5 text-2xl">
        {props.social.map(({ id, url, icon: Icon }) => (
          <div key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Icon />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteeSocial;
