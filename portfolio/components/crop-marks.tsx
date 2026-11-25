import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/** Printer's crop marks that draw themselves in when the block arrives. */
const CropMarks = ({ inset = -14, className = "" }: { inset?: number; className?: string }) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".cm-h", { scaleX: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root.current, start: "top 90%" } });
      gsap.from(".cm-v", { scaleY: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root.current, start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const L = 22;
  const corners = [
    { top: inset, left: inset, h: { right: "100%", top: 0, origin: "right" }, v: { bottom: "100%", left: 0, origin: "bottom" } },
    { top: inset, right: inset, h: { left: "100%", top: 0, origin: "left" }, v: { bottom: "100%", right: 0, origin: "bottom" } },
    { bottom: inset, left: inset, h: { right: "100%", bottom: 0, origin: "right" }, v: { top: "100%", left: 0, origin: "top" } },
    { bottom: inset, right: inset, h: { left: "100%", bottom: 0, origin: "left" }, v: { top: "100%", right: 0, origin: "top" } },
  ];

  return (
    <div ref={root} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {corners.map((c, i) => {
        const { h, v, ...pos } = c as any;
        return (
          <span key={i} className="absolute h-0 w-0" style={pos}>
            <span className="cm-h absolute h-px bg-ink" style={{ width: L, ...h, transformOrigin: h.origin }} />
            <span className="cm-v absolute w-px bg-ink" style={{ height: L, ...v, transformOrigin: v.origin }} />
          </span>
        );
      })}
    </div>
  );
};

export default CropMarks;
