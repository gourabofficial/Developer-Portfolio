import { Calendar, MapPin, Trophy } from "lucide-react"
import { events } from "@/data"

const PAGE_BG = "bg-[#fefaf4] dark:bg-[#1a1008]"
const SURFACE = "bg-[#fff8ed] dark:bg-[#231509]"
const BORDER = "border-orange-200 dark:border-[#3d2410]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"
const TEXT_SEC = "text-[#7c2d12] dark:text-[#fcd9a0]"
const TEXT_MUTED = "text-orange-400 dark:text-amber-700"
const GRAD_TEXT = "bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent"
const CARD = `${SURFACE} border ${BORDER} rounded-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500`

const typeBadgeMap: Record<string, string> = {
  Hackathon:
    "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300",
  Workshop:
    "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300",
  Conference:
    "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300",
  Meetup:
    "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300",
}

export const Events = () => {
  return (
    <div className={`${PAGE_BG} animate-fadeIn`}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Heading block */}
        <div className="mb-12">
          <h1 className={`${GRAD_TEXT} text-4xl font-extrabold mb-2`}>
            Events
          </h1>
          <p className={`${TEXT_MUTED} text-base`}>
            Hackathons, workshops and conferences I&apos;ve attended
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
        </div>

        {/* Event cards */}
        {events.map((event, idx) => (
          <div
            key={event.id}
            className={`${CARD} p-6 flex gap-6 ${
              idx === events.length - 1 ? "" : "mb-6"
            }`}
          >
            {/* LEFT stripe */}
            <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-orange-500 to-amber-500" />

            {/* CONTENT */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <h3 className={`${TEXT_PRI} font-bold text-xl`}>
                  {event.title}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${
                    typeBadgeMap[event.type] ?? ""
                  }`}
                >
                  {event.type}
                </span>
              </div>

              {/* Row 2 */}
              <div className={`flex flex-wrap gap-6 text-sm ${TEXT_MUTED}`}>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {event.location}
                </span>
              </div>

              {/* Description */}
              <p className={`${TEXT_SEC} text-sm leading-relaxed`}>
                {event.description}
              </p>

              {/* Outcome */}
              {event.outcome && (
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-orange-100 dark:border-[#3d2410]">
                  <Trophy
                    size={16}
                    className="text-amber-500 dark:text-amber-400 flex-shrink-0"
                  />
                  <span className={`${TEXT_SEC} text-sm font-medium`}>
                    {event.outcome}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
