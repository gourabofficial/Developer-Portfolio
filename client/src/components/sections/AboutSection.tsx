import { motion } from "framer-motion"
import { Code2, Braces, Layers3, Workflow } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { BioTerminal } from "@/components/BioTerminal"

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

const aboutCards = [
  {
    Icon: Code2,
    title: "Enterprise Mindset",
    text: "I think in systems, not just screens — balancing maintainability, security and performance."
  },
  {
    Icon: Braces,
    title: "Problem Solver",
    text: "I enjoy working through messy requirements and turning them into clean implementation paths."
  },
  {
    Icon: Layers3,
    title: "Continuous Learner",
    text: "I keep refining my understanding of system design, modern React, and backend architecture."
  },
  {
    Icon: Workflow,
    title: "Team Collaboration",
    text: "I work well in agile teams where communication, ownership, and delivery all matter."
  }
]

export function AboutSection() {
  return (
    <section id="about" className="section-shell content-section">
      <SectionHeading
        eyebrow="Who I am"
        title="Curiosity, ownership, and delivery have shaped my path so far."
        body="From student projects to professional engineering work, the goal has stayed the same: build software that is dependable, useful, and clear to work on."
      />
      <div className="about-grid">
        <motion.div {...reveal} className="about-terminal-card">
          <BioTerminal />
        </motion.div>
        <div className="about-story-grid">
          {aboutCards.map(({ Icon, title, text }, index) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ delay: index * 0.06, duration: 0.55, ease }}
              className="about-story-card"
            >
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.article>
          ))}
          <motion.div {...reveal} className="career-path career-path-modern">
            <div>
              <span>01</span>
              <b>Student</b>
              <small>Built the foundation</small>
            </div>
            <i />
            <div>
              <span>02</span>
              <b>Intern Developer</b>
              <small>Shipped full-stack products</small>
            </div>
            <i />
            <div className="active">
              <span>03</span>
              <b>SDE-1 @ Ancile</b>
              <small>Enterprise engineering</small>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
