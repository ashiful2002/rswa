import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, RefreshCw, Award, FolderKanban } from "lucide-react";
import { API_ENDPOINTS } from "../../../config/api";
import StatKPICards from "../../../Components/Dashboard/Stat/StatKPICards";
import StatBarChartCard from "../../../Components/Dashboard/Stat/StatBarChartCard";

// Professional color palette for blood groups
const BLOOD_COLORS = {
  "A+": "#ef4444",
  "A-": "#f87171",
  "B+": "#3b82f6",
  "B-": "#60a5fa",
  "AB+": "#8b5cf6",
  "AB-": "#a78bfa",
  "O+": "#059669",
  "O-": "#10b981",
};

// Helper to normalize blood group names
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

const DashboardStat = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats from backend API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsRes = await axios.get(API_ENDPOINTS.STATS);
      if (statsRes?.data?.data) {
        setStatsData(statsRes.data.data);
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

  if (error && !statsData) {
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

  // 1. Blood Group Data
  const standardGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const bloodCounts = {};
  (statsData?.bloodGroupDistribution || []).forEach((item) => {
    const norm = normalizeBloodGroup(item._id);
    if (norm) {
      bloodCounts[norm] = (bloodCounts[norm] || 0) + item.count;
    }
  });

  const bloodGroupData = standardGroups.map((group) => ({
    name: group,
    donors: bloodCounts[group] || 0,
  }));

  // 2. SSC Batch Data
  const batchCountsMap = {};
  (statsData?.sscBatchDistribution || []).forEach((b) => {
    let label = String(b._id || "").trim();
    const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    bengaliNumerals.forEach((num, idx) => {
      label = label.replaceAll(num, String(idx));
    });
    const match = label.match(/\d+/);
    const batchYear = match ? match[0] : label;
    if (batchYear) {
      batchCountsMap[batchYear] = (batchCountsMap[batchYear] || 0) + b.count;
    }
  });

  const sscBatchData = Object.entries(batchCountsMap)
    .map(([batch, count]) => ({
      name: `Batch ${batch}`,
      batchYear: parseInt(batch, 10) || 0,
      donors: count,
    }))
    .sort((a, b) => a.batchYear - b.batchYear);

  // 3. Location / Address Data
  const locationMap = {};
  (statsData?.topLocations || []).forEach((l) => {
    if (!l._id) return;
    const raw = String(l._id).trim();
    if (!raw) return;
    const formatted = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    locationMap[formatted] = (locationMap[formatted] || 0) + l.count;
  });

  const locationData = Object.entries(locationMap)
    .map(([name, count]) => ({ name, donors: count }))
    .sort((a, b) => b.donors - a.donors)
    .slice(0, 10);

  // 4. User Role Distribution Data
  const userRoleData = (statsData?.userRoleDistribution || []).map((r) => ({
    name: r._id
      ? r._id.charAt(0).toUpperCase() + r._id.slice(1).toLowerCase()
      : "User",
    count: r.count,
  }));

  // 5. Project Category Distribution Data
  const projectCategoryData = (
    statsData?.projectCategoryDistribution || []
  ).map((c) => ({
    name: c._id || "General",
    count: c.count,
  }));

  // 6. Student Award Session Distribution Data
  const studentAwardSessionData = (
    statsData?.studentAwardSessionDistribution || []
  ).map((s) => ({
    name: `Session ${s._id || "N/A"}`,
    count: s.count,
  }));

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-2 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
            <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Executive Dashboard Statistics & Analytics
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics for blood donors, user roles, student award
            submissions, projects, and regional coverage.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="shadow-xs flex items-center gap-1.5 self-start rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* Reusable KPI Metric Cards */}
      <StatKPICards
        totalDonors={statsData?.totalDonors ?? 0}
        totalUsers={statsData?.totalUsers ?? 0}
        totalProjects={statsData?.totalProjects ?? 0}
        totalStudentAwards={statsData?.totalStudentAwards ?? 0}
      />

      {/* Primary Analytics Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 1: Blood Group Distribution */}
        <StatBarChartCard
          title="Blood Group Availability"
          subtitle="Donor breakdown per standard blood type"
          badgeText="Blood Bank"
          badgeColorClass="border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          data={bloodGroupData}
          dataKey="donors"
          barColor="#059669"
          colorMap={BLOOD_COLORS}
        />

        {/* Chart 2: SSC Batch Demographics */}
        <StatBarChartCard
          title="SSC Batch Demographics"
          subtitle="Donor counts categorized by SSC graduation year"
          badgeText="Batches"
          badgeColorClass="border-blue-200/60 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
          data={sscBatchData}
          dataKey="donors"
          barColor="#0284c7"
        />
      </div>

      {/* Secondary Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart 3: Regional Distribution Bar Chart (2 columns) */}
        <StatBarChartCard
          title="Regional Donor Coverage (Present Address)"
          subtitle="Top locations ranked by registered donor availability"
          badgeText="Locations"
          badgeColorClass="border-emerald-200/60 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          data={locationData}
          dataKey="donors"
          barColor="#059669"
          columnSpanClass="lg:col-span-2"
          xAxisProps={{
            interval: 0,
            angle: -15,
            textAnchor: "end",
            margin: { bottom: 25 },
          }}
        />

        {/* Chart 4: Student Award Session Breakdown (1 column) */}
        <StatBarChartCard
          title="Student Award Sessions"
          subtitle="Submissions per academic session"
          badgeText="Sessions"
          badgeColorClass="border-purple-200/60 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
          data={studentAwardSessionData}
          dataKey="count"
          barColor="#8b5cf6"
          emptyIcon={Award}
          emptyText="No session data available"
        />
      </div>

      {/* Tertiary Analytics Grid: Project Categories & User Roles */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 5: Project Category Distribution */}
        <StatBarChartCard
          title="Project Category Breakdown"
          subtitle="Initiatives categorized by field"
          badgeText="Categories"
          badgeColorClass="border-amber-200/60 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
          data={projectCategoryData}
          dataKey="count"
          barColor="#d97706"
          height="h-[250px]"
          emptyIcon={FolderKanban}
          emptyText="No project category data available"
        />

        {/* Chart 6: User Roles Breakdown */}
        <StatBarChartCard
          title="User Roles Breakdown"
          subtitle="System accounts by role"
          badgeText="User Roles"
          badgeColorClass="border-blue-200/60 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
          data={userRoleData}
          dataKey="count"
          barColor="#2563eb"
          height="h-[250px]"
        />
      </div>
    </div>
  );
};

export default DashboardStat;
