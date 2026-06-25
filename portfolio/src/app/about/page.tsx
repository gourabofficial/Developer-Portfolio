import { SectionHeading } from "@/components/common/SectionHeading";
import { TerminalBlock } from "@/components/sections/about/TerminalBlock";
import { PrinciplesSection } from "@/components/sections/about/PrinciplesSection";
import { personal } from "@/data/personal";

export default function AboutPage() {
  return (
    <>
      {/* ─── About Header + Terminal ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Bio */}
            <div>
              <SectionHeading label="About" title={personal.name} />
              <p className="text-base text-muted-foreground leading-loose font-body">
                {personal.bio}
              </p>
            </div>

            {/* Right: Terminal */}
            <div className="flex items-start">
              <TerminalBlock />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engineering Principles ─── */}
      <PrinciplesSection />

      {/* ─── Beyond Code ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Beyond Code" title="Outside Work" />
          <p className="text-base text-muted-foreground leading-relaxed font-body max-w-2xl">
            Outside of development, I spend time exploring software architecture,
            learning about distributed systems, and building side projects.
            I&apos;m also interested in the business side of technology — how
            products are built, positioned, and scaled.
          </p>
        </div>
      </section>
    </>
  );
}
