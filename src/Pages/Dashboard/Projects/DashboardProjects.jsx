import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../../config/api";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";
import Swal from "sweetalert2";
import { Plus, Search, RefreshCw } from "lucide-react";
import ProjectStatsSummary from "./ProjectStatsSummary";
import ProjectTable from "./ProjectTable";
import ProjectFormModal from "./ProjectFormModal";
import Pagination from "../../../Components/shared/Pagination";

import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

const CATEGORIES = ["Education", "Health", "Environment", "Relief", "Cultural"];

const DashboardProjects = () => {
  const axiosSecure = useAxiosSecure();
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 9,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Education",
    status: "Active",
    thumbnail: "",
    summary: "",
    description: "",
    beneficiaries: "",
    volunteersCount: 0,
    location: "Rowmari, Kurigram",
    startDate: "",
    endDate: "",
  });

  const { role } = useUserRole();
  const isAdmin = role === "super_admin" || role === "admin";
  const isModerator = role === "moderator" || isAdmin;

  // Reset to page 1 on category/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, searchQuery, currentPage]);

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

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let url = `${API_ENDPOINTS.PROJECTS}?page=${currentPage}&limit=9`;
      if (selectedCategory !== "All") {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      const res = await axios.get(url);
      if (res.data && res.data.data) {
        setProjects(res.data.data);
        if (res.data.meta) {
          setMeta(res.data.meta);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Education",
      status: "Active",
      thumbnail: "",
      summary: "",
      description: "",
      beneficiaries: "",
      volunteersCount: 0,
      location: "Rowmari, Kurigram",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "Education",
      status: project.status || "Active",
      thumbnail: project.thumbnail || "",
      summary: project.summary || "",
      description: project.description || "",
      beneficiaries: project.impactMetrics?.beneficiaries || "",
      volunteersCount: project.impactMetrics?.volunteersCount || 0,
      location: project.impactMetrics?.location || "Rowmari, Kurigram",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.thumbnail || !formData.summary) {
      Swal.fire(
        "Validation Error",
        "Title, Thumbnail URL, and Summary are required.",
        "warning",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        status: formData.status,
        thumbnail: formData.thumbnail,
        summary: formData.summary,
        description: formData.description,
        impactMetrics: {
          beneficiaries: formData.beneficiaries,
          volunteersCount: Number(formData.volunteersCount) || 0,
          location: formData.location,
        },
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      if (editingProject) {
        const res = await axiosSecure.put(
          `${API_ENDPOINTS.PROJECTS}/${editingProject._id || editingProject.slug}`,
          payload,
        );
        if (res.data && res.data.success) {
          Swal.fire("Updated!", "Project updated successfully.", "success");
          fetchProjects();
          setIsModalOpen(false);
        }
      } else {
        const res = await axiosSecure.post(API_ENDPOINTS.PROJECTS, payload);
        if (res.data && res.data.success) {
          Swal.fire("Created!", "Project created successfully.", "success");
          fetchProjects();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to save project. Ensure you have proper permissions.";
      Swal.fire("Error", msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (project) => {
    if (!isAdmin) {
      Swal.fire(
        "Permission Denied",
        "Only administrators can delete projects.",
        "warning",
      );
      return;
    }

    const confirm = await Swal.fire({
      title: "Delete Project?",
      text: `Are you sure you want to delete "${project.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `${API_ENDPOINTS.PROJECTS}/${project._id || project.slug}`,
        );
        if (res.data && res.data.success) {
          Swal.fire("Deleted!", "Project deleted successfully.", "success");
          fetchProjects();
        }
      } catch (err) {
        console.error("Delete error:", err);
        const msg = err.response?.data?.message || "Failed to delete project.";
        Swal.fire("Error", msg, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            Project Management
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Create, update, and manage RSWA social initiatives and impact
            reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProjects}
            className="rounded-xl border border-slate-200  p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Refresh Projects"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {isModerator && (
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 focus:outline-none"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <ProjectStatsSummary projects={projects} totalCount={meta.total} />

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${selectedCategory === "All"
              ? "  text-white  bg-emerald-600 border-slate-200 dark:text-slate-900"
              : "border border-slate-200  text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${selectedCategory === cat
                ? "bg-emerald-600 text-white"
                : "border border-slate-200   text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200   py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Table Component */}
      <ProjectTable
        projects={projects}
        loading={loading}
        isAdmin={isAdmin}
        onEdit={handleOpenEditModal}
        onDelete={handleDelete}
      />

      {/* Pagination Controls */}
      <Pagination
        currentPage={meta.page || currentPage}
        totalPages={meta.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Form Modal Component */}
      <ProjectFormModal
        isOpen={isModalOpen}
        editingProject={editingProject}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardProjects;
