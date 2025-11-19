import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const AreaChartBloodGroup = ({ data }) => {
  const count = {};

  data.forEach((item) => {
    const group = item.Blood_Group;
    if (group) count[group] = (count[group] || 0) + 1;
  });

  const chartData = Object.keys(count).map((key) => ({
    group: key,
    donors: count[key],
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Blood Group Area Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis dataKey="group" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="donors" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartBloodGroup;
