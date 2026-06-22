import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Sparkles, Workflow } from "lucide-react"
import { projects } from "@/data"
import { SectionHeading } from "@/components/SectionHeading"

export function ProjectsSection() {
  return (
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
  )
}
