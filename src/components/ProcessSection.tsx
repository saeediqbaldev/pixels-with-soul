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
        ".process-step",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".process-grid", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="process-header mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">How I Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
            My <span className="text-gradient">process</span>
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="process-step group glass-card p-6 sm:p-8 relative overflow-hidden hover-lift cursor-pointer"
              >
                <div className="absolute top-4 right-4 text-6xl font-extrabold font-display text-border opacity-30 group-hover:text-primary group-hover:opacity-20 transition-all duration-500 leading-none">
                  {step.num}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>

                {/* Bottom highlight line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
