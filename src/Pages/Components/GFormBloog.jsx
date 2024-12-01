import React from "react";
import PageTitle from "../../Components/PageTitle";
import BgFormAnt from "../../Components/Form/BgFormAnt";
import GForm from "./GForm";

const GFormBloog = () => {
  
  return (
    <div className="container mx-auto flex flex-col items-center">
      <PageTitle title="Form" heading="Blood Group Form " />
      <div className="flex flex-col items-center justify-center">
        <div className="me-25">
          
                  </div>
        <div className="container mx-auto">
          
          <p className="rounded bg-blue-400 p-2 capitalize text-white">
            Fill the form to add your
            <span className="mx-2 rounded bg-yellow-300 px-2 font-semibold uppercase text-red-500">
              blood group data
            </span>{" "}
            on this website
          </p>
          <GForm />
          <p className="text-muted text-sm">
            Your data will be added on website as soon as possible...
          </p>
          <BgFormAnt />
          
        </div>
      </div>{" "}
     
    </div>
  );
};

export default GFormBloog;
