import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, heading }) => {
  return (
    <>
      <Helmet>
        <title>{title} - RSWA</title>
      </Helmet>
      <h1 className="pageTitle">{heading}</h1>
    </>
  );
};

export default PageTitle;
