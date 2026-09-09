import { motion, useReducedMotion, type Variants } from "framer-motion"
import { MapPin, ExternalLink } from "lucide-react"
import type { IconType } from "react-icons"
import {
  SiSharp,
  SiDotnet,
  SiRedis,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
} from "react-icons/si"
import { experiences } from "@/data"

// ─── tech icon registry ───────────────────────────────────────────────────────
// Maps the plain skill name (as stored in experience.ts) to an SI icon + brand colour.
// Falls back to a text badge for anything without an official Simple Icons mark.

type TechEntry =
  | { kind: "icon"; Icon: IconType; color: string; bg?: string }
  | { kind: "badge"; color: string }

const TECH_MAP: Record<string, TechEntry> = {
  // C# — uses SiSharp (the closest match in react-icons/si)
  "C#":          { kind: "icon", Icon: SiSharp,             color: "#68217A" },
  // .NET / ASP.NET Core / .NET 10
  ".NET":        { kind: "icon", Icon: SiDotnet,            color: "#512BD4" },
  ".NET 10":     { kind: "icon", Icon: SiDotnet,            color: "#512BD4" },
  "ASP.NET Core":{ kind: "icon", Icon: SiDotnet,            color: "#512BD4" },
  // SQL Server — no official SI mark; text badge
  "SQL Server":  { kind: "badge",                           color: "#CC2927" },
  // Redis
  "Redis":       { kind: "icon", Icon: SiRedis,             color: "#DC382D" },
  // Dapper — no official icon
  "Dapper":      { kind: "badge",                           color: "#3AAFA9" },
  // React / React.js
  "React.js":    { kind: "icon", Icon: SiReact,             color: "#61DAFB" },
  "React":       { kind: "icon", Icon: SiReact,             color: "#61DAFB" },
  // Node.js
  "Node.js":     { kind: "icon", Icon: SiNodedotjs,         color: "#339933" },
  // Express
  "Express":     { kind: "icon", Icon: SiExpress,           color: "#ffffff", bg: "#1a1a2e" },
  // MongoDB
  "MongoDB":     { kind: "icon", Icon: SiMongodb,           color: "#47A248" },
  // JWT
  "JWT":         { kind: "icon", Icon: SiJsonwebtokens,     color: "#FB015B" },
  // REST APIs — no icon
  "REST APIs":   { kind: "badge",                           color: "#4A9EDB" },
  // MERN Stack — no single icon
  "MERN Stack":  { kind: "badge",                           color: "#47A248" },
}

function TechChip({ name }: { name: string }) {
  const entry = TECH_MAP[name]

  if (!entry) {
    // Fallback: plain text pill matching the existing .experience-tags span style
    return <span className="exp-tech-chip exp-tech-chip--text">{name}</span>
  }

  if (entry.kind === "badge") {
    return (
      <span className="exp-tech-chip" title={name}>
        <span
          className="exp-tech-badge-label"
          style={{ color: entry.color }}
        >
          {name}
        </span>
      </span>
    )
  }

  const { Icon, color, bg } = entry
  return (
    <span
      className="exp-tech-chip"
      title={name}
      style={bg ? { background: bg } : undefined}
    >
      <Icon size={13} color={color} aria-hidden />
      <span className="exp-tech-name">{name}</span>
    </span>
  )
}

// ─── animation helpers ────────────────────────────────────────────────────────

function useVariants(reduced: boolean | null) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  }

  const item: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          // will-change is intentionally NOT set here; framer removes it after animation
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const line: Variants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: { scaleY: 0 },
        visible: {
          scaleY: 1,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return { container, item, line }
}

// ─── stable commit hash per card ─────────────────────────────────────────────
function logHash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(6, "0").slice(0, 6)
}

// ─── component ────────────────────────────────────────────────────────────────

