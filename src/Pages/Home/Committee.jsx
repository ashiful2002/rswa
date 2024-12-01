import React from "react";
import PageTitle from "../../Components/PageTitle";
import { executiveCommittee } from "../../constants";

const Committee = () => {
  return (
    <div>
      <div className="border p-2">
        <PageTitle heading="executive comittee (2024-2025 )" className="text-white tracking-tight"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          {executiveCommittee.map((item) => (
            <div key={item.id} className="md:last:text-end ">
              <div className="">
                <img
                  src={item.url}
                  alt={item.name}
                  className="rounded-full ring ring-green-600 mb-4 "
                  width={250}
                  height={50}
                />
              </div>{" "}
              <div>
                <h2 className="h2 capitalize bg-[#cfba2d] text-white inline px-3 rounded-xl">{item.title}</h2>
                <h5 className="h5 capitalize ">{item.name}</h5>
                <p className="capitalize etxt-sm">{item.says}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
