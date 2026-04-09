import { MapPin, Code2, Lightbulb, BookOpen, User } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal, skills } from "@/data"

const PAGE_BG = "bg-[#fefaf4] dark:bg-[#1a1008]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`
const PILL = "bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-[#3d2410] text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full font-medium"

export const About = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn`}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Page heading */}
        <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
          About Me
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-12" />

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-16 mb-20">
          {/* LEFT — Avatar + socials */}
          <div>
            <div className="w-full aspect-square rounded-2xl bg-[#fff3e0] dark:bg-[#2e1c0e] border-2 border-orange-200 dark:border-[#3d2410] flex items-center justify-center shadow-xl shadow-orange-500/10">
              <User size={80} className={TEXT_MUTED} />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 ${TEXT_SEC} hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200`}
              >
                <GithubIcon width={18} height={18} />
                gourabofficial
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 ${TEXT_SEC} hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200`}
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
            <span className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300 text-sm px-4 py-2 rounded-full inline-block mb-6 font-medium">
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
                  <span key={item} className={PILL}>
                    {item}
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
            <div className={`${CARD} p-6 border-l-4 border-l-orange-500`}>
              <Code2 size={32} className="text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className={`${TEXT_PRI} font-bold text-lg mb-2`}>
                Clean Code
              </h3>
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                Writing readable, maintainable code is not optional — it&apos;s the
                foundation of great software.
              </p>
            </div>

            {/* Card 2 — Problem Solving */}
            <div className={`${CARD} p-6 border-l-4 border-l-orange-500`}>
              <Lightbulb size={32} className="text-orange-500 dark:text-orange-400 mb-4" />
              <h3 className={`${TEXT_PRI} font-bold text-lg mb-2`}>
                Problem Solving
              </h3>
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                Every bug is a puzzle. I approach challenges with curiosity and
                systematic thinking.
              </p>
            </div>

            {/* Card 3 — Continuous Learning */}
            <div className={`${CARD} p-6 border-l-4 border-l-orange-500`}>
              <BookOpen size={32} className="text-orange-500 dark:text-orange-400 mb-4" />
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
  )
}

export default About
