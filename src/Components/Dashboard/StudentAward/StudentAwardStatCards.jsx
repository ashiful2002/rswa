import { GraduationCap, Award, BookOpen, School } from "lucide-react";

const StudentAwardStatCards = ({
  isLoading,
  totalStudents,
  admissionCount = 0,
  hscCount = 0,
  sscCount = 0,
  activeTab = "all",
  onTabChange = () => {},
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* All Applicants */}
      <button
        type="button"
        onClick={() => onTabChange("all")}
        className={`shadow-xs text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
          activeTab === "all"
            ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/30 dark:border-emerald-600 dark:bg-emerald-950/40"
            : "border-slate-200  hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            All Applicants
          </span>
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
            <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
        <p className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          {isLoading ? "..." : totalStudents}
        </p>
      </button>

      {/* University Admission */}
      <button
        type="button"
        onClick={() => onTabChange("admission")}
        className={`shadow-xs text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
          activeTab === "admission"
            ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/30 dark:border-blue-600 dark:bg-blue-950/40"
            : "border-slate-200  hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            University Admission
          </span>
          <div className="rounded-xl bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
        <p className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          {isLoading ? "..." : admissionCount}
        </p>
      </button>

      {/* HSC Brilliant */}
      <button
        type="button"
        onClick={() => onTabChange("hsc")}
        className={`shadow-xs text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
          activeTab === "hsc"
            ? "border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/30 dark:border-purple-600 dark:bg-purple-950/40"
            : "border-slate-200  hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            HSC Brilliant
          </span>
          <div className="rounded-xl bg-purple-100 p-2 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
            <Award className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
        <p className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          {isLoading ? "..." : hscCount}
        </p>
      </button>

      {/* SSC Brilliant */}
      <button
        type="button"
        onClick={() => onTabChange("ssc")}
        className={`shadow-xs text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
          activeTab === "ssc"
            ? "border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/30 dark:border-amber-600 dark:bg-amber-950/40"
            : "border-slate-200  hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            SSC Brilliant
          </span>
          <div className="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
            <School className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>
        <p className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
          {isLoading ? "..." : sscCount}
        </p>
      </button>
    </div>
  );
};

export default StudentAwardStatCards;
