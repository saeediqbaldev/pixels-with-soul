import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <div>
            <p className="contact-anim text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Get In Touch</p>
            <h2 className="contact-anim text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight mb-8">
              Let's work <span className="text-gradient">together</span>
            </h2>
            <p className="contact-anim text-lg text-muted-foreground mb-12 font-body leading-relaxed">
              Ready to elevate your online presence? Let's achieve remarkable results for your business.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+923049297788"
                className="contact-anim flex items-center gap-4 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-body">+92 304 929 7788</span>
              </a>
              <a
                href="mailto:freelancersaeedofficial@gmail.com"
                className="contact-anim flex items-center gap-4 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-body">freelancersaeedofficial@gmail.com</span>
              </a>
              <div className="contact-anim flex items-center gap-4 text-foreground">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-body">Swabi City, KPK — Pakistan</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="contact-anim glass-card p-8 md:p-10 space-y-6"
          >
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-body">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-body">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-body">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors duration-300"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-body">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-3"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
