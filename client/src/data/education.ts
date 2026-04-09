export type Education = {
   id: string
   degree: string
   institution: string
   location: string
   startYear: number
   endYear: number | "Present"
   description: string
   skills?: string[]
}

export const education: Education[] = [
   {
      id: "edu-001",
      degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
      institution: "Sanaka Educational Trust's Group of Institutions",
      location: "Durgapur, West Bengal, India",
      startYear: 2022,
      endYear: "Present",
      description:
         "Focused on software engineering fundamentals, web development, and system design while working on practical full-stack and enterprise application projects.",
      skills: ["Data Structures", "Algorithms", "Web Development"],
   },
   {
      id: "edu-002",
      degree: "Higher Secondary (Science)",
      institution: "West Bengal Council of Higher Secondary Education",
      location: "West Bengal, India",
      startYear: 2020,
      endYear: 2022,
      description:
         "Completed higher secondary education with a science stream foundation, building core analytical and mathematical skills for engineering studies.",
      skills: ["Mathematics", "Computer Fundamentals"],
   },
]
