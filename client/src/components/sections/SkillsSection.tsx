import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiC,
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiReact,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiRedis,
  SiMysql,
  SiPostgresql,
  SiJsonwebtokens,
  SiClaude,
  SiGithubcopilot,
  SiGooglegemini,
  SiHuggingface,
  SiLangchain,
} from 'react-icons/si'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const EASE = [0.16, 1, 0.3, 1] as const

// Icons confirmed to exist in Simple Icons via the installed react-icons package.
type StackEntry =
  | { name: string; kind: 'icon'; Icon: IconType; color: string; chip?: string }
  | { name: string; kind: 'badge'; label: string; color: string }

// Simple Icons has no official mark for these — Microsoft/AWS trademark
// restrictions, or the library is too small (Dapper) — so they render as
// colored text badges instead of a fabricated logo.
const stack: StackEntry[] = [
  { name: 'C#', kind: 'badge', label: 'C#', color: '#68217A' },
  { name: 'JavaScript', kind: 'icon', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Java', kind: 'icon', Icon: SiOpenjdk, color: '#ED8B00' },
  { name: 'Python', kind: 'icon', Icon: SiPython, color: '#3776AB' },
  { name: 'C', kind: 'icon', Icon: SiC, color: '#A8B9CC' },
  { name: 'SQL', kind: 'badge', label: 'SQL', color: '#4A9EDB' },
  { name: '.NET', kind: 'icon', Icon: SiDotnet, color: '#512BD4' },
  { name: 'Node.js', kind: 'icon', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', kind: 'icon', Icon: SiExpress, color: '#000000', chip: '#F3F7FF' },
  { name: 'MongoDB', kind: 'icon', Icon: SiMongodb, color: '#47A248' },
  { name: 'React.js', kind: 'icon', Icon: SiReact, color: '#61DAFB' },
  { name: 'HTML', kind: 'icon', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', kind: 'icon', Icon: SiCss, color: '#1572B6' },
  { name: 'Tailwind CSS', kind: 'icon', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Bootstrap', kind: 'icon', Icon: SiBootstrap, color: '#7952B3' },
  { name: 'Redis', kind: 'icon', Icon: SiRedis, color: '#DC382D' },
  { name: 'SQL Server', kind: 'badge', label: 'MSSQL', color: '#CC2927' },
  { name: 'MySQL', kind: 'icon', Icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', kind: 'icon', Icon: SiPostgresql, color: '#336791' },
  { name: 'EF Core', kind: 'badge', label: 'EF', color: '#512BD4' },
  { name: 'Dapper', kind: 'badge', label: 'Dap', color: '#3AAFA9' },
  { name: 'JWT', kind: 'icon', Icon: SiJsonwebtokens, color: '#FB015B' },
  { name: 'Claude', kind: 'icon', Icon: SiClaude, color: '#D97757' },
  { name: 'GitHub Copilot', kind: 'icon', Icon: SiGithubcopilot, color: '#000000', chip: '#F3F7FF' },
  { name: 'Gemini', kind: 'icon', Icon: SiGooglegemini, color: '#8E75B2' },
  { name: 'Hugging Face', kind: 'icon', Icon: SiHuggingface, color: '#FFD21E' },
  { name: 'LangChain', kind: 'icon', Icon: SiLangchain, color: '#1C3C3C', chip: '#F3F7FF' },
]

function StackChip({ entry }: { entry: StackEntry }) {
  return (
    <div className="group flex shrink-0 flex-col items-center gap-2" title={entry.name}>
      <span
        className="grid h-16 w-16 place-items-center rounded-2xl border border-[rgba(105,150,220,.14)] bg-[rgba(10,20,38,.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(100,217,255,.32)]"
        style={entry.kind === 'icon' && entry.chip ? { background: entry.chip } : undefined}
      >
        {entry.kind === 'icon' ? (
          <entry.Icon size={28} color={entry.color} />
        ) : (
          <span
            className="font-mono text-[13px] font-bold"
            style={{ color: entry.color }}
          >
            {entry.label}
          </span>
        )}
      </span>
      <span className="font-mono text-[10px] text-[#5f7a9e] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {entry.name}
      </span>
    </div>
  )
}

export const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion()

  const totalTools = stack.length

  return (
    <section id="stack" className="section-shell content-section">
      {/* Eyebrow with stats — unchanged */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="section-heading"
      >
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#64d9ff]">
          <span className="w-4 h-px bg-[#4f8cff]" />
          stack --list · {totalTools} tools
        </p>
        <h2>Technology Stack</h2>
        <p>A carefully chosen collection of technologies for building scalable, maintainable enterprise software.</p>
      </motion.div>

      {/* Continuous scrolling icon strip */}
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className={`flex w-max items-start gap-10 ${
            prefersReducedMotion ? 'flex-wrap justify-center gap-x-6 gap-y-6' : 'stack-marquee-track hover:[animation-play-state:paused]'
          }`}
        >
          {(prefersReducedMotion ? stack : [...stack, ...stack]).map((entry, i) => (
            <StackChip key={`${entry.name}-${i}`} entry={entry} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes stack-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .stack-marquee-track {
          animation: stack-marquee-scroll 34s linear infinite;
          /* Compositor hint: promote to own GPU layer before animation starts */
          will-change: transform;
        }
      `}</style>
    </section>
  )
}

export default SkillsSection