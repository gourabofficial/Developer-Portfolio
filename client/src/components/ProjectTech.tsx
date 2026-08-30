import type { CSSProperties } from "react"

import { Code2, Database, Sparkles, Workflow } from "lucide-react"
import { SiDotnet, SiMongodb, SiNodedotjs, SiReact, SiRedis } from "react-icons/si"

type ProjectTechIconProps = {
  tech: string
  size?: number
  className?: string
}

const brandIconStyle = (color: string): CSSProperties => ({ color })

const getIconName = (tech: string) => {
  const normalized = tech.toLowerCase().trim()

  if (normalized.includes("react")) return SiReact
  if (normalized.includes("node")) return SiNodedotjs
  if (normalized.includes("redis")) return SiRedis
  if (normalized.includes("mongodb")) return SiMongodb
  if (normalized.includes(".net") || normalized.includes("dotnet") || normalized.includes("ef core")) return SiDotnet

  return undefined
}

export function ProjectTechIcon({ tech, size = 14, className = "" }: ProjectTechIconProps) {
  const iconName = getIconName(tech)

  if (iconName) {
    const normalized = tech.toLowerCase().trim()

    if (iconName === SiReact) {
      return <SiReact size={size} className={className} style={brandIconStyle("#61DAFB")} aria-hidden="true" />
    }

    if (iconName === SiNodedotjs) {
      return <SiNodedotjs size={size} className={className} style={brandIconStyle("#5FA04E")} aria-hidden="true" />
    }

    if (iconName === SiRedis) {
      return <SiRedis size={size} className={className} style={brandIconStyle("#FF4438")} aria-hidden="true" />
    }

    if (iconName === SiMongodb) {
      return <SiMongodb size={size} className={className} style={brandIconStyle("#47A248")} aria-hidden="true" />
    }

    if (iconName === SiDotnet) {
      return <SiDotnet size={size} className={className} style={brandIconStyle("#512BD4")} aria-hidden="true" />
    }

    return <Code2 size={size} className={className} aria-hidden="true" />
  }

  const normalized = tech.toLowerCase().trim()

  if (normalized.includes("sql server")) {
    return <Database size={size} className={className} style={brandIconStyle("#CC2927")} aria-hidden="true" />
  }

  if (normalized.includes("api") || normalized.includes("workflow")) {
    return <Workflow size={size} className={className} style={brandIconStyle("#67E8F9")} aria-hidden="true" />
  }

  if (normalized.includes("ai") || normalized.includes("gemini")) {
    return <Sparkles size={size} className={className} style={brandIconStyle("#F59E0B")} aria-hidden="true" />
  }

  return <Code2 size={size} className={className} style={brandIconStyle("#8B9DC3")} aria-hidden="true" />
}