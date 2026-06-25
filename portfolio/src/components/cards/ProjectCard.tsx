import type { Project } from "@/types";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { STATUS_LABELS } from "@/constants";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusStyles: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  archived: "bg-muted text-muted-foreground border-border",
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6 shadow-card hover:border-accent/30 transition-colors duration-200 flex flex-col",
        className
      )}
    >
      {/* ─── Header: Title + Status Badge ─── */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <span
          className={cn(
            "inline-flex items-center rounded-full text-xs font-body px-2 py-0.5 border shrink-0",
            statusStyles[project.status]
          )}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      {/* ─── Description ─── */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {project.description}
      </p>

      {/* ─── Stack Tags ─── */}
      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-body px-2.5 py-0.5 border border-border"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ─── Links Row ─── */}
      {(project.links.github || project.links.live || project.links.demo) && (
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={`${project.title} GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {(project.links.live || project.links.demo) && (
            <a
              href={project.links.live || project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={`${project.title} Live Demo`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
