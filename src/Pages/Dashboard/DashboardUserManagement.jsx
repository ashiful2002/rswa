import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import Swal from "sweetalert2";
import {
  Search,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Trash2,
  UserCog,
  Mail,
  Calendar,
} from "lucide-react";

const ROLES = [
  { label: "Donor", value: "donor", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300" },
  { label: "Moderator", value: "moderator", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300" },
  { label: "Admin", value: "admin", color: "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300" },
];

const DashboardUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [updatingEmail, setUpdatingEmail] = useState(null);

  const { user } = useAuth();
  const { role } = useUserRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthHeaders = async () => {
    let token = window.firebaseToken;
    if (!token && user && typeof user.getIdToken === "function") {
      try {
        token = await user.getIdToken(true);
      } catch (e) {
        console.error("Failed to get Firebase token:", e);
      }
    }
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(API_ENDPOINTS.USERS, { headers });
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setLoading(false);
    }
  };

  const handleRoleChange = async (targetUser, newRole) => {
    if (!isAdmin) {
      Swal.fire("Permission Denied", "Only Administrators can modify user roles.", "warning");
      return;
    }

    if (targetUser.role === newRole) return;

    const confirm = await Swal.fire({
      title: "Change User Role?",
      text: `Promote/Demote ${targetUser.email} to "${newRole.toUpperCase()}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Update Role",
    });

    if (!confirm.isConfirmed) return;

    setUpdatingEmail(targetUser.email);
    try {
      const headers = await getAuthHeaders();
      const res = await axios.put(
        `${API_ENDPOINTS.USERS}/${targetUser.email}/role`,
        { role: newRole },
        { headers }
      );

      if (res.data && res.data.success) {
        Swal.fire({
          title: "Role Updated!",
          text: `Successfully updated ${targetUser.email}'s role to ${newRole}.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      }
    } catch (err) {
      console.error("Role update error:", err);
      const msg = err.response?.data?.message || "Failed to update user role.";
      Swal.fire("Update Error", msg, "error");
    } finally {
      setUpdatingEmail(null);
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (!isAdmin) {
      Swal.fire("Permission Denied", "Only Administrators can delete users.", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${targetUser.email}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const headers = await getAuthHeaders();
      const res = await axios.delete(`${API_ENDPOINTS.USERS}/${targetUser.email}`, { headers });
      if (res.data && res.data.success) {
        Swal.fire("Deleted!", "User record has been removed.", "success");
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete user error:", err);
      const msg = err.response?.data?.message || "Failed to delete user.";
      Swal.fire("Error", msg, "error");
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" ? true : u.role?.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  // Role Statistics
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const moderatorCount = users.filter((u) => u.role === "moderator").length;
  const donorCount = users.filter((u) => u.role === "donor" || !u.role).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            User Management & RBAC
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            View registered system users and assign role permissions (Admin, Moderator, Donor).
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 rounded-xl border border-slate-200  px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-emerald-500" : ""}`} />
          Refresh List
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Signed-in Users
          </p>
          <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">{totalCount}</p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
            Admins
          </p>
          <p className="mt-1 text-2xl font-black text-rose-600 dark:text-rose-400">{adminCount}</p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
            Moderators
          </p>
          <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">{moderatorCount}</p>
        </div>
        <div className="shadow-xs rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
            Donors / Members
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">{donorCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Admin", "Moderator", "Donor"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${roleFilter === r
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "border border-slate-200  text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200  py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* User Management Table */}
      <div className="shadow-xs overflow-hidden rounded-2xl border border-slate-200  dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3.5">User Identity</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">Assigned Role</th>
                <th className="px-4 py-3.5">Registered Date</th>
                <th className="px-4 py-3.5 text-right">Actions / Role Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="h-6 w-6 animate-spin text-emerald-500" />
                      <span>Fetching registered users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u._id || u.email}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    {/* User Identity Column */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {(u.displayName || u.name || u.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">
                            {u.displayName || u.name || "Signed-in User"}
                          </p>
                          {u.email === user?.email && (
                            <span className="inline-block text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    {/* Current Role Badge */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${u.role === "admin"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300"
                            : u.role === "moderator"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300"
                              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                          }`}
                      >
                        {u.role === "admin" && <ShieldAlert className="h-3 w-3" />}
                        {u.role === "moderator" && <ShieldCheck className="h-3 w-3" />}
                        {(!u.role || u.role === "donor") && <UserCheck className="h-3 w-3" />}
                        {u.role || "donor"}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>
                          {u.created_at || u.createdAt
                            ? new Date(u.created_at || u.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Actions / Role Control */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Role Switch Dropdown */}
                        {isAdmin ? (
                          <select
                            value={u.role || "donor"}
                            disabled={updatingEmail === u.email || u.email === user?.email}
                            onChange={(e) => handleRoleChange(u, e.target.value)}
                            className="rounded-xl border border-slate-200  px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          >
                            <option value="donor">Donor (Default)</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="text-[11px] text-slate-400">View Only</span>
                        )}

                        {/* Delete User Button (Admin only, non-self) */}
                        {isAdmin && u.email !== user?.email && (
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserManagement;
