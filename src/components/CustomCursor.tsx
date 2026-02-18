import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const resetCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;
    cursor.style.background = "hsl(var(--primary))";
    follower.style.borderColor = "hsl(var(--primary))";
    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    gsap.to(cursor, { scale: 1, duration: 0.3 });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const detectBgType = (el: Element): "green" | "white" | "dark" => {
      let current: Element | null = el;
      while (current && current !== document.body) {
        // Check for explicit data attribute
        const attr = current.getAttribute("data-cursor-bg");
        if (attr === "green" || attr === "white" || attr === "dark") return attr;

        // Check classes
        if (current.classList.contains("bg-primary")) return "green";

        // Check computed bg
        const bg = window.getComputedStyle(current).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const [r, g, b] = [+m[1], +m[2], +m[3]];
          if (g > 140 && g > r * 1.2 && g > b * 1.2) return "green";
          if (r > 200 && g > 200 && b > 200) return "white";
          if (r < 60 && g < 60 && b < 60 && bg !== "rgba(0, 0, 0, 0)") return "dark";
        }
        current = current.parentElement;
      }
      return "dark";
    };

    const grow = (e: Event) => {
      const target = (e.currentTarget || e.target) as Element;
      const bg = detectBgType(target);

      let dotColor: string;
      let ringColor: string;

      switch (bg) {
        case "green":
          dotColor = "hsl(0 0% 5%)";
          ringColor = "hsl(0 0% 5%)";
          break;
        case "white":
          dotColor = "hsl(0 0% 5%)";
          ringColor = "hsl(var(--primary))";
          break;
        default: // dark
          dotColor = "hsl(var(--primary))";
          ringColor = "hsl(var(--primary))";
      }

      cursor.style.background = dotColor;
      follower.style.borderColor = ringColor;
      gsap.to(follower, { scale: 2.5, opacity: 0.4, duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const shrink = () => resetCursor();

    window.addEventListener("mousemove", moveCursor);

    const bindInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, .project-card");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
      return interactives;
    };

    let interactives = bindInteractives();

    // Re-bind on DOM changes (dynamic content)
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      interactives = bindInteractives();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, [resetCursor]);

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
