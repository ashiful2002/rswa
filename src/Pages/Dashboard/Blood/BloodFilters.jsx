import { Search, X, RotateCcw, Droplet, GraduationCap } from "lucide-react";

const BLOOD_GROUPS_LIST = [
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

/**
 * BloodFilters - Responsive search, dropdowns, and reset controls for Blood Donor Management
 */
const BloodFilters = ({
  search,
  onSearchChange,
  sscBatch,
  onSscBatchChange,
  bloodGroup,
  onBloodGroupChange,
  existingSscBatches = [],
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(search || sscBatch || bloodGroup);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200  p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Search Input */}
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, address, phone..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 transition-colors focus:border-emerald-500 focus: focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns Row on Mobile / Inline on Desktop */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          {/* Blood Group Select Filter */}
          <div className="relative">
            <select
              value={bloodGroup}
              onChange={(e) => onBloodGroupChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 text-xs font-semibold text-slate-700 transition-colors focus:border-red-500 focus: focus:outline-none focus:ring-1 focus:ring-red-500 sm:w-auto dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:focus:bg-slate-900"
            >
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS_LIST.filter(Boolean).map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <Droplet className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-red-500" />
          </div>

          {/* SSC Batch Select Filter */}
          <div className="relative">
            <select
              value={sscBatch}
              onChange={(e) => onSscBatchChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 text-xs font-semibold text-slate-700 transition-colors focus:border-indigo-500 focus: focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-auto dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:focus:bg-slate-900"
            >
              <option value="">All SSC Batches</option>
              {existingSscBatches.map((batch) => (
                <option key={batch} value={batch}>
                  SSC {batch}
                </option>
              ))}
            </select>
            <GraduationCap className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-indigo-500" />
          </div>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BloodFilters;
