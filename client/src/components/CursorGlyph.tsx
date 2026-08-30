import type { CSSProperties } from "react"
import { siCursor } from "simple-icons"

interface CursorGlyphProps {
  size?: number
  className?: string
  style?: CSSProperties
}

export function CursorGlyph({ size = 20, className = "", style }: CursorGlyphProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path fill={`#${siCursor.hex}`} d={siCursor.path} />
    </svg>
  )
}
