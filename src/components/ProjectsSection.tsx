import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Cameronpink Job Listing", category: "Job Platform", image: project4, url: "https://cameronpink.com" },
  { title: "DNB Music Academy", category: "Education", image: project2, url: "https://dnbacademy.net" },
  { title: "Mini Perfumesps Store", category: "E-Commerce", image: project3, url: "https://miniperfumesps.com" },
  { title: "EcoLiquidators", category: "Business", image: project1, url: "https://ecoliquidators.com" },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setCurrent(clamped);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -clamped * (trackRef.current.children[0] as HTMLElement).offsetWidth - clamped * 24,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="project-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Portfolio</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
              Recent <span className="text-gradient">projects</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={current === projects.length - 1}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="section-padding overflow-hidden">
        <div ref={trackRef} className="flex gap-6" style={{ willChange: "transform" }}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="project-card group flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] aspect-[4/3]"
            >
              <img src={p.image} alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs uppercase tracking-widest text-primary mb-2 font-body">{p.category}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-xl md:text-2xl font-bold font-display">{p.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="section-padding max-w-7xl mx-auto mt-8">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-12 bg-primary" : "w-6 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
