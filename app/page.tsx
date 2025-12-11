import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeSection } from "@/components/resume-section";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ResumeSection />
    </main>
  );
}
