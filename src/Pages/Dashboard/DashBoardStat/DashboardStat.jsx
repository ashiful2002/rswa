import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../../Components/Loading/Loading";

const DashboardStat = () => {
  const { data: blood, isLoading } = useQuery({
    queryKey: ["blood"],
    queryFn: async () => {
      const res = await axios.get("https://rswa-server.vercel.app/blood-group");
      return res.data.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="rounded bg-purple-500 p-4 text-white">
        <h2>Total blood Data: {blood.length}</h2>
      </div>
    </div>
  );
};

export default DashboardStat;
