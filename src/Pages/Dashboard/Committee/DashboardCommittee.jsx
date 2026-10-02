import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Users,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { API_ENDPOINTS } from "../../../config/api";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";
import CommitteeFormModal from "./CommitteeFormModal";
import DashboardSkeleton from "../../../Components/Dashboard/DashboardSkeleton";

const DashboardCommittee = () => {
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useUserRole();
  const isSuperAdmin = role === "super_admin";

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    session: "2026-2027",
    says: "",
    order: 1,
    isActive: true,
    social: {
      phone: "",
      whatsapp: "",
      facebook: "",
      email: "",
    },
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      let url = `${API_ENDPOINTS.COMMITTEE}?sortField=order&sortOrder=asc`;
      if (selectedSession !== "All") {
        url += `&session=${encodeURIComponent(selectedSession)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await axios.get(url);
      if (res.data && res.data.data) {
        setMembers(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch committee members:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load committee members.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [selectedSession, searchQuery]);

  // Extract unique sessions for filter dropdown
  const sessions = [
    "All",
    ...new Set(members.map((m) => m.session).filter(Boolean)),
  ];

  const handleOpenCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      title: "",
      image: "",
      session: "2026-2027",
      says: "",
      order: (members.length || 0) + 1,
      isActive: true,
      social: {
        phone: "",
        whatsapp: "",
        facebook: "",
        email: "",
      },
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      title: member.title || "",
      image: member.image || member.url || "",
      session: member.session || "2026-2027",
      says: member.says || "",
      order: member.order ?? 1,
      isActive: member.isActive !== false,
      social: {
        phone: member.social?.phone || "",
        whatsapp: member.social?.whatsapp || "",
        facebook: member.social?.facebook || "",
        email: member.social?.email || "",
      },
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.title.trim() || !formData.image) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Name, Title/Designation, and Image are required.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingMember) {
        const res = await axiosSecure.put(
          `/committee/${editingMember._id}`,
          formData,
        );
        if (res.data?.success) {
          Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Committee member updated successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
          fetchMembers();
        }
      } else {
        const res = await axiosSecure.post("/committee", formData);
        if (res.data?.success) {
          Swal.fire({
            icon: "success",
            title: "Created",
            text: "Committee member created successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
          fetchMembers();
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to save committee member. Make sure you are logged in as Super Admin.";
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (member) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${member.name}" (${member.title})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete member",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/committee/${member._id}`);
          if (res.data?.success) {
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Committee member deleted successfully.",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchMembers();
          }
        } catch (err) {
          console.error("Delete error:", err);
          const msg =
            err.response?.data?.message ||
            "Failed to delete member. Only Super Admin can perform this action.";
          Swal.fire({
            icon: "error",
            title: "Error",
            text: msg,
          });
        }
      }
    });
  };

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.isActive !== false).length;

  if (loading && members.length === 0) {
    return <DashboardSkeleton statCardsCount={3} rowsCount={5} />;
  }

  return (
    <div className="space-y-6">
      {/* Super Admin Notice if non-super-admin accesses this screen */}
      {!roleLoading && !isSuperAdmin && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-xs">
            <span className="font-bold">Super Admin Access Required:</span> You
            can view the executive committee members below, but adding,
            updating, or deleting members requires Super Admin role permissions.
          </div>
        </div>
      )}

      {/* Top Header & Stat Cards */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            Executive Committee
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage executive committee members displayed on the landing page
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          disabled={!isSuperAdmin}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          title={
            isSuperAdmin
              ? "Add new committee member"
              : "Only Super Admin can add members"
          }
        >
          <Plus className="h-4 w-4" />
          <span>Add Committee Member</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="shadow-xs rounded-2xl border border-slate-200  p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Total Members
              </p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {totalMembers}
              </h3>
            </div>
          </div>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200  p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Active on Landing
              </p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {activeMembers}
              </h3>
            </div>
          </div>
        </div>

        <div className="shadow-xs rounded-2xl border border-slate-200  p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Active Session
              </p>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {members[0]?.session || "2026-2027"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="shadow-xs flex flex-col gap-3 rounded-2xl border border-slate-200  p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, title, or statement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-xs text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2">
          {sessions.length > 2 && (
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="rounded-xl border border-slate-200  px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              {sessions.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Sessions" : s}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={fetchMembers}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 p-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Refresh list"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="shadow-xs overflow-hidden rounded-2xl border border-slate-200  dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-center">Order</th>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Session</th>
                <th className="px-4 py-3">Contact & Social</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="mx-auto mb-2 h-6 w-6 animate-spin text-emerald-600" />
                    Loading committee members...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No committee members found matching your search.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member._id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {member.order ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.image || member.url}
                          alt={member.name}
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-500/40"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/150";
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">
                            {member.name}
                          </p>
                          {member.says && (
                            <p className="max-w-xs truncate text-[11px] text-slate-400">
                              "{member.says}"
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {member.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {member.session || "2026-2027"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-slate-500">
                        {member.social?.phone && (
                          <a
                            href={`tel:${member.social.phone}`}
                            title={`Call: ${member.social.phone}`}
                            className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.social?.whatsapp && (
                          <a
                            href={`https://wa.me/${member.social.whatsapp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`WhatsApp: ${member.social.whatsapp}`}
                            className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.social?.facebook && (
                          <a
                            href={member.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook Profile"
                            className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800"
                          >
                            <FaFacebook className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {member.social?.email && (
                          <a
                            href={`mailto:${member.social.email}`}
                            title={`Email: ${member.social.email}`}
                            className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {!member.social?.phone &&
                          !member.social?.whatsapp &&
                          !member.social?.facebook &&
                          !member.social?.email && (
                            <span className="text-[11px] text-slate-400">
                              None
                            </span>
                          )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {member.isActive !== false ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          <XCircle className="h-3 w-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(member)}
                          disabled={!isSuperAdmin}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-emerald-600 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                          title="Edit member"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          disabled={!isSuperAdmin}
                          className="rounded-lg p-1.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-rose-950/50"
                          title="Delete member"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CommitteeFormModal
        isOpen={isModalOpen}
        editingMember={editingMember}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardCommittee;
