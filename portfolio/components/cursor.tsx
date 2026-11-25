import React, { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";

const ZOOM = 2.6;
const SIZE = 190;

/** Registration-mark cursor; over a printed piece it turns into a loupe. */
const Cursor = () => {
  const mark = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");
    const m = mark.current!;
    const l = lens.current!;
    gsap.set([m, l], { xPercent: -50, yPercent: -50, opacity: 0 });
    const mx = gsap.quickTo(m, "x", { duration: 0.18, ease: "power3.out" });
    const my = gsap.quickTo(m, "y", { duration: 0.18, ease: "power3.out" });
    const lx = gsap.quickTo(l, "x", { duration: 0.35, ease: "power3.out" });
    const ly = gsap.quickTo(l, "y", { duration: 0.35, ease: "power3.out" });
    let inLens = false;

    const onMove = (e: PointerEvent) => {
      mx(e.clientX); my(e.clientY); lx(e.clientX); ly(e.clientY);
      const target = e.target as HTMLElement;
      const piece = target.closest?.("[data-loupe]") as HTMLElement | null;
      const hot = target.closest?.("a, button, input, textarea, select, [role=button]");
      if (piece) {
        const r = piece.getBoundingClientRect();
        const src = piece.dataset.loupe!;
        if (l.dataset.src !== src) {
          l.style.backgroundImage = `url("${src}")`;
          l.dataset.src = src;
        }
        l.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
        l.style.backgroundPosition = `${-(e.clientX - r.left) * ZOOM + SIZE / 2}px ${-(e.clientY - r.top) * ZOOM + SIZE / 2}px`;
        if (!inLens) {
          inLens = true;
          gsap.to(l, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" });
          gsap.to(m, { opacity: 0, duration: 0.2 });
        }
      } else {
        if (inLens) {
          inLens = false;
          gsap.to(l, { opacity: 0, scale: 0.4, duration: 0.25 });
        }
        gsap.to(m, { opacity: 1, scale: hot ? 1.9 : 1, rotate: hot ? 45 : 0, duration: 0.3, ease: "power3.out" });
      }
    };
    const onLeave = () => gsap.to([m, l], { opacity: 0, duration: 0.2 });
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={mark} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 text-ink" style={{ mixBlendMode: "difference", color: "#fff" }}>
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="16" cy="16" r="8" />
          <path d="M16 0v32M0 16h32" />
        </svg>
      </div>
      <div
        ref={lens}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border-2 border-ink bg-no-repeat"
        style={{ width: SIZE, height: SIZE, boxShadow: "0 0 0 6px #EFEEEA, 0 0 0 7px #0F0F0E" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" stroke="#0F0F0E" strokeWidth=".4">
          <path d="M50 42v16M42 50h16" />
        </svg>
      </div>
    </>
  );
};

export default Cursor;
