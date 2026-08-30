import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { useMemo } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"

const PAGE_BG = "bg-[#050914]"
const SURFACE = "bg-[rgba(12,22,40,.72)]"
const BORDER = "border-[rgba(126,161,214,.16)]"
const TEXT_PRI = "text-[#f3f7ff]"
const TEXT_SEC = "text-[#9aaac0]"
const TEXT_MUTED = "text-[#64d9ff]"
const GRAD_TEXT = "bg-linear-to-r from-white via-[#87a6ff] to-[#69ddff] bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-3xl transition-all duration-300`
const PILL = "bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1.5 rounded-full font-medium"

export const ProjectDetail = () => {
  const { projectId } = useParams()

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projectId],
  )

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/"
              className={`${TEXT_MUTED} inline-flex items-center gap-2 text-sm font-semibold hover:text-[#8fc0ff] transition-colors`}
            >
              <ArrowLeft size={16} />
              Back to projects
            </Link>
           
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`${CARD} p-8 md:p-10`}
            >
              <div className="overflow-hidden rounded-3xl border border-[rgba(105,150,219,.14)] bg-[#081427]">
                <div className="relative aspect-video">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#050914] via-transparent to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7fb8ff] mb-2">
                        Project thumbnail
                      </p>
                      <h2 className="text-2xl font-bold text-white leading-tight">
                        {project.title}
                      </h2>
                    </div>
                    <span className="rounded-full border border-[rgba(105,150,219,.18)] bg-[rgba(9,18,33,.7)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8e7ff] backdrop-blur">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className={`${PILL} inline-flex items-center gap-1.5`}>
                      <ProjectTechIcon tech={tech} size={12} />
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-[rgba(105,150,219,.14)]">
                  <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.24em] mb-4`}>
                    Project features
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-xl border border-[rgba(105,150,219,.12)] bg-[rgba(8,18,35,.55)] px-4 py-3 text-sm text-[#c8d3e5]"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="space-y-6"
            >
              <div className={`${CARD} p-6`}>
                <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.24em] mb-4`}>
                  Quick details
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs mb-1 text-[#6f87a9]">Project Name</div>
                    <div className={`${TEXT_PRI} font-semibold`}>{project.title}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-1 text-[#6f87a9]">Overview</div>
                    <div className={`${TEXT_PRI} font-semibold leading-relaxed`}>
                      {project.overview}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${CARD} p-6`}>
                <p className={`${TEXT_MUTED} text-xs uppercase tracking-[0.24em] mb-4`}>
                  Source & demo
                </p>
                <div className="space-y-3">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.14)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.45)] transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <GithubIcon width={16} height={16} />
                        Open repository
                      </span>
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#9aaac0]">
                      Repository link is not available for this project.
                    </div>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.14)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.45)] transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink size={16} />
                        Open live project
                      </span>
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#9aaac0]">
                      Live demo link is not available for this project.
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail