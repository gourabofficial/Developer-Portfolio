import { useState } from "react"
import { ExternalLink, Star } from "lucide-react"
import { GithubIcon } from "@/components/Icons"
import { projects } from "@/data"

const PAGE_BG = "bg-[#0f172a]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`
const PILL = "bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-[#3d2410] text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full font-medium"

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      {/* Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)',
          zIndex: 0
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Heading block */}
        <div className="mb-12">
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
            Projects
          </h1>
          <p className={`${TEXT_MUTED} text-base`}>Things I&apos;ve built</p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={
                activeFilter === cat
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  : `bg-[#fff8ed] dark:bg-[#231509] border border-orange-200 dark:border-[#3d2410] text-[#7c2d12] dark:text-[#fcd9a0] rounded-full px-4 py-1.5 text-sm hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400`
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className={`${CARD} p-6 flex flex-col gap-4 relative`}
            >
              {/* Featured badge */}
              {proj.featured && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <Star size={10} />
                  Featured
                </span>
              )}

              {/* Category chip */}
              <span className="self-start bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900 text-xs px-2.5 py-1 rounded-full font-medium">
                {proj.category}
              </span>

              {/* Title */}
              <h3 className={`${TEXT_PRI} font-bold text-xl`}>{proj.title}</h3>

              {/* Description */}
              <p className={`${TEXT_SEC} text-sm leading-relaxed flex-1`}>
                {proj.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech) => (
                  <span key={tech} className={PILL}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-orange-100 dark:border-[#3d2410]">
                <div className="flex gap-3">
                  {proj.repoUrl ? (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950`}
                      aria-label="GitHub repo"
                    >
                      <GithubIcon width={18} height={18} />
                    </a>
                  ) : (
                    <span className="opacity-25 cursor-not-allowed p-1.5">
                      <GithubIcon width={18} height={18} />
                    </span>
                  )}
                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950`}
                      aria-label="Live site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : (
                    <span className="opacity-25 cursor-not-allowed p-1.5">
                      <ExternalLink size={18} />
                    </span>
                  )}
                </div>
                <span className={`text-xs ${TEXT_MUTED}`}>View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Projects
