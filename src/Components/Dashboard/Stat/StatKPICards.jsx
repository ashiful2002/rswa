import { Droplet, Users, FolderKanban, GraduationCap, TrendingUp } from "lucide-react";

const StatKPICards = ({
  totalDonors,
  totalUsers,
  totalProjects,
  totalStudentAwards,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Donors */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Donors
          </span>
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Droplet className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
          {totalDonors}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="h-3 w-3" /> Registered Donors
        </p>
      </div>

      {/* Card 2: Registered System Users */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Users
          </span>
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
          {totalUsers}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">System Accounts</p>
      </div>

      {/* Card 3: Active Projects */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Projects & Initiatives
          </span>
          <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <FolderKanban className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
          {totalProjects}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">Active & Completed</p>
      </div>

      {/* Card 4: Student Award Applicants */}
      <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Student Award Applicants
          </span>
          <div className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <GraduationCap className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
          {totalStudentAwards}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">Student Award Program</p>
      </div>
    </div>
  );
};

export default StatKPICards;
