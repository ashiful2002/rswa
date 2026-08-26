import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`flex items-center justify-center rounded-xl p-2 transition-all duration-200 focus:outline-none ${
        isDark
          ? "bg-slate-800 text-amber-400 ring-1 ring-slate-700 hover:bg-slate-700 hover:text-amber-300"
          : "bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200 hover:text-slate-900"
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="h-4 w-4 rotate-0 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 rotate-0 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
