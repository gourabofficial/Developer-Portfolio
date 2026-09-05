import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AIChatbot } from "@/components/AIChatbot"
import { ScrollToTop } from "@/components/ScrollToTop"

export const RootLayout = () => (
  <div className="site">
    <ScrollToTop />
    <Navbar/>
    <Outlet/>
    <Footer/>
    <AIChatbot />
  </div>
)
export default RootLayout
