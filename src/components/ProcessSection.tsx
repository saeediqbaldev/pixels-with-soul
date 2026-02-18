import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneCall, Search, PenTool, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery Call", desc: "Understanding your vision, goals, and requirements through a detailed consultation.", icon: PhoneCall },
  { num: "02", title: "Research & Plan", desc: "Market research, competitor analysis, and strategic planning for your project.", icon: Search },
  { num: "03", title: "Wireframe & Solution", desc: "Crafting wireframes and design solutions tailored to your brand identity.", icon: PenTool },
  { num: "04", title: "Dev to Deployment", desc: "Building, testing, and launching your project with ongoing support.", icon: Rocket },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );

      gsap.fromTo(
        ".timeline-step",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".timeline-container", start: "top 80%" },
        }
      );

      // Animate the vertical line drawing
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".timeline-container", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="process-header mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">How I Work</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
            My <span className="text-gradient">process</span>
          </h2>
        </div>

        {/* Timeline - waterfall */}
        <div className="timeline-container relative">
          {/* Vertical line - centered on mobile, offset on desktop */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 md:-translate-x-px w-0.5 bg-border">
            <div className="timeline-line-fill absolute inset-0 bg-primary origin-top" />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.num}
                  className={`timeline-step relative flex items-start md:items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-1 md:mt-0" />

                  {/* Spacer for mobile left margin */}
                  <div className="w-12 sm:w-16 md:hidden flex-shrink-0" />

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)] glass-card p-6 sm:p-8 group hover-lift relative overflow-hidden ${
                      isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    {/* Large background number */}
                    <div className="absolute top-3 right-4 text-5xl sm:text-6xl font-extrabold font-display text-border opacity-20 group-hover:text-primary group-hover:opacity-15 transition-all duration-500 leading-none">
                      {step.num}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-400">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* Invisible spacer for the other half on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
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
