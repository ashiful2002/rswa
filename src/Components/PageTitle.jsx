import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, heading, className ,link}) => {
  return (
    <>
      {title && (
        <Helmet>
          <title>{title} - RSWA</title>
        </Helmet>
      )}
      {heading && <h1 href={link}  className={`pageTitle ${className}`} >{heading}</h1>}
    </>
  );
};

export default PageTitle;
 