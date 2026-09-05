import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react"
import { useMemo } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"

// ─── tokens ──────────────────────────────────────────────────────────────────
const SURFACE = "bg-[rgba(12,22,40,.72)]"
const BORDER = "border-[rgba(126,161,214,.16)]"
const TEXT_PRI = "text-[#f3f7ff]"
const TEXT_MUTED = "text-[#64d9ff]"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300`
const PILL =
  "bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1.5 rounded-full font-medium"

// ─── component ───────────────────────────────────────────────────────────────

export const ProjectDetail = () => {
  const { projectId } = useParams()

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projectId],
  )

  if (!project) return <Navigate to="/projects" replace />

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Navigation bar ── */}
        <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64d9ff] hover:text-[#8fc0ff] transition-colors"
          >
            <ArrowLeft size={15} />
            Back to projects
          </Link>

          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            {prev ? (
              <Link
                to={`/projects/${prev.id}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors"
              >
                <ArrowLeft size={13} />
                {prev.title}
              </Link>
            ) : null}
            {prev && next ? <span className="text-[#3a4b66]">·</span> : null}
            {next ? (
              <Link
                to={`/projects/${next.id}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors"
              >
                {next.title}
                <ArrowRight size={13} />
              </Link>
            ) : null}
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-7 items-start">

          {/* ── Left: thumbnail + description + features ── */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`${CARD} p-7 md:p-9`}
          >
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-xl border border-[rgba(105,150,219,.14)] bg-[#081427]">
              <div className="relative aspect-video">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/75 via-transparent to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7fb8ff] mb-1.5">
                      {project.eyebrow}
                    </p>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {project.title}
                    </h2>
                  </div>
                  <span className="rounded-full border border-[rgba(105,150,219,.18)] bg-[rgba(9,18,33,.75)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d8e7ff] backdrop-blur-sm whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Full description */}
            <div className="mt-7">
              <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.22em] mb-3 font-semibold`}>
                About this project
              </p>
              <p className="text-[#b8c8dc] text-sm leading-relaxed">
                {project.overview}
              </p>
              <p className="text-[#9aaac0] text-sm leading-relaxed mt-3">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="mt-7">
              <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.22em] mb-3 font-semibold`}>
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className={`${PILL} inline-flex items-center gap-1.5`}>
                    <ProjectTechIcon tech={tech} size={12} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 pt-7 border-t border-[rgba(105,150,219,.13)]">
              <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.22em] mb-4 font-semibold`}>
                Key features
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 rounded-xl border border-[rgba(105,150,219,.12)] bg-[rgba(8,18,35,.55)] px-4 py-3 text-sm text-[#c8d3e5]"
                  >
                    <CheckCircle2 size={14} className="text-[#64d9ff] flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Right: quick details + links ── */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="space-y-5 lg:sticky lg:top-24"
          >
            {/* Quick details card */}
            <div className={`${CARD} p-6`}>
              <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.22em] mb-4 font-semibold`}>
                Quick details
              </p>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] mb-1 text-[#6f87a9] uppercase tracking-wide">
                    Project
                  </div>
                  <div className={`${TEXT_PRI} font-semibold`}>{project.title}</div>
                </div>
                <div>
                  <div className="text-[11px] mb-1 text-[#6f87a9] uppercase tracking-wide">
                    Category
                  </div>
                  <div className={`${TEXT_PRI} font-medium`}>{project.category}</div>
                </div>
                <div>
                  <div className="text-[11px] mb-1.5 text-[#6f87a9] uppercase tracking-wide">
                    Stack size
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[rgba(105,150,219,.14)] text-[#8fa3c1] bg-[rgba(27,54,91,.1)]"
                      >
                        <ProjectTechIcon tech={tech} size={10} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Source & demo card */}
            <div className={`${CARD} p-6`}>
              <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.22em] mb-4 font-semibold`}>
                Source & demo
              </p>
              <div className="space-y-2.5">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.14)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      <GithubIcon width={15} height={15} />
                      Open repository
                    </span>
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#9aaac0]">
                    Repository not available
                  </div>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.14)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink size={15} />
                      Live demo
                    </span>
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#9aaac0]">
                    Live demo not available
                  </div>
                )}
              </div>
            </div>

            {/* Back link */}
            <Link
              to="/projects"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(12,22,40,.55)] px-4 py-3 text-sm font-semibold text-[#9aaac0] hover:border-[rgba(100,217,255,.3)] hover:text-[#f3f7ff] transition-all"
            >
              <ArrowLeft size={14} />
              All projects
            </Link>
          </motion.aside>
        </div>

      </div>
    </div>
  )
}

export default ProjectDetail
