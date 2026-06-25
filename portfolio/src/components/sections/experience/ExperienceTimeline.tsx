import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillBadge } from "@/components/cards/SkillBadge";
import { experience } from "@/data/experience";
import { TYPE_LABELS } from "@/constants";

export function ExperienceTimeline() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Experience" title="Where I've Worked" />

        <div className="relative">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className={cn(
                "relative pl-8 pb-12",
                index !== experience.length - 1 &&
                  "border-l-2 border-border ml-1.5"
              )}
            >
              {/* ─── Timeline Dot ─── */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 w-3 h-3 rounded-full bg-accent ring-2 ring-background -translate-x-1/2",
                  index !== experience.length - 1 ? "ml-[1.5px]" : "ml-0",
                  exp.current && "animate-pulse-dot"
                )}
              />

              {/* ─── Content ─── */}
              <div>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
                  {exp.company}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-accent font-medium font-body">
                    {exp.role}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-body px-2 py-0.5 border border-border">
                    {TYPE_LABELS[exp.type]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  {exp.duration} · {exp.location}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {exp.description}
                </p>

                {/* ─── Bullets ─── */}
                {exp.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-muted-foreground mt-1.5 shrink-0">
                          –
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* ─── Stack Tags ─── */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.stack.map((tech) => (
                    <SkillBadge key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
