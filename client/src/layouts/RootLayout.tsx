import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const RootLayout = () => <div className="site"><Navbar/><Outlet/><Footer/></div>
export default RootLayout
