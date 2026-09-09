import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

// Stable particle data — defined outside the component so it is never
// recreated on re-renders. Math.random() only runs once at module load time.
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 15,
  delay: -(Math.random() * 15), // negative delay = start mid-cycle, avoids pop-in
}))

export function FloatingParticles() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  // Respect prefers-reduced-motion — render static dots instead.
  if (reduced) {
    return (
      <div
        ref={containerRef}
        className="floating-particles"
        aria-hidden="true"
      >
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.25,
              // No animation — just static dots
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="floating-particles"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            // Compositor hint — keeps particles on their own GPU layer
            willChange: "transform, opacity",
          }}
          animate={{
            // Only transform + opacity — no layout properties
            y: [-18, 18, -18],
            x: [-8, 8, -8],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            // repeatType defaults to "loop" which is what we want
          }}
        />
      ))}
    </div>
  )
}
