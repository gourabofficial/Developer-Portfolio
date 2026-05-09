import { MapPin, Code2, Lightbulb, BookOpen, User } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { SkillIcon } from "@/components/SkillIcon"
import { personal, skills } from "@/data"
import { useTheme } from "@/components/theme-provider"

const PAGE_BG = "bg-background"
const SURFACE = "bg-card"
const BORDER = "border-border"
const TEXT_PRI = "text-foreground"
const TEXT_SEC = "text-muted-foreground"
const TEXT_MUTED = "text-muted-foreground"
const GRAD_TEXT = "bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10`
const PILL = "bg-primary/10 border border-primary/20 text-foreground text-xs px-3 py-1.5 rounded-full font-medium hover:bg-primary/15 hover:border-primary/30 transition-all duration-200 flex items-center gap-1.5"

export const About = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      {/* Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? 'radial-gradient(circle 800px at 50% 20%, oklch(0.28 0.15 265 / 0.25), transparent)'
            : 'radial-gradient(circle 800px at 50% 20%, oklch(0.75 0.12 265 / 0.15), transparent)',
          zIndex: 0
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Page heading */}
        <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
          About Me
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-12" />

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-16 mb-20">
          {/* LEFT — Avatar + socials */}
          <div>
            <div className="w-full aspect-square rounded-2xl bg-secondary border-2 border-border flex items-center justify-center shadow-xl shadow-primary/10">
              <User size={80} className={TEXT_MUTED} />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 ${TEXT_SEC} hover:text-primary transition-colors duration-200`}
              >
                <GithubIcon width={18} height={18} />
                gourabofficial
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 ${TEXT_SEC} hover:text-primary transition-colors duration-200`}
              >
                <LinkedinIcon width={18} height={18} />
                gourab-ganguly
              </a>
              <span className={`flex items-center gap-3 ${TEXT_SEC}`}>
                <MapPin size={18} />
                {personal.location}
              </span>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            <span className="bg-primary/10 border border-primary/30 text-foreground text-sm px-4 py-2 rounded-full inline-block mb-6 font-medium shadow-sm">
              {personal.headline}
            </span>

            <p className={`${TEXT_SEC} text-base leading-relaxed mb-8`}>
              {personal.bio}
            </p>

            <div className={`flex items-center gap-2 ${TEXT_MUTED} text-sm`}>
              <MapPin size={16} />
              {personal.location}
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="mb-20">
          <h2 className={`${GRAD_TEXT} text-2xl font-bold mb-8`}>
            Skills &amp; Technologies
          </h2>
          {skills.map((cat) => (
            <div key={cat.category} className="mb-6">
              <p className={`text-sm font-semibold uppercase tracking-wider ${TEXT_MUTED} mb-3`}>
                {cat.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item.name} className={PILL}>
                    <SkillIcon iconName={item.icon} size={14} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Values section */}
        <div>
          <h2 className={`${GRAD_TEXT} text-2xl font-bold mb-8`}>
            What I Believe In
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Clean Code */}
            <div className={`${CARD} p-6 border-l-4 border-l-primary`}>
              <Code2 size={32} className="text-primary mb-4" />
              <h3 className={`${TEXT_PRI} font-bold text-lg mb-2`}>
                Clean Code
              </h3>
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                Writing readable, maintainable code is not optional — it&apos;s the
                foundation of great software.
              </p>
            </div>

            {/* Card 2 — Problem Solving */}
            <div className={`${CARD} p-6 border-l-4 border-l-primary`}>
              <Lightbulb size={32} className="text-primary mb-4" />
              <h3 className={`${TEXT_PRI} font-bold text-lg mb-2`}>
                Problem Solving
              </h3>
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                Every bug is a puzzle. I approach challenges with curiosity and
                systematic thinking.
              </p>
            </div>

            {/* Card 3 — Continuous Learning */}
            <div className={`${CARD} p-6 border-l-4 border-l-primary`}>
              <BookOpen size={32} className="text-primary mb-4" />
              <h3 className={`${TEXT_PRI} font-bold text-lg mb-2`}>
                Continuous Learning
              </h3>
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                Tech evolves fast. Staying current with .NET 10, modern React
                patterns, and new architectures.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default About
