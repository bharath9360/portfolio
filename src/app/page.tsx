import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AICapabilities from "@/components/sections/AICapabilities";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import AchievementsGrid from "@/components/sections/AchievementsGrid";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#04050a] text-[#f3f4f6] flex flex-col selection:bg-[#00f2fe]/30 selection:text-white relative">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProjects />
        <AICapabilities />
        <SkillsMatrix />
        <ExperienceTimeline />
        <AchievementsGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
