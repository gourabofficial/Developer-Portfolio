import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const toggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full p-2 bg-orange-50 border border-orange-200 text-orange-600 dark:bg-[#2e1c0e] dark:border-[#3d2410] dark:text-orange-400 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
