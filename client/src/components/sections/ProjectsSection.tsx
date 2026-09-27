import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Sparkles, Workflow, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProjectTechIcon } from '@/components/ProjectTech';
import { SectionHeading } from '@/components/SectionHeading';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/lib/adminApi';

function CategoryIcon({ category, size }: { category: string; size: number }) {
  const c = category.toLowerCase();
  if (c.includes('enterprise')) return <Database size={size} />;
  if (c.includes('full stack') || c.includes('full-stack')) return <Code2 size={size} />;
  if (c.includes('ai')) return <Sparkles size={size} />;
  return <Workflow size={size} />;
}

function ProjectCardRedis({ project, index, variant }: { project: Project; index: number; variant: 'primary' | 'secondary' }) {
  return (
    <motion.article
      key={project._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`project-card-redis ${variant}`}
    >
      <div className="project-icon-row">
        <div className="project-icon-wrapper">
          <div className="project-icon">
            <CategoryIcon category={project.category} size={variant === 'primary' ? 20 : 18} />
          </div>
          <span className="project-dot-indicator" aria-hidden="true" />
        </div>
        {variant === 'secondary' && (
          <span className="project-label">{project.category.toUpperCase()}</span>
        )}
      </div>

      <div className={`project-${variant}-content`}>
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>

      <div className={`project-tech-stack${variant === 'secondary' ? ' secondary' : ''}`}>
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-pill">
            <ProjectTechIcon tech={tech} size={12} />
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className={`project-link-redis${variant === 'secondary' ? ' secondary' : ''}`}
      >
        <span>{variant === 'primary' ? 'Case Study' : 'View Details'}</span>
        {variant === 'primary' ? (
          <span className="link-arrows">
            <span className="link-arrow"><ArrowRight size={16} /></span>
            <span className="link-arrow"><ArrowRight size={16} /></span>
          </span>
        ) : (
          <ArrowRight size={14} />
        )}
      </Link>
    </motion.article>
  );
}

export function ProjectsSection() {
  const state = useProjects();

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

      {state.status === 'loading' && (
        <div className="projects-state-placeholder">
          <Loader2 size={28} className="projects-spinner" />
          <span>Loading projects…</span>
        </div>
      )}

      {state.status === 'error' && (
        <div className="projects-state-placeholder projects-state-error">
          <AlertCircle size={22} />
          <span>Could not load projects — {state.message}</span>
        </div>
      )}

      {state.status === 'ok' && (
        <div className="projects-grid-redis">
          <div className="projects-primary-row">
            {state.projects
              .filter((p) => p.featured)
              .slice(0, 3)
              .map((p, i) => (
                <ProjectCardRedis key={p._id} project={p} index={i} variant="primary" />
              ))}
          </div>

          {state.projects.filter((p) => !p.featured).length > 0 && (
            <div className="projects-secondary-row">
              {state.projects
                .filter((p) => !p.featured)
                .map((p, i) => (
                  <ProjectCardRedis key={p._id} project={p} index={i} variant="secondary" />
                ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
