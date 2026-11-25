import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";

interface Props {
  lines: string[];
  className?: string;
}

/**
 * Display type printed in three plates (blue, orange, black). The plates land out of
 * register and snap into alignment; the cursor and scroll speed knock them out again.
 * Fast scrolling also condenses the type along the width axis.
 */
const RegisterText = ({ lines, className = "" }: Props) => {
  const root = useRef<HTMLHeadingElement>(null);

  // Fit each line to the container width at the resting width axis.
  useEffect(() => {
    const el = root.current!;
    const fit = () => {
      el.querySelectorAll<HTMLElement>("[data-fit]").forEach((line) => {
        line.style.fontSize = "100px";
        const ink = line.querySelector<HTMLElement>(".pl-black")!;
        const ratio = el.clientWidth / ink.offsetWidth;
        line.style.fontSize = `${Math.floor(100 * ratio * 0.995)}px`;
      });
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current!;
    const blue = el.querySelectorAll<HTMLElement>(".pl-blue");
    const orange = el.querySelectorAll<HTMLElement>(".pl-orange");
    const black = el.querySelectorAll<HTMLElement>(".pl-black");
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(blue, { x: -46, y: 18, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.08 })
      .fromTo(orange, { x: 38, y: -22, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.08 }, 0.25)
      .fromTo(black, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08 }, 0.75);

    const bx = gsap.quickTo(blue, "x", { duration: 0.9, ease: "power3.out" });
    const by = gsap.quickTo(blue, "y", { duration: 0.9, ease: "power3.out" });
    const ox = gsap.quickTo(orange, "x", { duration: 1.1, ease: "power3.out" });
    const oy = gsap.quickTo(orange, "y", { duration: 1.1, ease: "power3.out" });
    const width = { w: 100 };
    const setW = () => el.style.setProperty("--w", `${width.w}%`);

    let lx = 0;
    let ly = 0;
    let idle: ReturnType<typeof setTimeout>;
    const settle = () => {
      bx(0); by(0); ox(0); oy(0);
    };
    const onMove = (e: PointerEvent) => {
      const vx = gsap.utils.clamp(-40, 40, e.clientX - lx);
      const vy = gsap.utils.clamp(-40, 40, e.clientY - ly);
      lx = e.clientX;
      ly = e.clientY;
      bx(-vx * 0.5); by(-vy * 0.5);
      ox(vx * 0.4); oy(vy * 0.4);
      clearTimeout(idle);
      idle = setTimeout(settle, 120);
    };
    window.addEventListener("pointermove", onMove);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity());
        const target = 100 - gsap.utils.clamp(0, 38, v / 60);
        gsap.to(width, { w: target, duration: 0.35, ease: "power2.out", overwrite: true, onUpdate: setW });
        gsap.to(width, { w: 100, duration: 1.2, delay: 0.25, ease: "elastic.out(1,0.5)", onUpdate: setW });
        const off = gsap.utils.clamp(-24, 24, self.getVelocity() / 120);
        by(off); oy(-off);
        clearTimeout(idle);
        idle = setTimeout(settle, 160);
      },
    });

    return () => {
      tl.kill();
      st.kill();
      window.removeEventListener("pointermove", onMove);
      clearTimeout(idle);
    };
  }, []);

  return (
    <h1 ref={root} className={`display w-full select-none uppercase ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span key={line} className="relative block whitespace-nowrap" data-fit aria-hidden>
          <span className="pl-blue absolute left-0 top-0 text-plate" style={{ mixBlendMode: "multiply" }}>{line}</span>
          <span className="pl-orange absolute left-0 top-0 text-flame" style={{ mixBlendMode: "multiply" }}>{line}</span>
          <span className="pl-black relative inline-block text-ink" style={{ mixBlendMode: "multiply" }}>{line}</span>
        </span>
      ))}
    </h1>
  );
};

export default RegisterText;
