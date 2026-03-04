import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Mail, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<SVGCircleElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Tick circle draw animation
      tl.fromTo(
        ".tick-circle",
        { strokeDashoffset: 283 },
        { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }
      );

      // Checkmark draw
      tl.fromTo(
        ".tick-check",
        { strokeDashoffset: 50 },
        { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // Pulse the tick
      tl.to(".tick-wrapper", {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });

      // Burst particles
      tl.fromTo(
        ".burst-particle",
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Text elements stagger in
      tl.fromTo(
        ".ty-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        "-=0.5"
      );

      // Contact cards slide up
      tl.fromTo(
        ".contact-card",
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6 },
        "-=0.3"
      );

      // Back button
      tl.fromTo(
        ".back-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate burst particles positions
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const rad = (angle * Math.PI) / 180;
    const distance = 80 + Math.random() * 40;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      size: 4 + Math.random() * 6,
    };
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Header />

      <section className="min-h-screen flex items-center justify-center section-padding py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Tick Mark */}
          <div className="relative inline-block mb-10">
            {/* Burst particles */}
            {particles.map((p, i) => (
              <div
                key={i}
                className="burst-particle absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: `hsl(var(--primary))`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  marginLeft: -p.size / 2,
                  marginTop: -p.size / 2,
                }}
              />
            ))}

            <div className="tick-wrapper">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
              >
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                {/* Animated circle */}
                <circle
                  ref={tickRef}
                  className="tick-circle"
                  cx="60"
                  cy="60"
                  r="45"
                  fill="hsl(var(--primary) / 0.1)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  transform="rotate(-90 60 60)"
                />
                {/* Checkmark */}
                <path
                  ref={checkRef}
                  className="tick-check"
                  d="M 38 60 L 53 75 L 82 46"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="50"
                  strokeDashoffset="50"
                />
              </svg>
            </div>
          </div>

          {/* Headings */}
          <h1 className="ty-anim text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight mb-4">
            Thank You<span className="text-gradient">!</span>
          </h1>

          <h2 className="ty-anim text-lg sm:text-xl md:text-2xl font-display font-semibold text-foreground/80 mb-6">
            Your message has been received successfully
          </h2>

          <p className="ty-anim text-sm sm:text-base text-muted-foreground font-body leading-relaxed max-w-lg mx-auto mb-12">
            I appreciate you reaching out! I'll review your message and get back
            to you as soon as possible. In the meantime, feel free to connect
            with me through any of the channels below.
          </p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
            <a
              href="https://wa.me/923049297788"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass-card p-6 sm:p-8 flex flex-col items-center gap-4 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1 font-body">
                  WhatsApp
                </p>
                <p className="font-display font-bold text-foreground text-sm sm:text-base">
                  +92 304 929 7788
                </p>
              </div>
            </a>

            <a
              href="mailto:contact@saeediqbal.net"
              className="contact-card glass-card p-6 sm:p-8 flex flex-col items-center gap-4 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1 font-body">
                  Email
                </p>
                <p className="font-display font-bold text-foreground text-sm sm:text-base">
                  Contact@saeediqbal.net
                </p>
              </div>
            </a>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="back-btn inline-flex items-center gap-3 py-4 px-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYou;
