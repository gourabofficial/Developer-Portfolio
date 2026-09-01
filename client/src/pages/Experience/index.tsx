import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { experiences } from "@/data"

const PAGE_BG = "bg-[#050914]"
const SURFACE = "bg-[rgba(12,22,40,.72)]"
const BORDER = "border-[rgba(126,161,214,.16)]"
const TEXT_PRI = "text-[#f3f7ff]"
const TEXT_SEC = "text-[#9aaac0]"
const TEXT_MUTED = "text-[#64d9ff]"
const ACCENT = "text-[#8fc0ff]"
const GRAD_TEXT = "bg-linear-to-r from-white via-[#87a6ff] to-[#69ddff] bg-clip-text text-transparent"
const PILL = "bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1 rounded-full font-medium"

const locationTypeBadge: Record<string, string> = {
  "On-site": "bg-[rgba(52,211,153,.08)] border-[rgba(52,211,153,.28)] text-[#6ee7b7]",
  Remote: "bg-[rgba(96,165,250,.08)] border-[rgba(96,165,250,.28)] text-[#93c5fd]",
}

// Deterministic short hex "commit hash" per entry — stable across renders/SSR.
function logHash(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0
  }
  return h.toString(16).padStart(6, "0").slice(0, 6)
}

export const Experience = () => {
  const prefersReducedMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, x: -18 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }

  const line: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      {/* Glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
          zIndex: 0,
        }}
      />
      {/* Faint scanline texture — reinforces the log/terminal read */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #ffffff 0px, transparent 1px, transparent 3px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto px-6 py-20">
          {/* Heading */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-px bg-[#4f8cff]" />
              <span className={`${TEXT_MUTED} text-xs font-mono uppercase tracking-[0.2em]`}>
                career log
              </span>
            </div>
            <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
              A log of the roles that shaped how I build.
            </h1>
            <p className={`${TEXT_SEC} text-base`}>
              Chronological, from first internship to now.
            </p>
          </div>

          {/* Log */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            {/* Connector rail */}
            <motion.div
              variants={line}
              style={{ transformOrigin: "top" }}
              className="absolute left-[7px] top-2 bottom-2 w-px bg-linear-to-b from-[#4f8cff] via-[rgba(100,217,255,.35)] to-transparent"
              aria-hidden
            />

            {experiences.map((exp) => {
              const hash = logHash(String(exp.id ?? exp.role + exp.company))
              return (
                <motion.div key={exp.id} variants={item} className="relative pl-8 pb-10 group">
                  {/* Log dot */}
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#4f8cff] bg-[#050914] group-hover:bg-[#4f8cff] transition-colors duration-300" />

                  <div className="mb-1.5 flex items-center gap-3 font-mono text-xs">
                    <span className={TEXT_MUTED}>#{hash}</span>
                    <span className="text-[#4a5b78]">·</span>
                    <span className="text-[#7c8db0]">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <div
                    className={`${SURFACE} border ${BORDER} rounded-2xl p-6 transition-all duration-300
                      group-hover:border-[rgba(100,217,255,.35)] group-hover:translate-x-1.5`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className={`${TEXT_PRI} font-bold text-xl`}>{exp.role}</h3>
                        <p className={`${ACCENT} font-semibold text-base mt-0.5`}>{exp.company}</p>
                      </div>
                      <span className={PILL}>{exp.type}</span>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm mb-4">
                      <span className={`flex items-center gap-1.5 ${TEXT_SEC}`}>
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span className={`flex items-center gap-1.5 ${TEXT_SEC}`}>
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                          locationTypeBadge[exp.locationType] ?? ""
                        }`}
                      >
                        {exp.locationType}
                      </span>
                    </div>

                    <p className={`${TEXT_SEC} text-sm leading-relaxed mb-4`}>{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill: string) => (
                        <span key={skill} className={PILL}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    {exp.projects && exp.projects.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[rgba(105,150,219,.14)] flex flex-col gap-1.5">
                        <p className={`text-xs uppercase tracking-wider ${TEXT_MUTED} mb-1`}>
                          Key Projects
                        </p>
                        {exp.projects.map((proj: string) => (
                          <span
                            key={proj}
                            className="text-sm font-medium text-[#8fc0ff] flex items-center gap-1.5"
                          >
                            <ExternalLink size={12} />
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Terminal cursor closing the log */}
            <div className="flex items-center gap-2 pl-8 font-mono text-xs text-[#4a5b78]">
              <span>end of log</span>
              <span className="w-1.5 h-3.5 bg-[#64d9ff] animate-pulse" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Experience