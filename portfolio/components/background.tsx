import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

type Tint = { a: [number, number, number]; b: [number, number, number] };
const TINTS: Record<string, Tint> = {
  blue: { a: [47, 107, 255], b: [14, 31, 77] },
  green: { a: [63, 163, 124], b: [15, 77, 58] },
  steel: { a: [120, 140, 160], b: [23, 26, 29] },
};

/**
 * Console-style living background: slow drifting light clouds in blue and green,
 * a field of soft particles, and a glow that follows the cursor. Sections can set
 * data-tint="blue|green|steel" to shift the light as you scroll.
 */
const Background = () => {
  const cvs = useRef<HTMLCanvasElement>(null);
  const dots = useRef<HTMLCanvasElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = cvs.current!;
    const ctx = canvas.getContext("2d")!;
    const dcv = dots.current!;
    const dctx = dcv.getContext("2d")!;
    let DW = 0, DH = 0;
    const reduce = prefersReducedMotion();
    let W = 0, H = 0, raf = 0;
    let mx = 0.5, my = 0.4, smx = 0.5, smy = 0.4;
    const cur = { a: [...TINTS.blue.a], b: [...TINTS.blue.b] };
    let target: Tint = TINTS.blue;

    const N = 70;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(), z: 0.3 + Math.random() * 0.7, s: 0.6 + Math.random() * 1.8, p: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      W = canvas.width = Math.round(window.innerWidth * 0.5);
      H = canvas.height = Math.round(window.innerHeight * 0.5);
      DW = dcv.width = window.innerWidth;
      DH = dcv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blob = (x: number, y: number, r: number, c: number[], a: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a})`);
      g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    const frame = (t: number) => {
      const s = t / 1000;
      smx += (mx - smx) * 0.03;
      smy += (my - smy) * 0.03;
      for (let i = 0; i < 3; i++) {
        cur.a[i] += (target.a[i] - cur.a[i]) * 0.02;
        cur.b[i] += (target.b[i] - cur.b[i]) * 0.02;
      }
      ctx.fillStyle = "#08090A";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const R = Math.max(W, H);
      blob(W * (0.72 + 0.08 * Math.sin(s * 0.11)) + (smx - 0.5) * 40, H * (0.18 + 0.1 * Math.cos(s * 0.09)), R * 0.62, cur.a, 0.34);
      blob(W * (0.18 + 0.1 * Math.cos(s * 0.07)), H * (0.85 + 0.08 * Math.sin(s * 0.1)), R * 0.55, TINTS.green.b, 0.55);
      blob(W * (0.45 + 0.2 * Math.sin(s * 0.05)), H * (0.55 + 0.1 * Math.sin(s * 0.08)), R * 0.5, cur.b, 0.5);
      blob(W * smx, H * smy, R * 0.22, cur.a, 0.1);
      // light ribbon, like a slow wave across the screen
      ctx.lineWidth = Math.max(1, H * 0.004);
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const y = H * (0.62 + k * 0.035) + Math.sin(x / W * 4 + s * 0.35 + k) * H * 0.06 + Math.sin(x / W * 9 - s * 0.2) * H * 0.015;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = `rgba(${cur.a[0] | 0},${cur.a[1] | 0},${cur.a[2] | 0},${0.12 - k * 0.03})`;
        ctx.stroke();
      }
      // particles (sharp layer)
      dctx.clearRect(0, 0, DW, DH);
      for (const p of parts) {
        if (!reduce) {
          p.y -= 0.00012 * p.z;
          p.x += Math.sin(s * 0.3 + p.p) * 0.00006;
          if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        }
        const px = p.x * DW + (smx - 0.5) * 50 * p.z;
        const py = p.y * DH + (smy - 0.5) * 34 * p.z;
        const tw = 0.35 + 0.35 * Math.sin(s * 1.2 + p.p);
        const r = p.s * p.z * 1.3;
        const g = dctx.createRadialGradient(px, py, 0, px, py, r * 3);
        g.addColorStop(0, `rgba(225,235,255,${tw * p.z * 0.9})`);
        g.addColorStop(1, "rgba(225,235,255,0)");
        dctx.fillStyle = g;
        dctx.fillRect(px - r * 3, py - r * 3, r * 6, r * 6);
      }
      ctx.globalCompositeOperation = "source-over";
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) target = TINTS[(en.target as HTMLElement).dataset.tint || "blue"] || TINTS.blue;
      }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    const watch = () => document.querySelectorAll("[data-tint]").forEach((el) => io.observe(el));
    watch();
    const onTint = (e: Event) => { target = TINTS[(e as CustomEvent).detail] || target; };
    window.addEventListener("bg-tint", onTint);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("bg-tint", onTint);
      io.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={cvs} className="h-full w-full" style={{ filter: "blur(28px)", transform: "scale(1.1)" }} />
      <canvas ref={dots} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(8,9,10,.7) 100%)" }} />
      <div ref={glow} className="absolute -left-[200px] -top-[200px] hidden h-[400px] w-[400px] rounded-full md:block" style={{ background: "radial-gradient(closest-side, rgba(141,174,255,.10), transparent)" }} />
    </div>
  );
};

export default Background;
