import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const PAGE_BG = "bg-[#fefaf4] dark:bg-[#1a1008]"
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
