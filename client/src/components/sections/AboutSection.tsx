import { motion } from "framer-motion"
import { SectionHeading } from "@/components/SectionHeading"
import { AboutExperience, type ExperienceMilestone } from "@/components/about/AboutExperience"
import "./AboutSection.css"

// Right column enters on scroll with a small delay
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

const cardReveal = {
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

// const highlights = [
//   {
//     icon: Code,
//     title: "Clean Architecture",
//     description:
//       "I build software with clear separation of concerns, maintainable code structure, and thoughtful abstractions that scale with business needs.",
//   },
//   {
//     icon: Database,
//     title: "Database Design",
//     description:
//       "From normalized schemas to query optimization, I design data layers that handle real-world complexity while staying performant and reliable.",
//   },
//   {
//     icon: Server,
//     title: "Backend Systems",
//     description:
//       "Enterprise APIs, background workers, caching strategies—I architect backend systems that support mission-critical business operations.",
//   },
//   {
//     icon: GitBranch,
//     title: "Full Stack Delivery",
//     description:
//       "From database to UI, I work across the entire stack to deliver complete features that meet user needs and business requirements.",
//   },
// ]

export function AboutSection() {
  return (
    <section id="about" className="section-shell content-section about-section-premium">
      <SectionHeading
        eyebrow="Who I am"
        title="Curiosity, ownership, and delivery have shaped my path so far."
        body="From student projects to professional engineering work, the goal has stayed the same: build software that is dependable, useful, and clear to work on."
      />
      <div className="about-grid">
        {/* Left column — About content with highlight cards */}
        <motion.div {...cardReveal} className="about-content-card">
          <div className="about-bio">
            <p className="about-bio-lead">
              I'm a <span className="about-highlight">.NET developer</span> focused on building{" "}
              <span className="about-highlight">enterprise applications</span> that solve real
              business problems.
            </p>
            <p className="about-bio-text">
              My work centers on backend systems, database design, and API development—the parts of
              software that have to work reliably at scale. I've migrated legacy systems to modern
              architectures, optimized slow queries, built RESTful APIs, and delivered full-stack
              features from database schema to React components.</p>

            <p className="about-bio-text">  At Ancile, I work on TEAERP, an enterprise ERP system for the tea
  industry, where I own backend modules end to end—from payroll and staff
  management to production tracking. I've built a hybrid caching layer
  (in-memory, Redis, and SQL Server working together) to keep the system
  fast under load, and rewritten slow stored procedures using dynamic SQL,
  sargable queries, and server-side pagination to cut response times on
  data-heavy reports.</p>
            
            <p className="about-bio-text">
              Whether it's designing clean database models, architecting scalable backend services, or
              building user interfaces that feel fast and intuitive, I approach every project with the
              same goal: write code that's easy to understand, easy to change, and easy to trust.
            </p>
            
          </div>

        
        </motion.div>

        {/* Right column — animated experience timeline */}
        <motion.div {...columnReveal}>
          <AboutExperience items={experienceMilestones} columnDelay={COLUMN_DELAY} />
        </motion.div>
      </div>
    </section>
  )
}
