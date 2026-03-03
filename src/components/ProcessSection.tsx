import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Video, Search, PenTool, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery Call", desc: "Understanding your vision, goals, and requirements through a detailed video consultation on Zoom or Google Meet.", icon: Video },
  { num: "02", title: "Research & Plan", desc: "Market research, competitor analysis, and strategic planning for your project.", icon: Search },
  { num: "03", title: "Wireframe & Solution", desc: "Crafting wireframes and design solutions tailored to your brand identity.", icon: PenTool },
  { num: "04", title: "Dev to Deployment", desc: "Building, testing, and launching your project with ongoing support.", icon: Rocket },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );

      // Scroll-driven line fill
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 80%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      // Stagger cards with scroll scrub
      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 80, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate the dot
        const dot = step.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="process-header mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">How I Work</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
            My <span className="text-gradient">process</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-translate-x-px w-0.5 bg-border">
            <div ref={lineRef} className="absolute inset-0 bg-primary origin-top" />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.num}
                  className={`timeline-step relative flex items-start md:items-center gap-[0.5rem] md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="timeline-dot absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 mt-2 md:mt-0 shadow-[0_0_20px_hsl(var(--primary)/0.4)]" />

                  {/* Spacer for mobile left margin */}
                  <div className="w-14 md:hidden flex-shrink-0" />

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-4rem)] glass-card p-[0.5rem] sm:p-10 group hover-lift relative overflow-hidden ${
                      isLeft ? "md:mr-auto md:pr-14" : "md:ml-auto md:pl-14"
                    }`}
                  >
                    {/* Large background number */}
                    <div className="absolute top-4 right-5 text-6xl sm:text-7xl font-extrabold font-display text-border/20 group-hover:text-primary/10 transition-all duration-500 leading-none select-none">
                      {step.num}
                    </div>

                    <div className="flex items-start gap-5 relative z-[1]">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-400">
                        <Icon className="w-5 h-5 sm:w-5 sm:h-7" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-1 block">Step {step.num}</span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display mb-3">{step.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* Invisible spacer for the other half on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-4rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
