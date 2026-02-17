import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import SkillsetSection from "@/components/SkillsetSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none md:cursor-none">
      <CustomCursor />
      <Header />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <SkillsetSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <MarqueeStrip />
      <Footer />
    </div>
  );
};

export default Index;
