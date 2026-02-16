import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ekene C.",
    role: "CEO",
    company: "ecoliquidators.com",
    text: "Saeed is super awesome! Completed a week project in days, did site security and extra plug-ins without extra! I not only look forward to working with him again, I highly recommend him to anyone in need of a website.",
  },
  {
    name: "Kiyus",
    role: "Owner",
    company: "helpyfx.com",
    text: "Saeed is truly professional and very attentive to every detail we give to him. He's also very fast to do the tasks and his communication is really great. We recommend him to every person who wants to work with a true web-developer.",
  },
  {
    name: "Louis",
    role: "CEO",
    company: "koch-bagger.de",
    text: "Wonderful job done by Saeed Iqbal. He is very fast, accurate, friendly and perfect result. I would recommend you to hire him for any website work. Thank you!",
  },
  {
    name: "Hangry Vendors",
    role: "Owner",
    company: "hangryvendors.com",
    text: "Saeed did a fantastic job. He delivered a great product. I would certainly use him again. Recommended ✅",
  },
  {
    name: "Andre",
    role: "CEO",
    company: "dnbacademy.net",
    text: "Saeed worked very fast and he did exactly what I needed. When I asked for modification he was quick to help and did exactly as I asked, good experience working and I will be back for more!",
  },
  {
    name: "Carly Digital",
    role: "Web Manager",
    company: "cameronpink.com",
    text: "Great experience working with Saeed and very good website design. Will also quickly adjust anything you ask for and English fluency is good too. Thanks again Saeed!",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-header",
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setupCarousel = () => {
      const totalWidth = track.scrollWidth / 2;
      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    };

    const timer = setTimeout(setupCarousel, 200);
    return () => {
      clearTimeout(timer);
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  const renderCards = () =>
    testimonials.map((t, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] glass-card p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <Quote className="w-8 h-8 text-primary mb-4" />
          <p className="text-sm sm:text-base text-foreground leading-relaxed font-body">
            "{t.text}"
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-base font-bold font-display text-heading">{t.name}</p>
          <p className="text-xs text-muted-foreground font-body">
            {t.role} — {t.company}
          </p>
        </div>
      </div>
    ));

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="testimonial-header text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display">
            What clients <span className="text-gradient">say</span>
          </h2>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {renderCards()}
          {renderCards()}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
