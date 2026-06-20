import { useEffect, useMemo, useState } from "react"
import type { CSSProperties, ComponentType, FormEvent } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Braces,
  Check,
  Code2,
  Database,
  Download,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  Sparkles,
  Workflow,
} from "lucide-react"
import {
  SiClaude,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { siCursor } from "simple-icons"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal, projects } from "@/data"

const ease = [0.22, 1, 0.36, 1] as const
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

const heroWords = [
  "Scalable backend systems.",
  "Clean interfaces with intent.",
  "Enterprise software that lasts.",
]

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <motion.div {...reveal} className="section-heading">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.div>
  )
}

function TypeLine() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = heroWords[index]
    const delay = deleting ? 28 : text === target ? 1400 : 42

    const timer = window.setTimeout(() => {
      if (!deleting && text === target) {
        setDeleting(true)
        return
      }

      if (deleting && text === "") {
        setDeleting(false)
        setIndex((current) => (current + 1) % heroWords.length)
        return
      }

      setText(target.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, index, text])

  return (
    <span className="hero-type-line">
      {text}
      <i />
    </span>
  )
}

function KineticName() {
  const letters = personal.name.split("")
  return (
    <h1 className="hero-name" aria-label={personal.name}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: 0.04 * index, ease }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </h1>
  )
}

function ProjectVisual({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <div className={`project-visual visual-${index % 3}`}>
      <div className="preview-top">
        <span>{project.accent}</span>
        <span>● LIVE</span>
      </div>
      <div className="preview-grid">
        <aside>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="preview-main">
          <div className="preview-title" />
          <div className="preview-stats">
            <i />
            <i />
            <i />
          </div>
          <div className="preview-chart">
            <b />
            <b />
            <b />
            <b />
            <b />
            <b />
          </div>
        </div>
      </div>
    </div>
  )
}

const services = [
  { icon: Workflow, title: "Backend Development", text: "Scalable, secure APIs with ASP.NET Core, clean boundaries and production-ready patterns." },
  { icon: Code2, title: "Frontend Development", text: "Responsive React interfaces that feel fast, focused and intuitive across every device." },
  { icon: Database, title: "Database Design", text: "Thoughtful schemas, optimized queries and reliable data access layers." },
  { icon: Workflow, title: "System Design", text: "Maintainable enterprise systems designed for performance, change and long-term ownership." },
]

type StackItem = {
  name: string
  Icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>
  color: string
  lightBg?: boolean
}

