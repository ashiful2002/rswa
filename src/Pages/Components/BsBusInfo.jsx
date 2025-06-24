import React from "react";
import { busData } from "../../constants";
import PageTitle from "../../Components/PageTitle";

const Businfo = () => {
  return (
    <div className="px-4 py-8">
      <PageTitle
        heading="Common Buses Numbers of Rowmari"
        className="text-[24px] bg-red-600 text-white p-2 rounded"
      />

      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra w-full border border-gray-300">
          <thead className="bg-gray-100 text-base font-semibold">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Counter</th>
              <th className="border px-4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {busData?.map((bus, index) => (
              <tr key={index} className="capitalize hover">
                <td className="border px-4 py-2">{bus.name}</td>
                <td className="border px-4 py-2">{bus.counter}</td>
                <td className="border px-4 py-2">{bus.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Businfo;
