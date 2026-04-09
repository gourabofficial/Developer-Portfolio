import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ChevronDown,
  MapPin,
  Briefcase,
  ExternalLink,
  Star,
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal, skills, experiences, projects } from "@/data"
import { useTheme } from "@/components/theme-provider"

const PAGE_BG = "bg-[#fefaf4] dark:bg-[#1a1008]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const ACCENT = "text-orange-600 dark:text-orange-400"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`
const PILL = "bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-[#3d2410] text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full font-medium"
const BTN_FILL = "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-6 py-2.5 font-semibold transition-all duration-200 shadow-lg shadow-orange-500/20"
const BTN_OUT = "border border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-300 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white rounded-full px-6 py-2.5 font-semibold transition-all duration-200"

const featuredProjects = projects.filter((p) => p.featured)

export const Home = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [allSkills] = useState(() => skills.flatMap((cat) => cat.items))

  const heroBg = isDark
    ? "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(249,115,22,0.07) 0%, transparent 70%)"
    : "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(249,115,22,0.10) 0%, transparent 70%)"

  return (
    <div className={`${PAGE_BG} animate-fadeIn`}>
      {/* ── SECTION 1 — Hero ────────────────────────────── */}
      <section className="min-h-screen flex items-center relative">
        {/* Background effect */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: heroBg }}
        />

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20 w-full">
          {/* LEFT column */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300 text-sm px-4 py-2 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </div>

            {/* H1 */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className={TEXT_PRI}>Hi, I&apos;m </span>
              <span className={GRAD_TEXT}>{personal.name}</span>
            </h1>

            {/* H2 */}
            <h2 className={`text-2xl font-semibold ${TEXT_SEC}`}>
              {personal.title}
            </h2>

            {/* Bio */}
            <p className={`text-base leading-relaxed max-w-lg ${TEXT_MUTED}`}>
              {personal.bio}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className={BTN_FILL}>
                View Projects
              </Link>
              <a href="#" className={BTN_OUT}>
                Download CV
              </a>
            </div>

            {/* Social row */}
            <div className="flex gap-4 mt-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors`}
              >
                <GithubIcon width={22} height={22} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors`}
              >
                <LinkedinIcon width={22} height={22} />
              </a>
            </div>
          </div>

          {/* RIGHT column — Terminal card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md bg-[#fff3e0] dark:bg-[#231509] border border-orange-200 dark:border-[#3d2410] rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 dark:shadow-orange-500/20 animate-glow">
              {/* Terminal header bar */}
              <div className={`flex items-center gap-2 px-4 py-3 bg-orange-100 dark:bg-[#2e1c0e] border-b ${BORDER}`}>
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-orange-400 dark:text-amber-700 ml-2">
                  portfolio.tsx
                </span>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex">
                  <span className="text-orange-500 dark:text-orange-400">const</span>
                  <span className={TEXT_PRI}>&nbsp;developer = {"{"}</span>
                </div>
                <div className="flex">
                  <span className={TEXT_MUTED}>&nbsp;&nbsp;name:</span>
                  <span className="text-amber-600 dark:text-amber-300">&nbsp;&quot;Gourab Ganguly&quot;</span>
                  <span className={TEXT_PRI}>,</span>
                </div>
                <div className="flex">
                  <span className={TEXT_MUTED}>&nbsp;&nbsp;role:</span>
                  <span className="text-amber-600 dark:text-amber-300">&nbsp;&quot;Full Stack Dev&quot;</span>
                  <span className={TEXT_PRI}>,</span>
                </div>
                <div className="flex flex-wrap">
                  <span className={TEXT_MUTED}>&nbsp;&nbsp;stack:</span>
                  <span className={TEXT_PRI}>&nbsp;[</span>
                  <span className="text-amber-600 dark:text-amber-300">&quot;React&quot;</span>
                  <span className={TEXT_PRI}>,&nbsp;</span>
                  <span className="text-amber-600 dark:text-amber-300">&quot;.NET&quot;</span>
                  <span className={TEXT_PRI}>],</span>
                </div>
                <div className="flex">
                  <span className={TEXT_MUTED}>&nbsp;&nbsp;passion:</span>
                  <span className="text-amber-600 dark:text-amber-300">&nbsp;&quot;Clean Code&quot;</span>
                  <span className={TEXT_PRI}>,</span>
                </div>
                <div className="flex">
                  <span className={TEXT_PRI}>{"}"}</span>
                </div>
                <div className="h-4" />
                <div className="flex">
                  <span className="text-orange-400 dark:text-orange-300">
                    {"// Currently upgrading ERP to .NET 10"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className={`text-xs tracking-widest uppercase ${TEXT_MUTED}`}>
            scroll
          </span>
          <ChevronDown size={18} className={`${ACCENT} animate-bounce`} />
        </div>
      </section>

      {/* ── SECTION 2 — Tech Stack Teaser ────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-orange-100 dark:border-[#3d2410]">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`${GRAD_TEXT} text-2xl font-bold`}>Tech Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {allSkills.map((item) => (
            <span key={item} className={PILL}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 3 — Experience Teaser ────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-orange-100 dark:border-[#3d2410]">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${GRAD_TEXT} text-2xl font-bold`}>Experience</h2>
          <Link
            to="/experience"
            className={`${ACCENT} text-sm font-medium hover:underline transition-all duration-200`}
          >
            View All →
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className={`${CARD} p-5 flex flex-col gap-3`}>
              <div className="flex justify-between items-start">
                <span className={`font-bold text-lg ${TEXT_PRI}`}>
                  {exp.role}
                </span>
                <span className={PILL}>{exp.type}</span>
              </div>
              <div>
                <span className={`font-semibold ${ACCENT}`}>
                  {exp.company}
                </span>
                <span className={`${TEXT_MUTED} text-sm`}>
                  {" "}
                  · {exp.duration}
                </span>
              </div>
              <div className={`flex gap-4 text-sm ${TEXT_MUTED}`}>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {exp.locationType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — Featured Projects Teaser ──── */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-orange-100 dark:border-[#3d2410]">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`${GRAD_TEXT} text-2xl font-bold`}>
            Featured Projects
          </h2>
          <Link
            to="/projects"
            className={`${ACCENT} text-sm font-medium hover:underline transition-all duration-200`}
          >
            View All →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`${CARD} p-6 flex flex-col gap-4 relative`}
            >
              {/* Featured badge */}
              <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star size={10} />
                Featured
              </span>

              <h3 className={`font-bold text-xl ${TEXT_PRI}`}>
                {proj.title}
              </h3>
              <p className={`text-sm leading-relaxed ${TEXT_SEC}`}>
                {proj.description.length > 100
                  ? proj.description.slice(0, 100) + "..."
                  : proj.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map((tech) => (
                  <span key={tech} className={PILL}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-orange-100 dark:border-[#3d2410]">
                <div className="flex gap-3">
                  {proj.repoUrl ? (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-1`}
                      aria-label="GitHub repo"
                    >
                      <GithubIcon width={18} height={18} />
                    </a>
                  ) : (
                    <span className="opacity-30 cursor-not-allowed pointer-events-none p-1">
                      <GithubIcon width={18} height={18} />
                    </span>
                  )}
                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${TEXT_MUTED} hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-1`}
                      aria-label="Live site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : (
                    <span className="opacity-30 cursor-not-allowed pointer-events-none p-1">
                      <ExternalLink size={18} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
