import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import ProjectStatusBadge, {
  getCategoryBadgeClass,
} from "./ProjectStatusBadge";

const ProjectCard = ({ project, onSelect }) => {
  const handleFacebookShare = (e) => {
    if (e) e.stopPropagation();

    // Direct clean URL: http://domain/projects/slug-name
    const projectUrl = `${window.location.origin}/projects/${project.slug || project._id}`;
    const shareUrl = encodeURIComponent(projectUrl);
    const quote = encodeURIComponent(
      `${project.title}\n\n${project.summary || ""}`,
    );

    // Facebook Sharer endpoint
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`;

    // Popup window positioning
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="shadow-xs group flex flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-950/50"
    >
      {/* Project Image & Overlay Status */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=600&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute left-3 top-3">
          <ProjectStatusBadge status={project.status} />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
              project.category,
            )}`}
          >
            {project.category}
          </span>
          <button
            onClick={handleFacebookShare}
            className="flex items-center gap-1 rounded-lg bg-[#1877F2] px-2.5 py-1 text-[10px] font-bold text-white shadow-md transition-all hover:bg-[#0d65d9] active:scale-95"
            title="Share on Facebook"
          >
            <FaFacebook className="h-3 w-3" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Project Details */}
      <div className="flex flex-1 flex-col justify-between px-4 py-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-800 transition-colors dark:text-white">
            {project.title}
          </h3>

          {/* Date / Location Info */}
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {project.startDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                {project.startDate}
              </span>
            )}
            {project.impactMetrics?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                {project.impactMetrics.location}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {project.summary || project.description}
          </p>
        </div>

        {/* Impact Stats & Action */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          {project.impactMetrics?.beneficiaries && (
            <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 p-2 px-3 text-xs dark:bg-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">
                Beneficiaries:
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {project.impactMetrics.beneficiaries}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(project)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
            >
              <span>View Details</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleFacebookShare}
              className="flex items-center justify-center rounded-xl bg-[#1877F2]/10 p-2.5 text-[#1877F2] transition-all hover:bg-[#1877F2] hover:text-white dark:bg-[#1877F2]/20"
              title="Share on Facebook"
            >
              <FaFacebook className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
