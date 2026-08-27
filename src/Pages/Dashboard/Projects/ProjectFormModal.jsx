import React, { useState } from "react";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadToImgBB } from "../../../utils/uploadImage";

const CATEGORIES = ["Education", "Health", "Environment", "Relief", "Cultural"];
const STATUSES = ["Active", "Upcoming", "Completed"];

const ProjectFormModal = ({
  isOpen,
  editingProject,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  onClose,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image to ImgBB");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="backdrop-blur-xs fixed inset-0 bg-slate-900/60"
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {editingProject ? "Edit Project" : "Create New Project"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Annual Winter Blanket Distribution 2026"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thumbnail Upload & URL Input */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Thumbnail Image *
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* File Upload Button */}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-500 bg-emerald-50/50 px-4 py-2.5 font-semibold text-emerald-700 transition-all hover:bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading to ImgBB...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Local File</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              <span className="text-center text-xs text-slate-400 sm:text-left">
                or enter direct URL below:
              </span>
            </div>

            {uploadError && (
              <p className="text-[11px] font-semibold text-red-500">
                {uploadError}
              </p>
            )}

            <input
              type="url"
              required
              placeholder="https://i.ibb.co/..."
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />

            {/* Thumbnail Preview */}
            {formData.thumbnail && (
              <div className="relative mt-2 aspect-video w-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
              Short Summary *
            </label>
            <textarea
              rows="2"
              required
              placeholder="A brief overview displayed on cards..."
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
              Full Description
            </label>
            <textarea
              rows="4"
              placeholder="Detailed description of the initiative..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          {/* Impact Metrics */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="mb-3 font-bold text-slate-800 dark:text-slate-200">
              Impact Metrics
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block font-semibold text-slate-600 dark:text-slate-400">
                  Beneficiaries
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500+ Families"
                  value={formData.beneficiaries}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      beneficiaries: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block font-semibold text-slate-600 dark:text-slate-400">
                  Volunteers
                </label>
                <input
                  type="number"
                  placeholder="35"
                  value={formData.volunteersCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      volunteersCount: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block font-semibold text-slate-600 dark:text-slate-400">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Rowmari Sadar"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="rounded-xl bg-emerald-600 px-6 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : editingProject
                  ? "Update Project"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
