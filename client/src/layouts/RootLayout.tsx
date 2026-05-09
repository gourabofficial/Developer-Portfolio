import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const PAGE_BG = "bg-[#0f172a]"
const TEXT_PRI = "text-[#1c0a00] dark:text-[#fef3e2]"

export const RootLayout = () => {
  return (
    <div className={`min-h-screen ${PAGE_BG} ${TEXT_PRI}`}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
