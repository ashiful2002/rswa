import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Sparkles, X } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import ProjectStatusBadge, {
  getCategoryBadgeClass,
} from "./ProjectStatusBadge";

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const handleFacebookShare = () => {
    const projectUrl = `${window.location.origin}/projects/${project.slug || project._id}`;
    const shareUrl = encodeURIComponent(projectUrl);
    const quote = encodeURIComponent(
      `${project.title}\n\n${project.summary || ""}`,
    );

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`;

    const width = 626;
    const height = 436;
    const left = Math.max(0, (window.screen.width - width) / 2);
    const top = Math.max(0, (window.screen.height - height) / 2);

    window.open(
      facebookShareUrl,
      "facebook-share-dialog",
      `width=${width},height=${height},top=${top},left=${left},toolbar=0,status=0,resizable=1`,
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 mt-20 md:mt-28 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="backdrop-blur-xs fixed inset-0 bg-slate-900/60"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Thumbnail */}
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3">
              <ProjectStatusBadge status={project.status} />
            </div>
          </div>

          {/* Category Badge & Title */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
                project.category,
              )}`}
            >
              {project.category}
            </span>
            {project.startDate && (
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                {project.startDate}
              </span>
            )}
          </div>

          <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {project.title}
          </h2>

          {/* Impact Metrics Summary Box */}
          {project.impactMetrics && (
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60 sm:grid-cols-3">
              {project.impactMetrics.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-rose-500" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Location
                    </p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {project.impactMetrics.location}
                    </p>
                  </div>
                </div>
              )}
              {project.impactMetrics.beneficiaries && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Impact / Beneficiaries
                    </p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {project.impactMetrics.beneficiaries}
                    </p>
                  </div>
                </div>
              )}
              {project.impactMetrics.volunteersCount > 0 && (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-400">
                      Volunteers
                    </p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {project.impactMetrics.volunteersCount} Active
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Description */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Details
            </h4>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.description || project.summary}
            </p>
          </div>

          {/* Modal Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              onClick={handleFacebookShare}
              className="flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0d65d9] active:scale-95"
              title="Share directly to Facebook Feed or Page"
            >
              <FaFacebook className="h-4 w-4" />
              <span>Share on Facebook</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
