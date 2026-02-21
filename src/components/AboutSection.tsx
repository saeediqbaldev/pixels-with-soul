import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "387+", label: "Projects Done" },
  { number: "350+", label: "Happy Clients" },
  { number: "190", label: "Five Star Reviews" },
  { number: "6", label: "Years Experience" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".stats-grid", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="about-text text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">About Me</p>
            <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
              I create digital experiences that drive real{" "}
              <span className="text-gradient">results</span>
            </h2>
          </div>

          <div>
            <p className="about-text text-lg text-muted-foreground leading-relaxed mb-6 font-body">
              I help businesses turn websites into powerful sales machines. With expertise in WordPress development, branding strategy, and conversion-focused design.
              I’ve partnered with 370+ businesses worldwide to build digital experiences that don’t just look great — they perform.
            </p>
            <p className="about-text text-lg text-muted-foreground leading-relaxed font-body">
             
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item glass-card p-6 sm:p-8 text-center hover-lift"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-primary leading-none">
                {stat.number}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 uppercase tracking-widest font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
