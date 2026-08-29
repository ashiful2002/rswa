const ProjectCardSkeleton = () => {
  return (
    <div className="shadow-xs flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video w-full animate-pulse bg-slate-200 dark:bg-slate-800" />

      {/* Details Skeleton */}
      <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
        <div className="space-y-2.5">
          {/* Category Badge & Location Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Title Skeleton */}
          <div className="h-6 w-5/6 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          {/* Summary Lines Skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
