"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/data/projects";

const filters = [
  { label: "All", value: "all" },
  { label: "Enterprise", value: "enterprise" },
  { label: "SaaS", value: "saas" },
  { label: "Tools", value: "tool" },
  { label: "Open Source", value: "open-source" },
];

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Projects" title="Things I've Built" />

        {/* ─── Filter Tabs ─── */}
        <div className="bg-muted rounded-lg p-1 inline-flex gap-1 mb-8 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "text-sm font-body px-3 py-1.5 rounded-md transition-colors duration-200",
                activeFilter === filter.value
                  ? "bg-background shadow-card text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
