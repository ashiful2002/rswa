import { useState, useEffect, lazy, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { MdBloodtype } from "react-icons/md";

import { normalizeBloodGroup } from "../utils/formatDonorDate";
import TabFilter from "../Components/shared/TabFilter";
import BloodHeader from "../Components/Blood/BloodHeader";
import BloodTable from "../Components/Blood/BloodTable";
import {
  BLOOD_GROUP_TABS,
  fetchBloodData,
} from "../Components/Blood/bloodConstants";

const Pagination = lazy(() => import("../Components/shared/Pagination"));

const Blood = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlBloodGroup = normalizeBloodGroup(
    searchParams.get("bloodGroup") ||
      searchParams.get("Blood_Group") ||
      searchParams.get("group") ||
      "",
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search") || "",
  );
  const [bloodGroupFilter, setBloodGroupFilter] = useState(urlBloodGroup);
  const [sortField] = useState("Name");
  const [sortOrder] = useState("asc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(20);

  // Sync blood group if URL changes externally (e.g. back/forward navigation or shared link)
  useEffect(() => {
    if (urlBloodGroup !== bloodGroupFilter) {
      setBloodGroupFilter(urlBloodGroup);
      setPage(1);
    }
  }, [urlBloodGroup]);

  // Handle blood group change and synchronize URL search parameters
  const handleBloodGroupChange = (value) => {
    const normalized = normalizeBloodGroup(value);
    setBloodGroupFilter(normalized);
    setPage(1);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (normalized) {
          next.set("bloodGroup", normalized);
        } else {
          next.delete("bloodGroup");
          next.delete("Blood_Group");
          next.delete("group");
        }
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  // Debounce search query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: [
      "bloodData",
      {
        search: debouncedSearch,
        bloodGroup: bloodGroupFilter,
        sortField,
        sortOrder,
        page,
        limit,
      },
    ],
    queryFn: fetchBloodData,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.meta?.totalPages || data?.totalPages || 1;
  const totalDonors = data?.meta?.total ?? data?.total ?? 0;
  const bloodData = data?.data || [];

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (num > 1) {
            next.set("page", num);
          } else {
            next.delete("page");
          }
          return next;
        },
        { replace: true },
      );
    }
  };

  return (
    <div className="container mx-auto py-4">
      {/* Page Header & SEO Metadata */}
      <BloodHeader totalDonors={totalDonors} isLoading={isLoading} />

      {/* TabFilter: Blood Group Pills & Add Action Button */}
      <TabFilter
        categories={BLOOD_GROUP_TABS}
        selectedCategory={bloodGroupFilter}
        setSelectedCategory={handleBloodGroupChange}
        activeColor="emerald"
        className="mb-6"
        rightContent={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/add-bg"
              className="shadow-2xs inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-rose-700 active:scale-[0.98]"
            >
              <MdBloodtype className="text-base" />
              <span>Add New Blood Group</span>
            </Link>
          </div>
        }
      />

      {/* Donor Table Component */}
      <BloodTable
        donors={bloodData}
        isLoading={isLoading}
        page={page}
        limit={limit}
      />

      {/* Reusable Ellipsis Pagination */}
      <Suspense fallback={null}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </Suspense>
    </div>
  );
};

export default Blood;
