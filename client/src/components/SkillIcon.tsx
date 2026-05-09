import * as SimpleIcons from "simple-icons"

interface SkillIconProps {
  iconName: string
  size?: number
  className?: string
}

// Map of icon names to simple-icons slugs
const iconSlugMap: Record<string, string> = {
  SiReact: "react",
  SiTypescript: "typescript",
  SiTailwindcss: "tailwindcss",
  SiHtml5: "html5",
  SiCss3: "css3",
  SiNodedotjs: "nodedotjs",
  SiExpress: "express",
  SiDotnet: "dotnet",
  SiCsharp: "csharp",
  SiMongodb: "mongodb",
  SiMicrosoftsqlserver: "microsoftsqlserver",
  SiGit: "git",
  SiGithub: "github",
  SiPostman: "postman",
  SiVisualstudiocode: "visualstudiocode",
  SiVisualstudio: "visualstudio",
}

export const SkillIcon = ({ iconName, size = 16, className = "" }: SkillIconProps) => {
  const slug = iconSlugMap[iconName]
  
  if (!slug) {
    return null
  }

  const icon = SimpleIcons[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof SimpleIcons]
  
  if (!icon) {
    return null
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      fill={`#${icon.hex}`}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}
