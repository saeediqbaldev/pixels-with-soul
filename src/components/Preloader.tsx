import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const letters = lettersRef.current;

    const waveTl = gsap.timeline({ repeat: -1, yoyo: true });
    waveTl.fromTo(
      letters,
      { y: 0 },
      { y: -18, stagger: { each: 0.08, from: "start" }, duration: 0.6, ease: "sine.inOut" }
    );

    const exitTl = gsap.timeline({ delay: 2.5, onComplete });
    exitTl
      .to(letters, { scale: 1.1, duration: 0.3, ease: "power2.in" })
      .to(containerRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });

    return () => { waveTl.kill(); exitTl.kill(); };
  }, [onComplete]);

  const logoText = "Saeed";
  const setLetterRef = (el: HTMLSpanElement | null, i: number) => {
    if (el) lettersRef.current[i] = el;
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex items-center justify-center bg-background">
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold font-display text-heading tracking-tight select-none">
        {logoText.split("").map((char, i) => (
          <span key={i} ref={(el) => setLetterRef(el, i)} className="inline-block">{char}</span>
        ))}
        <span className="text-primary inline-block">.</span>
      </h1>
    </div>
  );
};

export default Preloader;
