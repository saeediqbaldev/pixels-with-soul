import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import OffCanvasMenu from "./OffCanvasMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 section-padding ${
          scrolled ? "py-4 bg-surface/80 backdrop-blur-lg border-b border-border" : "py-6"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-extrabold text-heading tracking-tight">
            S<span className="text-primary">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["About", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform duration-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <OffCanvasMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
