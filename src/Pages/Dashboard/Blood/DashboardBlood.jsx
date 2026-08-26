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
import { API_ENDPOINTS } from "../../../config/api";

const DashboardBlood = () => {
  const [search, setSearch] = useState("");
  //   const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Debounce search to reduce unnecessary requests

  const debouncedSearch = useDebounce(search, 500);
  const fetchBloodData = async ({ queryKey }) => {
    const [_key, { search, page, limit }] = queryKey;
    const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, {
      params: { search, page, limit },
    });
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

    await axios.put(`${API_ENDPOINTS.BLOOD_GROUP}/${_id}`, updateData);
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
    await axios.delete(`${API_ENDPOINTS.BLOOD_GROUP}/${donorToDelete._id}`);
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
    <div className="p-5 font-sans">
      <h2 className="mb-4 text-2xl font-bold text-slate-800 dark:text-white">
        Blood Donor List
      </h2>
      {/* Search */}
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search by name or blood group..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="shadow-xs w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:w-72"
        />
        <Link
          to="/"
          className="shadow-xs inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-medium text-white no-underline transition-colors hover:bg-emerald-700"
        >
          Home
        </Link>
      </div>

      {/* Table */}
      <div className="shadow-xs overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-100 text-[11px] uppercase tracking-wider text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Present Address</th>
              <th className="px-4 py-3">Permanent Address</th>
              <th className="px-4 py-3">SSC Batch</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {bloodData.length > 0 ? (
              bloodData.map((donor, index) => (
                <tr
                  key={donor._id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 text-slate-500">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                    {donor.Name}
                  </td>
                  <td className="px-4 py-3 font-bold text-red-600 dark:text-red-400">
                    {donor.Blood_Group}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.Phone_Number}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.Present_Address}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.Permanent_Address}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.SSC_Batch}
                  </td>
                  <td className="space-x-2 whitespace-nowrap px-4 py-3">
                    <button
                      onClick={() => handleUpdate(donor)}
                      className="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-700"
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
                      className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700"
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
                <td colSpan="8" className="py-6 text-center text-slate-500">
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300 sm:flex-row">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Rows per page: </label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Prev
          </button>
          <span className="px-1 text-xs font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
            disabled={page === totalPages}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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
