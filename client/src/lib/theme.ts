/**
 * Premium Design System Tokens
 * Centralized theme configuration for the portfolio
 */

export const designTokens = {
  // Category accent colors (NO BLUE - blue reserved for backgrounds only)
  categoryAccents: {
    languages: {
      primary: '#a855f7', // violet
      glow: 'rgba(168, 85, 247, 0.2)',
      border: 'rgba(168, 85, 247, 0.3)',
    },
    frontend: {
      primary: '#06b6d4', // cyan
      glow: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)',
    },
    backend: {
      primary: '#14b8a6', // teal
      glow: 'rgba(20, 184, 166, 0.2)',
      border: 'rgba(20, 184, 166, 0.3)',
    },
    database: {
      primary: '#10b981', // emerald
      glow: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    toolsAI: {
      primary: '#f59e0b', // amber
      glow: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.3)',
    },
  },

  // Tech-specific brand colors (accurate to real brands)
  techColors: {
    // Languages
    csharp: '#9b59b6', // purple
    javascript: '#f7df1e', // yellow
    typescript: '#3178c6', // blue (OK for icons, not accents)
    
    // Frontend
    react: '#61dafb', // cyan
    tailwind: '#38bdf8', // sky blue
    html5: '#e34f26', // red-orange
    css3: '#1572b6', // blue
    
    // Backend
    dotnet: '#512bd4', // purple
    nodejs: '#5fa04e', // green
    express: '#ffffff', // white
    
    // Databases
    sqlserver: '#cc2927', // red
    postgresql: '#4169e1', // royal blue
    mysql: '#4479a1', // blue
    mongodb: '#47a248', // green
    redis: '#dc382d', // red
    
    // Tools & AI
    postman: '#ff6c37', // orange
    git: '#f05032', // red-orange
    copilot: '#8b5cf6', // purple
    cursor: '#111111', // black
    claude: '#d97757', // clay orange
    
    // Status/generic
    live: '#10b981', // green
    archived: '#6b7280', // gray
    wip: '#f59e0b', // amber
  },

  // Shadow scales
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 8px 24px rgba(0, 0, 0, 0.15)',
    lg: '0 16px 45px rgba(0, 0, 0, 0.2)',
    xl: '0 25px 70px rgba(0, 0, 0, 0.3)',
    glow: (color: string) => `0 0 20px ${color}`,
  },

  // Border radius scale
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },

  // Spacing scale (extended)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // Glassmorphism presets
  glass: {
    light: {
      background: 'rgba(15, 30, 55, 0.75)',
      border: 'rgba(105, 160, 240, 0.2)',
      blur: 'blur(12px)',
    },
    medium: {
      background: 'rgba(12, 24, 45, 0.85)',
      border: 'rgba(105, 160, 240, 0.25)',
      blur: 'blur(16px)',
    },
    heavy: {
      background: 'rgba(8, 18, 35, 0.92)',
      border: 'rgba(105, 160, 240, 0.3)',
      blur: 'blur(20px)',
    },
  },
}

// Utility: Get category accent color
export const getCategoryAccent = (category: string) => {
  const key = category.toLowerCase().replace(/\s+/g, '') as keyof typeof designTokens.categoryAccents
  return designTokens.categoryAccents[key] || designTokens.categoryAccents.languages
}

// Utility: Get tech brand color
export const getTechColor = (techName: string) => {
  const key = techName.toLowerCase().replace(/[.\s]+/g, '') as keyof typeof designTokens.techColors
  return designTokens.techColors[key] || '#64d9ff' // fallback cyan
}

export default designTokens
