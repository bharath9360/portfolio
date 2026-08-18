import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CinematicHeroScene01 from "@/components/CinematicHeroScene01";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceEducationSection from "@/components/sections/ExperienceEducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AchievementsGrid from "@/components/sections/AchievementsGrid";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#04050a] text-[#f3f4f6] flex flex-col selection:bg-[#00f2fe]/30 selection:text-white relative">
      <Navbar />
      <main className="flex-grow">
        {/* Scene 01 – Cinematic 3D Hero (untouched) */}
        <CinematicHeroScene01 />

        {/* Hero → Sections bridge gradient */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "-2px",
            height: "120px",
            background: "linear-gradient(to bottom, #04050a 0%, #060810 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Expertise bento grid */}
        <ExpertiseSection />

        {/* Projects card carousel */}
        <ProjectsSection />

        {/* Experience + Education scatter timeline */}
        <ExperienceEducationSection />

        {/* Interactive Lego skills builder */}
        <SkillsSection />

        {/* Achievements grid (existing) */}
        <AchievementsGrid />

        {/* Contact (existing) */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
