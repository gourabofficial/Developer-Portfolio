import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion"

export type ExperienceMilestone = {
  period: string
  role: string
  description: string
  index: number
}

type AboutExperienceProps = {
  items: ExperienceMilestone[]
  /** Delay the whole column entrance so it syncs after the terminal reveal */
  columnDelay?: number
}

const ease = [0.22, 1, 0.36, 1] as const

export function AboutExperience({ items, columnDelay = 0.25 }: AboutExperienceProps) {
  const prefersReducedMotion = useFramerReducedMotion()

  // When reduced motion is requested we fall back to a simple opacity fade only
  const makeCardVariants = (index: number) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay: columnDelay + index * 0.05 },
        }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 as const },
          transition: {
            duration: 0.35,
            delay: columnDelay + index * 0.13,
            ease,
          },
        }

  const makeBadgeVariants = (index: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, amount: 0.3 as const },
          transition: {
            duration: 0.28,
            delay: columnDelay + index * 0.13 + 0.06,
            ease,
          },
        }

  // Vertical connector line: draws downward via scaleY
  const connectorVariants = prefersReducedMotion
    ? {}
    : {
        initial: { scaleY: 0, originY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, amount: 0.1 as const },
        transition: {
          duration: 0.55,
          delay: columnDelay + 0.1,
          ease,
        },
      }

  return (
    <div className="relative flex flex-col gap-6 pl-1" role="list" aria-label="Experience milestones">
  {/* Vertical connector line */}
  <motion.span
    className="absolute left-[19px] top-1.5 bottom-1.5 w-px bg-linear-to-b from-[#4f8cff] via-[rgba(100,217,255,.35)] to-transparent"
    style={{ transformOrigin: "top" }}
    aria-hidden="true"
    {...connectorVariants}
  />

  {items.map((item) => {
    const cardMotion = makeCardVariants(item.index)
    const badgeMotion = makeBadgeVariants(item.index)
    const isCurrent = item.index === items.length - 1

    return (
      <motion.article
        key={item.index}
        role="listitem"
        className="group relative flex gap-5 py-4 pr-5 rounded-2xl transition-transform duration-300 hover:translate-x-1"
        {...cardMotion}
      >
        {/* Numbered checkpoint badge */}
        <motion.span
          aria-hidden="true"
          className={`relative shrink-0 flex items-center justify-center w-[38px] h-[38px] rounded-full font-mono text-xs font-semibold border-[1.5px] transition-all duration-300 group-hover:border-[rgba(100,217,255,.55)] group-hover:shadow-[0_0_0_4px_rgba(100,217,255,.08)] ${
            isCurrent
              ? "border-[#64d9ff] text-[#64d9ff] bg-[rgba(100,217,255,.08)]"
              : "border-[rgba(126,161,214,.28)] text-[#8fc0ff] bg-[rgba(12,22,40,.9)]"
          }`}
          {...badgeMotion}
        >
          {isCurrent && (
            <span className="absolute -inset-1.5 rounded-full border-[1.5px] border-[#64d9ff] opacity-50 animate-ping motion-reduce:hidden" />
          )}
          {String(item.index + 1).padStart(2, "0")}
        </motion.span>

        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="m-0 font-mono text-xs text-[#64d9ff] tracking-wide">{item.period}</p>
            {isCurrent && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#64d9ff] bg-[rgba(100,217,255,.08)] border border-[rgba(100,217,255,.25)] rounded-full px-2 py-0.5">
                live
              </span>
            )}
          </div>
          <h4 className="m-0 text-base font-semibold text-[#f3f7ff] transition-colors duration-300 group-hover:text-[#e8f2ff]">
            {item.role}
          </h4>
          <small className="text-[13px] leading-relaxed text-[#9aaac0]">{item.description}</small>
        </div>
      </motion.article>
    )
  })}
</div>
  )
}
