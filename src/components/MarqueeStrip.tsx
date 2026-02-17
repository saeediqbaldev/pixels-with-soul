import { useEffect, useRef } from "react";
import gsap from "gsap";

const MarqueeStrip = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [
    "WordPress Expert",
    "React JS Developer",
    "E-Commerce Specialist",
    "UI/UX Designer",
    "Figma Pro",
    "Shopify Developer",
    "Website Maintenance",
    "SEO Optimization",
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for layout
    const setupMarquee = () => {
      const totalWidth = track.scrollWidth / 2;
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -totalWidth,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupMarquee, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-8 flex-shrink-0">
        <span className="text-2xl md:text-3xl font-display font-bold text-heading uppercase tracking-wider whitespace-nowrap">
          {item}
        </span>
        <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
      </span>
    ));

  return (
    <div className="py-8 border-y border-border overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-8 will-change-transform">
        {renderItems()}
        {renderItems()}
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
};

export default MarqueeStrip;
