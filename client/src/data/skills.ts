export type SkillItem = {
   name: string
   icon: string // Icon name from simple-icons (react-icons/si)
}

export type SkillCategory = {
   category: string
   items: SkillItem[]
}

export const skills: SkillCategory[] = [
   {
      category: "Frontend",
      items: [
         { name: "React", icon: "SiReact" },
         { name: "TypeScript", icon: "SiTypescript" },
         { name: "Tailwind CSS", icon: "SiTailwindcss" },
         { name: "HTML", icon: "SiHtml5" },
         { name: "CSS", icon: "SiCss3" },
      ],
   },
   {
      category: "Backend",
      items: [
         { name: "Node.js", icon: "SiNodedotjs" },
         { name: "Express", icon: "SiExpress" },
         { name: ".NET 10", icon: "SiDotnet" },
         { name: "ASP.NET", icon: "SiDotnet" },
         { name: "C#", icon: "SiCsharp" },
      ],
   },
   {
      category: "Database",
      items: [
         { name: "MongoDB", icon: "SiMongodb" },
         { name: "SQL Server", icon: "SiMicrosoftsqlserver" },
      ],
   },
   {
      category: "Tools",
      items: [
         { name: "Git", icon: "SiGit" },
         { name: "GitHub", icon: "SiGithub" },
         { name: "Postman", icon: "SiPostman" },
         { name: "VS Code", icon: "SiVisualstudiocode" },
         { name: "Visual Studio", icon: "SiVisualstudio" },
      ],
   },
]
