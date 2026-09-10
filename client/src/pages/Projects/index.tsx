import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ExternalLink, ArrowRight, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"

// ─── animation ───────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const cardAnimReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

// ─── shared tokens ────────────────────────────────────────────────────────────

const PILL =
  "inline-flex items-center gap-1 bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-[10px] px-2.5 py-1 rounded-full font-medium"

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

// ─── sub-components ───────────────────────────────────────────────────────────

function FeaturedCard({
  proj,
  variants,
  reduced,
}: {
  proj: (typeof projects)[number]
  variants: Variants
  reduced: boolean | null
}) {
  return (
    <motion.article
      variants={variants}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative flex flex-col rounded-2xl border border-[rgba(103,150,223,.2)] bg-[rgba(12,22,40,.78)] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[rgba(100,217,255,.42)] hover:shadow-[0_20px_55px_rgba(0,0,0,.28),0_0_0_1px_rgba(100,217,255,.1)]"
      aria-label={`${proj.title} — ${proj.eyebrow}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#081427] flex-shrink-0">
        <img
          src={proj.thumbnail}
          alt={`${proj.title} — ${proj.eyebrow}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/85 via-transparent to-transparent" />

        {/* Featured badge */}
      

        {/* Category */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(9,18,33,.82)] border border-[rgba(105,150,219,.2)] text-[#8fa3c1] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          {proj.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h2 className="text-[#f3f7ff] font-bold text-lg leading-tight mb-1">{proj.title}</h2>
          <p className="text-[#9aaac0] text-sm leading-relaxed">{proj.description}</p>
        </div>

        {/* Problem snippet — only if available */}
        {proj.problem && (
          <div className="flex items-start gap-2 rounded-xl bg-[rgba(79,140,255,.05)] border border-[rgba(79,140,255,.12)] px-3.5 py-3">
            <Lightbulb size={12} className="text-[#64d9ff] flex-shrink-0 mt-0.5" aria-hidden />
            <p className="text-[#7aa0c8] text-xs leading-relaxed line-clamp-2">{proj.problem}</p>
          </div>
        )}

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {proj.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className={PILL}>
              <ProjectTechIcon tech={tech} size={10} />
              {tech}
            </span>
          ))}
          {proj.techStack.length > 4 && (
            <span className={PILL}>+{proj.techStack.length - 4}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[rgba(105,150,219,.1)]">
          <div className="flex items-center gap-1">
            <LinkIcon href={proj.repoUrl} label={`${proj.title} GitHub repository`}>
              <GithubIcon width={15} height={15} />
            </LinkIcon>
            <LinkIcon href={proj.liveUrl} label={`${proj.title} live demo`}>
              <ExternalLink size={14} />
            </LinkIcon>
          </div>
          <Link
            to={`/projects/${proj.id}`}
            className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-[#7fb8ff] hover:text-[#64d9ff] transition-colors focus-visible:outline-2 focus-visible:outline-[#4f8cff] rounded"
          >
            Case Study
            <ArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function StandardCard({
  proj,
  variants,
  reduced,
}: {
  proj: (typeof projects)[number]
  variants: Variants
  reduced: boolean | null
}) {
  return (
    <motion.article
      variants={variants}
      whileHover={reduced ? {} : { y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative flex flex-col rounded-2xl border border-[rgba(103,150,223,.14)] bg-[rgba(12,22,40,.66)] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[rgba(100,217,255,.3)] hover:shadow-[0_14px_38px_rgba(0,0,0,.22)]"
      aria-label={`${proj.title} — ${proj.eyebrow}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#081427] flex-shrink-0">
        <img
          src={proj.thumbnail}
          alt={`${proj.title} — ${proj.eyebrow}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/80 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[rgba(9,18,33,.8)] border border-[rgba(105,150,219,.18)] text-[#8fa3c1] text-[9px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          {proj.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h2 className="text-[#f3f7ff] font-semibold text-base leading-tight">{proj.title}</h2>
        <p className="text-[#8fa5c4] text-xs leading-relaxed line-clamp-2 flex-1">{proj.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {proj.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className={PILL}>
              <ProjectTechIcon tech={tech} size={9} />
              {tech}
            </span>
          ))}
          {proj.techStack.length > 3 && (
            <span className={PILL}>+{proj.techStack.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-[rgba(105,150,219,.09)]">
          <div className="flex items-center gap-0.5">
            <LinkIcon href={proj.repoUrl} label={`${proj.title} GitHub repository`}>
              <GithubIcon width={14} height={14} />
            </LinkIcon>
            <LinkIcon href={proj.liveUrl} label={`${proj.title} live demo`}>
              <ExternalLink size={13} />
            </LinkIcon>
          </div>
          <Link
            to={`/projects/${proj.id}`}
            className="group/btn inline-flex items-center gap-1 text-[11px] font-semibold text-[#7fb8ff] hover:text-[#64d9ff] transition-colors focus-visible:outline-2 focus-visible:outline-[#4f8cff] rounded"
          >
            View Details
            <ArrowRight size={11} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

/** Renders an icon link when href is present, dimmed placeholder when not */
function LinkIcon({
  href,
  label,
  children,
}: {
  href?: string
  label: string
  children: React.ReactNode
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-1.5 rounded-lg text-[#64a0d8] hover:text-[#f3f7ff] hover:bg-[rgba(90,139,214,.1)] transition-colors focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
      >
        {children}
      </a>
    )
  }
  return (
    <span className="p-1.5 opacity-20 cursor-not-allowed" aria-hidden>
      {children}
    </span>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export const Projects = () => {
  const reduced = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const featuredFiltered = filtered.filter((p) => p.featured)
  const standardFiltered = filtered.filter((p) => !p.featured)

  const variants = reduced ? cardAnimReduced : cardAnim

  return (
    <div className="animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-px bg-[#4f8cff]" aria-hidden />
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
            Featured projects include full case studies.
          </p>
        </header>

        {/* ── Filter tabs ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2.5 mb-10" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#4f8cff] focus-visible:outline-offset-2",
                activeFilter === cat
                  ? "bg-[#4f8cff] text-white shadow-[0_4px_18px_rgba(79,140,255,.35)]"
                  : "bg-[rgba(12,22,40,.72)] border border-[rgba(126,161,214,.16)] text-[#9aaac0] hover:border-[rgba(100,217,255,.35)] hover:text-[#f3f7ff]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured projects ────────────────────────────────────────────── */}
        {featuredFiltered.length > 0 && (
          <section aria-label="Featured projects" className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64d9ff]">
                Featured case studies
              </span>
              <span className="flex-1 h-px bg-[rgba(100,217,255,.12)]" aria-hidden />
            </div>

            <motion.div
              key={`featured-${activeFilter}`}
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {featuredFiltered.map((proj) => (
                <FeaturedCard
                  key={proj.id}
                  proj={proj}
                  variants={variants}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Standard projects ────────────────────────────────────────────── */}
        {standardFiltered.length > 0 && (
          <section aria-label="Other projects">
            {featuredFiltered.length > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7c8db0]">
                  More projects
                </span>
                <span className="flex-1 h-px bg-[rgba(126,161,214,.1)]" aria-hidden />
              </div>
            )}

            <motion.div
              key={`standard-${activeFilter}`}
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {standardFiltered.map((proj) => (
                <StandardCard
                  key={proj.id}
                  proj={proj}
                  variants={variants}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* ── Empty state ──────────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#6b7e9b] text-sm">
            No projects in this category yet.
          </div>
        )}

      </div>
    </div>
  )
}

export default Projects
