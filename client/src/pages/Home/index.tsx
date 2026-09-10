import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { HomeFeaturedProjects } from "@/components/sections/HomeFeaturedProjects"
import { ServicesSection } from "@/components/sections/ServicesSection"
// import { PrinciplesSection } from "@/components/sections/PrinciplesSection"
// import { FocusSection } from "@/components/sections/FocusSection"
import { ContactSection } from "@/components/sections/ContactSection"


export const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <HomeFeaturedProjects limit={6} />
      <ServicesSection />
      {/* <PrinciplesSection /> */}
      {/* <FocusSection /> */}
      <ContactSection />
    </main>
  )
}

export default Home