const techStacks: Array<{
  title: string
  description: string
  icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>
  items: StackItem[]
}> = [
  {
    title: "Languages",
    description: "The core programming languages I reach for most.",
    icon: Braces,
    items: [
      { name: "C#", Icon: SiSharp, color: "#9b9bff" },
      { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
    ],
  },
  {
    title: "Backend",
    description: "Application services, APIs and the plumbing behind them.",
    icon: Database,
    items: [
      { name: ".NET", Icon: SiDotnet, color: "#512bd4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Express", Icon: SiExpress, color: "#ffffff" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#d6b3ff" },
    ],
  },
  {
    title: "Frontend",
    description: "Modern interfaces with speed, clarity and accessibility.",
    icon: Code2,
    items: [
      { name: "React", Icon: SiReact, color: "#61dafb" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
      { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
    ],
  },
  {
    title: "Databases",
    description: "Structured and document stores that stay dependable at scale.",
    icon: Database,
    items: [
      { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
      { name: "Redis", Icon: SiRedis, color: "#dc382d" },
    ],
  },
  {
    title: "Tools",
    description: "Daily workflow, shipping, validation and release tools.",
    icon: Workflow,
    items: [
      { name: "Git", Icon: SiGit, color: "#f05032" },
      { name: "Docker", Icon: SiDocker, color: "#2496ed" },
      { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
      { name: "Actions", Icon: SiGithubactions, color: "#2088ff" },
    ],
  },
  {
    title: "AI Tools",
    description: "Thoughtful AI support for building, validating and iterating faster.",
    icon: Sparkles,
    items: [
      { name: "GitHub Copilot", Icon: SiGithubcopilot, color: "#8b5cf6" },
      { name: "ChatGPT", Icon: SiOpenai, color: "#74aa9c" },
      { name: "Claude", Icon: SiClaude, color: "#d97757" },
      { name: "Cursor", Icon: CursorGlyph, color: "#111111", lightBg: true },
    ],
  },
]

function CursorGlyph({ size = 20, className = "", style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path fill={`#${siCursor.hex}`} d={siCursor.path} />
    </svg>
  )
}

function BioTerminal() {
  const lines = [
    { command: "whoami", output: ["Gourab Ganguly", "Software Developer"] },
    { command: "cat about.txt", output: ["Building enterprise software with .NET, React and SQL.", "Focused on clean architecture, product thinking, and reliable delivery."] },
    { command: "pwd", output: ["West Bengal, India"] },
  ]

  const [visible, setVisible] = useState(1)

  useEffect(() => {
    if (visible >= lines.length) return
    const timer = window.setTimeout(() => setVisible((current) => current + 1), 820)
    return () => window.clearTimeout(timer)
  }, [lines.length, visible])

  return (
    <div className="bio-terminal">
      <div className="bio-terminal-bar">
        <span />
        <span />
        <span />
        <p>about.sh</p>
      </div>
      <div className="bio-terminal-body">
        {lines.slice(0, visible).map((entry, index) => (
          <div key={entry.command} className="bio-terminal-block">
            <div className="bio-terminal-command">
              <span>$</span>
              <code>{entry.command}</code>
            </div>
            <div className="bio-terminal-output">
              {entry.output.map((line) => (
                <p key={`${entry.command}-${line}`}>{line}</p>
              ))}
            </div>
            {index === visible - 1 ? <span className="bio-terminal-cursor" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function StackIcon({ item }: { item: StackItem }) {
  return (
    <span className={`stack-icon ${item.lightBg ? "stack-icon-light" : ""}`}>
      <item.Icon size={20} style={{ color: item.color }} />
    </span>
  )
}

export const Home = () => {
  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(data.get("name"))}`)
    const body = encodeURIComponent(`${String(data.get("message"))}\n\nFrom: ${String(data.get("email"))}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  const nameAccent = useMemo<CSSProperties>(
    () => ({
      "--name-photo": `url(${personal.photo})`,
    } as CSSProperties),
    [],
  )

  return (
    <main>
      <section id="home" className="section-shell hero-portfolio">
        <div className="hero-portfolio-copy">
          <p className="eyebrow">
            <span />
            Portfolio
          </p>
          <div className="hero-role-pill">
            <span>Software Developer</span>
            <small>SDE-1 @ Ancile Services</small>
          </div>
          <KineticName />
          <TypeLine />
          <p className="hero-description">
            I design and build scalable software products with a backend-first mindset, pairing clean architecture with modern React interfaces.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View Projects <ArrowRight size={17} />
            </a>
            <a className="button secondary" href="/Gourab-Ganguly-Resume.html" download>
              Resume <Download size={16} />
            </a>
            <a className="button ghost" href="#contact">
              Contact <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-facts">
            <div>
              <MapPin size={15} />
              <span>{personal.location}</span>
            </div>
            <div>
              <GitBranch size={15} />
              <span>Enterprise engineering</span>
            </div>
            <div>
              <BriefcaseBusiness size={15} />
              <span>Ancile Services</span>
            </div>
          </div>
        </div>

        <motion.div {...reveal} className="hero-portfolio-visual" style={nameAccent}>
          <div className="hero-photo-frame">
            <div className="hero-photo-glow" aria-hidden="true" />
            <img src={personal.photo} alt="Gourab Ganguly portrait" className="hero-photo" />
          </div>
          <div className="hero-portrait-card">
            <span className="online-dot" />
            <div>
              <p>Currently building</p>
              <b>Enterprise ERP systems</b>
            </div>
          </div>
          <div className="hero-caption-stack">
            <span>Gourab Ganguly</span>
            <p>Software Developer</p>
          </div>
        </motion.div>
      </section>

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
            {[
              [Code2, "Enterprise Mindset", "I think in systems, not just screens — balancing maintainability, security and performance."],
              [Braces, "Problem Solver", "I enjoy working through messy requirements and turning them into clean implementation paths."],
              [Layers3, "Continuous Learner", "I keep refining my understanding of system design, modern React, and backend architecture."],
              [Workflow, "Team Collaboration", "I work well in agile teams where communication, ownership, and delivery all matter."],
            ].map(([Icon, title, text], index) => {
              const CardIcon = Icon as typeof Code2
              return (
                <motion.article
                  key={String(title)}
                  {...reveal}
                  transition={{ delay: index * 0.06, duration: 0.55, ease }}
                  className="about-story-card"
                >
                  <CardIcon />
                  <div>
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </div>
                </motion.article>
              )
            })}
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

      <section id="stack" className="section-shell content-section stack-section-clean">
        <SectionHeading
          eyebrow="Technology stack"
          title="A clean view of the tools I use most often."
          body="Grouped by category and kept intentionally simple — no motion gimmicks, just the stack itself." 
        />
        <div className="stack-grid-clean">
          {techStacks.map((category) => (
            <article className="stack-category-card-clean" key={category.title}>
              <header>
                <span className="stack-category-icon-clean">
                  <category.icon size={18} />
                </span>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </header>
              <div className="stack-tech-grid">
                {category.items.map((item) => (
                  <div className="stack-tech-chip" key={item.name}>
                    <StackIcon item={item} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell content-section">
        <SectionHeading
          eyebrow="Professional journey"
          title="From internship foundations to enterprise systems."
          body="Each step has added more scope, more ownership, and more confidence in building software for real-world use."
        />
        <div className="journey-timeline-modern">
          <motion.div {...reveal} transition={{ duration: 0.95, ease }} className="journey-line-modern" />
          {[
            {
              type: "Current role",
              role: "SDE-1",
              company: "Ancile Services Pvt Ltd",
              duration: "Present",
              text: "Developing enterprise ERP systems with a focus on backend architecture, secure APIs, performance optimization and clean service boundaries.",
              tasks: ["Enterprise ERP systems", "REST APIs & authentication", "Performance optimization", "Backend architecture"],
              tech: [".NET Core", "React", "SQL Server", "Redis"],
            },
            {
              type: "Internship",
              role: "Full Stack Developer Intern",
              company: "Zidio Development Pvt Ltd",
              duration: "Mar 2025 — Sep 2025",
              text: "Built end-to-end web products and learned to connect responsive interfaces with secure, maintainable services.",
              tasks: ["Full-stack applications", "Authentication systems", "Responsive UI", "REST APIs"],
              tech: ["MongoDB", "Express", "React", "Node.js"],
            },
          ].map((job, index) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.14, duration: 0.7, ease }}
              className={`journey-item-modern ${index === 0 ? "current" : ""}`}
            >
              <motion.div
                className="journey-node-modern"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.16 + 0.1, duration: 0.45, ease }}
              >
                <BriefcaseBusiness />
              </motion.div>
              <div className="journey-meta-modern">
                <span>{job.type}</span>
                <b>{job.duration}</b>
              </div>
              <div className="journey-card-modern">
                <header>
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                  {index === 0 && (
                    <span className="status-pill">
                      <i /> Active
                    </span>
                  )}
                </header>
                <p>{job.text}</p>
                <div className="journey-tasks-modern">
                  {job.tasks.map((task) => (
                    <span key={task}>
                      <Check />
                      {task}
                    </span>
                  ))}
                </div>
                <div className="experience-tags">
                  {job.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    <section id="projects" className="section-shell content-section">
      <SectionHeading eyebrow="Selected work" title="Projects with systems thinking." body="A selection of enterprise, AI and full-stack products—from operational platforms to focused developer tools." />
      <div className="projects-grid">{projects.map((project, index) => <motion.article {...reveal} whileHover={{ y: -7 }} transition={{ duration: .45, ease }} className={`project-card ${project.featured ? "featured" : ""}`} key={project.id}>
        <ProjectVisual project={project} index={index}/><div className="project-content"><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p>
        <div className="feature-list">{project.features.map(x=><span key={x}><Check size={12}/>{x}</span>)}</div><div className="project-tags">{project.techStack.map(x=><span key={x}>{x}</span>)}</div>
        <div className="project-links"><a href={project.liveUrl || "#contact"}>Live Demo <ArrowUpRight size={14}/></a><a href={project.repoUrl || personal.github} target="_blank" rel="noreferrer"><GithubIcon width={14} height={14}/> GitHub</a></div></div>
      </motion.article>)}</div>
    </section>

    <section id="services" className="section-shell content-section">
      <SectionHeading eyebrow="What I do" title="Engineering across the stack." body="Focused capabilities for building dependable products, from architecture and data to the last interaction." />
      <div className="services-grid">{services.map(({icon:Icon,title,text},i)=><motion.article {...reveal} transition={{delay:i*.06,duration:.6,ease}} className="service-card" key={title}><span>0{i+1}</span><Icon size={23}/><h3>{title}</h3><p>{text}</p><i/></motion.article>)}</div>
    </section>

    <section className="principles-section content-section"><div className="section-shell">
      <SectionHeading eyebrow="Engineering principles" title="How I think about building software." body="Technology changes. The principles behind dependable products endure." />
      <div className="principle-cloud">{["Clean Code","Performance First","Scalable Architecture","Security Focused","Continuous Learning","Problem Solving"].map((x,i)=><motion.div initial={{opacity:0,scale:.9,y:18}} whileInView={{opacity:1,scale:1,y:0}} whileHover={{y:-7,scale:1.03}} viewport={{once:true}} transition={{delay:i*.06,duration:.5,ease}} className={`principle pcard-${i+1}`} key={x}><span>0{i+1}</span><b>{x}</b><i/></motion.div>)}</div>
    </div></section>

    <section className="section-shell content-section focus-section">
      <SectionHeading eyebrow="Current focus" title="Exploring what comes next." body="The ideas and technologies currently sharpening how I design and deliver software." />
      <motion.div {...reveal} className="focus-orbit"><div className="focus-core"><span>NOW</span><b>Building<br/>better systems</b><i/></div>{["System Design","Redis","Enterprise Software",".NET Ecosystem","Modern React","AI-assisted Development"].map((x,i)=><motion.div animate={{y:[0,i%2?7:-7,0]}} transition={{duration:4+i*.35,repeat:Infinity,ease:"easeInOut"}} className={`focus-node focus-${i+1}`} key={x}><span/><b>{x}</b></motion.div>)}<i className="focus-ring ring-a"/><i className="focus-ring ring-b"/></motion.div>
    </section>

    <section id="contact" className="section-shell content-section contact-section">
      <motion.div {...reveal} className="contact-card">
        <div className="contact-copy"><p className="eyebrow"><span/> Start a conversation</p><h2>Let&apos;s build something great together.</h2><p>I&apos;m always interested in thoughtful products, ambitious engineering problems and teams that care about craft. Let&apos;s talk.</p>
          <div className="contact-details"><a href={`mailto:${personal.email}`}><Mail size={18}/><span><small>Email</small>{personal.email}</span></a><a href={personal.github} target="_blank" rel="noreferrer"><GithubIcon width={18} height={18}/><span><small>GitHub</small>@gourabofficial</span></a><a href={personal.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon width={18} height={18}/><span><small>LinkedIn</small>Gourab Ganguly</span></a><p><MapPin size={18}/><span><small>Location</small>{personal.location}</span></p></div>
        </div>
        <form onSubmit={handleContact}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" required type="email" placeholder="you@company.com"/></label><label>Message<textarea name="message" required rows={5} placeholder="Tell me a little about what you&apos;re building..."/></label><button className="button primary" type="submit">Send Message <ArrowUpRight size={16}/></button><small>Your mail app will open with the message ready to send.</small></form>
      </motion.div>
    </section>
  </main>
  )
}

export default Home
