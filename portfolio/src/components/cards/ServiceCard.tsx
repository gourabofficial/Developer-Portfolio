import type { Service } from "@/types";
import { Server, Layers, Building2, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  backend: Server,
  fullstack: Layers,
  "erp-systems": Building2,
  "api-design": GitBranch,
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.id] || Server;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6 shadow-card hover:border-accent/30 transition-colors duration-200",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ─── Icon ─── */}
        <div className="shrink-0">
          <div className="bg-muted rounded-lg p-2 w-fit">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* ─── Content ─── */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-body px-2.5 py-0.5 border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
