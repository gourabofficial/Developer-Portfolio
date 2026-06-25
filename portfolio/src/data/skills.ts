import type { Skill } from "@/types";

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["C#", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    category: "Backend",
    items: [
      "ASP.NET Core",
      "Node.js",
      "Express.js",
      "REST API Design",
      "Redis",
      "Dapper",
      "Clean Architecture",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    category: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools & Practices",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Visual Studio",
      "VS Code",
      "Docker (basics)",
      "CI/CD basics",
    ],
  },
];
