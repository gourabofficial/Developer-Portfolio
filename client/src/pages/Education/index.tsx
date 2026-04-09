import { GraduationCap, MapPin } from "lucide-react"
import { education } from "@/data"

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

export const Education = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn`}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Heading block */}
        <div className="mb-12">
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
            Education
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
        </div>

        {/* Education cards */}
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className={`${CARD} p-6 ${
              idx === education.length - 1 ? "" : "mb-6"
            }`}
          >
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={22} className={ACCENT} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`${TEXT_PRI} font-bold text-xl`}>
                  {edu.degree}
                </h3>
                <p className={`${ACCENT} font-semibold`}>{edu.institution}</p>
              </div>
              <span className={`${PILL} ml-auto self-start whitespace-nowrap`}>
                {edu.startYear} – {edu.endYear}
              </span>
            </div>

            {/* Location */}
            <div className={`flex items-center gap-2 text-sm ${TEXT_MUTED} mb-4`}>
              <MapPin size={14} />
              {edu.location}
            </div>

            {/* Description */}
            <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
              {edu.description}
            </p>

            {/* Skills */}
            {edu.skills && edu.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-orange-100 dark:border-[#3d2410]">
                {edu.skills.map((skill) => (
                  <span key={skill} className={PILL}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education
