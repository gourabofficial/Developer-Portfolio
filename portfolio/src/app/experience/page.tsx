import { ExperienceTimeline } from "@/components/sections/experience/ExperienceTimeline";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillBadge } from "@/components/cards/SkillBadge";
import { skills } from "@/data/skills";

export default function ExperiencePage() {
  return (
    <>
      <ExperienceTimeline />

      {/* ─── Complete Skill Set ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Skills" title="Complete Skill Set" />

          <div className="flex flex-col gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="flex flex-col md:flex-row gap-3 md:gap-6"
              >
                <span className="text-sm font-medium text-muted-foreground w-32 shrink-0 pt-1.5">
                  {skill.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <SkillBadge key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
