import { useEffect } from "react"

const BASE_TITLE = "Gourab Ganguly — Software Developer"
const SITE_URL = "https://gganguly.in"

interface SEOOptions {
  title?: string
  description?: string
  canonical?: string
  /** Override the og:image. Defaults to the global OG image. */
  image?: string
}

/**
 * Updates document <title>, meta description, canonical, and key
 * Open Graph / Twitter Card tags on every route change.
 *
 * Call once per page component.
 */
export function useSEO({
  title,
  description,
  canonical,
  image = `${SITE_URL}/og-image.svg`,
}: SEOOptions = {}) {
  const fullTitle = title ? `${title} | Gourab Ganguly` : BASE_TITLE
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  useEffect(() => {
    // ── <title> ───────────────────────────────────────────────────────────
    document.title = fullTitle

    // ── Helper to upsert a <meta> tag ─────────────────────────────────────
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      )
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement("link")
        el.setAttribute("rel", rel)
        document.head.appendChild(el)
      }
      el.setAttribute("href", href)
    }

    // ── Standard meta ─────────────────────────────────────────────────────
    if (description) setMeta("name", "description", description)

    // ── Canonical ─────────────────────────────────────────────────────────
    setLink("canonical", fullCanonical)

    // ── Open Graph ────────────────────────────────────────────────────────
    setMeta("property", "og:title", fullTitle)
    setMeta("property", "og:url", fullCanonical)
    setMeta("property", "og:image", image)
    if (description) setMeta("property", "og:description", description)

    // ── Twitter Card ──────────────────────────────────────────────────────
    setMeta("name", "twitter:title", fullTitle)
    setMeta("name", "twitter:image", image)
    if (description) setMeta("name", "twitter:description", description)
  }, [fullTitle, description, fullCanonical, image])
}
