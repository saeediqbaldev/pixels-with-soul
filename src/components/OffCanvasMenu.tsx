import { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface OffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saeediqbal/" },
  { label: "WhatsApp", href: "https://wa.me/923049297788" },
  { label: "Email", href: "mailto:freelancersaeedofficial@gmail.com" },
  { label: "Fiverr", href: "#" },
  { label: "Upwork", href: "#" },
];

const OffCanvasMenu = ({ isOpen, onClose }: OffCanvasMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className={`off-canvas-overlay ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ opacity: 0 }}
        onClick={onClose}
      />
      <div
        ref={menuRef}
        className="off-canvas-menu flex flex-col justify-between p-10 md:p-14"
        style={{ transform: "translateX(100%)" }}
      >
        <div>
          <div className="flex justify-between items-center mb-16">
            <span className="font-display text-lg font-bold text-heading">Navigation</span>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => { if (el) linksRef.current[i] = el; }}
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between py-4 border-b border-border text-3xl md:text-4xl font-display font-bold text-heading hover:text-primary transition-colors duration-300"
              >
                {link.label}
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Socials</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvasMenu;
