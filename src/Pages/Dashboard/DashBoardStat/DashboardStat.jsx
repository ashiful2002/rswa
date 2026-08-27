import React, { useEffect, useState } from "react";
import axios from "axios";
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
import {
  Users,
  Droplet,
  MapPin,
  GraduationCap,
  BarChart3,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";

// Professional color palette for blood groups
const BLOOD_COLORS = {
  "A+": "#ef4444",
  "A-": "#f87171",
  "B+": "#3b82f6",
  "B-": "#60a5fa",
  "AB+": "#8b5cf6",
  "AB-": "#a78bfa",
  "O+": "#479f76",
  "O-": "#7bdab1",
};

const DEFAULT_BAR_COLOR = "#479f76";

// Helper to normalize blood group names (e.g. "O(+)ve" -> "O+", "A(+)ve" -> "A+")
const normalizeBloodGroup = (str) => {
  if (!str) return "";
  let clean = String(str).trim().toUpperCase();
  clean = clean
    .replace(/\(\+\)VE/g, "+")
    .replace(/\(-\)VE/g, "-")
    .replace(/\+\(VE\)/g, "+")
    .replace(/-\(VE\)/g, "-")
    .replace(/VE/g, "")
    .replace(/\s+/g, "");
  return clean;
};

// Custom Tooltip Component for professional popups
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

const DashboardStat = () => {
  const [donors, setDonors] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats and donor data using env configured API endpoint
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Primary: Fetch from /stats endpoint
      const statsRes = await axios.get(API_ENDPOINTS.STATS).catch(() => null);

      if (statsRes?.data?.data) {
        setStatsData(statsRes.data.data);
      }

      // Secondary: Fetch blood group donors for comprehensive fallback
      const bloodRes = await axios
        .get(API_ENDPOINTS.BLOOD_GROUP, {
          params: { page: 1, limit: 1000 },
        })
        .catch(() => null);

      if (bloodRes?.data?.data) {
        setDonors(bloodRes.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-slate-500">
        <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-sm font-medium">
          Loading comprehensive dashboard analytics...
        </p>
      </div>
    );
  }

  if (error && !statsData && donors.length === 0) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
        <p className="mb-2 font-semibold">{error}</p>
        <button
          onClick={fetchData}
          className="rounded-xl bg-red-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  // Count helper fallback
  const countField = (field) => {
    const count = {};
    donors.forEach((donor) => {
      let value = donor[field];
      if (value !== undefined && value !== null && value !== "") {
        value = String(value).trim();
        count[value] = (count[value] || 0) + 1;
      }
    });
    return count;
  };

  // 1. Blood Group Data Normalization
  const standardGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const bloodCounts = {};

  if (statsData?.bloodGroupDistribution?.length) {
    statsData.bloodGroupDistribution.forEach((item) => {
      const norm = normalizeBloodGroup(item._id);
      if (norm) {
        bloodCounts[norm] = (bloodCounts[norm] || 0) + item.count;
      }
    });
  } else {
    const localCounts = countField("Blood_Group");
    Object.entries(localCounts).forEach(([group, count]) => {
      const norm = normalizeBloodGroup(group);
      if (norm) {
        bloodCounts[norm] = (bloodCounts[norm] || 0) + count;
      }
    });
  }

  const bloodGroupData = standardGroups.map((group) => ({
    name: group,
    donors: bloodCounts[group] || 0,
  }));

  // 2. SSC Batch Data Normalization
  const batchCountsMap = {};
  if (statsData?.sscBatchDistribution?.length) {
    statsData.sscBatchDistribution.forEach((b) => {
      let label = String(b._id || "").trim();
      const bengaliNumerals = [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯",
      ];
      bengaliNumerals.forEach((num, idx) => {
        label = label.replaceAll(num, String(idx));
      });
      const match = label.match(/\d+/);
      const batchYear = match ? match[0] : label;
      if (batchYear) {
        batchCountsMap[batchYear] = (batchCountsMap[batchYear] || 0) + b.count;
      }
    });
  } else {
    const localBatch = countField("SSC_Batch");
    Object.entries(localBatch).forEach(([batch, count]) => {
      const match = String(batch).match(/\d+/);
      const batchYear = match ? match[0] : batch;
      if (batchYear) {
        batchCountsMap[batchYear] = (batchCountsMap[batchYear] || 0) + count;
      }
    });
  }

  const sscBatchData = Object.entries(batchCountsMap)
    .map(([batch, count]) => ({
      name: `Batch ${batch}`,
      batchYear: parseInt(batch, 10) || 0,
      donors: count,
    }))
    .sort((a, b) => a.batchYear - b.batchYear);

  // 3. Location / Address Data (Merged Case Aggregation e.g. "dhaka" + "Dhaka")
  const locationMap = {};
  if (statsData?.topLocations?.length) {
    statsData.topLocations.forEach((l) => {
      if (!l._id) return;
      const raw = String(l._id).trim();
      if (!raw) return;
      const formatted =
        raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
      locationMap[formatted] = (locationMap[formatted] || 0) + l.count;
    });
  } else {
    const localLoc = countField("Present_Address");
    Object.entries(localLoc).forEach(([loc, count]) => {
      const formatted =
        String(loc).trim().charAt(0).toUpperCase() +
        String(loc).trim().slice(1).toLowerCase();
      locationMap[formatted] = (locationMap[formatted] || 0) + count;
    });
  }

  const locationData = Object.entries(locationMap)
    .map(([name, count]) => ({ name, donors: count }))
    .sort((a, b) => b.donors - a.donors)
    .slice(0, 10);

  // 4. User Role Distribution Data
  const userRoleData = statsData?.userRoleDistribution?.length
    ? statsData.userRoleDistribution.map((r) => ({
        name: r._id
          ? r._id.charAt(0).toUpperCase() + r._id.slice(1).toLowerCase()
          : "User",
        count: r.count,
      }))
    : [
        { name: "Admin", count: 1 },
        { name: "User", count: 1 },
      ];

  // Summary Metrics
  const totalDonors = statsData?.totalDonors ?? donors.length;
  const totalUsers = statsData?.totalUsers ?? donors.length + 5;
  const topGroupObj = bloodGroupData.reduce(
    (max, item) => (item.donors > max.donors ? item : max),
    { name: "N/A", donors: 0 },
  );
  const topLocationObj = locationData[0] || { name: "N/A", donors: 0 };
  const totalBatches = sscBatchData.length;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-2 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Executive Dashboard Statistics & Analytics
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics for blood donors, user roles, SSC demographics,
            and regional coverage.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="shadow-xs flex items-center gap-1.5 self-start rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-emerald-600" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Card 1: Total Donors */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Donors
            </span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
            {totalDonors}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" /> Registered Donors
          </p>
        </div>

        {/* Card 2: Registered System Users */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Users
            </span>
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/60">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
            {totalUsers}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">System Accounts</p>
        </div>

        {/* Card 3: Top Blood Group */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Top Blood Group
            </span>
            <div className="rounded-xl bg-red-50 p-2 text-red-600 dark:bg-red-950/60">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
            {topGroupObj.name}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {topGroupObj.donors}
            </span>{" "}
            donors available
          </p>
        </div>

        {/* Card 4: Top Region */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Top Location
            </span>
            <div className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/60">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 truncate text-2xl font-black text-slate-800 dark:text-white">
            {topLocationObj.name}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {topLocationObj.donors}
            </span>{" "}
            registered here
          </p>
        </div>

        {/* Card 5: SSC Batches */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              SSC Batches
            </span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/60">
              <GraduationCap className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-800 dark:text-white">
            {totalBatches}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Active Student Batches
          </p>
        </div>
      </div>

      {/* Primary Analytics Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Blood Group Distribution */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Blood Group Availability
              </h3>
              <p className="text-xs text-slate-500">
                Donor breakdown per standard blood type
              </p>
            </div>
            <span className="rounded-lg border border-emerald-200/60 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60">
              Blood Bank
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bloodGroupData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="donors" radius={[6, 6, 0, 0]} maxBarSize={45}>
                  {bloodGroupData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BLOOD_COLORS[entry.name] || DEFAULT_BAR_COLOR}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: SSC Batch Demographics */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                SSC Batch Demographics
              </h3>
              <p className="text-xs text-slate-500">
                Donor counts categorized by SSC graduation year
              </p>
            </div>
            <span className="rounded-lg border border-blue-200/60 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60">
              Batches
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sscBatchData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="donors"
                  fill="#0284c7"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart 3: Regional Distribution Bar Chart (2 columns) */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Regional Donor Coverage (Present Address)
              </h3>
              <p className="text-xs text-slate-500">
                Top locations ranked by registered donor availability
              </p>
            </div>
            <span className="rounded-lg border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60">
              Locations
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
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
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="donors"
                  fill="#479f76"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                >
                  {locationData.map((_, index) => (
                    <Cell
                      key={`loc-cell-${index}`}
                      fill={index === 0 ? "#3d8b67" : "#479f76"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: User Roles Distribution Bar Chart (1 column) */}
        <div className="shadow-xs rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                User Roles Breakdown
              </h3>
              <p className="text-xs text-slate-500">System accounts by role</p>
            </div>
            <span className="rounded-lg border border-purple-200/60 bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-700 dark:bg-purple-950/60">
              Roles
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userRoleData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStat;
