import { useEffect, useState } from "react"
import type { CSSProperties, ComponentType } from "react"
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
  Layers3,
  Mail,
  MapPin,
  Sparkles,
  Workflow,
} from "lucide-react"
import {
  SiClaude,
  SiCss,
  // SiDocker,
  SiDotnet,
  SiExpress,
  SiGit,
  // SiGithub,
  // SiGithubactions,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  // SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  // SiNextdotjs,
  SiNodedotjs,
  // SiOpenai,
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
import profilePhoto from "@/assets/profil.jpg"

const ease = [0.22, 1, 0.36, 1] as const
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease },
}

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

// Floating Particles Component
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
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
    description: "Core programming languages for building enterprise systems.",
    icon: Braces,
    items: [
      { name: "C#", Icon: SiSharp, color: "#9b59b6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    ],
  },
  {
    title: "Frontend",
    description: "Modern interfaces with speed, clarity and accessibility.",
    icon: Code2,
    items: [
      { name: "React", Icon: SiReact, color: "#61dafb" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", Icon: SiCss, color: "#1572b6" },
    ],
  },
  {
    title: "Backend",
    description: "Application services, APIs and the plumbing behind them.",
    icon: Database,
    items: [
      { name: "ASP.NET", Icon: SiDotnet, color: "#512bd4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Express", Icon: SiExpress, color: "#ffffff" },
    ],
  },
  {
    title: "Databases",
    description: "Structured and document stores that stay dependable at scale.",
    icon: Database,
    items: [
      { name: "SQL Server", Icon: SiMysql, color: "#cc2927" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "Redis", Icon: SiRedis, color: "#dc382d" },
    ],
  },
  {
    title: "Tools & AI",
    description: "Daily workflow, AI assistants and development tools.",
    icon: Sparkles,
    items: [
      { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
      { name: "Git", Icon: SiGit, color: "#f05032" },
      // { name: "VS Code", Icon: SiVscode, color: "#007acc" },
      { name: "Copilot", Icon: SiGithubcopilot, color: "#8b5cf6" },
      { name: "Cursor", Icon: CursorGlyph, color: "#111111", lightBg: true },
      { name: "Claude", Icon: SiClaude, color: "#d97757" },
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
    { 
      command: "whoami", 
      output: [
        { text: "Gourab Ganguly", color: "#64d9ff" },
        { text: "Software Developer", color: "#9b9bff" }
      ] 
    },
    { 
      command: "cat about.txt", 
      output: [
        { text: "Building enterprise software with ", color: "#b8cce8" },
        { text: ".NET", color: "#a897ff" },
        { text: ", ", color: "#b8cce8" },
        { text: "React", color: "#61dafb" },
        { text: " and ", color: "#b8cce8" },
        { text: "SQL", color: "#ffa657" },
        { text: ".", color: "#b8cce8" },
        { text: "Focused on clean architecture, product thinking, and reliable delivery.", color: "#8fa3c1" }
      ] 
    },
    { 
      command: "pwd", 
      output: [
        { text: "/home/gourab/", color: "#4ba2ff" },
        { text: "West Bengal, India", color: "#70dcff" }
      ] 
    },
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
        <span className="dot-red" />
        <span className="dot-yellow" />
        <span className="dot-green" />
        <p>~/about.sh</p>
      </div>
      <div className="bio-terminal-body">
        {lines.slice(0, visible).map((entry, index) => (
          <div key={entry.command} className="bio-terminal-block">
            <div className="bio-terminal-command">
              <span className="prompt-symbol">➜</span>
              <span className="prompt-dir">~</span>
              <code className="command-text">{entry.command}</code>
            </div>
            <div className="bio-terminal-output">
              {entry.output.map((line, i) => (
                <p key={i} style={{ color: line.color }}>
                  {line.text}
                </p>
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
  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(data.get("name"))}`)
    const body = encodeURIComponent(`${String(data.get("message"))}\n\nFrom: ${String(data.get("email"))}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  return (
    <main>
      {/* Clean Premium Hero Section */}
      <section id="home" className="clean-hero-section">
        <div className="section-shell">
          <div className="clean-hero-grid">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="clean-hero-content"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="hero-greeting"
              >
                Hello, I'm
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="hero-name-clean"
              >
                Gourab Ganguly
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="hero-role-clean"
              >
                Building enterprise <span className="hero-keyword">ERP systems</span> with <span className="hero-keyword dotnet">.NET</span>, SQL & React
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="hero-bio-clean"
              >
                Specialized in <span className="bio-highlight">.NET Core</span> and enterprise architecture. I engineer <span className="bio-highlight">ERP solutions</span> and scalable backend systems with a focus on clean code, performance optimization, and maintainable software design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.75 }}
                className="hero-actions-clean"
              >
                <a 
                  href="#projects" 
                  className="btn-primary"
                >
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="/Gourab-Ganguly-Resume.html" 
                  download 
                  className="btn-secondary"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </a>
                <a 
                  href="#contact" 
                  className="btn-ghost"
                >
                  <Mail size={16} />
                  <span>Let's Connect</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="clean-hero-image"
            >
              <div className="profile-wrapper">
                <div className="profile-glow-effect" />
                <div className="profile-image-frame">
                  <img src={profilePhoto} alt="Gourab Ganguly" className="profile-img" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className="hero-bg-gradient" />
          <div className="hero-grid-pattern" />
          <FloatingParticles />
        </div>
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

      <section id="stack" className="section-shell content-section stack-section-beautiful">
        <SectionHeading
          eyebrow="Technology stack"
          title="Tools that power enterprise solutions."
          body="A carefully chosen collection of technologies for building scalable, maintainable software." 
        />
        
        <div className="stack-beautiful-grid">
          {techStacks.map((category, categoryIndex) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="stack-beautiful-card"
            >
              <div className="stack-card-header">
                <div className="stack-icon-wrapper">
                  <category.icon size={20} />
                </div>
                <div className="stack-card-title">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
              
              <div className="stack-tech-flow">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                    className="stack-tech-badge"
                  >
                    <div className="tech-badge-icon" style={{ color: item.color }}>
                      <StackIcon item={item} />
                    </div>
                    <span className="tech-badge-name">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.article>
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
          <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="journey-line-modern" />
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease }}
              className={`journey-item-modern ${index === 0 ? "current" : ""}`}
            >
              <motion.div
                className="journey-node-modern"
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.12 + 0.1, duration: 0.35, ease }}
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

    <section id="projects" className="section-shell content-section projects-section-redis">
      <div className="projects-header-redis">
        <span className="projects-dot" aria-hidden="true" />
        <SectionHeading 
          eyebrow="Selected work" 
          title="Deploy anywhere. Scale any way." 
          body="A selection of enterprise, AI and full-stack products—from operational platforms to focused developer tools." 
        />
      </div>
      
      <div className="projects-grid-redis">
        {/* Primary Featured Projects */}
        <div className="projects-primary-row">
          {projects.slice(0, 3).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="project-card-redis primary"
            >
              <div className="project-icon-row">
                <div className="project-icon-wrapper">
                  <div className="project-icon">
                    {project.category === "Enterprise" && <Database size={20} />}
                    {project.category === "Full Stack" && <Code2 size={20} />}
                    {project.category === "AI" && <Sparkles size={20} />}
                    {project.category === "Utility" && <Workflow size={20} />}
                  </div>
                  <span className="project-dot-indicator" aria-hidden="true" />
                </div>
              </div>
              
              <div className="project-primary-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              
              <div className="project-tech-stack">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
              
              <a 
                href={project.liveUrl || project.repoUrl || "#contact"} 
                className="project-link-redis"
                target={project.liveUrl ? "_blank" : "_self"}
                rel="noreferrer"
              >
                <span>View Project</span>
                <span className="link-arrows">
                  <span className="link-arrow">
                    <ArrowRight size={16} />
                  </span>
                  <span className="link-arrow">
                    <ArrowRight size={16} />
                  </span>
                </span>
              </a>
            </motion.article>
          ))}
        </div>
        
        {/* Secondary Projects */}
        {projects.length > 3 && (
          <div className="projects-secondary-row">
            {projects.slice(3).map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="project-card-redis secondary"
              >
                <div className="project-icon-row">
                  <div className="project-icon-wrapper">
                    <div className="project-icon">
                      {project.category === "Enterprise" && <Database size={18} />}
                      {project.category === "Full Stack" && <Code2 size={18} />}
                      {project.category === "AI" && <Sparkles size={18} />}
                      {project.category === "Utility" && <Workflow size={18} />}
                    </div>
                    <span className="project-dot-indicator" aria-hidden="true" />
                  </div>
                  <span className="project-label">{project.category.toUpperCase()}</span>
                </div>
                
                <div className="project-secondary-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                
                <a 
                  href={project.liveUrl || project.repoUrl || "#contact"}
                  className="project-link-redis secondary"
                  target={project.liveUrl ? "_blank" : "_self"}
                  rel="noreferrer"
                >
                  <span>View Project</span>
                  <ArrowRight size={14} />
                </a>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>

    <section id="services" className="section-shell content-section">
      <SectionHeading 
        eyebrow="What I do" 
        title="Engineering across the stack." 
        body="Focused capabilities for building dependable products, from architecture and data to the last interaction." 
      />
      
      <div className="services-grid">
        {services.map(({ icon: Icon, title, text }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="service-card"
          >
            <span>0{i + 1}</span>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
            <i />
          </motion.article>
        ))}
      </div>
    </section>

    <section className="principles-section content-section"><div className="section-shell">
      <SectionHeading eyebrow="Engineering principles" title="How I think about building software." body="Technology changes. The principles behind dependable products endure." />
      <div className="principle-cloud">{["Clean Code","Performance First","Scalable Architecture","Security Focused","Continuous Learning","Problem Solving"].map((x,i)=><motion.div initial={{opacity:0,scale:.95,y:15}} whileInView={{opacity:1,scale:1,y:0}} viewport={{once:true}} transition={{delay:i*.05,duration:.4,ease}} className={`principle pcard-${i+1}`} key={x}><span>0{i+1}</span><b>{x}</b><i/></motion.div>)}</div>
    </div></section>

    <section className="section-shell content-section focus-section">
      <SectionHeading eyebrow="Current focus" title="Exploring what comes next." body="The ideas and technologies currently sharpening how I design and deliver software." />
      <motion.div {...reveal} className="focus-orbit"><div className="focus-core"><span>NOW</span><b>Building<br/>better systems</b><i/></div>{["System Design","Redis","Enterprise Software",".NET Ecosystem","Modern React","AI-assisted Development"].map((x,i)=><motion.div animate={{y:[0,i%2?4:-4,0]}} transition={{duration:5+i*.4,repeat:Infinity,ease:"easeInOut"}} className={`focus-node focus-${i+1}`} key={x}><span/><b>{x}</b></motion.div>)}<i className="focus-ring ring-a"/><i className="focus-ring ring-b"/></motion.div>
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
