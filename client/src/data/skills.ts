export type SkillItem = { 
  name: string
  icon: string
  level: number
  years?: number
  core?: boolean // Mark core stack technologies
}
export type SkillCategory = { 
  category: string
  description: string
  items: SkillItem[]
  accent?: string // Category accent identifier
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for building enterprise systems",
    accent: "violet",
    items: [
      { name: "C#", icon: "SiCsharp", level: 92, years: 2, core: true },
      { name: "JavaScript", icon: "SiJavascript", level: 88, years: 3 },
      { name: "TypeScript", icon: "SiTypescript", level: 86, years: 2, core: true },
    ],
  },
  {
    category: "Frontend",
    description: "Fast, accessible product interfaces",
    accent: "cyan",
    items: [
      { name: "React", icon: "SiReact", level: 88, years: 2, core: true },
      { name: "Next.js", icon: "SiNextdotjs", level: 82, years: 1 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", level: 90, years: 2, core: true },
      { name: "Redux Toolkit", icon: "SiRedux", level: 82, years: 1 },
      { name: "HTML5", icon: "SiHtml5", level: 95, years: 4 },
      { name: "CSS3", icon: "SiCss3", level: 92, years: 4 },
    ],
  },
  {
    category: "Backend",
    description: "Enterprise APIs and distributed services",
    accent: "teal",
    items: [
      { name: "ASP.NET Core", icon: "SiDotnet", level: 92, years: 2, core: true },
      { name: ".NET 8 / 9 / 10", icon: "SiDotnet", level: 90, years: 2, core: true },
      { name: "Dapper", icon: "SiDotnet", level: 86, years: 1 },
      { name: "EF Core", icon: "SiDotnet", level: 84, years: 1 },
      { name: "Redis", icon: "SiRedis", level: 78, years: 1 },
      { name: "JWT", icon: "SiJsonwebtokens", level: 86, years: 2 },
      { name: "SignalR", icon: "SiDotnet", level: 76, years: 1 },
      { name: "Node.js", icon: "SiNodedotjs", level: 82, years: 2 },
      { name: "Express", icon: "SiExpress", level: 80, years: 2 },
    ],
  },
  {
    category: "Databases",
    description: "Reliable data models and tuned queries",
    accent: "emerald",
    items: [
      { name: "SQL Server", icon: "SiMicrosoftsqlserver", level: 90, years: 2, core: true },
      { name: "MongoDB", icon: "SiMongodb", level: 82, years: 2 },
      { name: "PostgreSQL", icon: "SiPostgresql", level: 76, years: 1 },
    ],
  },
  {
    category: "Tools & AI",
    description: "From local workflow to delivery",
    accent: "amber",
    items: [
      { name: "Git", icon: "SiGit", level: 90, years: 3, core: true },
      { name: "Docker", icon: "SiDocker", level: 80, years: 1 },
      { name: "GitHub Actions", icon: "SiGithubactions", level: 78, years: 1 },
      { name: "Postman", icon: "SiPostman", level: 92, years: 2, core: true },
      { name: "Visual Studio", icon: "SiVisualstudio", level: 90, years: 2 },
      { name: "GitHub Copilot", icon: "SiGithubcopilot", level: 85, years: 1 },
    ],
  },
]
