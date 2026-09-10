import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { FeaturedCard, StandardCard } from "@/components/ProjectCard"
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

// ─── component ───────────────────────────────────────────────────────────────

interface HomeFeaturedProjectsProps {
  /** Max number of projects to show. Defaults to 6. */
  limit?: number
}

export function HomeFeaturedProjects({ limit = 6 }: HomeFeaturedProjectsProps) {
  const reduced = useReducedMotion()
  const variants = reduced ? cardAnimReduced : cardAnim

  // Take the first `limit` projects, preserving featured ordering
  const displayProjects = projects.slice(0, limit)
  const featuredProjects = displayProjects.filter((p) => p.featured)
  const standardProjects = displayProjects.filter((p) => !p.featured)

  return (
    <section
      id="featured-work"
      className="content-section section-shell"
      aria-labelledby="featured-work-heading"
    >
      {/* ── Section header ──────────────────────────────────────────────── */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-px bg-[#4f8cff]" aria-hidden />
          <span className="text-[#64d9ff] text-[10px] font-mono uppercase tracking-[0.2em]">
            selected work
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              id="featured-work-heading"
              className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight"
              style={{
                background: "linear-gradient(to right, #fff, #87a6ff, #69ddff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Featured Work
            </h2>
            <p className="text-[#9aaac0] text-sm max-w-lg">
              A curated selection of enterprise systems, full-stack apps, and AI integrations — each
              built to solve a real problem at scale.
            </p>
          </div>

          {/* Desktop "View All" link — top-right */}
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#7fb8ff] hover:text-[#64d9ff] transition-colors shrink-0 pb-1 focus-visible:outline-2 focus-visible:outline-[#4f8cff] rounded group"
            aria-label="View all projects"
          >
            View All Projects
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </header>

      {/* ── Featured cards ──────────────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section aria-label="Featured projects" className="mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64d9ff]">
              Featured case studies
            </span>
            <span className="flex-1 h-px bg-[rgba(100,217,255,.12)]" aria-hidden />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuredProjects.map((proj) => (
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

      {/* ── Standard cards ──────────────────────────────────────────────── */}
      {standardProjects.length > 0 && (
        <section aria-label="More projects">
          {featuredProjects.length > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7c8db0]">
                More projects
              </span>
              <span className="flex-1 h-px bg-[rgba(126,161,214,.1)]" aria-hidden />
            </div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {standardProjects.map((proj) => (
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

      {/* ── "View All" CTA (mobile + below grid) ────────────────────────── */}
     
    </section>
  )
}
