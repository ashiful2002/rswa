import React from "react";
import PageTitle from "../Components/PageTitle";
import { FaFacebookF } from "react-icons/fa6";
import BsBusInfo from "./Components/BsBusInfo";
import Businfo from "./Components/BsBusInfo";
import IndivisualBus from "./Components/IndivisualBus";

const OtherLinks = () => {
  return (
    <div className="container mx-auto">
      <PageTitle title="Numbers" heading="bus numbers" />

      <div className="mt-4">
        <IndivisualBus />
        <Businfo />
        {/* <BsBusInfo /> */}

        <div className="text-center">
          <a
            href="https://facebook.com/groups/519447679364602/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-3 mt-5 flex items-center justify-center">
              <p className="capitalize text-green-500">
                join rowmari bus zone{" "}
                <FaFacebookF className="inline text-blue-700" /> Group
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* <div>
        <PageTitle heading="other numbers" />
        <p>Ambulence:123434</p>
        <p>Nouka:123434</p>
        <p>Ferry:123434</p>
      </div> */}
    </div>
  );
};

export default OtherLinks;
