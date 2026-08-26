import React from "react";

const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }
  return pages;
};

const Pagination = ({ page, totalPages, onPageChange, className = "" }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className={`mt-6 flex flex-wrap items-center justify-center space-x-1.5 sm:space-x-2 ${className}`}>
      {/* Prev Button */}
      <button
        type="button"
        className="rounded-lg border border-slate-200  px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num, idx) => {
        if (num === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-1 text-xs font-medium text-slate-400 dark:text-slate-500"
            >
              ...
            </span>
          );
        }

        const isActive = page === num;

        return (
          <button
            key={`page-${num}`}
            type="button"
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isActive
                ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-600 dark:bg-emerald-600"
                : "border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        className="rounded-lg border border-slate-200   px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
