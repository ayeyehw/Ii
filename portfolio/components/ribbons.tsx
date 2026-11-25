import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

const Row = ({ text, className }: { text: string; className: string }) => (
  <div className={`rb-row flex w-max items-center whitespace-nowrap font-display text-3xl uppercase md:text-5xl ${className}`}>
    {Array.from({ length: 10 }).map((_, i) => (
      <span key={i} className="flex items-center px-4">
        {text}
        <span className="ml-8 text-berry">✳</span>
        <span className="script ml-8 normal-case">a la par</span>
        <span className="ml-8">→→→</span>
      </span>
    ))}
  </div>
);

/** Dos cintas cruzadas que se mueven en sentido contrario con el scroll. */
const Ribbons = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 };
      gsap.fromTo(".rb-a", { xPercent: -5 }, { xPercent: -35, ease: "none", scrollTrigger: st });
      gsap.fromTo(".rb-b", { xPercent: -35 }, { xPercent: -5, ease: "none", scrollTrigger: { ...st } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative h-56 overflow-hidden bg-blush md:h-72" aria-hidden>
      <div className="absolute left-[-10%] top-1/2 w-[120%] -translate-y-1/2 rotate-[-5deg] border-y-[3px] border-ink bg-lime py-3">
        <Row text="Trabajemos juntos" className="rb-a" />
      </div>
      <div className="absolute left-[-10%] top-1/2 w-[120%] -translate-y-1/2 rotate-[4deg] border-y-[3px] border-ink bg-ink py-3 text-cream">
        <Row text="Contáctame" className="rb-b" />
      </div>
    </div>
  );
};

export default Ribbons;
