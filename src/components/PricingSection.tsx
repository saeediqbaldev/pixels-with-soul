import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "$499",
    desc: "Perfect for small businesses starting their online journey.",
    features: [
      "5 Page Responsive Website",
      "Mobile-First Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Free Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$999",
    desc: "Full-featured solution for growing businesses.",
    features: [
      "10+ Page Custom Website",
      "Advanced UI/UX Design",
      "Full SEO Optimization",
      "E-Commerce Integration",
      "Speed Optimization",
      "3 Months Free Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$1,999",
    desc: "Complete digital solution for established brands.",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "Advanced E-Commerce",
      "API Integrations",
      "Security Hardening",
      "Performance Audit",
      "6 Months Free Support",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-header",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".pricing-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".pricing-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 sm:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="pricing-header text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight">
            Investment <span className="text-gradient">plans</span>
          </h2>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card glass-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover-lift ${
                plan.popular ? "border-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold font-display uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold font-display mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground font-body">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold font-display text-heading">{plan.price}</span>
                <span className="text-sm text-muted-foreground font-body ml-2">/ project</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-body text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full py-4 rounded-full font-display font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Bottom highlight */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
