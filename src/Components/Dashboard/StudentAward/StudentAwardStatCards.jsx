import { GraduationCap, Calendar } from "lucide-react";

const StudentAwardStatCards = ({ isLoading, totalStudents, students }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Applicants
          </span>
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <GraduationCap className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {isLoading ? "..." : totalStudents}
        </p>
      </div>

      <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            2025-26 Session
          </span>
          <div className="rounded-xl bg-teal-50 p-2 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {isLoading
            ? "..."
            : students.filter((s) => s.session === "2025-26").length}
        </p>
      </div>

      <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            2026-27 Session
          </span>
          <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {isLoading
            ? "..."
            : students.filter((s) => s.session === "2026-27").length}
        </p>
      </div>
    </div>
  );
};

export default StudentAwardStatCards;
