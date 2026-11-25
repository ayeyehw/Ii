import React, { useEffect, useMemo, useRef, useState } from "react";
import { Category, CATEGORY_LABELS, WORK, WorkPiece } from "../constants";
import { gsap, ScrollTrigger } from "../lib/motion";
import Title from "./title";

type Filter = Category | "todos";

const Gallery = ({ filter, setFilter }: { filter: Filter; setFilter: (f: Filter) => void }) => {
  const grid = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<WorkPiece | null>(null);

  const items = useMemo(() => (filter === "todos" ? WORK : WORK.filter((w) => w.category === filter)), [filter]);

  const first = useRef(true);
  useEffect(() => {
    if (!grid.current) return;
    const tween = gsap.fromTo(
      grid.current.children,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
        // La primera vez se anima al llegar con el scroll; después, al cambiar de filtro.
        scrollTrigger: first.current ? { trigger: grid.current, start: "top 85%" } : undefined,
      }
    );
    first.current = false;
    ScrollTrigger.refresh();
    return () => {
      tween.scrollTrigger?.kill();
    };
  }, [filter]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const filters: Filter[] = ["todos", ...(Object.keys(CATEGORY_LABELS) as Category[])];

  return (
    <section id="galeria" className="bg-cream px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Title kicker="Selección de trabajos" big="Más" script="proyectos" />
          <div data-reveal className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === "todos" ? "Todos" : CATEGORY_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        <div ref={grid} className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {items.map((w) => (
            <button
              key={w.image + w.title}
              onClick={() => setOpen(w)}
              className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-3xl border-[3px] border-ink text-left"
            >
              <img
                src={w.image}
                alt={`${w.title} — ${w.client}`}
                loading="lazy"
                className="block w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-between rounded-2xl bg-cream/95 px-4 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span>
                  <span className="block font-bold">{w.title}</span>
                  <span className="script text-lg text-berry">{w.client}</span>
                </span>
                <span className="text-xl">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-5 backdrop-blur-sm"
          style={{ animation: "fadeIn .3s ease" }}
        >
          <figure onClick={(e) => e.stopPropagation()} className="relative max-h-full max-w-3xl">
            <img src={open.image} alt={open.title} className="max-h-[78vh] w-auto rounded-3xl border-[3px] border-cream" />
            <figcaption className="mt-4 text-center text-cream">
              <span className="font-display uppercase">{open.title}</span>{" "}
              <span className="script text-2xl text-orchid">— {open.client}</span>
            </figcaption>
            <button
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-lime text-xl font-bold"
            >
              ✕
            </button>
          </figure>
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
        </div>
      )}
    </section>
  );
};

export default Gallery;
