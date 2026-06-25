import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { personal } from "@/data/personal";
import { AVAILABILITY_LABELS } from "@/constants";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* ─── Availability Badge ─── */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span>{AVAILABILITY_LABELS[personal.availability]}</span>
          </div>
        </div>

        {/* ─── Name ─── */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight animate-fade-in-up animate-delay-100">
          {personal.name}
        </h1>

        {/* ─── Title ─── */}
        <p className="text-xl text-muted-foreground font-body mt-2 animate-fade-in-up animate-delay-200">
          {personal.title}
        </p>

        {/* ─── Tagline ─── */}
        <p className="text-lg text-muted-foreground font-body mt-4 max-w-xl leading-relaxed animate-fade-in-up animate-delay-200">
          {personal.tagline}
        </p>

        {/* ─── CTA Row ─── */}
        <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up animate-delay-300">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg px-5 py-2.5 text-sm font-body font-medium hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent text-foreground border border-border rounded-lg px-5 py-2.5 text-sm font-body font-medium hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="flex justify-center mt-auto pb-8 animate-fade-in-up animate-delay-300">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
