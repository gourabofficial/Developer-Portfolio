export type Event = {
   id: string
   title: string
   type: string // "Hackathon" | "Workshop" | "Conference" | "Meetup"
   date: string
   location: string
   description: string
   outcome?: string
}

export const events: Event[] = [
   {
      id: "event-001",
      title: "Kolkata .NET Developer Meetup",
      type: "Meetup",
      date: "2026-02-08",
      location: "Kolkata, West Bengal, India",
      description:
         "Community meetup focused on modern C# practices, ASP.NET improvements, and migration strategies toward .NET 10.",
      outcome: "Shared ERP migration insights and connected with local backend engineers.",
   },
   {
      id: "event-002",
      title: "Durgapur Full Stack Workshop",
      type: "Workshop",
      date: "2025-10-12",
      location: "Durgapur, West Bengal, India",
      description:
         "Hands-on workshop covering React frontend patterns, Express API design, and MongoDB schema modeling for production apps.",
      outcome: "Built a working full-stack feature prototype in a collaborative team setting.",
   },
   {
      id: "event-003",
      title: "Bengal Hackathon 2025",
      type: "Hackathon",
      date: "2025-08-24",
      location: "Kolkata, West Bengal, India",
      description:
         "Regional hackathon where teams built rapid prototypes addressing real-world productivity and education use cases.",
      outcome: "Developed an MVP dashboard and presented the technical architecture to mentors.",
   },
]
