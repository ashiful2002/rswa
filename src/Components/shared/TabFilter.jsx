/* eslint-disable react/prop-types */
import React from "react";
import { Search, X } from "lucide-react";

export const DEFAULT_CATEGORIES = [
  "All",
  "Education",
  "Health",
  "Environment",
  "Relief",
  "Cultural",
];

const COLOR_THEMES = {
  emerald: {
    active: "bg-emerald-600 text-white shadow-md shadow-emerald-600/25",
    hover: "hover:text-emerald-600",
    focus: "focus:border-emerald-500 focus:ring-emerald-500/20",
  },
  rose: {
    active: "bg-rose-600 text-white shadow-md shadow-rose-600/25",
    hover: "hover:text-rose-600",
    focus: "focus:border-rose-500 focus:ring-rose-500/20",
  },
  indigo: {
    active: "bg-indigo-600 text-white shadow-md shadow-indigo-600/25",
    hover: "hover:text-indigo-600",
    focus: "focus:border-indigo-500 focus:ring-indigo-500/20",
  },
};

/**
 * TabFilter - Reusable tab-based filter bar with search input and optional actions.
 * Supports string arrays or object arrays ({ value, label }).
 * Wraps naturally across rows on small screens without scrollbars (exact previous project filter design).
 */
const TabFilter = ({
  categories = DEFAULT_CATEGORIES,
  selectedCategory = "All",
  setSelectedCategory,
  onSelectCategory,
  searchQuery = "",
  setSearchQuery,
  onSearchChange,
  searchPlaceholder = "Search projects...",
  activeColor = "emerald",
  rightContent = null,
  className = "",
}) => {
  const selectHandler = setSelectedCategory || onSelectCategory;
  const searchHandler = setSearchQuery || onSearchChange;
  const styles = COLOR_THEMES[activeColor] || COLOR_THEMES.emerald;

  return (
    <div
      className={`mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className}`}
    >
      {/* Category Tabs: Wraps naturally on small screens, single line on desktop */}
      {categories && categories.length > 0 && (
        <div className="shadow-xs flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 p-1.5 dark:border-slate-800 dark:bg-slate-900">
          {categories.map((cat, idx) => {
            const val =
              typeof cat === "object" && cat !== null
                ? cat.value !== undefined
                  ? cat.value
                  : cat.id
                : cat;
            const label =
              typeof cat === "object" && cat !== null
                ? cat.label || cat.name || val
                : cat;
            const isSelected = selectedCategory === val;

            return (
              <button
                key={
                  typeof cat === "object" && cat.key ? cat.key : `${val}-${idx}`
                }
                type="button"
                onClick={() => selectHandler?.(val)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? styles.active
                    : `border border-dashed text-slate-600 hover:bg-slate-100 ${styles.hover} dark:text-slate-300 dark:hover:bg-slate-800`
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Right Section: Search & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {searchHandler && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => searchHandler(e.target.value)}
              className={`w-full rounded-2xl border border-slate-200 py-2.5 pl-10 pr-8 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 ${styles.focus}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => searchHandler("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {rightContent}
      </div>
    </div>
  );
};

export default TabFilter;
