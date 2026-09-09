import { useEffect, useState } from 'react'

/**
 * Hook to respect user's motion preferences.
 * Reads synchronously on first render to avoid a flicker/re-render
 * for users who have prefers-reduced-motion enabled.
 */
export const useReducedMotion = () => {
  // Initialise synchronously so the first render already has the correct value.
  // window.matchMedia is always available in a browser context; during SSR it
  // would fall back to `false` (safe default).
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export default useReducedMotion
