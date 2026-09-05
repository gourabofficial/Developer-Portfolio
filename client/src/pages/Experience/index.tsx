import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { experiences } from "@/data"

// ─── animation helpers ───────────────────────────────────────────────────────

function useVariants(reduced: boolean | null) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.13,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  }

  const item: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const line: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return { container, item, line }
}

// ─── deterministic short hash per card (stable across renders) ───────────────
function logHash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(6, "0").slice(0, 6)
}

// ─── component ───────────────────────────────────────────────────────────────

export function Experience() {
  const reduced = useReducedMotion()
  const { container, item, line } = useVariants(reduced)

  return (
    <div className="animate-fadeIn">
      <div className="max-w-3xl mx-auto px-6 py-20">

          {/* ── Page heading ── */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-px bg-[#4f8cff]" />
              <span className="text-[#64d9ff] text-xs font-mono uppercase tracking-[0.2em]">
                career log
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
              A log of the roles that shaped how I build.
            </h1>
            <p className="text-[#9aaac0] text-base">
              Chronological, most recent first.
            </p>
          </div>

          {/* ── Timeline ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {/* Connector rail */}
            <motion.div
              variants={line}
              aria-hidden
              style={{ transformOrigin: "top" }}
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#4f8cff] via-[rgba(100,217,255,.4)] to-transparent"
            />

            {experiences.map((exp) => {
              const isCurrent = exp.endDate === "Present"
              const hash = logHash(exp.id ?? exp.role + exp.company)

              return (
                <motion.div
                  key={exp.id}
                  variants={item}
                  className="relative pl-8 pb-10 group"
                >
                  {/* Timeline dot */}
                  <span
                    className={[
                      "absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 transition-colors duration-300",
                      isCurrent
                        ? "border-[#64d9ff] bg-[#64d9ff] shadow-[0_0_12px_rgba(100,217,255,0.55)]"
                        : "border-[#4f8cff] bg-[#050914] group-hover:bg-[#4f8cff]",
                    ].join(" ")}
                  />

                  {/* Commit hash + date line */}
                  <div className="mb-2 flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#64d9ff]">#{hash}</span>
                    <span className="text-[#4a5b78]">·</span>
                    <span className="text-[#7c8db0]">
                      {exp.startDate} – {exp.endDate}
                    </span>
                    {isCurrent && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[rgba(100,217,255,.35)] bg-[rgba(100,217,255,.07)] text-[#64d9ff] text-[10px] font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#64d9ff] shadow-[0_0_8px_#64d9ff] animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={[
                      "rounded-2xl p-6 border transition-all duration-300 group-hover:translate-x-1.5",
                      isCurrent
                        ? "bg-[rgba(12,22,40,.78)] border-[rgba(100,217,255,.28)] shadow-[inset_3px_0_0_#3478d9]"
                        : "bg-[rgba(12,22,40,.72)] border-[rgba(126,161,214,.16)] group-hover:border-[rgba(100,217,255,.28)]",
                    ].join(" ")}
                  >
                    {/* Role / company */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-[#f3f7ff] font-bold text-xl leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-[#8fc0ff] font-semibold text-base mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      {/* Type pill */}
                      <span className="bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1 rounded-full font-medium">
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-5 text-sm mb-4">
                      <span className="flex items-center gap-1.5 text-[#9aaac0]">
                        <Calendar size={13} />
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#9aaac0]">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                      <span
                        className={[
                          "text-xs px-2.5 py-1 rounded-full border font-medium",
                          exp.locationType === "Remote"
                            ? "bg-[rgba(96,165,250,.08)] border-[rgba(96,165,250,.28)] text-[#93c5fd]"
                            : "bg-[rgba(52,211,153,.08)] border-[rgba(52,211,153,.28)] text-[#6ee7b7]",
                        ].join(" ")}
                      >
                        {exp.locationType}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[#9aaac0] text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Tech stack pills — reuses `.experience-tags span` style from index.css */}
                    <div className="experience-tags">
                      {exp.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    {/* Key projects */}
                    {exp.projects && exp.projects.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[rgba(105,150,219,.14)]">
                        <p className="text-xs uppercase tracking-wider text-[#64d9ff] mb-2 font-semibold">
                          Key Projects
                        </p>
                        <div className="flex flex-col gap-1">
                          {exp.projects.map((proj) => (
                            <span
                              key={proj}
                              className="text-sm font-medium text-[#8fc0ff] flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#64d9ff]" />
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Terminal cursor — closing the log */}
            <div className="flex items-center gap-2 pl-8 font-mono text-xs text-[#4a5b78]">
              <span>end of log</span>
              <span aria-hidden className="w-1.5 h-3.5 bg-[#64d9ff] animate-pulse" />
            </div>
          </motion.div>

        </div>
    </div>
  )
}

export default Experience
