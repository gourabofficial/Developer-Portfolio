import { HeroSection } from "@/components/sections/home/HeroSection";
import { SkillsSection } from "@/components/sections/home/SkillsSection";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { CTASection } from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}
