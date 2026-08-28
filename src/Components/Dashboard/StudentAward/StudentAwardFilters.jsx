import { Search, Filter } from "lucide-react";

/* eslint-disable react/prop-types */
const StudentAwardFilters = ({
  search,
  setSearch,
  sessionFilter,
  setSessionFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  setPage,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200  p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, email, phone, university..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all focus:border-emerald-500 focus: dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-emerald-500"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Session:</span>
        </div>
        <select
          value={sessionFilter}
          onChange={(e) => {
            setSessionFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="">All Sessions</option>
          <option value="2025-26">2025-26</option>
          <option value="2026-27">2026-27</option>
        </select>

        {/* Sort Field */}
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="createdAt">Date Created</option>
          <option value="nameEnglish">Name (A-Z)</option>
          <option value="university">University</option>
          <option value="session">Session</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  );
};

export default StudentAwardFilters;
