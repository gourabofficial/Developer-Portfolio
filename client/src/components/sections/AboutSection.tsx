import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"
import { BioTerminal } from "@/components/BioTerminal"
import { AboutExperience, type ExperienceMilestone } from "@/components/about/AboutExperience"

// Terminal reveals 3 lines at ~820ms each; right column enters on scroll
// with a small delay so it feels like it's responding rather than racing.
const COLUMN_DELAY = 0.17

const columnReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: {
    duration: 0.5,
    delay: COLUMN_DELAY,
    ease: [0.22, 1, 0.36, 1] as const,
  },
}

const terminalReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

const experienceMilestones: ExperienceMilestone[] = [
  {
  index: 0,
  period: "2022 – 2026",
  role: "Student Developer",
  description:
    "Built a strong foundation in problem-solving, UI development, programming concepts, and backend fundamentals. Worked on multiple freelance projects, gaining hands-on experience in developing real-world applications, understanding client requirements, managing deadlines, and delivering projects on time.",
},

{
  index: 1,
  period: "2024 – 2025",
  role: "Intern Developer",
  description:
    "Worked on full-stack development projects and gained practical experience in building and delivering production-ready features. Developed a complete E-Commerce web application using React, Node.js, Express, and MongoDB, implementing features such as user authentication, product management, product catalog, shopping cart, and payment integration. This experience strengthened my understanding of application architecture, API development, database management, and end-to-end product delivery.",
},

{
  index: 2,
  period: "Feb 2026 – Present",
  role: "SDE-1 @Ancile",
  description:
    "Working on enterprise-level software with a strong focus on scalable architecture, reliability, maintainability, and real-world business requirements. Currently involved in migrating a legacy ERP system to a modern ASP.NET Core Web API architecture, using .NET Core, SQL Server, and React.js. Working across backend APIs, database operations, business logic, and frontend integration while gaining deeper experience in enterprise application development and system architecture.",
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
        {/* Left column — terminal card; untouched */}
        <motion.div {...terminalReveal} className="about-terminal-card">
          <BioTerminal />
        </motion.div>

        {/* Right column — animated experience timeline */}
        <motion.div {...columnReveal}>
          <AboutExperience items={experienceMilestones} columnDelay={COLUMN_DELAY} />
        </motion.div>
      </div>
    </section>
  )
}
