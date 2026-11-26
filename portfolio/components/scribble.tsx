import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

const COLORS = ["#C8763A", "#2F7A5F", "#B3263E", "#7FB2E5", "#F3D36B"];

/** Full-screen marker scribble used as a page transition (fired with window event "scribble"). */
export const fireScribble = () => window.dispatchEvent(new Event("scribble"));

const Scribble = () => {
  const path = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const p = path.current!;
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    const run = () => {
      const lenis = (window as any).__lenis;
      if (prefersReducedMotion()) {
        lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
        return;
      }
      p.style.stroke = COLORS[Math.floor(Math.random() * COLORS.length)];
      gsap.timeline()
        .set(svg.current, { display: "block" })
        .fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" })
        .add(() => (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)))
        .to(p, { strokeDashoffset: -len, duration: 0.9, ease: "power2.inOut" }, "+=0.15")
        .set(svg.current, { display: "none" });
    };
    window.addEventListener("scribble", run);
    return () => window.removeEventListener("scribble", run);
  }, []);

  return (
    <svg ref={svg} aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <path
        ref={path}
        d="M-80 60 C 200 -40, 500 160, 1080 40 S 0 260, 160 240 S 1100 180, 980 360 S -60 420, 120 520 S 1100 460, 1000 640 S -40 700, 140 780 S 1080 760, 980 900 S 200 1000, -60 1060"
        fill="none"
        strokeWidth="260"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Scribble;
