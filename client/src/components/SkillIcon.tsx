import type { IconType } from "react-icons"
import {
  SiSharp, SiCss, SiDocker, SiDotnet, SiExpress, SiGit, SiGithub,
  SiGithubactions, SiHtml5, SiJsonwebtokens, SiSqlite,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPostman, SiReact,
  SiRedis, SiRedux, SiTailwindcss, SiTypescript, SiVscodium,
} from "react-icons/si"

const icons: Record<string, IconType> = {
  SiCsharp: SiSharp, SiCss3: SiCss, SiDocker, SiDotnet, SiExpress, SiGit, SiGithub,
  SiGithubactions, SiHtml5, SiJsonwebtokens, SiMicrosoftsqlserver: SiSqlite, SiMongodb,
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiPostman, SiReact, SiRedis, SiRedux,
  SiTailwindcss, SiTypescript, SiVisualstudio: SiVscodium, SiVisualstudiocode: SiVscodium,
}

export const SkillIcon = ({ iconName, size = 16, className = "" }: { iconName: string; size?: number; className?: string }) => {
  const Icon = icons[iconName]
  return Icon ? <Icon size={size} className={className} aria-hidden="true" /> : null
}
