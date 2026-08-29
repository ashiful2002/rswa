import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import UpdateDonorModal from "../../../Components/shared/modal/UpdateDonorModal";
import Pagination from "../../../Components/shared/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_ENDPOINTS } from "../../../config/api";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";

const bloodGroupsList = [
  "",
  "A(+)ve",
  "A(-)ve",
  "B(+)ve",
  "B(-)ve",
  "O(+)ve",
  "O(-)ve",
  "AB(+)ve",
  "AB(-)ve",
];

const DashboardBlood = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  const [search, setSearch] = useState("");
  const [sscBatch, setSscBatch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Role permissions: Edit (super_admin/admin/moderator), Delete (super_admin/admin)
  const canEdit =
    role === "super_admin" || role === "admin" || role === "moderator";
  const canDelete = role === "super_admin" || role === "admin";
  const hasActions = canEdit || canDelete;

  // Debounce search text input
  const debouncedSearch = useDebounce(search, 500);

  // 1. Fetch unique existing SSC Batches dynamically from database records
  const { data: allDonorsForBatches } = useQuery({
    queryKey: ["allDonorsForBatches"],
    queryFn: async () => {
      const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, {
        params: { limit: 1000 },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const existingSscBatches = Array.from(
    new Set(
      (allDonorsForBatches?.data || [])
        .map((donor) => donor.SSC_Batch)
        .filter((batch) => Boolean(batch) && String(batch).trim() !== "N/A"),
    ),
  ).sort((a, b) =>
    String(b).localeCompare(String(a), undefined, { numeric: true }),
  );

  // 2. Fetch paginated blood data with active filters
  const fetchBloodData = async ({ queryKey }) => {
    const [_key, { search, page, limit, bloodGroup, sscBatch }] = queryKey;
    const params = { search, page, limit };

    if (bloodGroup) params.Blood_Group = bloodGroup;
    if (sscBatch) params.SSC_Batch = sscBatch;

    const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, { params });
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "Blood",
      {
        search: debouncedSearch,
        page,
        limit,
        bloodGroup,
        sscBatch,
      },
    ],
    queryFn: fetchBloodData,
    placeholderData: keepPreviousData,
  });

  const bloodData = data?.data || [];
  const totalPages = data?.meta?.totalPages || data?.totalPages || 1;

  // Modal states
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to fetch Firebase ID Token header
  const getAuthHeaders = async () => {
    if (!user) return {};
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  };

  // Handle Edit Action
  const handleUpdate = (donor) => {
    setSelectedDonor(donor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDonor(null);
  };

  const handleModalUpdate = async (updatedonor) => {
    const { _id, ...updateData } = updatedonor;

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    try {
      const headers = await getAuthHeaders();
      await axios.put(`${API_ENDPOINTS.BLOOD_GROUP}/${_id}`, updateData, {
        headers,
      });

      Swal.fire({
        title: "Updated Successfully!",
        text: "Donor record updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
      handleModalClose();
    } catch (err) {
      console.error("Update donor error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to update donor.";
      Swal.fire("Update Error", errorMsg, "error");
    }
  };

  // Handle Delete Action
  const handleDeleteClick = async (donor) => {
    const confirm = await Swal.fire({
      title: "Delete Donor?",
      text: `Are you sure you want to delete ${donor.Name} (${donor.Blood_Group})? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${API_ENDPOINTS.BLOOD_GROUP}/${donor._id}`, {
        headers,
      });

      Swal.fire("Deleted!", "Donor record has been deleted.", "success");
      refetch();
    } catch (err) {
      console.error("Delete donor error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to delete donor.";
      Swal.fire("Error", errorMsg, "error");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSscBatch("");
    setBloodGroup("");
    setPage(1);
  };

  return (
    <div className="p-1 font-sans">
      <h2 className="mb-4 text-2xl font-bold text-slate-800 dark:text-white">
        Blood Donor List Management
      </h2>

      {/* Search & Dynamic Filter Controls */}
      <div className="mb-4 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* General Search Input */}
          <input
            type="text"
            placeholder="Search by name, address..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="shadow-xs w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:w-60"
          />

          {/* Database-Driven SSC Batch Select Filter */}
          <select
            value={sscBatch}
            onChange={(e) => {
              setSscBatch(e.target.value);
              setPage(1);
            }}
            className="shadow-xs rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">All SSC Batches</option>
            {existingSscBatches.map((batch) => (
              <option key={batch} value={batch}>
                SSC {batch}
              </option>
            ))}
          </select>

          {/* Blood Group Select Filter */}
          <select
            value={bloodGroup}
            onChange={(e) => {
              setBloodGroup(e.target.value);
              setPage(1);
            }}
            className="shadow-xs rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {bloodGroupsList.map((bg, idx) => (
              <option key={idx} value={bg}>
                {bg || "All Blood Groups"}
              </option>
            ))}
          </select>

          {/* Reset Filters Button */}
          {(search || sscBatch || bloodGroup) && (
            <button
              onClick={handleResetFilters}
              className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Reset Filters
            </button>
          )}
        </div>

        <Link
          to="/"
          className="shadow-xs inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-medium text-white no-underline transition-colors hover:bg-emerald-700"
        >
          Home
        </Link>
      </div>

      {/* Table */}
      <div className="shadow-xs overflow-x-auto rounded-xl border border-slate-700 dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b border-slate-700 bg-slate-100 text-[11px] uppercase tracking-wider text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Present Address</th>
              <th className="px-4 py-3">Permanent Address</th>
              <th className="px-4 py-3">SSC Batch</th>
              {hasActions && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading ? (
              Array.from({ length: limit || 10 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-6 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800"></div>
                  </td>
                  {hasActions && (
                    <td className="px-4 py-3">
                      <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
                    </td>
                  )}
                </tr>
              ))
            ) : bloodData.length > 0 ? (
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
                    {donor.Present_Address || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.Permanent_Address || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {donor.SSC_Batch ? `SSC-${donor.SSC_Batch}` : "N/A"}
                  </td>
                  {hasActions && (
                    <td className="space-x-2 whitespace-nowrap px-4 py-3">
                      {canEdit && (
                        <button
                          onClick={() => handleUpdate(donor)}
                          className="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-700"
                        >
                          Update
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteClick(donor)}
                          className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={hasActions ? "8" : "7"}
                  className="py-6 text-center text-slate-500"
                >
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rows per page & Shared Pagination Component */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-slate-700 dark:text-slate-300 sm:flex-row">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Rows per page: </label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-xl border border-slate-300 px-3 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(num) => setPage(num)}
        />
      </div>

      {/* Modals */}
      <UpdateDonorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        donor={selectedDonor}
        onUpdate={handleModalUpdate}
      />
    </div>
  );
};

export default DashboardBlood;
