import React from "react";
import { ShareSocial } from "react-share-social";

const Share = () => {
  return (
    <div>
      <ShareSocial
        url="https://rswa.site/blog"
        socialTypes={["facebook", "whatsapp", "linkedin"]}
      />
    </div>
  );
};

export default Share;
