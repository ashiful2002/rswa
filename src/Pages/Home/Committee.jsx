import React from "react";
import PageTitle from "../../Components/PageTitle";
import { executiveCommittee } from "../../constants";
import CommitteeSocial from "./CommitteeSocial";

const Committee = () => {
  return (
    <>
      <div className="mt-3">
        <PageTitle
          heading="executive comittee (2024-2025 )"
          className="tracking-tight text-[25px] text-white"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-4">
          {executiveCommittee.map((item) => (
            <div key={item.id} className="md:last:text-end">
              <div className="">
                <img
                  src={item.url}
                  alt={item.name}
                  className="mb-4 rounded-full ring ring-green-600"
                  width={250}
                  height={50}
                />
              </div>{" "}
              <div>
                <h2 className="h2 inline rounded-xl bg-[#cfba2d] px-3 capitalize text-white">
                  {item.title}
                </h2>
                <h5 className="h5 capitalize">{item.name}</h5>
                <CommitteeSocial social={item.social} />
                <p className="etxt-sm capitalize">{item.says}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Committee;
{
  /* <div key={item.id} className="flex items-center justify-around">
            
<img src={item.url} width={100} alt="" srcset="" />
<h2>{item.title}</h2>
<h4>{item.name}</h4>
              <p>{item.says}</p>

</div> */
}