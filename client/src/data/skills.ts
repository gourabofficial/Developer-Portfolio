export type SkillItem = { name: string; icon: string; level: number }
export type SkillCategory = { category: string; description: string; items: SkillItem[] }

export const skills: SkillCategory[] = [
  {
    category: "Backend",
    description: "Enterprise APIs and distributed services",
    items: [
      { name: "ASP.NET Core", icon: "SiDotnet", level: 92 }, { name: ".NET 8 / 9 / 10", icon: "SiDotnet", level: 90 },
      { name: "C#", icon: "SiCsharp", level: 92 }, { name: "Dapper", icon: "SiDotnet", level: 86 },
      { name: "EF Core", icon: "SiDotnet", level: 84 }, { name: "Redis", icon: "SiRedis", level: 78 },
      { name: "JWT", icon: "SiJsonwebtokens", level: 86 }, { name: "SignalR", icon: "SiDotnet", level: 76 },
    ],
  },
  {
    category: "Frontend",
    description: "Fast, accessible product interfaces",
    items: [
      { name: "React", icon: "SiReact", level: 88 }, { name: "Next.js", icon: "SiNextdotjs", level: 82 },
      { name: "TypeScript", icon: "SiTypescript", level: 86 }, { name: "Tailwind CSS", icon: "SiTailwindcss", level: 90 },
      { name: "Redux Toolkit", icon: "SiRedux", level: 82 },
    ],
  },
  {
    category: "Database",
    description: "Reliable data models and tuned queries",
    items: [
      { name: "SQL Server", icon: "SiMicrosoftsqlserver", level: 90 }, { name: "MongoDB", icon: "SiMongodb", level: 82 },
      { name: "PostgreSQL", icon: "SiPostgresql", level: 76 },
    ],
  },
  {
    category: "Tools & DevOps",
    description: "From local workflow to delivery",
    items: [
      { name: "Git", icon: "SiGit", level: 90 }, { name: "Docker", icon: "SiDocker", level: 80 },
      { name: "GitHub Actions", icon: "SiGithubactions", level: 78 }, { name: "Postman", icon: "SiPostman", level: 92 },
      { name: "Visual Studio", icon: "SiVisualstudio", level: 90 },
    ],
  },
]
