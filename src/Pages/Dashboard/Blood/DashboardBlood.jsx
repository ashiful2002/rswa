import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft, RefreshCw, Heart } from "lucide-react";

import { API_ENDPOINTS } from "../../../config/api";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";
import useDebounce from "../../../hooks/useDebounce";

import UpdateDonorModal from "../../../Components/shared/modal/UpdateDonorModal";
import BloodStatsSummary from "./BloodStatsSummary";
import BloodFilters from "./BloodFilters";
import BloodTable from "./BloodTable";
import BloodCardList from "./BloodCardList";
import BloodPagination from "./BloodPagination";

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

  // Debounce search input
  const debouncedSearch = useDebounce(search, 400);

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

  const allDonorsList = allDonorsForBatches?.data || [];
  const existingSscBatches = Array.from(
    new Set(
      allDonorsList
        .map((donor) => donor.SSC_Batch)
        .filter((batch) => Boolean(batch) && String(batch).trim() !== "N/A"),
    ),
  ).sort((a, b) =>
    String(b).localeCompare(String(a), undefined, { numeric: true }),
  );

  // 2. Fetch paginated blood data with active filters
  const fetchBloodData = async ({ queryKey }) => {
    const [, { search, page, limit, bloodGroup, sscBatch }] = queryKey;
    const params = { search, page, limit };

    if (bloodGroup) params.Blood_Group = bloodGroup;
    if (sscBatch) params.SSC_Batch = sscBatch;

    const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, { params });
    return data;
  };

  const { data, isLoading, isFetching, refetch } = useQuery({
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
  const totalMatchingDonors =
    data?.meta?.total || data?.total || bloodData.length;

  // Active filters count calculation
  const activeFiltersCount =
    (search ? 1 : 0) + (bloodGroup ? 1 : 0) + (sscBatch ? 1 : 0);

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
    <div className="space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Blood Donor Management
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <Heart className="h-3 w-3 fill-current" />
              <span>RSWA Network</span>
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Search, filter by SSC batch or blood group, and manage life-saving blood donors.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200  px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Refresh list"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-slate-500 dark:text-slate-400 ${
                isFetching ? "animate-spin text-emerald-600 dark:text-emerald-400" : ""
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-emerald-700 active:scale-[0.98]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <BloodStatsSummary
        totalDonors={allDonorsList.length || 0}
        filteredCount={totalMatchingDonors}
        batchCount={existingSscBatches.length}
        activeFilterCount={activeFiltersCount}
      />

      {/* Search and Filters Toolbar */}
      <BloodFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        sscBatch={sscBatch}
        onSscBatchChange={(val) => {
          setSscBatch(val);
          setPage(1);
        }}
        bloodGroup={bloodGroup}
        onBloodGroupChange={(val) => {
          setBloodGroup(val);
          setPage(1);
        }}
        existingSscBatches={existingSscBatches}
        onResetFilters={handleResetFilters}
      />

      {/* Desktop / Tablet Table View */}
      <BloodTable
        donors={bloodData}
        isLoading={isLoading}
        page={page}
        limit={limit}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={handleUpdate}
        onDelete={handleDeleteClick}
      />

      {/* Mobile Touch-Friendly Card View */}
      <BloodCardList
        donors={bloodData}
        isLoading={isLoading}
        page={page}
        limit={limit}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={handleUpdate}
        onDelete={handleDeleteClick}
      />

      {/* Pagination & Limit Selector */}
      <BloodPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalMatchingDonors}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Update Donor Modal */}
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
