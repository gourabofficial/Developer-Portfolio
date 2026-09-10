/**
 * Shared project card components — used by both the /projects page and the
 * Home "Featured Work" section so the design stays consistent.
 */
import { ExternalLink, ArrowRight, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"

import { GithubIcon } from "@/components/Icons"
import { ProjectTechIcon } from "@/components/ProjectTech"
import type { Project } from "@/data/projects"

// ─── shared tokens ────────────────────────────────────────────────────────────

export const PILL =
  "inline-flex items-center gap-1 bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-[10px] px-2.5 py-1 rounded-full font-medium"

// ─── helper ──────────────────────────────────────────────────────────────────

export function LinkIcon({
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

// ─── FeaturedCard ─────────────────────────────────────────────────────────────

export function FeaturedCard({
  proj,
  variants,
  reduced,
}: {
  proj: Project
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

        {/* Category pill */}
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

// ─── StandardCard ─────────────────────────────────────────────────────────────

export function StandardCard({
  proj,
  variants,
  reduced,
}: {
  proj: Project
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
