import React from "react";
import PageTitle from "../Components/PageTitle";
import Businfo from "./Components/Businfo";
import { FaFacebookF } from "react-icons/fa6";
import BsBusInfo from "./Components/BsBusInfo";

const OtherLinks = () => {
  return (
    <div className="container mx-auto">
      <PageTitle title="Numbers" heading="bus numbers" />

      <div className="mt-4">
        <BsBusInfo />
        <Businfo />
        
        <div className="text-center">
          <a
            href="https://facebook.com/groups/519447679364602/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-3 mt-5 flex items-center justify-center">
              <p className="text-green-500">
                
                <>join</>
              </p>
              <p className="mx-1">
                <FaFacebookF />
              </p>
              <p className="capitalize text-green-500"> rowmari bus zone</p>
            </div>
          </a>
        </div>
      </div>
  
      <div>
        <PageTitle heading="other numbers" />
        <p>Ambulence:123434</p>
        <p>Nouka:123434</p>
        <p>Ferry:123434</p>
      </div>
    </div>
  );
};

export default OtherLinks;
