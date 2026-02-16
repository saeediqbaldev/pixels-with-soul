import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Big name */}
        <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-extrabold font-display leading-none text-heading mb-16 tracking-tighter">
          SAEED<span className="text-primary">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Links</p>
            <div className="flex flex-col gap-2">
              {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase() === "home" ? "" : l.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-body flex items-center gap-1 group"
                >
                  {l}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Socials</p>
            <div className="flex flex-col gap-2">
              {[
                { l: "LinkedIn", h: "https://www.linkedin.com/in/saeediqbal/" },
                { l: "WhatsApp", h: "https://wa.me/923049297788" },
                { l: "Fiverr", h: "#" },
                { l: "Upwork", h: "#" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors duration-300 font-body flex items-center gap-1 group"
                >
                  {s.l}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Contact</p>
            <a
              href="mailto:freelancersaeedofficial@gmail.com"
              className="text-foreground hover:text-primary transition-colors duration-300 font-body block mb-2"
            >
              freelancersaeedofficial@gmail.com
            </a>
            <a
              href="tel:+923049297788"
              className="text-foreground hover:text-primary transition-colors duration-300 font-body block"
            >
              +92 304 929 7788
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-body">
            2025 © Saeed Iqbal — All rights reserved
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Swabi City, KPK — Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
