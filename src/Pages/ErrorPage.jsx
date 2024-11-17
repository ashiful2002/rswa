import React from "react";
import PageTitle from "../Components/PageTitle";

const ErrorPage = () => {
  return (
    <div className="container mx-auto"> 
     < PageTitle title="Error"/>
    <div className="allCenter h-[80vh]">
   
      <h1>
        404- Page Not Found. <span className="text-sm"></span>
      </h1>
    </div>
    </div>
  );
};

export default ErrorPage;
