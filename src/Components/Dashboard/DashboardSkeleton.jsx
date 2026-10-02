import React from "react";

/**
 * Global Dashboard Skeleton Loader
 * Provides an elegant, animated placeholder layout matching the RSWA dashboard design system.
 * Supports light & dark modes with configurable variants ("table", "stat", "cards").
 */
const DashboardSkeleton = ({
  variant = "table",
  statCardsCount = 4,
  rowsCount = 6,
  cardsCount = 6,
}) => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* 1. Header Skeleton: Page Title + Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          {/* Main Title bar */}
          <div className="h-8 w-48 sm:w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
          {/* Subtitle bar */}
          <div className="h-4 w-60 sm:w-80 rounded-lg bg-slate-100 dark:bg-slate-800/60" />
        </div>

        {/* Action Button(s) */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-36 sm:w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* 2. Top Stat Cards Skeleton */}
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
          statCardsCount === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        }`}
      >
        {Array.from({ length: statCardsCount }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3.5">
              {/* Icon box placeholder */}
              <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                {/* Metric label */}
                <div className="h-3.5 w-20 rounded bg-slate-100 dark:bg-slate-800/80" />
                {/* Metric number / value */}
                <div className="h-6 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Conditional Content by Variant */}
      {variant === "cards" ? (
        <>
          {/* Search & Filter Toolbar Skeleton */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-9 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
            <div className="flex items-center gap-2">
              <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
              <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cardsCount }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
              >
                <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800/70" />
                  <div className="h-3.5 w-4/5 rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : variant === "stat" ? (
        /* Analytics / Charts Skeleton */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-20 rounded bg-slate-100 dark:bg-slate-800/70" />
            </div>
            <div className="h-64 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-20 rounded bg-slate-100 dark:bg-slate-800/70" />
            </div>
            <div className="h-64 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
          </div>
        </div>
      ) : (
        /* Default "table" Variant Skeleton */
        <>
          {/* Search & Filter Toolbar Skeleton */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-9 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
              <div className="h-9 w-28 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
              <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800/70" />
            </div>
          </div>

          {/* Table Container Skeleton */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
            {/* Table Header Row */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="hidden sm:block h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="hidden md:block h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="hidden lg:block h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Table Body Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {Array.from({ length: rowsCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-4 transition-colors"
                >
                  {/* Column 1: Order / ID Badge */}
                  <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800" />

                  {/* Column 2: Avatar + Title & Subtitle */}
                  <div className="flex items-center gap-3 w-48 sm:w-56">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800/60" />
                    </div>
                  </div>

                  {/* Column 3: Category / Role Pill */}
                  <div className="hidden sm:block">
                    <div className="h-6 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Column 4: Contact / Details */}
                  <div className="hidden md:flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800" />
                  </div>

                  {/* Column 5: Status Badge */}
                  <div className="hidden lg:block">
                    <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Column 6: Actions */}
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer / Pagination Skeleton */}
            <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSkeleton;
