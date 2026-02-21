import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTransitioning = useRef(false);

  // We render: [clone-last, ...originals, clone-first]
  // Index 0 in "current" maps to trackIndex 1
  const totalSlides = projects.length;
  const extendedProjects = [projects[totalSlides - 1], ...projects, projects[0]];

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const card = trackRef.current.children[0] as HTMLElement;
    if (!card) return 0;
    return card.offsetWidth + 24; // gap
  }, []);

  const jumpTo = useCallback((trackIndex: number) => {
    if (!trackRef.current) return;
    const w = getCardWidth();
    gsap.set(trackRef.current, { x: -trackIndex * w });
  }, [getCardWidth]);

  const animateTo = useCallback((trackIndex: number, onComplete?: () => void) => {
    if (!trackRef.current) return;
    const w = getCardWidth();
    isTransitioning.current = true;
    gsap.to(trackRef.current, {
      x: -trackIndex * w,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        isTransitioning.current = false;
        onComplete?.();
      },
    });
  }, [getCardWidth]);

  const goTo = useCallback((index: number) => {
    if (isTransitioning.current) return;
    const trackIndex = index + 1; // offset for prepended clone

    if (index >= totalSlides) {
      // Going past last → animate to clone-first, then jump to real first
      animateTo(totalSlides + 1, () => {
        jumpTo(1);
        setCurrent(0);
      });
      return;
    }
    if (index < 0) {
      // Going before first → animate to clone-last, then jump to real last
      animateTo(0, () => {
        jumpTo(totalSlides);
        setCurrent(totalSlides - 1);
      });
      return;
    }

    setCurrent(index);
    animateTo(trackIndex);
  }, [totalSlides, animateTo, jumpTo]);

  // Initialize position
  useEffect(() => {
    jumpTo(1); // start at first real slide
  }, [jumpTo]);

  // Recalc on resize
  useEffect(() => {
    const handleResize = () => jumpTo(current + 1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [current, jumpTo]);

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((prev) => {
        goTo(prev + 1);
        return prev; // goTo handles setCurrent
      });
    }, 5000);
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
  const handleMouseDown = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.clientX; pauseAuto(); e.preventDefault(); };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAuto();
  };
  const handleMouseLeaveTrack = () => {
    if (isDragging.current) isDragging.current = false;
    startAuto();
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 sm:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="project-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Case Studies </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
              Brands I’ve helped thrive<span className="text-gradient"> online </span>
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

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="section-padding overflow-hidden select-none"
          onMouseEnter={pauseAuto}
          onMouseLeave={handleMouseLeaveTrack}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div ref={trackRef} className="flex gap-6" style={{ willChange: "transform" }}>
            {extendedProjects.map((p, i) => {
              // Map extended index to real index for active state
              const realIndex = i === 0 ? totalSlides - 1 : i === extendedProjects.length - 1 ? 0 : i - 1;
              const isActive = realIndex === current;

              return (
                <Link
                  key={`${p.id}-${i}`}
                  to={`/project/${p.id}`}
                  className={`project-card group flex-shrink-0 w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] aspect-[4/3] border-2 transition-all duration-500 ${
                    isActive ? "border-primary shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]" : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={(e) => { if (isDragging.current) e.preventDefault(); }}
                >
                  <img src={p.image} alt={p.title} loading="lazy" draggable={false} />
                  {/* Default gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2 font-body">{p.category}</p>
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold font-display text-heading leading-snug mb-0 group-hover:mb-2 transition-all duration-300">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500">
                      {p.info}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
