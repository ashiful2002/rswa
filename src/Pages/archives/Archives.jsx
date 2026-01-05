import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../../Components/PageTitle";
import Loading from "../../Components/Loading/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Archives = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    axios
      .get("/archives.json")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load archives");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading>archives</Loading>;
  if (error) return <p>{error}</p>;

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto max-w-6xl px-2 py-6">
      <PageTitle title="Archives" heading="Archives" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const isOpen = openId === project.id;
          const shortText =
            project.description.length > 50
              ? project.description.slice(0, 50) + "..."
              : project.description;

          return (
            <motion.div
              layout
              key={project.id}
              className="rounded-lg border p-3 hover:shadow-md"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="mb-3 rounded object-cover"
              />

              <h2 className="mb-1 text-xl font-semibold">{project.title}</h2>

              <div className="mb-2 text-sm text-gray-500">
                <span>
                  {project?.date} {project?.date && "•"} {project.year}
                </span>
                <span className="ml-3">• {project.category}</span>
              </div>

              {/* Animated description */}
              <AnimatePresence initial={false}>
                <motion.p
                  key={isOpen ? "full" : "short"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden text-gray-600"
                >
                  {isOpen ? project.description : shortText}
                </motion.p>
              </AnimatePresence>

              {project.description.length > 50 && (
                <button
                  onClick={() => toggleAccordion(project.id)}
                  className="mt-2 text-sm font-medium text-blue-500 hover:underline"
                >
                  {isOpen ? "Show less" : "Read more"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Archives;
