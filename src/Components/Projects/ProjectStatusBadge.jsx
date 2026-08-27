import React from "react";
import { Sparkles, Clock, CheckCircle2 } from "lucide-react";

export const getCategoryBadgeClass = (category) => {
  switch (category) {
    case "Education":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    case "Health":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    case "Environment":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case "Relief":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "Cultural":
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200 dark:border-purple-800";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
};

const ProjectStatusBadge = ({ status }) => {
  if (status === "Active") {
    return (
      <span className="shadow-xs inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
        <Sparkles className="h-3 w-3 animate-pulse" /> Active
      </span>
    );
  }
  if (status === "Upcoming") {
    return (
      <span className="shadow-xs inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
        <Clock className="h-3 w-3" /> Upcoming
      </span>
    );
  }
  return (
    <span className="shadow-xs inline-flex items-center gap-1 rounded-full bg-slate-700/80 px-2.5 py-0.5 text-[11px] font-semibold text-slate-100 backdrop-blur-md">
      <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Completed
    </span>
  );
};

export default ProjectStatusBadge;
