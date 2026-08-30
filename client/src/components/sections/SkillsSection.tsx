import { motion } from 'framer-motion'
import { Braces, Code2, Database, Server, Sparkles } from 'lucide-react'
import { skills } from '@/data'
import { SkillIcon } from '@/components/SkillIcon'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const categoryIcons = {
  Languages: Braces,
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  'Tools & AI': Sparkles,
}

const categoryAccents = {
  Languages: {
    border: 'rgba(168, 85, 247, 0.3)',
    glow: 'rgba(168, 85, 247, 0.15)',
    icon: '#a855f7',
  },
  Frontend: {
    border: 'rgba(6, 182, 212, 0.3)',
    glow: 'rgba(6, 182, 212, 0.15)',
    icon: '#06b6d4',
  },
  Backend: {
    border: 'rgba(20, 184, 166, 0.3)',
    glow: 'rgba(20, 184, 166, 0.15)',
    icon: '#14b8a6',
  },
  Databases: {
    border: 'rgba(16, 185, 129, 0.3)',
    glow: 'rgba(16, 185, 129, 0.15)',
    icon: '#10b981',
  },
  'Tools & AI': {
    border: 'rgba(245, 158, 11, 0.3)',
    glow: 'rgba(245, 158, 11, 0.15)',
    icon: '#f59e0b',
  },
}

export const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const totalTools = skills.reduce((acc, cat) => acc + cat.items.length, 0)
  const coreTools = skills.reduce((acc, cat) => acc + cat.items.filter(item => item.core).length, 0)

  return (
    <section id="stack" className="section-shell content-section">
      {/* Eyebrow with stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="section-heading"
      >
        <p className="eyebrow" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px' }}>
          <span />
          // {skills.length} categories · {totalTools} tools · {coreTools} core
        </p>
        <h2>Technology Stack</h2>
        <p>A carefully chosen collection of technologies for building scalable, maintainable enterprise software.</p>
      </motion.div>

      {/* Category cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: '18px',
      }}>
        {skills.map((category, categoryIndex) => {
          const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code2
          const accent = categoryAccents[category.category as keyof typeof categoryAccents]

          return (
            <motion.article
              key={category.category}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              style={{
                position: 'relative',
                padding: '26px',
                border: `1px solid ${accent.border}`,
                borderRadius: '18px',
                background: 'linear-gradient(145deg, rgba(15, 30, 53, 0.78), rgba(7, 16, 30, 0.68))',
                backdropFilter: 'blur(12px)',
                boxShadow: `inset 0 1px rgba(255, 255, 255, 0.02)`,
                overflow: 'hidden',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              whileHover={prefersReducedMotion ? {} : {
                translateY: -4,
                borderColor: accent.border,
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.2), inset 0 1px rgba(255, 255, 255, 0.03)`,
              }}
            >
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${accent.glow}, transparent 65%)`,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
              }} />

              {/* Header */}
              <header style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                marginBottom: '20px',
                position: 'relative',
              }}>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 3 }}
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'grid',
                    placeItems: 'center',
                    border: `1px solid ${accent.border}`,
                    borderRadius: '13px',
                    background: `linear-gradient(145deg, ${accent.glow}, rgba(10, 20, 40, 0.3))`,
                    color: accent.icon,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </motion.div>

                <div>
                  <h3 style={{
                    margin: '0 0 6px 0',
                    fontSize: '17px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}>
                    {category.category}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '12px',
                    color: '#7a8fae',
                    lineHeight: 1.6,
                  }}>
                    {category.description}
                  </p>
                </div>
              </header>

              {/* Skills grid */}
              <div style={{
                display: 'grid',
                gap: '10px',
              }}>
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.08 + skillIndex * 0.03 }}
                    whileHover={prefersReducedMotion ? {} : { translateX: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      border: '1px solid rgba(105, 150, 220, 0.12)',
                      borderRadius: '11px',
                      background: 'rgba(8, 18, 35, 0.55)',
                      transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                      cursor: 'default',
                    }}
                  >
                    {/* Icon with glow */}
                    <span style={{
                      width: '36px',
                      height: '36px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      <SkillIcon iconName={skill.icon} size={20} />
                      {skill.core && (
                        <span style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                          boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)',
                          border: '2px solid rgba(8, 18, 35, 0.8)',
                        }} />
                      )}
                    </span>

                    {/* Name & level */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                      }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#d4e2f5',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {skill.name}
                        </span>
                        {skill.years && (
                          <span style={{
                            fontSize: '9px',
                            fontFamily: 'ui-monospace, monospace',
                            color: '#5f7a9e',
                            marginLeft: '8px',
                          }}>
                            {skill.years}y
                          </span>
                        )}
                      </div>
                      {/* Progress bar */}
                      <div style={{
                        height: '3px',
                        background: 'rgba(30, 50, 85, 0.6)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${accent.icon}, ${accent.border})`,
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer stats */}
              <footer style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(105, 150, 220, 0.08)',
              }}>
                <span style={{
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#5f7a9e',
                }}>
                  {category.items.length} tools
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'rgba(105, 150, 220, 0.08)',
                }} />
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: accent.icon,
                }}>
                  {category.items.filter(i => i.core).length} core
                </span>
              </footer>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsSection
