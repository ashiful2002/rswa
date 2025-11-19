import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BarChartBloodGroup = ({ data }) => {
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
      <h2 className="font-semibold text-lg mb-2">Blood Group Bar Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="group" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="donors" fill="#36A2EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartBloodGroup;
