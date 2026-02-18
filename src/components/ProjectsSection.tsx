import { useEffect, useRef, useState, useCallback } from "react";
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
  { title: "Cameronpink Redesign", category: "Job Platform", image: project4, url: "https://cameronpink.com" },
  { title: "DNB Academy Pro", category: "Education", image: project2, url: "https://dnbacademy.net" },
  { title: "Mini Perfumes Global", category: "E-Commerce", image: project3, url: "https://miniperfumesps.com" },
  { title: "EcoLiquidators Plus", category: "Business", image: project1, url: "https://ecoliquidators.com" },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    const clamped = ((index % projects.length) + projects.length) % projects.length;
    setCurrent(clamped);
    if (trackRef.current) {
      const card = trackRef.current.children[0] as HTMLElement;
      if (!card) return;
      const gap = 24;
      gsap.to(trackRef.current, {
        x: -clamped * (card.offsetWidth + gap),
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, []);

  // Auto-slide
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % projects.length;
        goTo(next);
        return next;
      });
    }, 4000);
  }, [goTo]);

  const pauseAuto = () => { if (autoRef.current) clearInterval(autoRef.current); };

  useEffect(() => {
    startAuto();
    return () => pauseAuto();
  }, [startAuto]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Touch/drag
  const startX = useRef(0);
  const isDragging = useRef(false);
  const handleTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; pauseAuto(); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAuto();
  };
  const handleMouseDown = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.clientX; pauseAuto(); };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAuto();
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 sm:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="project-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
              Recent <span className="text-gradient">projects</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { pauseAuto(); goTo(current - 1); startAuto(); }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { pauseAuto(); goTo(current + 1); startAuto(); }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="section-padding overflow-hidden select-none"
        onMouseEnter={pauseAuto}
        onMouseLeave={startAuto}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div ref={trackRef} className="flex gap-6" style={{ willChange: "transform" }}>
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group flex-shrink-0 w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] aspect-[4/3] border-2 transition-all duration-500 ${
                i === current ? "border-primary shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]" : "border-transparent hover:border-primary/50"
              }`}
            >
              <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
              {/* Default gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-primary mb-2 font-body">{p.category}</p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold font-display text-heading leading-snug">{p.title}</h3>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Centered pagination */}
      <div className="section-padding max-w-7xl mx-auto mt-8 flex justify-center">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { pauseAuto(); goTo(i); startAuto(); }}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-primary" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