export function Experience() {
  const reduced = useReducedMotion()
  const { container, item, line } = useVariants(reduced)

  return (
    <div className="animate-fadeIn">
      <div className="exp-page-shell">

        {/* ── Page heading ──────────────────────────────────────────────────── */}
        <header className="exp-page-header">
          <div className="exp-page-eyebrow">
            <span className="exp-eyebrow-line" aria-hidden />
            <span className="exp-eyebrow-label">career log</span>
          </div>
          <h1 className="exp-page-title">
            A log of the roles that shaped how I build.
          </h1>
          <p className="exp-page-subtitle">Chronological, most recent first.</p>
        </header>

        {/* ── Timeline ──────────────────────────────────────────────────────── */}
        <motion.ol
          role="list"
          aria-label="Work experience"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="exp-timeline"
        >
          {/* Connector rail */}
          <motion.li
            variants={line}
            aria-hidden
            style={{ transformOrigin: "top" }}
            className="exp-rail"
          />

          {experiences.map((exp) => {
            const isCurrent = exp.endDate === "Present"
            const hash = logHash(exp.id ?? exp.role + exp.company)

            return (
              <motion.li
                key={exp.id}
                variants={item}
                className="exp-entry"
                role="listitem"
              >
                {/* Timeline dot */}
                <span
                  aria-hidden
                  className={["exp-dot", isCurrent ? "exp-dot--current" : ""].join(" ")}
                />

                {/* Commit hash + date meta */}
                <div className="exp-meta-row" aria-label={`${exp.startDate} to ${exp.endDate}`}>
                  <span className="exp-hash" aria-hidden>#{hash}</span>
                  <span className="exp-meta-sep" aria-hidden>·</span>
                  <span className="exp-date-range">
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {isCurrent && (
                    <span className="exp-current-badge" aria-label="Current role">
                      <span className="exp-current-dot" aria-hidden />
                      Current
                    </span>
                  )}
                </div>

                {/* Card */}
                <article
                  className={["exp-card", isCurrent ? "exp-card--current" : ""].join(" ")}
                  aria-label={`${exp.role} at ${exp.company}`}
                >
                  {/* ── Card header ── */}
                  <div className="exp-card-header">
                    <div className="exp-card-title-block">
                      <h2 className="exp-role">{exp.role}</h2>
                      <div className="exp-company-row">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exp-company-link"
                            aria-label={`${exp.company} — opens in new tab`}
                          >
                            {exp.company}
                            <ExternalLink size={11} aria-hidden />
                          </a>
                        ) : (
                          <span className="exp-company">{exp.company}</span>
                        )}
                      </div>
                    </div>
                    <span className="exp-type-pill">{exp.type}</span>
                  </div>

                  {/* ── Location row ── */}
                  <div className="exp-location-row">
                    <span className="exp-location-item">
                      <MapPin size={12} aria-hidden />
                      {exp.location}
                    </span>
                    <span
                      className={[
                        "exp-loctype-pill",
                        exp.locationType === "Remote"
                          ? "exp-loctype-pill--remote"
                          : "exp-loctype-pill--onsite",
                      ].join(" ")}
                    >
                      {exp.locationType}
                    </span>
                  </div>

                  {/* ── Summary ── */}
                  <p className="exp-description">{exp.description}</p>

                  {/* ── Responsibilities ── */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="exp-responsibilities" aria-label="Responsibilities">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="exp-responsibility-item">
                          <span className="exp-bullet" aria-hidden />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ── Tech stack ── */}
                  <div className="exp-section-divider" />
                  <div className="exp-stack-row" aria-label="Technologies used">
                    <span className="exp-stack-label">Stack</span>
                    <div className="exp-tech-chips">
                      {exp.skills.map((skill) => (
                        <TechChip key={skill} name={skill} />
                      ))}
                    </div>
                  </div>

                  {/* ── Key projects ── */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="exp-projects" aria-label="Key projects">
                      <span className="exp-projects-label">Key Projects</span>
                      <ul className="exp-projects-list">
                        {exp.projects.map((proj) => (
                          <li key={proj} className="exp-project-item">
                            <span className="exp-project-dot" aria-hidden />
                            {proj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </motion.li>
            )
          })}

          {/* Terminal cursor — end of log */}
          <li className="exp-eof" aria-hidden>
            <span>end of log</span>
            <span className="exp-cursor" />
          </li>
        </motion.ol>

      </div>
    </div>
  )
}

export default Experience
