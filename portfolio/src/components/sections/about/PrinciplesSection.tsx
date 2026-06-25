import { SectionHeading } from "@/components/common/SectionHeading";

const principles = [
  {
    title: "Clean Architecture",
    description:
      "Code should be easy to understand, maintain, and extend.",
  },
  {
    title: "Product Thinking",
    description:
      "Technology exists to solve problems, not showcase complexity.",
  },
  {
    title: "Ownership",
    description: "Taking responsibility from design to deployment.",
  },
  {
    title: "Continuous Learning",
    description: "Always improving through building and experimenting.",
  },
  {
    title: "Reliability",
    description: "Software should inspire confidence and trust.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Philosophy" title="Engineering Principles" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:border-accent/30 transition-colors duration-200"
            >
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
