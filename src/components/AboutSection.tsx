import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "304", label: "Projects Done" },
  { number: "240+", label: "Happy Clients" },
  { number: "107+", label: "Five Star Reviews" },
  { number: "01", label: "Award Won" },
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
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
              I build websites that turn visitors into{" "}
              <span className="text-gradient">customers</span>
            </h2>
          </div>

          <div>
            <p className="about-text text-lg text-muted-foreground leading-relaxed mb-6 font-body">
              I'm Saeed Iqbal — a proficient website developer specializing in creating dynamic online
              experiences that seamlessly convert visitors into valued customers.
            </p>
            <p className="about-text text-lg text-muted-foreground leading-relaxed font-body">
              With a proven track record of over 300 satisfied clients worldwide, my expertise lies in
              WordPress, React JS, Shopify, HTML, CSS, and Tailwind. I excel in creating websites that
              drive sales and elevate brands.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item glass-card p-8 text-center"
            >
              <div className="stat-number">{stat.number}</div>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-body">
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
