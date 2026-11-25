import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/** Palabra gigante que se desliza con el scroll (alternando relleno y contorno). */
const BigMarquee = ({ word, id }: { word: string; id?: string }) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bm-row",
        { xPercent: 0 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div id={id} ref={root} className="overflow-hidden bg-ink py-6 md:py-10">
      <div className="bm-row flex w-max gap-8 font-display text-[22vw] uppercase leading-none md:text-[13vw]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={i % 2 ? "outline-text" : "text-cream"} aria-hidden={i > 0}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BigMarquee;
