import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Lightbulb, Layers, Code2 } from "lucide-react"
import { useMemo } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"

// ─── tokens ──────────────────────────────────────────────────────────────────
const SURFACE = "bg-[rgba(12,22,40,.72)]"
const BORDER = "border-[rgba(126,161,214,.16)]"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl`
const LABEL = "text-[#64d9ff] text-[10px] font-mono uppercase tracking-[0.22em] font-semibold"
const PILL =
  "inline-flex items-center gap-1.5 bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1.5 rounded-full font-medium"

// ─── small sub-components ─────────────────────────────────────────────────────

function SectionBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#64d9ff]">{icon}</span>
        <p className={LABEL}>{label}</p>
      </div>
      {children}
    </div>
  )
}

// ─── component ────────────────────────────────────────────────────────────────

export const ProjectDetail = () => {
  const { projectId } = useParams()
  const reduced = useReducedMotion()

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projectId],
  )

  if (!project) return <Navigate to="/projects" replace />

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const isFeatured = !!project.featured

  const fadeUp = (delay = 0) =>
    reduced
      ? { initial: {}, animate: {} }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay },
        }

  return (
    <div className="animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* ── Nav bar ─────────────────────────────────────────────────────── */}
        <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64d9ff] hover:text-[#8fc0ff] transition-colors focus-visible:outline-2 focus-visible:outline-[#4f8cff] focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
          <div className="flex items-center gap-3">
            {prev && (
              <Link
                to={`/projects/${prev.id}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                <ArrowLeft size={13} />
                {prev.title}
              </Link>
            )}
            {prev && next && <span className="text-[#3a4b66]">·</span>}
            {next && (
              <Link
                to={`/projects/${next.id}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                {next.title}
                <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>

        {/* ── Hero thumbnail ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="overflow-hidden rounded-2xl border border-[rgba(105,150,219,.16)] bg-[#081427]">
            <div className="relative aspect-video">
              <img
                src={project.thumbnail}
                alt={`${project.title} — ${project.eyebrow}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/85 via-[#050914]/20 to-transparent" />

              {/* Overlay text */}
              <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#7fb8ff] mb-1.5">
                    {project.eyebrow}
                  </p>
                  <h1 className="text-3xl font-extrabold text-white leading-tight">
                    {project.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {isFeatured && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(100,217,255,.35)] bg-[rgba(100,217,255,.08)] text-[#64d9ff] text-[10px] font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64d9ff] animate-pulse" aria-hidden />
                      Featured
                    </span>
                  )}
                  <span className="rounded-full border border-[rgba(105,150,219,.22)] bg-[rgba(9,18,33,.8)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d8e7ff] backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Main grid: case study left, sidebar right ────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── Left: case study body ──────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Summary card */}
            <motion.section {...fadeUp(0.05)} className={`${CARD} p-6`} aria-label="Project summary">
              <p className="text-[#b8c8dc] text-base leading-relaxed font-medium">
                {project.description}
              </p>
              <p className="text-[#8fa5c4] text-sm leading-relaxed mt-3">
                {project.overview}
              </p>
            </motion.section>

            {/* Problem / Purpose — only shown if data present */}
            {project.problem && (
              <motion.section {...fadeUp(0.1)} className={`${CARD} p-6`} aria-label="Problem and purpose">
                <SectionBlock icon={<Lightbulb size={14} />} label="Problem / Purpose">
                  <p className="text-[#9aaac0] text-sm leading-relaxed">{project.problem}</p>
                </SectionBlock>
              </motion.section>
            )}

            {/* Architecture / Technical approach — only shown if data present */}
            {project.architecture && (
              <motion.section {...fadeUp(0.15)} className={`${CARD} p-6`} aria-label="Architecture and technical approach">
                <SectionBlock icon={<Layers size={14} />} label="Architecture & Technical Approach">
                  <p className="text-[#9aaac0] text-sm leading-relaxed">{project.architecture}</p>
                </SectionBlock>
              </motion.section>
            )}

            {/* Key features */}
            <motion.section {...fadeUp(0.2)} className={`${CARD} p-6`} aria-label="Key features">
              <SectionBlock icon={<CheckCircle2 size={14} />} label="Key Features">
                <ul
                  className="grid sm:grid-cols-2 gap-2"
                  aria-label="Feature list"
                >
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl border border-[rgba(105,150,219,.12)] bg-[rgba(8,18,35,.55)] px-4 py-3 text-sm text-[#c8d3e5]"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-[#64d9ff] flex-shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            </motion.section>

            {/* Tech stack */}
            <motion.section {...fadeUp(0.25)} className={`${CARD} p-6`} aria-label="Technology stack">
              <SectionBlock icon={<Code2 size={14} />} label="Technology Stack">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className={PILL}>
                      <ProjectTechIcon tech={tech} size={12} />
                      {tech}
                    </span>
                  ))}
                </div>
              </SectionBlock>
            </motion.section>
          </div>

          {/* ── Right: sticky sidebar ──────────────────────────────────────── */}
          <motion.aside
            {...fadeUp(0.1)}
            className="space-y-4 lg:sticky lg:top-24"
            aria-label="Project links and details"
          >
            {/* Source & demo */}
            <div className={`${CARD} p-5`}>
              <p className={`${LABEL} mb-4`}>Source & Demo</p>
              <div className="space-y-2.5">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <GithubIcon width={15} height={15} />
                      Open repository
                    </span>
                    <ArrowRight size={14} aria-hidden />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#6b7e9b]">
                    Repository not public
                  </div>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
                    aria-label={`${project.title} live demo`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink size={15} aria-hidden />
                      Live demo
                    </span>
                    <ArrowRight size={14} aria-hidden />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#6b7e9b]">
                    Live demo not available
                  </div>
                )}
              </div>
            </div>

            {/* Quick details */}
            <div className={`${CARD} p-5`}>
              <p className={`${LABEL} mb-4`}>Quick Details</p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[#6f87a9] text-[10px] uppercase tracking-wide mb-1">Category</dt>
                  <dd className="text-[#f3f7ff] font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-[#6f87a9] text-[10px] uppercase tracking-wide mb-1.5">Stack</dt>
                  <dd>
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
                  </dd>
                </div>
              </dl>
            </div>

            {/* Back */}
            <Link
              to="/projects"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(12,22,40,.55)] px-4 py-3 text-sm font-semibold text-[#9aaac0] hover:border-[rgba(100,217,255,.3)] hover:text-[#f3f7ff] transition-all focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
            >
              <ArrowLeft size={14} aria-hidden />
              All projects
            </Link>
          </motion.aside>

        </div>

        {/* ── Prev / Next navigation ───────────────────────────────────────── */}
        {(prev || next) && (
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 pt-8 border-t border-[rgba(105,150,219,.1)] grid sm:grid-cols-2 gap-4"
          >
            {prev ? (
              <Link
                to={`/projects/${prev.id}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[rgba(126,161,214,.14)] bg-[rgba(12,22,40,.6)] p-5 hover:border-[rgba(100,217,255,.3)] transition-all focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                <span className="text-[10px] text-[#5a7090] uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowLeft size={11} aria-hidden /> Previous
                </span>
                <span className="text-[#f3f7ff] font-semibold text-sm group-hover:text-[#64d9ff] transition-colors">
                  {prev.title}
                </span>
                <span className="text-[#8fa3c1] text-xs">{prev.eyebrow}</span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/projects/${next.id}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[rgba(126,161,214,.14)] bg-[rgba(12,22,40,.6)] p-5 sm:text-right hover:border-[rgba(100,217,255,.3)] transition-all focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                <span className="text-[10px] text-[#5a7090] uppercase tracking-wider flex items-center gap-1.5 sm:justify-end">
                  Next <ArrowRight size={11} aria-hidden />
                </span>
                <span className="text-[#f3f7ff] font-semibold text-sm group-hover:text-[#64d9ff] transition-colors">
                  {next.title}
                </span>
                <span className="text-[#8fa3c1] text-xs">{next.eyebrow}</span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default ProjectDetail
