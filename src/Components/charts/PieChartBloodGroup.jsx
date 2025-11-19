import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const PieChartBloodGroup = ({ data }) => {
  const count = {};

  data.forEach((item) => {
    const group = item.Blood_Group;
    if (group) count[group] = (count[group] || 0) + 1;
  });

  const chartData = Object.keys(count).map((key) => ({
    name: key,
    value: count[key],
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-2">Blood Group Pie Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartBloodGroup;
