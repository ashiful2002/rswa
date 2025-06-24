import React from "react";
import { polyInfo, rifatInfo, siamInfo } from "../../constants";

const BusTable = ({ title, data }) => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow md:w-[32%]">
      <h4 className="mb-4 text-lg font-bold text-gray-800">{title}</h4>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left">Counter</th>
              <th className="text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="capitalize">{item.counter}</td>
                <td>{item.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const IndivisualBus = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="pageTitle text-md">Individually Bus Information</h1>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-4">
        <BusTable title="Rifat Paribahan" data={rifatInfo} />
        <BusTable title="Poly Paribahan" data={polyInfo} />
        <BusTable title="Siam Enterprise" data={siamInfo} />
      </div>
    </div>
  );
};

export default IndivisualBus;
