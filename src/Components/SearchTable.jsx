import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import axios from "axios";
import { MdOutlineBloodtype } from "react-icons/md";
import Loading from "./Loading/Loading.jsx";

const SearchTable = () => {
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  // Fetch data with optional search param
  const getAllData = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://rswa-server-oulisqmdl-ashiful2002s-projects.vercel.app/blood-group",
        {
          params: { search },
        }
      );
      setBloodGroupData(response.data);
    } catch (error) {
      console.error("Failed to fetch blood group data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load all data initially (no search)
  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Blood Group", dataIndex: "Blood_Group", key: "Blood_Group" },
    { title: "Contact", dataIndex: "Phone_Number", key: "Phone_Number" },
    { title: "SSC Batch", dataIndex: "SSC_Batch", key: "SSC_Batch" },
    {
      title: "Present Address",
      dataIndex: "Present_Address",
      key: "Present_Address",
    },
    {
      title: "Permanent Address",
      dataIndex: "Permanent_Address",
      key: "Permanent_Address",
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <label
          htmlFor="search"
          className="mb-2 text-xl font-semibold text-gray-700 md:mb-0"
        >
          Search Blood Group:
        </label>
        <Input.Search
          id="search"
          prefix={<MdOutlineBloodtype size={20} className="text-gray-400" />}
          className="md:w-96"
          size="large"
          placeholder="e.g. A(+)"
          allowClear
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onSearch={(value) => getAllData(value)} // only fetch when user submits search
        />
      </div>

      <div className="scrollbar-thin scrollbar-thumb-gray-300 max-h-[80vh] overflow-x-auto">
        <div className="min-w-[700px]">
          <Table
            dataSource={bloodGroupData}
            columns={columns}
            locale={{
              emptyText: searchItem
                ? `No results found for "${searchItem}"`
                : "No blood donors available.",
            }}
            pagination={{ pageSize: 10 }}
            rowKey={(record) =>
              record._id ||
              record.Phone_Number ||
              `${record.Name}-${Math.random()}`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchTable;
