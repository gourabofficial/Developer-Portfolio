import { motion } from "framer-motion"
import { Code2, Database, Layers, Workflow } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import "./ServicesSection.css"

const EASE = [0.16, 1, 0.3, 1] as const

// Ordered to match a real request's path through the stack.
const stages = [
  {
    icon: Code2,
    title: "Frontend Development",
    text: "Responsive React interfaces that feel fast, focused and intuitive across every device.",
  },
  {
    icon: Workflow,
    title: "Backend Development",
    text: "Scalable, secure APIs with ASP.NET Core, clean boundaries and production-ready patterns.",
  },
  {
    icon: Database,
    title: "Database Design",
    text: "Thoughtful schemas, optimized queries and reliable data access layers.",
  },
  {
    icon: Layers,
    title: "System Design",
    text: "Maintainable enterprise systems designed for performance, change and long-term ownership.",
  },
]

// What actually travels across each connector.
const transitions = ["request", "query", "at scale"]

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="services" className="section-shell content-section">
      <SectionHeading
        eyebrow="What I do"
        title="Engineering across the stack."
        body="Focused capabilities for building dependable products, traced along the path a real request takes."
      />

      <ol className="flow-track">
        {stages.map(({ icon: Icon, title, text }, i) => (
          <>
            <motion.li
              key={title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className="flow-node"
            >
              <span className="flow-node-step" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flow-node-icon">
                <Icon size={20} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>

            {i < stages.length - 1 && (
              <motion.li
                key={`connector-${i}`}
                role="presentation"
                aria-hidden="true"
                className="flow-connector"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.25, ease: EASE }}
              >
                <span className="flow-connector-line">
                  <span
                    className="flow-connector-pulse"
                    style={{ animationDelay: `${i * 0.65}s` }}
                  />
                </span>
                <i className="flow-connector-arrow" />
                <span className="flow-connector-label">{transitions[i]}</span>
              </motion.li>
            )}
          </>
        ))}
      </ol>
    </section>
  )
}