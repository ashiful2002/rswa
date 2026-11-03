/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Edit2,
  Trash2,
  Phone,
  Copy,
  Check,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Home,
  LayoutGrid,
  Table as TableIcon,
  Smartphone,
  Monitor,
} from "lucide-react";
import { formatDonorDate } from "../../../utils/formatDonorDate";

/**
 * BloodTable - Hybrid Card & Table component for Blood Donor Management
 * - Mobile by default: Responsive touch-friendly cards
 * - Desktop by default: Dense tabular data view
 * - Switchable anytime: Users can toggle between Auto, Table, and Cards with state persistence
 */
const BloodTable = ({
  donors = [],
  isLoading = false,
  page = 1,
  limit = 10,
  canEdit = false,
  canDelete = false,
  onEdit = () => {},
  onDelete = () => {},
  initialViewMode = "auto", // "auto" | "table" | "cards"
  showViewToggle = true,
}) => {
  const [copiedId, setCopiedId] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem("rswa_blood_view_mode");
      if (saved === "table" || saved === "cards" || saved === "auto") {
        return saved;
      }
    } catch {
      // ignore storage access issues
    }
    return initialViewMode;
  });

  const hasActions = canEdit || canDelete;

  const handleCopyPhone = (donorId, phoneNumber) => {
    if (!phoneNumber) return;
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopiedId(donorId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("rswa_blood_view_mode", mode);
    } catch {
      // ignore
    }
  };

  // Determine whether table and/or cards should render based on viewMode
  // "auto": cards on mobile (< md), table on desktop (>= md)
  // "table": always table (horizontal scrollable on mobile)
  // "cards": always cards (responsive grid on desktop)
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
            <button
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
            </button>

            <button
              type="button"
              onClick={() => handleViewChange("table")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-white text-emerald-600 shadow-2xs dark:bg-slate-800 dark:text-emerald-400"
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
                  ? "bg-white text-emerald-600 shadow-2xs dark:bg-slate-800 dark:text-emerald-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Card View (Optimized for touch and mobile)"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CARD VIEW: Touch-friendly cards for mobile devices        */}
      {/* ========================================================= */}
      {showCards && (
        <div className={cardContainerClass}>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="shadow-2xs animate-pulse rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-3.5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                    <div className="h-8 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : donors && donors.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {donors.map((donor, index) => {
                const serialNumber = (page - 1) * limit + index + 1;
                const isCopied = copiedId === donor._id;
                const dateInfo = formatDonorDate(donor);

                return (
                  <div
                    key={donor._id || index}
                    className="shadow-2xs flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div>
                      {/* Top Row: Serial + Name & Blood Group Pill */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              {serialNumber}
                            </span>
                            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                              {donor.Name}
                            </h3>
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {donor.SSC_Batch && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                                <GraduationCap className="h-3 w-3 shrink-0" />
                                <span>SSC-{donor.SSC_Batch}</span>
                              </span>
                            )}
                            {dateInfo.full !== "N/A" && (
                              <span
                                className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500"
                                title={dateInfo.full}
                              >
                                <Clock className="h-2.5 w-2.5 shrink-0" />
                                <span>{dateInfo.full}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Blood Group Pill */}
                        <span className="shrink-0 inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-500/30">
                          {donor.Blood_Group || "N/A"}
                        </span>
                      </div>

                      {/* Contact Phone Row */}
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800/50">
                        {donor.Phone_Number ? (
                          <>
                            <a
                              href={`tel:${donor.Phone_Number}`}
                              className="inline-flex items-center gap-1.5 font-medium text-slate-800 hover:text-emerald-600 hover:underline dark:text-slate-200 dark:hover:text-emerald-400"
                            >
                              <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span className="font-mono">
                                {donor.Phone_Number}
                              </span>
                            </a>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyPhone(donor._id, donor.Phone_Number)
                              }
                              className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                              title={isCopied ? "Copied!" : "Copy Phone"}
                            >
                              {isCopied ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-400">No Phone Number</span>
                        )}
                      </div>

                      {/* Addresses */}
                      <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {donor.Present_Address && (
                          <div className="flex items-start gap-1.5">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span className="line-clamp-1">
                              {donor.Present_Address}
                            </span>
                          </div>
                        )}
                        {donor.Permanent_Address && (
                          <div className="flex items-start gap-1.5">
                            <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span className="line-clamp-1">
                              {donor.Permanent_Address}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Footer */}
                    {hasActions && (
                      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(donor)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(donor)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No donors found
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TABLE VIEW: Existing tabular view for desktop/tablet       */}
      {/* ========================================================= */}
      {showTable && (
        <div
          className={`shadow-xs overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${tableContainerClass}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                  <th className="px-4 py-3.5 text-center">#</th>
                  <th className="px-4 py-3.5">Donor Name</th>
                  <th className="px-4 py-3.5">Blood Group</th>
                  <th className="px-4 py-3.5">Contact Phone</th>
                  <th className="px-4 py-3.5">Present Address</th>
                  <th className="px-4 py-3.5">Permanent Address</th>
                  <th className="px-4 py-3.5">SSC Batch</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">
                    Created Time
                  </th>
                  {hasActions && (
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {isLoading ? (
                  Array.from({ length: Math.min(limit, 8) }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-4 py-4 text-center">
                        <div className="mx-auto h-4 w-5 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                      </td>
                      {hasActions && (
                        <td className="px-4 py-4 text-right">
                          <div className="ml-auto h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
                        </td>
                      )}
                    </tr>
                  ))
                ) : donors.length > 0 ? (
                  donors.map((donor, index) => {
                    const serialNumber = (page - 1) * limit + index + 1;
                    const isCopied = copiedId === donor._id;
                    const dateInfo = formatDonorDate(donor);

                    return (
                      <tr
                        key={donor._id || index}
                        className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                      >
                        {/* Index */}
                        <td className="px-4 py-3.5 text-center font-medium text-slate-400 dark:text-slate-500">
                          {serialNumber}
                        </td>

                        {/* Donor Name */}
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {donor.Name}
                          </div>
                        </td>

                        {/* Blood Group Badge */}
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-500/20 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-500/30">
                            {donor.Blood_Group || "N/A"}
                          </span>
                        </td>

                        {/* Contact Phone */}
                        <td className="px-4 py-3.5">
                          {donor.Phone_Number ? (
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`tel:${donor.Phone_Number}`}
                                className="inline-flex items-center gap-1 font-medium text-slate-700 transition-colors hover:text-emerald-600 hover:underline dark:text-slate-300 dark:hover:text-emerald-400"
                                title="Call donor"
                              >
                                <Phone className="h-3 w-3 text-slate-400 group-hover:text-emerald-500" />
                                <span>{donor.Phone_Number}</span>
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyPhone(donor._id, donor.Phone_Number)
                                }
                                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                title={
                                  isCopied ? "Copied!" : "Copy phone number"
                                }
                              >
                                {isCopied ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">
                              N/A
                            </span>
                          )}
                        </td>

                        {/* Present Address */}
                        <td
                          className="max-w-[160px] truncate px-4 py-3.5 text-slate-600 dark:text-slate-300"
                          title={donor.Present_Address}
                        >
                          {donor.Present_Address || "N/A"}
                        </td>

                        {/* Permanent Address */}
                        <td
                          className="max-w-[160px] truncate px-4 py-3.5 text-slate-600 dark:text-slate-300"
                          title={donor.Permanent_Address}
                        >
                          {donor.Permanent_Address || "N/A"}
                        </td>

                        {/* SSC Batch */}
                        <td className="px-4 py-3.5">
                          {donor.SSC_Batch ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                              <GraduationCap className="h-3 w-3" />
                              <span>SSC-{donor.SSC_Batch}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">
                              N/A
                            </span>
                          )}
                        </td>

                        {/* Created Time (Local) */}
                        <td
                          className="px-4 py-3.5 whitespace-nowrap"
                          title={dateInfo.full}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span>{dateInfo.dateStr}</span>
                            </div>
                            {dateInfo.timeStr && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                                <Clock className="h-2.5 w-2.5" />
                                <span>{dateInfo.timeStr}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        {hasActions && (
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => onEdit(donor)}
                                  className="shadow-2xs inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                                  title="Edit donor"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  type="button"
                                  onClick={() => onDelete(donor)}
                                  className="shadow-2xs inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:bg-slate-800 dark:text-red-400 dark:hover:border-red-700 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                                  title="Delete donor"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete</span>
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={hasActions ? 9 : 8}
                      className="py-12 text-center text-slate-500 dark:text-slate-400"
                    >
                      <p className="font-semibold text-slate-700 dark:text-slate-300">
                        No donors found
                      </p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try adjusting your search criteria or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodTable;
