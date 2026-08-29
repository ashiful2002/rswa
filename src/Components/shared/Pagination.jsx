import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
  }
  return pages;
};

const Pagination = ({
  page,
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Support both 'page' and 'currentPage' prop names seamlessly
  const activePage = Number(page || currentPage || 1);

  if (!totalPages || totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(activePage, totalPages);

  return (
    <div
      className={`mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 ${className}`}
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage <= 1}
        className="shadow-xs flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        title="Previous Page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
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

        const isActive = activePage === num;

        return (
          <button
            key={`page-${num}`}
            type="button"
            onClick={() => onPageChange(num)}
            className={`h-9 min-w-[36px] rounded-xl px-2.5 text-xs font-bold transition-all duration-200 ${
              isActive
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 dark:bg-emerald-600 dark:text-white"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {num}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage >= totalPages}
        className="shadow-xs flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        title="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
