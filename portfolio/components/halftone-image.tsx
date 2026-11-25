import React, { useContext, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";

/** Lets images inside a horizontally scrolled track use that track as their timeline. */
export const TrackContext = React.createContext<gsap.core.Tween | null>(null);

interface Props {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  ink?: string;
  step?: number;
  loupe?: boolean;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * The image is first "printed" as a halftone screen in one ink, then the dots
 * give way to the full-colour photo as it reaches the middle of the viewport.
 */
const HalftoneImage = ({ src, alt, w, h, className = "", ink = "#1430E6", step = 9, loupe = true }: Props) => {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const track = useContext(TrackContext);

  useEffect(() => {
    const el = box.current!;
    const image = img.current!;
    const canvas = cvs.current!;
    if (prefersReducedMotion()) {
      image.style.opacity = "1";
      canvas.style.display = "none";
      return;
    }
    const ctx = canvas.getContext("2d")!;
    let dots: { x: number; y: number; d: number }[] = [];
    let progress = 0;
    let W = 0;
    let H = 0;

    const sample = () => {
      if (!image.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = el.clientWidth;
      H = el.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(W / step) + 1;
      const rows = Math.ceil(H / step) + 1;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d")!;
      o.drawImage(image, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;
      dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const d = 1 - lum;
          if (d > 0.04) dots.push({ x: x * step + (y % 2 ? step / 2 : 0), y: y * step, d });
        }
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const grow = smooth(0, 0.35, progress);
      const r = (step / 2) * 1.18 * grow;
      ctx.fillStyle = ink;
      ctx.beginPath();
      for (const p of dots) {
        const rr = r * Math.sqrt(p.d);
        if (rr < 0.25) continue;
        ctx.moveTo(p.x + rr, p.y);
        ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      }
      ctx.fill();
      image.style.opacity = String(smooth(0.5, 0.95, progress));
      canvas.style.opacity = String(1 - smooth(0.62, 1, progress));
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: track ? "left 95%" : "top 92%",
      end: track ? "center 55%" : "center 55%",
      containerAnimation: track || undefined,
      scrub: 0.4,
      onUpdate: (self) => {
        progress = self.progress;
        draw();
      },
    });

    if (image.complete) sample();
    else image.addEventListener("load", sample, { once: true });
    const ro = new ResizeObserver(() => sample());
    ro.observe(el);
    return () => {
      st.kill();
      ro.disconnect();
    };
  }, [track, ink, step]);

  return (
    <div
      ref={box}
      data-loupe={loupe ? src : undefined}
      className={`relative overflow-hidden bg-sheet ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <img ref={img} src={src} alt={alt} loading="eager" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0 }} />
      <canvas ref={cvs} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ mixBlendMode: "multiply" }} />
    </div>
  );
};

export default HalftoneImage;
