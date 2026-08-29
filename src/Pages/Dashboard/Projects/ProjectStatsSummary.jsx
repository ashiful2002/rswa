const ProjectStatsSummary = ({ projects = [], totalCount = 0 }) => {
  const total = totalCount > 0 ? totalCount : projects.length;
  const active = projects.filter((p) => p.status === "Active").length;
  const upcoming = projects.filter((p) => p.status === "Upcoming").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Total Projects
        </p>
        <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
          {total}
        </p>
      </div>
      <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
          Active
        </p>
        <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
          {active}
        </p>
      </div>
      <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
          Upcoming
        </p>
        <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
          {upcoming}
        </p>
      </div>
      <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Completed
        </p>
        <p className="mt-1 text-2xl font-black text-slate-700 dark:text-slate-300">
          {completed}
        </p>
      </div>
    </div>
  );
};

export default ProjectStatsSummary;
