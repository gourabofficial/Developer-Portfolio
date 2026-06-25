import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Work" title="Selected Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors duration-200 font-body"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
