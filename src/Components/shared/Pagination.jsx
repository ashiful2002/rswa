/* eslint-disable react/prop-types */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Mobile-optimised page numbers:
 * Never returns more than 5 elements so it fits comfortably on 320px+ mobile screens without wrapping.
 */
const getMobilePageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 4) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  if (currentPage <= 2) {
    return [1, 2, "...", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
};

/**
 * Desktop page numbers:
 * Always returns a consistent 7 elements when totalPages > 7 so pagination width never jumps.
 */
const getDesktopPageNumbers = (currentPage, totalPages) => {
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

const COLOR_THEMES = {
  emerald: {
    active:
      "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 border-emerald-600 dark:bg-emerald-600 dark:text-white dark:border-emerald-600",
  },
  rose: {
    active:
      "bg-rose-600 text-white shadow-md shadow-rose-600/25 border-rose-600 dark:bg-rose-600 dark:text-white dark:border-rose-600",
  },
  indigo: {
    active:
      "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border-indigo-600 dark:bg-indigo-600 dark:text-white dark:border-indigo-600",
  },
};

const Pagination = ({
  page,
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  activeColor = "emerald",
}) => {
  // Support both 'page' and 'currentPage' prop names seamlessly
  const activePage = Number(page || currentPage || 1);

  if (!totalPages || totalPages <= 1) return null;

  const mobilePages = getMobilePageNumbers(activePage, totalPages);
  const desktopPages = getDesktopPageNumbers(activePage, totalPages);
  const theme = COLOR_THEMES[activeColor] || COLOR_THEMES.emerald;

  const renderPageItems = (pageList, isMobile = false) => {
    return pageList.map((num, idx) => {
      if (num === "...") {
        return (
          <span
            key={`ellipsis-${isMobile ? "m" : "d"}-${idx}`}
            className={`shrink-0 flex items-center justify-center font-semibold text-slate-400 dark:text-slate-500 select-none ${
              isMobile ? "h-8 w-5 text-xs" : "h-9 w-7 text-xs"
            }`}
          >
            ...
          </span>
        );
      }

      const isActive = activePage === num;

      return (
        <button
          key={`page-${isMobile ? "m" : "d"}-${num}`}
          type="button"
          onClick={() => onPageChange(num)}
          aria-current={isActive ? "page" : undefined}
          className={`shrink-0 flex items-center justify-center rounded-xl font-bold transition-all duration-200 ${
            isMobile
              ? "h-8 min-w-[32px] px-1.5 text-xs"
              : "h-9 min-w-[36px] px-2.5 text-xs"
          } ${
            isActive
              ? theme.active
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          {num}
        </button>
      );
    });
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`mt-8 flex w-full items-center justify-center select-none ${className}`}
    >
      {/* Mobile View (< sm): Compact, strictly flex-nowrap with shrink-0 so it never wraps or distorts */}
      <div className="flex sm:hidden items-center justify-center gap-1 flex-nowrap max-w-full">
        {/* Prev Button Mobile */}
        <button
          type="button"
          onClick={() => onPageChange(activePage - 1)}
          disabled={activePage <= 1}
          className="shadow-2xs shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Mobile Page Numbers */}
        {renderPageItems(mobilePages, true)}

        {/* Next Button Mobile */}
        <button
          type="button"
          onClick={() => onPageChange(activePage + 1)}
          disabled={activePage >= totalPages}
          className="shadow-2xs shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Next Page"
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop View (>= sm): Full stable 7-item layout with text labels */}
      <div className="hidden sm:flex items-center justify-center gap-1.5 flex-nowrap">
        {/* Prev Button Desktop */}
        <button
          type="button"
          onClick={() => onPageChange(activePage - 1)}
          disabled={activePage <= 1}
          className="shadow-2xs shrink-0 flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </button>

        {/* Desktop Page Numbers */}
        {renderPageItems(desktopPages, false)}

        {/* Next Button Desktop */}
        <button
          type="button"
          onClick={() => onPageChange(activePage + 1)}
          disabled={activePage >= totalPages}
          className="shadow-2xs shrink-0 flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Next Page"
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
