import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/services";
import { personal } from "@/data/personal";
import { AVAILABILITY_LABELS } from "@/constants";

export function ServicesGrid() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Services"
          title="What I Can Build for You"
          description="Available for freelance and contract work. Let's talk about your project."
        />

        {/* ─── Services Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* ─── Availability CTA Block ─── */}
        <div className="bg-card border border-border rounded-xl p-8 text-center max-w-2xl mx-auto mt-16 shadow-card">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span>{AVAILABILITY_LABELS[personal.availability]}</span>
          </div>
          <p className="text-base text-muted-foreground mb-6">
            Currently accepting new projects
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg px-5 py-2.5 text-sm font-body font-medium hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
