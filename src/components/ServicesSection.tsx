import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, ShoppingCart, Wrench, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Website Development",
    desc: "Cultivate your digital footprint with premium website development services tailored to your objectives. From intricate e-commerce platforms to immersive portals, ensuring unparalleled performance.",
    icon: Code,
  },
  {
    num: "02",
    title: "E-Commerce Stores",
    desc: "Transform your online presence with a keen focus on user experience and functionality. I create tailor-made solutions to showcase your products effectively and boost sales.",
    icon: ShoppingCart,
  },
  {
    num: "03",
    title: "Website Maintenance",
    desc: "From robust security enhancements to swift bug fixes, I ensure your website operates at peak performance with proactive backups and lightning-fast speed optimizations.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "UI/UX Design",
    desc: "Designing modern, responsive interfaces using Figma and industry-leading tools. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
    icon: Palette,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">What I Do</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight mb-16">
          Services for your <span className="text-gradient">business</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="service-item service-card group">
                <div className="flex items-start justify-between mb-6">
                  <span className="service-number group-hover:text-primary transition-colors duration-500">
                    {s.num}
                  </span>
                  <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-body">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
