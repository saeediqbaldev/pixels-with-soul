import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const ARROW_SVG = `<svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="cursor-outer" d="M2 1L26 16.5L15.5 18.5L10 32L2 1Z" fill="hsl(0,0%,5%)"/><path class="cursor-inner" d="M4.5 4.5L23 16L14.5 17.5L10 29L4.5 4.5Z" fill="hsl(82,85%,55%)"/></svg>`;

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const isHoveringButton = useRef(false);

  const resetCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const arrow = arrowRef.current;
    if (!cursor || !follower || !arrow) return;
    isHoveringButton.current = false;
    // Show dot+ring, hide arrow
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 });
    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.25 });
    gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.2 });
    cursor.style.background = "hsl(var(--primary))";
    follower.style.borderColor = "hsl(var(--primary))";
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const arrow = arrowRef.current;
    if (!cursor || !follower || !arrow) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
      gsap.to(arrow, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out" });
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

    const showArrow = (e: Event) => {
      const target = (e.currentTarget || e.target) as Element;
      const bg = detectBgType(target);
      isHoveringButton.current = true;

      // Hide dot+ring
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(follower, { scale: 0, opacity: 0, duration: 0.2 });
      // Show arrow
      gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" });

      const inner = arrow.querySelector(".cursor-inner") as SVGPathElement | null;
      const outer = arrow.querySelector(".cursor-outer") as SVGPathElement | null;

      switch (bg) {
        case "green":
          if (inner) inner.setAttribute("fill", "hsl(0,0%,95%)");
          if (outer) outer.setAttribute("fill", "hsl(0,0%,5%)");
          break;
        case "white":
          if (inner) inner.setAttribute("fill", "hsl(0,0%,5%)");
          if (outer) outer.setAttribute("fill", "hsl(0,0%,5%)");
          break;
        default:
          if (inner) inner.setAttribute("fill", "hsl(82,85%,55%)");
          if (outer) outer.setAttribute("fill", "hsl(0,0%,5%)");
      }
    };

    const hideArrow = () => resetCursor();

    window.addEventListener("mousemove", moveCursor);

    const bindInteractives = () => {
      const buttons = document.querySelectorAll("a, button, [role='button']");
      buttons.forEach((el) => {
        el.addEventListener("mouseenter", showArrow);
        el.addEventListener("mouseleave", hideArrow);
      });
      return buttons;
    };

    let interactives = bindInteractives();

    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", showArrow);
        el.removeEventListener("mouseleave", hideArrow);
      });
      interactives = bindInteractives();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", showArrow);
        el.removeEventListener("mouseleave", hideArrow);
      });
    };
  }, [resetCursor]);

  return (
    <>
      {/* Default dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Default ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Arrow cursor (hidden by default) */}
      <div
        ref={arrowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ marginLeft: "-4px", marginTop: "-2px", transform: "scale(0)", opacity: 0 }}
        dangerouslySetInnerHTML={{ __html: ARROW_SVG }}
      />
    </>
  );
};

export default CustomCursor;
