import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Design and build REST APIs, authentication systems, caching layers, and database architectures using .NET or Node.js. Focused on performance, security, and maintainability.",
    tags: ["ASP.NET Core", "Node.js", "REST API", "SQL Server", "Redis"],
  },
  {
    id: "fullstack",
    title: "Full Stack Web Apps",
    description:
      "End-to-end web application development from database design to React frontend. Delivered as a complete, deployable product.",
    tags: ["React", "TypeScript", "ASP.NET Core", "Tailwind CSS"],
  },
  {
    id: "erp-systems",
    title: "Enterprise & ERP Systems",
    description:
      "Custom enterprise software — ERP modules, management systems, and business automation tools built with clean architecture and long-term maintainability in mind.",
    tags: ["Clean Architecture", "Business Logic", ".NET", "SQL Server"],
  },
  {
    id: "api-design",
    title: "API Design & Integration",
    description:
      "RESTful API design, third-party API integration, and documentation. Well-structured contracts your frontend team will thank you for.",
    tags: ["REST", "API Design", "Postman", "Swagger"],
  },
];
