import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const getElementBg = (el: Element): string => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      // Check for green-ish (primary) background
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        // Green/primary button
        if (g > 150 && g > r && g > b) return "green";
        // White/light
        if (r > 200 && g > 200 && b > 200) return "white";
        // Dark/black
        if (r < 50 && g < 50 && b < 50) return "dark";
      }
      // Check classes for common patterns
      if (el.classList.contains("bg-primary") || el.closest(".bg-primary")) return "green";
      // Check for border-only (outlined) buttons
      const parent = el.closest("a, button");
      if (parent) {
        const pStyle = window.getComputedStyle(parent);
        const pBg = pStyle.backgroundColor;
        const pMatch = pBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (pMatch) {
          const [, r, g, b] = pMatch.map(Number);
          if (g > 150 && g > r && g > b) return "green";
          if (r > 200 && g > 200 && b > 200) return "white";
        }
      }
      return "dark";
    };

    const grow = (e: Event) => {
      const target = e.currentTarget as Element;
      const bgType = getElementBg(target);

      let dotColor: string;
      let ringColor: string;

      if (bgType === "green") {
        dotColor = "hsl(0 0% 5%)";
        ringColor = "hsl(0 0% 5%)";
      } else if (bgType === "white") {
        dotColor = "hsl(0 0% 5%)";
        ringColor = "hsl(var(--primary))";
      } else {
        dotColor = "hsl(var(--primary))";
        ringColor = "hsl(var(--primary))";
      }

      cursor.style.background = dotColor;
      follower.style.borderColor = ringColor;
      gsap.to(follower, { scale: 2.5, opacity: 0.4, duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const shrink = () => {
      cursor.style.background = "hsl(var(--primary))";
      follower.style.borderColor = "hsl(var(--primary))";
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, .project-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        data-cursor-dot
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
