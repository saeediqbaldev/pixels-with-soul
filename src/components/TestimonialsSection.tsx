import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

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
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const next = ((index % testimonials.length) + testimonials.length) % testimonials.length;
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(cardRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      },
    });
  };

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

  const t = testimonials[current];

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="testimonial-header text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display">
            What clients <span className="text-gradient">say</span>
          </h2>
        </div>

        <div ref={cardRef} className="testimonial-card text-center max-w-3xl mx-auto">
          <Quote className="w-10 h-10 text-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-10 font-body">
            "{t.text}"
          </p>
          <div>
            <p className="text-lg font-bold font-display text-heading">{t.name}</p>
            <p className="text-sm text-muted-foreground font-body">
              {t.role} — {t.company}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goTo(current - 1)}
            className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-muted-foreground font-body">
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goTo(current + 1)}
            className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
