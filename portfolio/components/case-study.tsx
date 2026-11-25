import React, { useEffect, useRef, useState } from "react";
import { CASE } from "../constants";
import { gsap, prefersReducedMotion } from "../lib/motion";
import CropMarks from "./crop-marks";
import HalftoneImage, { TrackContext } from "./halftone-image";
import SectionHead from "./section-head";

/**
 * Contact sheet: on wide screens the section pins and the pieces travel sideways,
 * each one printing from halftone to full colour as it crosses the frame.
 */
const CaseStudy = () => {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [tween, setTween] = useState<gsap.core.Tween | null>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setFrame(Math.min(CASE.pieces.length, Math.floor(self.progress * (CASE.pieces.length + 0.999)))),
        },
      });
      setTween(t);
      return () => setTween(null);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="caso" className="bg-sheet">
      <div className="gutter pt-24 md:pt-36">
        <SectionHead plate="B" label="Caso de estudio" meta={`${CASE.place} · ${CASE.year}`} title={CASE.client} />
      </div>

      <TrackContext.Provider value={tween}>
        <div ref={pin} className="relative overflow-hidden md:min-h-screen">
          <div className="gutter flex items-center justify-between py-4">
            <p className="slug">Hoja de contactos<span className="hidden lg:inline"> · sigue bajando</span></p>
            <p className="slug tabular-nums">
              {String(frame).padStart(2, "0")} / {String(CASE.pieces.length).padStart(2, "0")}
            </p>
          </div>
          <div
            ref={track}
            className="gutter flex flex-col gap-16 pb-24 lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:pb-0"
            style={{ minHeight: "calc(100vh - 60px)" }}
          >
            <div className="max-w-xl shrink-0 lg:w-[34vw]">
              <p className="text-2xl font-medium leading-tight md:text-3xl">{CASE.summary}</p>
              <dl className="mt-8 grid gap-0 border-t border-ink">
                {[
                  ["Cliente", CASE.client],
                  ["Lugar", CASE.place],
                  ["Año", CASE.year],
                  ["Alcance", CASE.scope],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2.5">
                    <dt className="slug pt-0.5">{k}</dt>
                    <dd className="text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href={CASE.link} target="_blank" rel="noreferrer" className="link-draw mt-6 inline-block text-lg font-medium">
                {CASE.linkLabel} ↗
              </a>
            </div>

            {CASE.pieces.map((p, i) => (
              <figure key={p.src} className="relative shrink-0" style={{ width: `min(86vw, calc((100vh - 230px) * ${p.w / p.h}))` }}>
                <div className="relative">
                  <HalftoneImage src={p.src} alt={`${CASE.client}: ${p.title}`} w={p.w} h={p.h} />
                  <CropMarks />
                </div>
                <figcaption className="mt-5 grid grid-cols-[3rem_1fr] gap-3">
                  <span className="font-mono text-xs" style={{ fontStretch: "85%" }}>Fig. {i + 1}</span>
                  <span>
                    <span className="block font-semibold">{p.title}</span>
                    <span className="block text-[15px] text-mute">{p.note}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
            <div className="hidden w-[10vw] shrink-0 lg:block" />
          </div>
        </div>
      </TrackContext.Provider>
    </section>
  );
};

export default CaseStudy;
