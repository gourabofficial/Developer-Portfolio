import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Sparkles, Workflow } from "lucide-react"
import { Link } from "react-router-dom"

import { ProjectTechIcon } from "@/components/ProjectTech"
import { projects } from "@/data"
import { SectionHeading } from "@/components/SectionHeading"

// Derive the category icon from the project's category string
function CategoryIcon({ category, size }: { category: string; size: number }) {
  const c = category.toLowerCase()
  if (c.includes("enterprise")) return <Database size={size} />
  if (c.includes("full stack") || c.includes("full-stack")) return <Code2 size={size} />
  if (c.includes("ai")) return <Sparkles size={size} />
  return <Workflow size={size} />
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell content-section projects-section-redis">
      <div className="projects-header-redis">
        <span className="projects-dot" aria-hidden="true" />
        <SectionHeading
          eyebrow="Selected work"
          title="Deploy anywhere. Scale any way."
          body="A selection of enterprise and full-stack projects — from operational platforms to focused developer tools."
        />
      </div>

      <div className="projects-grid-redis">
        {/* Primary featured projects */}
        <div className="projects-primary-row">
          {projects
            .filter((p) => p.featured)
            .slice(0, 3)
            .map((project, index) => (
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
                      <CategoryIcon category={project.category} size={20} />
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
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      <ProjectTechIcon tech={tech} size={12} />
                      {tech}
                    </span>
                  ))}
                </div>

                <Link to={`/projects/${project.id}`} className="project-link-redis">
                  <span>Case Study</span>
                  <span className="link-arrows">
                    <span className="link-arrow"><ArrowRight size={16} /></span>
                    <span className="link-arrow"><ArrowRight size={16} /></span>
                  </span>
                </Link>
              </motion.article>
            ))}
        </div>

        {/* Secondary projects */}
        {projects.filter((p) => !p.featured).length > 0 && (
          <div className="projects-secondary-row">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
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
                        <CategoryIcon category={project.category} size={18} />
                      </div>
                      <span className="project-dot-indicator" aria-hidden="true" />
                    </div>
                    <span className="project-label">{project.category.toUpperCase()}</span>
                  </div>

                  <div className="project-secondary-content">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <div className="project-tech-stack secondary">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-pill">
                        <ProjectTechIcon tech={tech} size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link to={`/projects/${project.id}`} className="project-link-redis secondary">
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.article>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
