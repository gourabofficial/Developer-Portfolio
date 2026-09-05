import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"

// ─── animation ───────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── shared tokens ───────────────────────────────────────────────────────────

const PILL =
  "bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1 rounded-full font-medium"

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

// ─── component ───────────────────────────────────────────────────────────────

export const Projects = () => {
  const reduced = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const cardVariants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : card

  return (
    <div className="animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Heading ── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-px bg-[#4f8cff]" />
            <span className="text-[#64d9ff] text-xs font-mono uppercase tracking-[0.2em]">
              my work
            </span>
          </div>
          <h1
            className="text-4xl font-extrabold mb-2"
            style={{
              background: "linear-gradient(to right, #fff, #87a6ff, #69ddff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Things I've built.
          </h1>
          <p className="text-[#9aaac0] text-base max-w-xl">
            A collection of projects across enterprise systems, full-stack apps, and AI integrations.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff]",
                activeFilter === cat
                  ? "bg-[#4f8cff] text-white shadow-[0_4px_18px_rgba(79,140,255,.35)]"
                  : "bg-[rgba(12,22,40,.72)] border border-[rgba(126,161,214,.16)] text-[#9aaac0] hover:border-[rgba(100,217,255,.35)] hover:text-[#f3f7ff]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div
          key={activeFilter}
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((proj) => (
            <motion.div
              key={proj.id}
              variants={cardVariants}
              whileHover={reduced ? {} : { y: -4, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="group relative flex flex-col rounded-2xl border border-[rgba(103,150,223,.16)] bg-[rgba(12,22,40,.72)] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[rgba(100,217,255,.35)] hover:shadow-[0_16px_45px_rgba(0,0,0,.25),0_0_0_1px_rgba(100,217,255,.08)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-[#081427]">
                <img
                  src={proj.thumbnail}
                  alt={`${proj.title} thumbnail`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/80 via-transparent to-transparent" />

                {/* Featured badge */}
                {proj.featured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(100,217,255,.35)] bg-[rgba(100,217,255,.08)] text-[#64d9ff] text-[10px] font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#64d9ff] animate-pulse" />
                    Featured
                  </span>
                )}

                {/* Category chip */}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(9,18,33,.75)] border border-[rgba(105,150,219,.2)] text-[#8fa3c1] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                  {proj.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-[#f3f7ff] font-bold text-lg leading-tight">
                  {proj.title}
                </h3>

                <p className="text-[#9aaac0] text-sm leading-relaxed line-clamp-3 flex-1">
                  {proj.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className={`${PILL} inline-flex items-center gap-1`}>
                      <ProjectTechIcon tech={tech} size={11} />
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className={PILL}>+{proj.techStack.length - 4}</span>
                  )}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-[rgba(105,150,219,.1)]">
                  {/* Icon links */}
                  <div className="flex items-center gap-1">
                    {proj.repoUrl ? (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        className="p-1.5 rounded-lg text-[#64a0d8] hover:text-[#f3f7ff] hover:bg-[rgba(90,139,214,.1)] transition-colors"
                      >
                        <GithubIcon width={16} height={16} />
                      </a>
                    ) : (
                      <span className="p-1.5 opacity-25 cursor-not-allowed">
                        <GithubIcon width={16} height={16} />
                      </span>
                    )}
                    {proj.liveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live site"
                        className="p-1.5 rounded-lg text-[#64a0d8] hover:text-[#f3f7ff] hover:bg-[rgba(90,139,214,.1)] transition-colors"
                      >
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <span className="p-1.5 opacity-25 cursor-not-allowed">
                        <ExternalLink size={15} />
                      </span>
                    )}
                  </div>

                  {/* View details */}
                  <Link
                    to={`/projects/${proj.id}`}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-[#7fb8ff] hover:text-[#64d9ff] transition-colors"
                  >
                    View Details
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default Projects
