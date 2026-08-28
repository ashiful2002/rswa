import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* eslint-disable react/prop-types */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white shadow-xl">
        <p className="mb-1.5 border-b border-slate-800 pb-1 font-semibold capitalize text-slate-300">
          {label}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Total Count:</span>
          <span className="text-sm font-bold text-emerald-400">
            {payload[0].value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};
/* eslint-enable react/prop-types */

/* eslint-disable react/prop-types */
const StatBarChartCard = ({
  title,
  subtitle,
  badgeText,
  badgeColorClass,
  data,
  dataKey = "count",
  barColor = "#059669",
  colorMap,
  emptyIcon: EmptyIcon,
  emptyText = "No data available",
  height = "h-[280px]",
  columnSpanClass = "",
  xAxisProps = {},
}) => {
  return (
    <div
      className={`shadow-xs rounded-2xl border border-slate-200  p-5 dark:border-slate-800 dark:bg-slate-900 ${columnSpanClass}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {badgeText && (
          <span
            className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold ${badgeColorClass}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className={`${height} w-full`}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0, ...xAxisProps.margin }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                {...xAxisProps}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey} fill={barColor} radius={[6, 6, 0, 0]} maxBarSize={45}>
                {colorMap &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorMap[entry.name] || barColor}
                    />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            {EmptyIcon && <EmptyIcon className="mb-2 h-8 w-8 opacity-50" />}
            <p className="text-xs">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatBarChartCard;
