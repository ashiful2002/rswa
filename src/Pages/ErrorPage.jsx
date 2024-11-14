import React from "react";
import PageTitle from "../Components/PageTitle";

const ErrorPage = () => {
  return (
    <> 
    < PageTitle title="RSWA - Error"/>
    <div className="allCenter container mx-auto h-[80vh]">
      <h1>
        404- Page Not Found. <span className="text-sm"></span>
      </h1>
    </div>
    </>
  );
};

export default ErrorPage;
