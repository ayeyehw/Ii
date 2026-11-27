import React, { useCallback, useEffect, useRef, useState } from "react";
import { CONCEPT, PieceId, whatsappHref } from "../constants";
import { pieceURL } from "../lib/concept-art";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";
import type { RestaurantAPI, ScreenPoint } from "../lib/restaurant";

const U = CONCEPT.ui;
const REVEAL: PieceId[] = ["logo", "banner", "post"];

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/** "Your brand with me": brand reveal (logo → banner → post), then a walk-through 3D burger restaurant. */
const Concept = ({ onClose }: { onClose: () => void }) => {
  const t = useT();
  const { lang } = useLang();
  const [stage, setStage] = useState<"reveal" | "restaurant">("reveal");
  const [urls, setUrls] = useState<Partial<Record<PieceId, string>>>({});
  const [slide, setSlide] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Draw every piece once (used by the slides, the info card and the fallback)
  useEffect(() => {
    let alive = true;
    (async () => {
      const all: PieceId[] = ["logo", "banner", "post", ...CONCEPT.hotspots.map((h) => h.id)];
      for (const id of all) {
        const u = await pieceURL(id);
        if (!alive) return;
        setUrls((prev) => ({ ...prev, [id]: u }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    if (!prefersReducedMotion()) gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (stage !== "reveal" || prefersReducedMotion() || !slideRef.current) return;
    gsap.fromTo(slideRef.current, { opacity: 0, scale: 0.94, y: 24, filter: "blur(10px)" }, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" });
  }, [slide, stage, urls[REVEAL[slide]]]);

  const next = () => (slide < REVEAL.length - 1 ? setSlide(slide + 1) : setStage("restaurant"));

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={t(U.tile)} className="fixed inset-0 z-[90] flex flex-col bg-bg" data-lenis-prevent>
      <div className="wrap flex h-[68px] shrink-0 items-center justify-between gap-3" style={{ paddingTop: "env(safe-area-inset-top,0px)" }}>
        <p className="flex min-w-0 items-center gap-2 text-[13px] text-fg/60">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
          <span className="truncate">{t(U.badge)}</span>
        </p>
        <button onClick={onClose} className="pill glass shrink-0 !px-4 !py-2 text-[14px]" autoFocus>
          {t(U.close)} ✕
        </button>
      </div>

      {stage === "reveal" ? (
        <div className="wrap flex min-h-0 flex-1 flex-col items-center justify-center gap-6 pb-8">
          <p className="max-w-xl text-center text-[16px] leading-relaxed text-fg/70 md:text-[18px]">{t(U.intro)}</p>
          <div ref={slideRef} className="flex min-h-0 w-full flex-1 items-center justify-center">
            {urls[REVEAL[slide]] ? (
              <img
                src={urls[REVEAL[slide]]}
                alt={t(U.steps[REVEAL[slide] as "logo" | "banner" | "post"])}
                className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(47,107,255,.45)]"
                style={{ maxHeight: "min(58vh, 640px)" }}
              />
            ) : (
              <div className="h-40 w-40 animate-pulse rounded-2xl bg-raise" />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
            {REVEAL.map((id, i) => (
              <button
                key={id}
                role="tab"
                aria-selected={i === slide}
                onClick={() => setSlide(i)}
                className={`rounded-full px-4 py-1.5 text-[14px] transition-colors duration-300 ${i === slide ? "bg-fg text-bg" : "text-fg/60 hover:text-fg"}`}
              >
                {i + 1}. {t(U.steps[id as "logo" | "banner" | "post"])}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            {slide > 0 && (
              <button onClick={() => setSlide(slide - 1)} className="pill glass">
                {t(U.back)}
              </button>
            )}
            <button onClick={next} className={`pill ${slide === REVEAL.length - 1 ? "pill-blue" : "pill-light"}`}>
              {slide === REVEAL.length - 1 ? `${t(U.enter)} →` : t(U.next)}
            </button>
          </div>
        </div>
      ) : (
        <Restaurant urls={urls} ctaHref={whatsappHref(lang, t(U.ctaMsg))} />
      )}
    </div>
  );
};

const Restaurant = ({ urls, ctaHref }: { urls: Partial<Record<PieceId, string>>; ctaHref: string }) => {
  const t = useT();
  const stageRef = useRef<HTMLDivElement>(null);
  const api = useRef<RestaurantAPI | null>(null);
  const dots = useRef<Partial<Record<PieceId, HTMLButtonElement | null>>>({});
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [active, setActive] = useState<PieceId | null>(null);

  useEffect(() => {
    if (!hasWebGL()) {
      setWebgl(false);
      return;
    }
    let disposed = false;
    const onFrame = (pts: ScreenPoint[]) =>
      pts.forEach((p) => {
        const el = dots.current[p.id];
        if (!el) return;
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
        el.style.opacity = p.visible ? "1" : "0";
        el.style.pointerEvents = p.visible ? "auto" : "none";
      });
    import("../lib/restaurant").then(async ({ createRestaurant }) => {
      if (disposed || !stageRef.current) return;
      const r = await createRestaurant(stageRef.current, { reduced: prefersReducedMotion(), onFrame });
      if (disposed) return r.dispose();
      api.current = r;
      setReady(true);
    });
    return () => {
      disposed = true;
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  const focus = useCallback((id: PieceId | null) => {
    setActive(id);
    api.current?.focus(id);
  }, []);

  const info = CONCEPT.hotspots.find((h) => h.id === active);
  const order = CONCEPT.hotspots.map((h) => h.id);
  const step = (d: number) => {
    const i = active ? order.indexOf(active) : -1;
    focus(order[(i + d + order.length) % order.length]);
  };

  if (!webgl) {
    return (
      <div className="wrap flex-1 overflow-y-auto pb-10">
        <p className="mb-6 text-fg/70">{t(U.noWebgl)}</p>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {CONCEPT.hotspots.map((h) =>
            urls[h.id] ? (
              <figure key={h.id} className="mb-4 break-inside-avoid">
                <img src={urls[h.id]} alt={t(h.label)} className="w-full rounded-2xl" />
                <figcaption className="mt-2 text-[14px] text-fg/70">{t(h.label)}</figcaption>
              </figure>
            ) : null
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={stageRef} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-[15px] text-fg/60">
          <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-fg/20 border-t-fg" />
          {t(U.loading)}
        </div>
      )}

      {/* Hotspots, positioned every frame from the 3D scene */}
      {CONCEPT.hotspots.map((h, i) => (
        <button
          key={h.id}
          ref={(el) => (dots.current[h.id] = el)}
          onClick={() => focus(active === h.id ? null : h.id)}
          aria-label={t(h.label)}
          className={`group absolute left-0 top-0 z-10 flex items-center gap-2 transition-opacity duration-300 ${ready ? "" : "hidden"}`}
          style={{ opacity: 0 }}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold shadow-[0_0_0_6px_rgba(237,239,234,.15)] transition-all duration-300 ${
              active === h.id ? "scale-110 bg-blue text-fg" : "bg-fg text-bg group-hover:scale-110"
            }`}
          >
            {i + 1}
          </span>
          <span className={`glass whitespace-nowrap rounded-full px-3 py-1 text-[13px] transition-opacity duration-300 max-md:hidden ${active === h.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            {t(h.label)}
          </span>
        </button>
      ))}

      {/* Bottom panel: current piece + piece list */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 md:p-6" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom,0px))" }}>
        <div className="mx-auto flex max-w-site flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="pointer-events-auto glass flex w-full max-w-lg items-center gap-4 rounded-[22px] p-3 md:w-auto">
            {info && urls[info.id] ? (
              <>
                <img src={urls[info.id]} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover md:h-20 md:w-20" />
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold">{t(info.label)}</p>
                  <p className="text-[14px] leading-snug text-fg/65">{t(info.note)}</p>
                </div>
              </>
            ) : (
              <p className="px-2 py-1 text-[14px] text-fg/70">{t(U.hint)}</p>
            )}
            <div className="ml-auto flex shrink-0 gap-1.5">
              <button data-step="prev" onClick={() => step(-1)} aria-label={t(U.back)} className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:bg-fg/10">←</button>
              <button data-step="next" onClick={() => step(1)} aria-label={t(U.next)} className="flex h-9 w-9 items-center justify-center rounded-full bg-fg text-bg transition-transform hover:scale-105">→</button>
            </div>
          </div>
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <button onClick={() => focus(null)} className={`pill glass !px-4 !py-2 text-[14px] ${active ? "" : "opacity-50"}`}>
              {t(U.overview)}
            </button>
            <a href={ctaHref} target="_blank" rel="noreferrer" className="pill pill-blue !px-4 !py-2 text-[14px]">
              {t(U.cta)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concept;
