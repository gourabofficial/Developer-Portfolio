import { ArrowUp, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/Icons"
import { personal } from "@/data"

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      style={{
        position: "relative",
        borderTop: "1px solid rgba(105, 150, 220, 0.08)",
        background: "linear-gradient(180deg, rgba(8, 16, 30, 0.5), rgba(5, 10, 20, 0.8))",
      }}
    >
      {/* Glow border effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.3), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="section-shell" style={{ padding: "64px 0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <a
              href="#home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid rgba(105, 160, 240, 0.3)",
                  borderRadius: "11px",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "14px",
                  fontWeight: 800,
                  fontFamily: "ui-monospace, monospace",
                  background: "linear-gradient(145deg, rgba(48, 105, 200, 0.25), rgba(15, 30, 55, 0.4))",
                  boxShadow: "inset 0 0 20px rgba(80, 140, 255, 0.08)",
                }}
              >
                GG
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#e8f1ff",
                }}
              >
                Gourab Ganguly
              </span>
            </a>
            <p
              style={{
                margin: "0 0 20px 0",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#7a8fae",
                maxWidth: "320px",
              }}
            >
              Software Developer building enterprise systems with .NET, React, and SQL. Focused on clean
              architecture and reliable delivery.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                style={{
                  width: "38px",
                  height: "38px",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(105, 150, 220, 0.15)",
                  borderRadius: "10px",
                  background: "rgba(15, 30, 55, 0.5)",
                  color: "#8195b2",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
                  e.currentTarget.style.background = "rgba(30, 55, 100, 0.5)"
                  e.currentTarget.style.color = "#ffffff"
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(105, 150, 220, 0.15)"
                  e.currentTarget.style.background = "rgba(15, 30, 55, 0.5)"
                  e.currentTarget.style.color = "#8195b2"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <GithubIcon width={18} height={18} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: "38px",
                  height: "38px",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(105, 150, 220, 0.15)",
                  borderRadius: "10px",
                  background: "rgba(15, 30, 55, 0.5)",
                  color: "#8195b2",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(10, 102, 194, 0.5)"
                  e.currentTarget.style.background = "rgba(10, 102, 194, 0.15)"
                  e.currentTarget.style.color = "#0a66c2"
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(10, 102, 194, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(105, 150, 220, 0.15)"
                  e.currentTarget.style.background = "rgba(15, 30, 55, 0.5)"
                  e.currentTarget.style.color = "#8195b2"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <LinkedinIcon width={18} height={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                style={{
                  width: "38px",
                  height: "38px",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(105, 150, 220, 0.15)",
                  borderRadius: "10px",
                  background: "rgba(15, 30, 55, 0.5)",
                  color: "#8195b2",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 88, 12, 0.5)"
                  e.currentTarget.style.background = "rgba(234, 88, 12, 0.12)"
                  e.currentTarget.style.color = "#ea580c"
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(234, 88, 12, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(105, 150, 220, 0.15)"
                  e.currentTarget.style.background = "rgba(15, 30, 55, 0.5)"
                  e.currentTarget.style.color = "#8195b2"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3
              style={{
                margin: "0 0 18px 0",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#7a9bce",
              }}
            >
              Quick Links
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "14px",
                    color: "#93a6c0",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d8e7ff"
                    e.currentTarget.style.transform = "translateX(4px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#93a6c0"
                    e.currentTarget.style.transform = "translateX(0)"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <h3
              style={{
                margin: "0 0 18px 0",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#7a9bce",
              }}
            >
              Get in Touch
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={`mailto:${personal.email}`}
                style={{
                  fontSize: "13px",
                  color: "#93a6c0",
                  wordBreak: "break-all",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#64d9ff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#93a6c0"
                }}
              >
                {personal.email}
              </a>
              <p style={{ margin: 0, fontSize: "13px", color: "#6f849f" }}>{personal.location}</p>
            </div>

            {/* Back to top button */}
            <a
              href="#home"
              onClick={scrollToTop}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "24px",
                padding: "10px 16px",
                fontSize: "12px",
                fontWeight: 650,
                color: "#c8d8ed",
                border: "1px solid rgba(105, 150, 220, 0.2)",
                borderRadius: "10px",
                background: "rgba(15, 30, 55, 0.4)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.borderColor = "rgba(105, 160, 240, 0.35)"
                e.currentTarget.style.background = "rgba(30, 55, 100, 0.5)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "rgba(105, 150, 220, 0.2)"
                e.currentTarget.style.background = "rgba(15, 30, 55, 0.4)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <ArrowUp size={14} />
              Back to top
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "28px",
            borderTop: "1px solid rgba(105, 150, 220, 0.08)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontFamily: "ui-monospace, monospace",
              color: "#6a7f9a",
              letterSpacing: "0.02em",
            }}
          >
            © {currentYear} Gourab Ganguly · Built with React & Tailwind CSS
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "#5f7490",
            }}
          >
            Designed & developed with care
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
