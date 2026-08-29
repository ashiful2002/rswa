import React from "react";

export const InputField = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
        {Icon && (
          <Icon className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          required={required}
          {...props}
        />
      </div>
    </div>
  );
};

export const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder,
  icon: Icon,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
        {Icon && (
          <Icon className="mr-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-xs text-slate-800 outline-none dark:text-slate-100"
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="dark:bg-slate-900">
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const isObject = typeof option === "object" && option !== null;
            const val = isObject ? option.value : option;
            const labelText = isObject ? option.label : option;
            return (
              <option key={val} value={val} className="dark:bg-slate-900">
                {labelText}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
