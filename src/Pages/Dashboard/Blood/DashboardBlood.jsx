import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import UpdateDonorModal from "../../../Components/shared/modal/UpdateDonorModal";
import ConfirmDeleteModal from "../../../Components/shared/modal/ConfirmDeleteModal";
import Loading from "../../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import DashboardStat from "../DashBoardStat/DashboardStat";
import { toast, ToastContainer } from "react-toastify";
const DashboardBlood = () => {
  const [search, setSearch] = useState("");
  //   const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Debounce search to reduce unnecessary requests

  const debouncedSearch = useDebounce(search, 500);
  const fetchBloodData = async ({ queryKey }) => {
    const [_key, { search, page, limit }] = queryKey;
    const { data } = await axios.get(
      "https://rswa-server.vercel.app/blood-group",
      {
        params: { search, page, limit },
      },
    );
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Blood", { search: debouncedSearch, page, limit }],
    queryFn: fetchBloodData,
    keepPreviousData: true,
  });

  const bloodData = data?.data || [];
  const totalPages = data?.totalPages || 1;
  // existing state
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdate = (donor) => {
    setSelectedDonor(donor);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDonor(null);
  };
  const handleModalUpdate = async (updatedonor) => {
    // create a copy and remove _id
    const { _id, ...updateData } = updatedonor;

    // Remove empty fields (optional)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    if (Object.keys(updateData).length === 0) {
      alert("Nothing to update!");
      return;
    }

    await axios.put(`https://rswa-server.vercel.app/blood-group/${_id}`, updateData);
    toast.success("Data updated");
    refetch();
    handleModalClose();
  };

  const [donorToDelete, setDonorToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (donor) => {
    setDonorToDelete(donor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!donorToDelete) return;
    await axios.delete(
      `https://rswa-server.vercel.app/blood-group/${donorToDelete._id}`,
    );
    refetch(); // refetch updated data
    setIsDeleteModalOpen(false);
    setDonorToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDonorToDelete(null);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Error fetching data.</p>;

  return (
    <div className="p-5">
      <h2 className="mb-4 text-2xl font-semibold">Blood Donor List</h2>
      {/* Search */}
      <div className="mb-4 flex flex-row-reverse justify-between gap-2">
        <Link to="/" className="btn btn-primary my-1">
          Home
        </Link>
        <input
          type="text"
          placeholder="Search by name or blood group..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-72 rounded border px-3 py-2"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Blood Group</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Present Address</th>
              <th className="border px-4 py-2">Permanent Address</th>
              <th className="border px-4 py-2">SSC Batch</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.length > 0 ? (
              bloodData.map((donor, index) => (
                <tr key={donor._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border px-4 py-2">{donor.Name}</td>
                  <td className="border px-4 py-2 font-semibold text-red-600">
                    {donor.Blood_Group}
                  </td>
                  <td className="border px-4 py-2">{donor.Phone_Number}</td>
                  <td className="border px-4 py-2">{donor.Present_Address}</td>
                  <td className="border px-4 py-2">
                    {donor.Permanent_Address}
                  </td>
                  <td className="border px-4 py-2">{donor.SSC_Batch}</td>
                  <td className="space-x-2 border px-4 py-2">
                    <button
                      onClick={() => handleUpdate(donor)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <UpdateDonorModal
                      isOpen={isModalOpen}
                      onClose={handleModalClose}
                      donor={selectedDonor}
                      onUpdate={handleModalUpdate}
                    />
                    <button
                      onClick={() => handleDeleteClick(donor)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <ConfirmDeleteModal
                      isOpen={isDeleteModalOpen}
                      onClose={handleDeleteCancel}
                      onConfirm={handleDeleteConfirm}
                      itemName={donorToDelete?.Name}
                      itemBlood={donorToDelete?.Blood_Group}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500">
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <label>Rows per page: </label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
            disabled={page === totalPages}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default DashboardBlood;
