import React, { useCallback, useEffect, useRef, useState } from "react";
import { BRANDS, COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";

const W = COPY.work;

/**
 * The work as a console library: a row of tiles; the focused one grows with a light ring,
 * the backdrop crossfades to that brand's art and the info panel updates.
 * Mouse hover, click, or the ← → keys move the focus.
 */
const Library = () => {
  const t = useT();
  const { lang } = useLang();
  const [focus, setFocus] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const section = useRef<HTMLElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const brand = BRANDS[focus];

  const select = useCallback((i: number) => setFocus((i + BRANDS.length) % BRANDS.length), []);

  // Info panel eases in on every change, and the page light follows the brand colour
  useEffect(() => {
    if (inView.current) window.dispatchEvent(new CustomEvent("bg-tint", { detail: brand.accent }));
    if (prefersReducedMotion() || !info.current) return;
    gsap.fromTo(info.current.children, { opacity: 0, y: 14, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.05, ease: "power3.out", overwrite: true });
  }, [focus, brand.accent]);

  // Arrow keys while the section is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      if (e.isIntersecting) window.dispatchEvent(new CustomEvent("bg-tint", { detail: BRANDS[focus].accent }));
    }, { threshold: 0.45 });
    io.observe(section.current!);
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        return;
      }
      if (!inView.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        select(focus + (e.key === "ArrowRight" ? 1 : -1));
      }
      if (e.key === "Enter" && document.activeElement?.closest?.("[data-tile]")) setOpen(focus);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [focus, open, select]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (open !== null) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <section id="trabajo" ref={section} data-tint={brand.accent} className="relative overflow-hidden py-28 lg:min-h-[100svh] lg:py-0">
      {/* Backdrop art */}
      <div aria-hidden className="absolute inset-0">
        {BRANDS.map((b, i) => {
          const style = { opacity: i === focus ? (b.video ? 0.7 : 0.55) : 0, transform: i === focus ? "scale(1)" : "scale(1.06)" };
          const cls = "absolute right-0 top-0 h-full w-full object-cover transition-all duration-[1.2s] ease-out lg:w-[62%]";
          return b.video ? (
            <BackdropVideo key={b.name} src={b.video} poster={b.poster} active={i === focus} className={cls} style={style} />
          ) : (
            <img key={b.name} src={b.cover} alt="" className={cls} style={style} />
          );
        })}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #08090A 0%, rgba(8,9,10,.92) 38%, rgba(8,9,10,.35) 70%, rgba(8,9,10,.6) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #08090A 0%, rgba(8,9,10,0) 45%, rgba(8,9,10,0) 80%, #08090A 100%)" }} />
      </div>

      <div className="wrap relative flex flex-col justify-center gap-10 lg:min-h-[100svh] lg:py-24">
        <div>
          <p data-reveal className="kicker">{t(W.kicker)}</p>
          <h2 data-reveal className="display text-[clamp(2.2rem,5vw,4.4rem)]">{t(W.title)}</h2>
        </div>

        <div>
          <div className="flex items-end gap-4 md:gap-6" role="listbox" aria-label={t(W.title)}>
            {BRANDS.map((b, i) => (
              <button
                key={b.name}
                data-tile
                role="option"
                aria-selected={i === focus}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => (i === focus ? setOpen(i) : select(i))}
                data-focus={i === focus}
                className={`focusable relative w-[28%] max-w-[170px] overflow-hidden rounded-2xl ${i === focus ? "" : "opacity-60"}`}
              >
                <img src={b.cover} alt={b.name} className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
            <a
              href={whatsappHref(lang)}
              target="_blank"
              rel="noreferrer"
              className="focusable glass flex aspect-[4/5] w-[28%] max-w-[170px] flex-col items-center justify-center gap-2 rounded-2xl p-3 text-center text-[14px] text-fg/80 max-sm:hidden"
            >
              <span className="text-3xl font-light">+</span>
              {t(W.yours)}
            </a>
          </div>
          <p className="mt-5 hidden text-[14px] text-mute md:block">{t(W.hint)}</p>
        </div>
        <div ref={info} className="max-w-xl" aria-live="polite">
          <p className="flex flex-wrap items-center gap-3 text-[15px] text-fg/70">
            <span>{t(brand.category)}</span>
            {brand.year && (
              <>
                <span className="h-1 w-1 rounded-full bg-fg/40" />
                <span>{brand.year}</span>
              </>
            )}
            {brand.example ? (
              <span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] uppercase tracking-wider text-mute">{t(W.example)}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green/60 px-2.5 py-0.5 text-[12px] uppercase tracking-wider text-fg">
                <span className="h-1.5 w-1.5 rounded-full bg-green-lt" />
                {t(W.real)}
              </span>
            )}
          </p>
          <h3 className="mt-2 text-[clamp(2.2rem,4.4vw,3.8rem)] font-light leading-none tracking-[-0.04em]">{brand.name}</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-fg/75">{t(brand.summary)}</p>
          {brand.results && (
            <dl className="mt-6 grid gap-2 lg:grid-cols-3 lg:gap-3">
              {brand.results.map((res) => (
                <div key={res.label.es} className="glass flex items-baseline gap-3 rounded-2xl px-4 py-3 lg:block">
                  <dt className="text-[clamp(1.1rem,2vw,1.6rem)] font-semibold tracking-tight">{t(res.value)}</dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-fg/60">{t(res.label)}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {brand.scope[lang].map((s) => (
              <li key={s} className="glass rounded-full px-3.5 py-1.5 text-[14px]">{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button data-open-detail onClick={() => setOpen(focus)} className="pill pill-light">{t(W.view)}</button>
            {brand.link && (
              <a href={brand.link} target="_blank" rel="noreferrer" className="pill glass">{brand.linkLabel || t(W.visit)} ↗</a>
            )}
          </div>
        </div>

      </div>

      {open !== null && <Detail i={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

/** Muted looping video that only plays while its brand is selected (and never with reduced motion). */
const BackdropVideo = ({ src, poster, active, className, style }: { src: string; poster?: string; active: boolean; className: string; style: React.CSSProperties }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && !prefersReducedMotion()) v.play().catch(() => {});
    else v.pause();
  }, [active]);
  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="metadata" className={className} style={style}>
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
};

const Detail = ({ i, onClose }: { i: number; onClose: () => void }) => {
  const t = useT();
  const { lang } = useLang();
  const b = BRANDS[i];
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(box.current, { opacity: 0, scale: 0.96, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(box.current!.querySelectorAll(".dt-img"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.15, ease: "power3.out" });
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label={b.name} onClick={onClose} className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/70 p-4 backdrop-blur-2xl md:p-10" data-lenis-prevent>
      <div ref={box} onClick={(e) => e.stopPropagation()} className="glass relative max-h-full w-full max-w-6xl overflow-y-auto rounded-[28px] p-6 md:p-10">
        <button onClick={onClose} className="pill glass absolute right-5 top-5 !px-4 !py-2 text-[14px]" autoFocus>
          {t(COPY.work.close)} ✕
        </button>
        <p className="text-[15px] text-fg/60">{t(b.category)}{b.year ? ` · ${b.year}` : ""}</p>
        <h3 className="mt-2 text-[clamp(2.2rem,5vw,4rem)] font-light leading-none tracking-[-0.04em]">{b.name}</h3>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg/75">{t(b.summary)}</p>
        {b.results && (
          <dl className="mt-6 flex flex-wrap gap-3">
            {b.results.map((res) => (
              <div key={res.label.es} className="glass rounded-2xl px-5 py-3">
                <dt className="text-[24px] font-semibold tracking-tight">{t(res.value)}</dt>
                <dd className="text-[13px] text-fg/60">{t(res.label)}</dd>
              </div>
            ))}
          </dl>
        )}
        {/* Every piece shown whole, at its own proportions */}
        <div className={`mt-8 gap-4 ${b.gallery.length + (b.video ? 1 : 0) > 1 ? "columns-1 sm:columns-2 lg:columns-3" : "max-w-3xl"}`}>
          {b.video && (
            <video
              poster={b.poster}
              muted
              loop
              playsInline
              autoPlay={!prefersReducedMotion()}
              controls={prefersReducedMotion()}
              className="dt-img mb-4 w-full break-inside-avoid rounded-2xl"
            >
              <source src={b.video.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={b.video} type="video/mp4" />
            </video>
          )}
          {(b.gallery.length ? b.gallery : [b.cover]).map((g, k) => (
            <img key={g} src={g} alt={`${b.name}: ${k + 1}`} loading="lazy" className="dt-img mb-4 w-full break-inside-avoid rounded-2xl" />
          ))}
        </div>
        {b.link && (
          <a href={b.link} target="_blank" rel="noreferrer" className="pill pill-light mt-2">{b.linkLabel || t(COPY.work.visit)} ↗</a>
        )}
        <p className="mt-6 text-[14px] text-mute">{t(COPY.work.scope)}: {b.scope[lang].join(" · ")}</p>
      </div>
    </div>
  );
};

export default Library;
