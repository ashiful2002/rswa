import React from "react";
import PageTitle from "../Components/PageTitle";
import Businfo from "./Components/Businfo";
import IndivisualBus from "./Components/IndivisualBus";

const OtherLinks = () => {
  return (
    <div className="container mx-auto">
      <PageTitle title="Numbers" heading="other importent numbers" />
      <Businfo />
      <p className="text-center text-green-500">just another example</p>
      <div>
        <div>
          <IndivisualBus />
        </div>
      </div>
      <div className="text-center ">
        
        <a
          href="https://facebook.com/groups/519447679364602/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-green-500 capitalize">join rowmari bus zone</p>
        </a>
      </div>
      <div>
        <p>Bus:123434</p>
        <p>Ambulence:123434</p>
        <p>Nouka:123434</p>
        <p>Ferry:123434</p>
      </div>
    </div>
  );
};

export default OtherLinks;
