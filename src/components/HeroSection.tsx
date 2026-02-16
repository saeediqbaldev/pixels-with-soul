import { useEffect, useRef } from "react";
import gsap from "gsap";

import heroImage from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current?.children || [],
        { y: 120, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.15, duration: 1.2 }
      )
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(imageRef.current, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, "-=1")
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center section-padding pt-32 pb-20 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full max-w-7xl mx-auto">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 font-body">
            Web Developer & Designer
          </p>
          <div ref={titleRef} className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display leading-[0.95] mb-2">
              Hi! I'm
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display leading-[0.95] mb-2">
              <span className="text-gradient">Saeed</span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display leading-[0.95]">
              Iqbal<span className="text-primary">.</span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mt-8 max-w-lg leading-relaxed font-body"
          >
            Level up your brand with websites that stand out. Turning visitors into customers with 300+ projects delivered worldwide.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-8 py-4 rounded-full border border-border text-foreground font-display font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300"
            >
              See My Work
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end" ref={imageRef}>
          <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] md:w-96 md:h-[32rem] rounded-3xl overflow-hidden">
            <img src={heroImage} alt="Saeed Iqbal" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
