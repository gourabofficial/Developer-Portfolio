import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { ExperienceTimeline } from "../../components/ExperienceTimeline"
import { experiences } from "@/data"

const PAGE_BG = "bg-[#050914]"
const SURFACE = "bg-[rgba(12,22,40,.72)]"
const BORDER = "border-[rgba(126,161,214,.16)]"
const TEXT_PRI = "text-[#f3f7ff]"
const TEXT_SEC = "text-[#9aaac0]"
const TEXT_MUTED = "text-[#64d9ff]"
const ACCENT = "text-[#8fc0ff]"
const GRAD_TEXT = "bg-linear-to-r from-white via-[#87a6ff] to-[#69ddff] bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-[rgba(100,217,255,.3)]`
const PILL = "bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1 rounded-full font-medium"

const locationTypeBadge: Record<string, string> = {
  "On-site":
    "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-green-700 dark:text-green-300",
  Remote:
    "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300",
}

export const Experience = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn relative`}>
      {/* Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)',
          zIndex: 0
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Heading block */}
        <div className="mb-16">
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
            Experience
          </h1>
          <p className={`${TEXT_MUTED} text-base`}>
            My professional journey so far
          </p>
          <div className="w-16 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #4f8cff 0%, #64d9ff 100%)" }} />
        </div>

        <ExperienceTimeline
          title="Experience"
          subtitle="A clear record of growth, delivery, and the systems behind the work."
          items={experiences.map((exp) => ({
            period: `${exp.startDate} – ${exp.endDate}`,
            role: exp.role,
            summary: `${exp.company} · ${exp.duration} · ${exp.location}`,
          }))}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experiences.map((exp) => (
            <div key={exp.id} className={`${CARD} p-6`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className={`${TEXT_PRI} font-bold text-xl`}>
                    {exp.role}
                  </h3>
                  <p className={`${ACCENT} font-semibold text-base mt-0.5`}>
                    {exp.company}
                  </p>
                </div>
                <span className={PILL}>{exp.type}</span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm mb-4">
                <span className={`flex items-center gap-1.5 ${TEXT_MUTED}`}>
                  <Calendar size={14} />
                  {exp.startDate} – {exp.endDate} · {exp.duration}
                </span>
                <span className={`flex items-center gap-1.5 ${TEXT_MUTED}`}>
                  <MapPin size={14} />
                  {exp.location}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    locationTypeBadge[exp.locationType] ?? ""
                  }`}
                >
                  {exp.locationType}
                </span>
              </div>

              <p className={`${TEXT_SEC} text-sm leading-relaxed mb-4`}>
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className={PILL}>
                    {skill}
                  </span>
                ))}
              </div>

              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[rgba(105,150,219,.14)]">
                  <p className={`text-xs uppercase tracking-wider ${TEXT_MUTED} mb-2`}>
                    Key Projects
                  </p>
                  {exp.projects.map((proj) => (
                    <span
                      key={proj}
                      className="text-sm font-medium text-[#8fc0ff] flex items-center gap-1"
                    >
                      <ExternalLink size={12} />
                      {proj}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Experience
