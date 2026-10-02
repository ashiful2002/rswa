import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { uploadToImgBB } from "../../../utils/uploadImage";

const DESIGNATION_SUGGESTIONS = [
  "President",
  "Senior Vice President",
  "Vice President",
  "General Secretary",
  "Joint General Secretary",
  "Organizing Secretary",
  "Finance Secretary",
  "Office Secretary",
  "Publicity Secretary",
  "Executive Member",
  "Adviser",
];

const CommitteeFormModal = ({
  isOpen,
  editingMember,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  onClose,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [imageInputMode, setImageInputMode] = useState("file"); // 'file' | 'url'

  useEffect(() => {
    setUploadError(null);
    setIsUploading(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const imageUrl = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image to ImgBB");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSocialChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      social: {
        ...(prev.social || {}),
        [field]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="backdrop-blur-xs fixed inset-0 bg-slate-900/60"
      />

      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200  p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {editingMember ? "Edit Committee Member" : "Add Committee Member"}
            </h3>
            <p className="text-xs text-slate-500">
              Only Super Admin can create and modify executive committee
              members.
            </p>
          </div> 
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4 text-xs">
          {/* Basic Details: Name & Title */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Al Farazi Maruf"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Title / Designation *
              </label>
              <input
                type="text"
                required
                list="designation-suggestions"
                placeholder="e.g. President"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
              <datalist id="designation-suggestions">
                {DESIGNATION_SUGGESTIONS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Session, Order, & Active status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Session / Term
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-2027"
                value={formData.session || ""}
                onChange={(e) =>
                  setFormData({ ...formData, session: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
                Display Order (1 = First)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 1"
                value={formData.order ?? 0}
                onChange={(e) =>
                  setFormData({ ...formData, order: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
                Display Status
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive !== false}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Active (Visible on Landing Page)
                </span>
              </label>
            </div>
          </div>

          {/* Image Upload / URL */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Member Photo * (ImgBB Upload)
              </label>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageInputMode("file")}
                  className={`font-medium ${
                    imageInputMode === "file"
                      ? "text-emerald-600 underline"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Upload File
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setImageInputMode("url")}
                  className={`font-medium ${
                    imageInputMode === "url"
                      ? "text-emerald-600 underline"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Paste URL
                </button>
              </div>
            </div>

            {imageInputMode === "file" ? (
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-4 transition-colors hover:border-emerald-500 hover:bg-emerald-50/20 dark:border-slate-800 dark:hover:border-emerald-500/50">
                  <div className="flex flex-col items-center justify-center py-2 text-center">
                    {isUploading ? (
                      <Loader2 className="mb-2 h-7 w-7 animate-spin text-emerald-600" />
                    ) : (
                      <Upload className="mb-2 h-7 w-7 text-slate-400" />
                    )}
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {isUploading
                        ? "Uploading to ImgBB..."
                        : "Click to upload member photo"}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      PNG, JPG, WEBP (Max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://i.ibb.co.com/example/photo.jpg"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            )}

            {uploadError && (
              <p className="mt-1 text-xs text-rose-500">{uploadError}</p>
            )}

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-500"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Photo Uploaded
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {formData.image}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Speech / Says / Bio */}
          <div>
            <label className="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
              Speech / Quote / Statement
            </label>
            <textarea
              rows="3"
              placeholder="A brief message from the member to the students and community..."
              value={formData.says || ""}
              onChange={(e) =>
                setFormData({ ...formData, says: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          {/* Social Links & Contact */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Contact & Social Links
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+880 18 2412 2969"
                  value={formData.social?.phone || ""}
                  onChange={(e) => handleSocialChange("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="+880 18 2412 2969"
                  value={formData.social?.whatsapp || ""}
                  onChange={(e) =>
                    handleSocialChange("whatsapp", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 p-2 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
                  Facebook Profile Link
                </label>
                <input
                  type="url"
                  placeholder="https://www.facebook.com/username"
                  value={formData.social?.facebook || ""}
                  onChange={(e) =>
                    handleSocialChange("facebook", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 p-2 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-slate-600 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="member@gmail.com"
                  value={formData.social?.email || ""}
                  onChange={(e) => handleSocialChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading || !formData.image}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingMember ? "Save Changes" : "Create Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommitteeFormModal;
