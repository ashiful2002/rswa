import { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/**
 * Custom DatePicker component
 * - Supports YYYY-MM-DD string format
 * - Quick month & year navigation
 * - Clear button
 * - Fits Tailwind & dark mode theme
 * - Accessible and close on click outside / Esc
 */
const DatePicker = ({
  value = "",
  onChange = () => {},
  placeholder = "Select date",
  label,
  id,
  minDate,
  maxDate,
  required = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current selected date
  const parsedDate = value ? new Date(value + "T00:00:00") : null;
  const isValidParsed = parsedDate && !isNaN(parsedDate.getTime());

  // Current view month & year in calendar popup
  const [viewYear, setViewYear] = useState(
    isValidParsed ? parsedDate.getFullYear() : new Date().getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    isValidParsed ? parsedDate.getMonth() : new Date().getMonth(),
  );

  // Sync view when value changes from outside
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Click outside and Esc key listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Calendar calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const formatted = `${viewYear}-${mm}-${dd}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
  };

  const handleSetToday = (e) => {
    e.stopPropagation();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formatted = `${yyyy}-${mm}-${dd}`;
    setViewYear(yyyy);
    setViewMonth(today.getMonth());
    onChange(formatted);
    setIsOpen(false);
  };

  // Format label for display
  const displayValue = isValidParsed
    ? parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // Year options for quick select (10 years back, 10 years forward)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 26 }, (_, i) => currentYear - 15 + i);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block font-semibold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input trigger button */}
      <div
        role="button"
        tabIndex={0}
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`flex w-full cursor-pointer items-center justify-between rounded-xl border bg-slate-50/70 p-2.5 text-xs transition-colors focus:outline-none dark:bg-slate-950 ${
          isOpen
            ? "border-emerald-500 ring-2 ring-emerald-500/20"
            : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <CalendarIcon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:text-slate-500" />
          <span
            className={`truncate ${
              displayValue
                ? "font-medium text-slate-800 dark:text-slate-100"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {displayValue || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title="Clear date"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Calendar Popup */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-2xl border border-slate-200  p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* Header Month / Year controls */}
          <div className="mb-2 flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border-0 bg-transparent py-1 text-xs font-bold text-slate-800 focus:outline-none dark:bg-slate-900 dark:text-white"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={name} value={idx}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border-0 bg-transparent py-1 text-xs font-bold text-slate-800 focus:outline-none dark:bg-slate-900 dark:text-white"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS_SHORT.map((d) => (
              <span
                key={d}
                className="py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
            {/* Previous month padding days */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => {
              const dayNum = daysInPrevMonth - firstDayOfMonth + idx + 1;
              return (
                <div
                  key={`prev-${idx}`}
                  className="py-1.5 text-slate-300 dark:text-slate-700"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const curDateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isDisabled =
                (minDate && curDateStr < minDate) ||
                (maxDate && curDateStr > maxDate);

              const isSelected =
                isValidParsed &&
                parsedDate.getFullYear() === viewYear &&
                parsedDate.getMonth() === viewMonth &&
                parsedDate.getDate() === day;

              const isToday =
                new Date().getFullYear() === viewYear &&
                new Date().getMonth() === viewMonth &&
                new Date().getDate() === day;

              return (
                <button
                  key={`cur-${day}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(day)}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    isDisabled
                      ? "cursor-not-allowed opacity-30 text-slate-400 dark:text-slate-600"
                      : isSelected
                        ? "bg-emerald-600 font-bold text-white shadow-xs"
                        : isToday
                          ? "border border-emerald-500 font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Action Footer: Today & Clear */}
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] dark:border-slate-800">
            <button
              type="button"
              onClick={handleSetToday}
              className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
