import Pagination from "../../../Components/shared/Pagination";

/**
 * BloodPagination - Responsive pagination footer for Blood Donor Management
 * Includes rows-per-page selector, count summary, and shared Pagination component.
 */
const BloodPagination = ({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  limit = 10,
  onLimitChange = () => {},
  onPageChange = () => {},
}) => {
  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-4 pt-2 text-xs text-slate-600 sm:flex-row dark:text-slate-400">
      {/* Left: Rows Per Page Selector & Summary */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        <div className="flex items-center gap-2">
          <label htmlFor="blood-rows-limit" className="font-medium text-slate-600 dark:text-slate-400">
            Rows:
          </label>
          <select
            id="blood-rows-limit"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="rounded-xl border border-slate-200  px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {totalItems > 0 && (
          <span className="text-slate-500 dark:text-slate-500">
            Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{startItem}</span> -{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{endItem}</span> of{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{totalItems}</span> donors
          </span>
        )}
      </div>

      {/* Right: Pagination Controls */}
      <div className="w-full sm:w-auto">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="!mt-0"
        />
      </div>
    </div>
  );
};

export default BloodPagination;
