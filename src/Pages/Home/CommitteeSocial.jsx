import React from "react";

const CommitteeSocial = (props) => {
  return (
    <div>
      <div className="flex gap-5 text-2xl">
        {props.social.map((item) => (
          <div key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <img src={item.icon} width={20} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteeSocial;
