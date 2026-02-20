import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Animate counter
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
      // Loading line
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=0.3"
      )
      // Hold
      .to({}, { duration: 0.3 })
      // Logo exit
      .to(logoRef.current, { scale: 1.1, opacity: 0, duration: 0.4, ease: "power2.in" });

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
    >
      <div ref={logoRef} className="text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold font-display text-heading tracking-tight">
          Saeed<span className="text-primary">.</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-3 font-body">
          Web Developer & Designer
        </p>
      </div>

      <div className="mt-10 w-48 sm:w-64">
        <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
          <div
            ref={lineRef}
            className="h-full bg-primary origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-body text-right mt-2 tabular-nums">
          {counter}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;
