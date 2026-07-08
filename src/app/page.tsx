import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { TechMatrix } from "@/components/sections/TechMatrix"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { StatsDashboard } from "@/components/sections/StatsDashboard"
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline"
import { ContactSection } from "@/components/sections/ContactSection"
import { CLITerminal } from "@/components/terminal/CLITerminal"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <TechMatrix />
        <ProjectsSection />
        <StatsDashboard />
        <ExperienceTimeline />
        <ContactSection />
      </main>
      <Footer />
      <CLITerminal />
    </>
  );
}
