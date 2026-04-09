export type SkillCategory = {
   category: string
   items: string[]
}

export const skills: SkillCategory[] = [
   {
      category: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
   },
   {
      category: "Backend",
      items: ["Node.js", "Express", ".NET 10", "ASP.NET", "C#"],
   },
   {
      category: "Database",
      items: ["MongoDB", "SQL Server"],
   },
   {
      category: "Tools",
      items: ["Git", "GitHub", "Postman", "VS Code", "Visual Studio"],
   },
]
