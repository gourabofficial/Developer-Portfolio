"use client";

import { useState } from "react";
import { CheckCircle, Mail, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { personal } from "@/data/personal";
import { social } from "@/data/social";
import { AVAILABILITY_LABELS } from "@/constants";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconMap = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Mail,
  Twitter: Mail,
} as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-6 py-20 md:px-12 lg:px-24 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Contact"
          title="Let's Talk"
          description="Available for freelance projects, full-time roles, and collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── Left Column: Info ─── */}
          <div>
            {/* Email */}
            <div className="mb-6">
              <h3 className="text-sm font-body font-medium text-foreground mb-2">
                Email
              </h3>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {personal.email}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social */}
            <div className="mb-6">
              <h3 className="text-sm font-body font-medium text-foreground mb-3">
                Social
              </h3>
              <ul className="flex flex-col gap-2.5">
                {social.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              <span>{AVAILABILITY_LABELS[personal.availability]}</span>
            </div>
          </div>

          {/* ─── Right Column: Form ─── */}
          <div>
            {submitted ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center shadow-card">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Message sent
                </h3>
                <p className="text-sm text-muted-foreground">
                  I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Project inquiry"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg px-6 py-2.5 text-sm font-body font-medium hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
