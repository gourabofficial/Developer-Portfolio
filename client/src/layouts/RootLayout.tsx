import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AIChatbot } from "@/components/AIChatbot"

export const RootLayout = () => (
  <div className="site">
    <Navbar/>
    <Outlet/>
    <Footer/>
    <AIChatbot />
  </div>
)
export default RootLayout
