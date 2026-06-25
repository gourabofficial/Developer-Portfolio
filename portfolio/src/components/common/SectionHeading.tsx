import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {/* Eyebrow label */}
      <p className="text-xs font-body font-medium tracking-widest uppercase text-accent mb-3">
        {label}
      </p>

      {/* Main title */}
      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
        {title}
      </h2>

      {/* Optional description */}
      {description && (
        <p
          className={cn(
            "text-base text-muted-foreground leading-relaxed",
            align === "center" && "max-w-xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
