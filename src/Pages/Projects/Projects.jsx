import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import PageTitle from "../../Components/PageTitle";
import Loading from "../../Components/Loading/Loading";
import ProjectFilter from "../../Components/Projects/ProjectFilter";
import ProjectCard from "../../Components/Projects/ProjectCard";
import ProjectDetailModal from "../../Components/Projects/ProjectDetailModal";
import Pagination from "../../Components/shared/Pagination";
import { Tag } from "lucide-react";

const Projects = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 9,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  // If page was loaded directly with a /projects/:slug route, fetch that project automatically
  useEffect(() => {
    if (slug) {
      axios
        .get(`${API_ENDPOINTS.PROJECTS}/${slug}`)
        .then((res) => {
          if (res.data && res.data.data) {
            setSelectedProject(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Failed to load direct project by slug:", err);
        });
    }
  }, [slug]);

  // Reset page to 1 whenever category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, searchQuery, currentPage]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Fetch only Completed projects for public site view
      let url = `${API_ENDPOINTS.PROJECTS}?page=${currentPage}&limit=9&status=Completed`;
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
      } else {
        setProjects([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError("Failed to load projects from server.");
      setLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    if (project?.slug) {
      navigate(`/projects/${project.slug}`, { replace: false });
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    if (slug) {
      navigate("/projects", { replace: true });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 transition-colors duration-200 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageTitle
          title="RSWA Projects"
          heading="Our Completed Initiatives & Impact"
          className="bg-emerald-700"
        />

        {/* Subtitle */}
        <div className="mb-8 text-center">
          <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Explore RSWA&apos;s completed social welfare, educational, relief,
            and environmental projects across Rowmari.
          </p>
        </div>

        {/* Filter Controls */}
        <ProjectFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* States: Loading / Error / Empty / Grid */}
        {loading ? (
          <div className="py-12">
            <Loading>projects</Loading>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Tag className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
            <h3 className="mt-3 text-base font-semibold text-slate-800 dark:text-white">
              No Projects Found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search query or selecting a different category
              filter.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id || project.slug}
                  project={project}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={meta.page || currentPage}
              totalPages={meta.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Projects;
