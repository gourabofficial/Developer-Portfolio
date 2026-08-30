import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"
import { BioTerminal } from "@/components/BioTerminal"
import { ExperienceTimeline } from "../ExperienceTimeline"

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

const experienceMilestones = [
  {
    period: "2021 - 2023",
    role: "Student Developer",
    summary: "Built core habits around problem solving, UI composition, and backend fundamentals.",
  },
  {
    period: "2023 - 2024",
    role: "Intern Developer",
    summary: "Shipped full-stack features, improved implementation discipline, and learned product delivery.",
  },
  {
    period: "2024 - Present",
    role: "SDE-1 @ Ancile",
    summary: "Delivering enterprise software with a stronger focus on architecture, reliability, and scale.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="section-shell content-section about-section-premium">
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
          
          <ExperienceTimeline items={experienceMilestones} compact />
        </div>
      </div>
    </section>
  )
}
