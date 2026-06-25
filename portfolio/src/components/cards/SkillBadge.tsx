import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-muted text-foreground text-sm px-3 py-1.5 border border-border font-body font-medium",
        className
      )}
    >
      {label}
    </span>
  );
}
