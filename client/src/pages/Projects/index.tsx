import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
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

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

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
