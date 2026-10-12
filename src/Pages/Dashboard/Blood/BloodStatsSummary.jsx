import { Droplet, Users, Filter, GraduationCap } from "lucide-react";

/**
 * BloodStatsSummary - Responsive statistics cards for Blood Donor Management
 */
const BloodStatsSummary = ({
  totalDonors = 0,
  filteredCount = 0,
  batchCount = 0,
  activeFilterCount = 0,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* Total Donors */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-3.5 sm:p-4.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <Droplet className="h-5 w-5 fill-current" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Donors
            </p>
            <p className="mt-0.5 text-xl font-black text-slate-800 sm:text-2xl dark:text-white">
              {totalDonors}
            </p>
          </div>
        </div>
      </div>

      {/* Filtered Donors */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-3.5 sm:p-4.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Users className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Matching Donors
            </p>
            <p className="mt-0.5 text-xl font-black text-emerald-700 sm:text-2xl dark:text-emerald-300">
              {filteredCount}
            </p>
          </div>
        </div>
      </div>

      {/* Unique Batches */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-3.5 sm:p-4.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              SSC Batches
            </p>
            <p className="mt-0.5 text-xl font-black text-indigo-700 sm:text-2xl dark:text-indigo-300">
              {batchCount}
            </p>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-3.5 sm:p-4.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Filter className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Active Filters
            </p>
            <p className="mt-0.5 text-xl font-black text-amber-700 sm:text-2xl dark:text-amber-300">
              {activeFilterCount > 0 ? activeFilterCount : "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodStatsSummary;
