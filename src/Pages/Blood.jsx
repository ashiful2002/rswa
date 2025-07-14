import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomForm from "../Components/Form/CustomForm";
import { Link } from "react-router-dom";

const bloodGroups = [
  "", // empty = no filter, show all
  "A(+)ve",
  "A(-)ve",
  "B(+)ve",
  "B(-)ve",
  "O(+)ve",
  "O(-)ve",
  "AB(+)ve",
  "AB(-)ve",
];

const Blood = () => {
  const [bloodData, setBloodData] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [sortField, setSortField] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 20; // items per page

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://rswa-server.vercel.app/blood-group",
        {
          params: {
            search,
            sortField,
            sortOrder,
            bloodGroup: bloodGroupFilter,
            page,
            limit,
          },
        },
      );
      console.log(res.data);

      if (res.data && Array.isArray(res.data.data)) {
        setBloodData(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setBloodData([]);
        setTotalPages(1);
      }
    } catch (err) {
      setBloodData([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    setPage(1); // reset page when filters change
  }, [search, bloodGroupFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [search, sortField, sortOrder, bloodGroupFilter, page]);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="pageTitle">RSWA Virtual Blood Bank</h1>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name or blood group"
          className="w-full rounded border px-4 py-2 md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded border px-4 py-2"
          value={bloodGroupFilter}
          onChange={(e) => setBloodGroupFilter(e.target.value)}
        >
          {bloodGroups.map((bg, i) => (
            <option key={i} value={bg}>
              {bg || "All Blood Group"}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select
            className="rounded border px-3 py-2"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="Name">Name</option>
            <option value="Blood_Group">Blood Group</option>
          </select>

          <select
            className="rounded border px-3 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div>
          <Link to="/add-bg" className="btn btn-success w-full sm:w-56">
            Add Blood Group data
          </Link>
        </div>
      </div>

      {/* Table showing the data */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-3">Name</th>
              <th className="border p-3">Blood Group</th>
              <th className="border p-3">Present address</th>
              <th className="border p-3">SSC Batch</th>
              {/* <th className="border p-3">permanent address</th> */}
              <th className="border p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.length > 0 ? (
              bloodData.map((donor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3">{donor.Name}</td>
                  <td className="border p-3">{donor.Blood_Group}</td>
                  <td className="border p-3">
                    {donor.Present_Address || "N/A"}
                  </td>
                  <td className="border p-3">
                    {" "}
                    SSC-{donor.SSC_Batch || "N/A"}
                  </td>
                  {/* <td className="border p-3">
                    {donor.Permanent_Address || "N/A"}
                  </td> */}
                  <td className="border p-3">{donor.Phone_Number || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`rounded border px-3 py-1 ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blood;
