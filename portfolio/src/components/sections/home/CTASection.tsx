import Link from "next/link";
import { personal } from "@/data/personal";

export function CTASection() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Let&apos;s build something together.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          {personal.shortBio}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg px-5 py-2.5 text-sm font-body font-medium hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Start a conversation
        </Link>
      </div>
    </section>
  );
}
