import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const resetCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const svg = cursor.querySelector("svg");
    if (!svg) return;
    const inner = svg.querySelector(".cursor-inner") as SVGPathElement;
    const outer = svg.querySelector(".cursor-outer") as SVGPathElement;
    if (inner) inner.setAttribute("fill", "hsl(82, 85%, 55%)");
    if (outer) outer.setAttribute("fill", "hsl(0, 0%, 95%)");
    gsap.to(cursor, { scale: 1, duration: 0.3 });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    const detectBgType = (el: Element): "green" | "white" | "dark" => {
      let current: Element | null = el;
      while (current && current !== document.body) {
        const attr = current.getAttribute("data-cursor-bg");
        if (attr === "green" || attr === "white" || attr === "dark") return attr;
        if (current.classList.contains("bg-primary")) return "green";
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
      const svg = cursor.querySelector("svg");
      if (!svg) return;
      const inner = svg.querySelector(".cursor-inner") as SVGPathElement;
      const outer = svg.querySelector(".cursor-outer") as SVGPathElement;

      switch (bg) {
        case "green":
          // On green: black arrow, white outline
          if (inner) inner.setAttribute("fill", "hsl(0, 0%, 5%)");
          if (outer) outer.setAttribute("fill", "hsl(0, 0%, 95%)");
          break;
        case "white":
          // On white: black arrow, black outline
          if (inner) inner.setAttribute("fill", "hsl(0, 0%, 5%)");
          if (outer) outer.setAttribute("fill", "hsl(0, 0%, 20%)");
          break;
        default:
          // On dark: green arrow, white outline
          if (inner) inner.setAttribute("fill", "hsl(82, 85%, 55%)");
          if (outer) outer.setAttribute("fill", "hsl(0, 0%, 95%)");
      }
      gsap.to(cursor, { scale: 1.3, duration: 0.3, ease: "back.out(1.7)" });
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
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ marginLeft: "-4px", marginTop: "-2px" }}
    >
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer stroke / border */}
        <path
          className="cursor-outer"
          d="M2 1L26 16.5L15.5 18.5L10 32L2 1Z"
          fill="hsl(0, 0%, 95%)"
          stroke="none"
        />
        {/* Inner fill */}
        <path
          className="cursor-inner"
          d="M4.5 4.5L23 16L14.5 17.5L10 29L4.5 4.5Z"
          fill="hsl(82, 85%, 55%)"
          stroke="none"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
