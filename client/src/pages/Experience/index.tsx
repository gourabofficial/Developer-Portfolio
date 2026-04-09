import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { experiences } from "@/data"

const PAGE_BG = "bg-[#fefaf4] dark:bg-[#1a1008]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const ACCENT = "text-orange-600 dark:text-orange-400"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`
const PILL = "bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-[#3d2410] text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full font-medium"

const locationTypeBadge: Record<string, string> = {
  "On-site":
    "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-green-700 dark:text-green-300",
  Remote:
    "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300",
}

export const Experience = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn`}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Heading block */}
        <div className="mb-16">
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
            Experience
          </h1>
          <p className={`${TEXT_MUTED} text-base`}>
            My professional journey so far
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-300 dark:from-orange-400 dark:via-amber-400 dark:to-transparent" />

          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={`relative flex gap-8 ${
                idx === experiences.length - 1 ? "" : "mb-12"
              }`}
            >
              {/* Dot */}
              <div className="flex-shrink-0 mt-1.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 ring-4 ring-[#fefaf4] dark:ring-[#1a1008] shadow-md shadow-orange-500/30">
                  <Briefcase size={16} className="text-white" />
                </div>
              </div>

              {/* Card */}
              <div className={`flex-1 ${CARD} p-6`}>
                {/* Row 1 */}
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

                {/* Row 2 */}
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

                {/* Description */}
                <p className={`${TEXT_SEC} text-sm leading-relaxed mb-4`}>
                  {exp.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className={PILL}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Projects */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-orange-100 dark:border-[#3d2410]">
                    <p
                      className={`text-xs uppercase tracking-wider ${TEXT_MUTED} mb-2`}
                    >
                      Key Projects
                    </p>
                    {exp.projects.map((proj) => (
                      <span
                        key={proj}
                        className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                        {proj}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
