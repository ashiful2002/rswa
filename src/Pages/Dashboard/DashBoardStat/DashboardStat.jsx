import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  Legend as PieLegend,
  ResponsiveContainer as PieResponsive,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
  Tooltip as BarTooltip,
  ResponsiveContainer as BarResponsive,
} from "recharts";
import {
  AreaChart,
  Area,
  XAxis as AreaXAxis,
  YAxis as AreaYAxis,
  Tooltip as AreaTooltip,
  ResponsiveContainer as AreaResponsive,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
const LOCATIONS = [
  "rowmari",
  "dhaka",
  "gazipur",
  "rangpur",
  "rajshahi",
  "mymensingh",
  "sylhet",
  "chottogram",
  "barishal",
  "khulna",
];

const DashboardStat = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("https://rswa-server.vercel.app/blood-group", {
          params: { page: 1, limit: 1000 },
        });
        setDonors(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading donors...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Utility function to count occurrences
  const countField = (field) => {
    const count = {};
    donors.forEach((donor) => {
      const value = donor[field];
      if (value) count[value] = (count[value] || 0) + 1;
    });
    return count;
  };

  // Pie chart: SSC_Batch
  const pieData = Object.entries(countField("SSC_Batch")).map(([name, value]) => ({ name, value }));

  // Bar chart: Blood_Group
  const barData = Object.entries(countField("Blood_Group")).map(([group, donors]) => ({ group, donors }));

  // Area chart: Present_Address with all locations
  const areaCount = countField("Present_Address");
  const areaData = LOCATIONS.map((loc) => ({ group: loc, donors: areaCount[loc] || 0 }));

  return (
    <div className="grid md:grid-cols-2 gap-6 p-4">
      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">SSC Batch Pie Chart</h2>
        <PieResponsive width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <PieTooltip />
            <PieLegend />
          </PieChart>
        </PieResponsive>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">Blood Group Bar Chart</h2>
        <BarResponsive width="100%" height={300}>
          <BarChart data={barData}>
            <BarXAxis dataKey="group" />
            <BarYAxis />
            <BarTooltip />
            <Bar dataKey="donors" fill="#36A2EB" />
          </BarChart>
        </BarResponsive>
      </div>

      {/* Area Chart */}
      <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2">
        <h2 className="font-semibold text-lg mb-2">Present Address Area Chart</h2>
        <AreaResponsive width="100%" height={300}>
          <AreaChart data={areaData}>
            <AreaXAxis dataKey="group" />
            <AreaYAxis />
            <AreaTooltip />
            <Area type="monotone" dataKey="donors" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </AreaResponsive>
      </div>
    </div>
  );
};

export default DashboardStat;
