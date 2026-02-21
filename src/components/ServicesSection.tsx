import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, ShoppingCart, Wrench, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Website Development",
    desc: "I design modern, brand-focused websites built to make an impact and deliver results. Every website is crafted for speed, user experience, and conversion — ensuring your brand looks professional while turning visitors into customers.",
    icon: Code,
  },
  {
    num: "02",
    title: "Business Solutions",
    desc: "I provide powerful eCommerce and business solutions that work. I build stores that sell products, capture leads, and provide smooth customer experiences, with secure payments and support systems designed to grow your revenue.",
    icon: ShoppingCart,
  },
  {
    num: "03",
    title: "Website Maintenance",
    desc: "Proactive website maintenance for speed, security, SEO, and eCommerce inventory management. Keeping your business online 24/7 and performing at its best.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "UI/UX Design",
    desc: "Designing modern, responsive interfaces using Figma and industry leading tools. Creating intuitive experiences with clean design systems and pixel perfect implementations.",
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
       Solutions that move brands<span className="text-gradient"> forward. </span>
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
