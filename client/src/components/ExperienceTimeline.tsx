import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

type ExperienceItem = {
  period: string
  role: string
  summary: string
}

type ExperienceTimelineProps = {
  title?: string
  subtitle?: string
  items: ExperienceItem[]
  compact?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

const containerMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease },
}

export function ExperienceTimeline({
  title = "Experience",
  subtitle = "Progress shaped by delivery, not just titles.",
  items,
  compact = false,
}: ExperienceTimelineProps) {
  if (compact) {
    return (
      <motion.div {...containerMotion} className="experience-timeline-modern career-path-modern">
        <div className="experience-timeline-head">
          <p>{title}</p>
          <h3>{subtitle}</h3>
        </div>
        <div className="experience-timeline-track" aria-hidden="true">
          <span />
        </div>
        <div className="experience-timeline-items">
          {items.map((item, index) => (
            <motion.article
              key={item.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`experience-timeline-item ${index === items.length - 1 ? "is-current" : ""}`}
            >
              <span className="experience-timeline-badge">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{item.period}</p>
                <h4>{item.role}</h4>
                <small>{item.summary}</small>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.section {...containerMotion} className="experience-rail-full">
      <div className="experience-rail-header">
        <div>
          <p>{title}</p>
          <h2>{subtitle}</h2>
        </div>
      </div>

      <div className="experience-rail-list">
        {items.map((item, index) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.42, delay: index * 0.07 }}
            className="experience-rail-card"
          >
            <div className="experience-rail-icon">
              <Briefcase size={16} />
            </div>
            <div className="experience-rail-content">
              <p>{item.period}</p>
              <h3>{item.role}</h3>
              <small>{item.summary}</small>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}