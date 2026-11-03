/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  MapPin,
  Home,
  GraduationCap,
  LayoutGrid,
  Table as TableIcon,
  Smartphone,
  Monitor,
} from "lucide-react";
import PhoneCell from "./PhoneCell";

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-slate-200 dark:border-slate-800">
    <td className="p-3">
      <div className="h-4 w-6 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
    <td className="p-3">
      <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
    </td>
  </tr>
);

const CardSkeleton = () => (
  <div className="shadow-2xs animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between">
      <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
    <div className="mt-3 space-y-2">
      <div className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
      <div className="h-3.5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-3.5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  </div>
);

/**
 * BloodTable - Morph Table component for Public Virtual Blood Bank
 * - On Mobile (< md): Morphs into touch-friendly cards
 * - On Desktop (>= md): Classic dense table
 * - View Switcher: Users can toggle between Auto, Table, and Cards anytime, with state saved
 */
const BloodTable = ({
  donors = [],
  isLoading = false,
  page = 1,
  limit = 20,
  initialViewMode = "auto", // "auto" | "table" | "cards"
  showViewToggle = true,
}) => {
  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem("rswa_blood_public_view_mode");
      if (saved === "table" || saved === "cards" || saved === "auto") {
        return saved;
      }
    } catch {
      // ignore storage access issues
    }
    return initialViewMode;
  });

  const handleViewChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("rswa_blood_public_view_mode", mode);
    } catch {
      // ignore
    }
  };

  const showTable = viewMode === "table" || viewMode === "auto";
  const showCards = viewMode === "cards" || viewMode === "auto";

  const tableContainerClass =
    viewMode === "auto"
      ? "hidden md:block"
      : viewMode === "table"
        ? "block"
        : "hidden";

  const cardContainerClass =
    viewMode === "auto"
      ? "block md:hidden"
      : viewMode === "cards"
        ? "block"
        : "hidden";

  return (
    <div className="flex flex-col gap-3">
      {/* View Switcher Controls */}
      {showViewToggle && (
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {donors.length > 0 && !isLoading && (
              <span>
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {donors.length}
                </span>{" "}
                donors
              </span>
            )}
          </div>

          {/* View Mode Toggle Pill */}
          <div className="shadow-2xs inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1 dark:border-slate-800 dark:bg-slate-900/80">
            {/* <button
              type="button"
              onClick={() => handleViewChange("auto")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === "auto"
                  ? "bg-white text-emerald-600 shadow-2xs dark:bg-slate-800 dark:text-emerald-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Auto: Cards on mobile, Table on desktop"
            >
              <Smartphone className="h-3.5 w-3.5 md:hidden" />
              <Monitor className="hidden h-3.5 w-3.5 md:inline" />
              <span>Auto</span>
            </button> */}

            <button
              type="button"
              onClick={() => handleViewChange("table")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "shadow-2xs text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Classic Full Table View"
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>

            <button
              type="button"
              onClick={() => handleViewChange("cards")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === "cards"
                  ? "shadow-2xs text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Card View (Optimized for mobile touch)"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CARD VIEW: Morphs into touch-friendly cards on mobile     */}
      {/* ========================================================= */}
      {showCards && (
        <div className={cardContainerClass}>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : donors && donors.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {donors.map((donor, index) => {
                const serialNumber = (page - 1) * limit + index + 1;

                return (
                  <div
                    key={donor._id || index}
                    className="shadow-2xs hover:shadow-xs flex flex-col justify-between rounded-2xl border border-slate-200   p-4 transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div>
                      {/* Top Row: Serial + Name & Blood Group Pill */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              {serialNumber}
                            </span>
                            <h3 className="truncate text-sm font-bold capitalize text-slate-900 dark:text-white">
                              {donor.Name}
                            </h3>
                          </div>

                          {donor.SSC_Batch && (
                            <div className="mt-1.5 flex items-center gap-1">
                              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                                <GraduationCap className="h-3 w-3 shrink-0" />
                                <span>SSC-{donor.SSC_Batch}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Blood Group Pill */}
                        <span className="inline-flex shrink-0 items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-500/30">
                          {donor.Blood_Group || "N/A"}
                        </span>
                      </div>

                      {/* Contact Number with PhoneCell (Masked + Reveal Confirm Modal) */}
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800/50">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Phone:
                        </span>
                        <PhoneCell
                          phone={donor.Phone_Number}
                          donorName={donor.Name}
                        />
                      </div>

                      {/* Addresses */}
                      <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {donor.Present_Address && (
                          <div className="flex items-start gap-1.5">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                            <span className="capitalize">
                              <strong className="font-medium text-slate-500 dark:text-slate-400">
                                Present:
                              </strong>{" "}
                              {donor.Present_Address}
                            </span>
                          </div>
                        )}
                        {donor.Permanent_Address && (
                          <div className="flex items-start gap-1.5">
                            <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                            <span className="capitalize">
                              <strong className="font-medium text-slate-500 dark:text-slate-400">
                                Permanent:
                              </strong>{" "}
                              {donor.Permanent_Address}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No data found.
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Try adjusting your search criteria or blood group filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TABLE VIEW: Existing full table for desktop / shift-back */}
      {/* ========================================================= */}
      {showTable && (
        <div
          className={`overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 ${tableContainerClass}`}
        >
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800/80 dark:text-slate-100">
              <tr>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  #
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  Name
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  Group
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  Present Address
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  Permanent Address
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  SSC Batch
                </th>
                <th className="border border-slate-200 p-3 dark:border-slate-800">
                  Contact Number
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {isLoading ? (
                Array.from({ length: limit || 20 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : donors.length > 0 ? (
                donors.map((donor, index) => (
                  <tr
                    key={donor._id || index}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="border border-slate-200 p-3 capitalize text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {donor.Name}
                    </td>
                    <td className="border border-slate-200 p-3 font-semibold text-emerald-600 dark:border-slate-800 dark:text-emerald-400">
                      {donor.Blood_Group}
                    </td>
                    <td className="border border-slate-200 p-3 capitalize text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {donor.Present_Address || "N/A"}
                    </td>
                    <td className="border border-slate-200 p-3 capitalize text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {donor.Permanent_Address || "N/A"}
                    </td>
                    <td className="border border-slate-200 p-3 uppercase text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      SSC-{donor.SSC_Batch || "N/A"}
                    </td>
                    <td className="border border-slate-200 p-3 text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      <PhoneCell
                        phone={donor.Phone_Number}
                        donorName={donor.Name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-slate-500 dark:text-slate-400"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BloodTable;
