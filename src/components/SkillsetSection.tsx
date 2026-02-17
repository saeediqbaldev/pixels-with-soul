import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Figma, Blocks, Gauge, Search, Globe, Layers, PenTool, Settings, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "WordPress", icon: Globe, level: 98 },
  { name: "React JS", icon: Code2, level: 90 },
  { name: "Elementor", icon: Layers, level: 95 },
  { name: "Figma", icon: Figma, level: 88 },
  { name: "Webflow", icon: PenTool, level: 85 },
  { name: "Yoast", icon: Search, level: 92 },
  { name: "Speed Optimisation", icon: Gauge, level: 94 },
  { name: "Bricks", icon: Blocks, level: 90 },
  { name: "ACF", icon: Settings, level: 93 },
  { name: "WP Starter", icon: Shield, level: 88 },
];

const SkillsetSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-header",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".skill-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
        }
      );

      // Animate progress bars after cards appear
      gsap.fromTo(
        ".skill-bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 sm:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="skill-header text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Expertise</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display">
            Skills & <span className="text-gradient">tools</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-card glass-card p-5 sm:p-6 group hover-lift text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-bold font-display text-heading mb-3">{skill.name}</p>
                <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full bg-primary origin-left"
                    style={{ transform: `scaleX(${skill.level / 100})` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-body">{skill.level}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsetSection;
