import React, { useEffect, useRef } from "react";
import { COPY, WORK_IMAGES, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";
import { Arrow, WaIcon } from "./icons";

const I = WORK_IMAGES;
const COL_A = [I.logo, I.cheesecake1, I.waffle];
const COL_B = [I.cappuccino, I.cheesecake2, I.logo];
const ROW = [I.logo, I.cappuccino, I.cheesecake1, I.waffle, I.cheesecake2];

const Tile = ({ img }: { img: { src: string; w: number; h: number } }) => (
  <div className="overflow-hidden rounded-2xl bg-panel" style={{ aspectRatio: `${img.w}/${img.h}` }}>
    <img src={img.src} alt="" className="h-full w-full object-cover" />
  </div>
);

const Hero = () => {
  const t = useT();
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hx-word", { yPercent: 110, duration: 1.2, stagger: 0.045 })
        .from(".hx-fade", { opacity: 0, y: 18, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(".hx-gallery", { opacity: 0, scale: 0.96, duration: 1.4 }, "-=1.1");
      gsap.to(".hx-gallery", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  const words = t(COPY.hero.title).split(" ");

  return (
    <section id="inicio" ref={root} className="relative overflow-hidden pt-[72px]">
      <div className="wrap grid items-center gap-12 pb-16 pt-10 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-10 lg:pt-0">
        <div>
          <p className="hx-fade mb-7 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 text-[14px] text-mute">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
            </span>
            {t(COPY.hero.status)}
          </p>
          <h1 className="h-display text-[clamp(2.7rem,6.2vw,5.6rem)]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="hx-word inline-block">{w}&nbsp;</span>
              </span>
            ))}
          </h1>
          <p className="hx-fade mt-7 max-w-[34rem] text-[19px] leading-relaxed text-mute">{t(COPY.hero.sub)}</p>
          <div className="hx-fade mt-9 flex flex-wrap gap-3">
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="btn btn-light">
              <WaIcon /> {t(COPY.whatsapp)}
            </a>
            <a href="#trabajo" onClick={(e) => { e.preventDefault(); scrollToId("#trabajo"); }} className="btn btn-ghost">
              {t(COPY.hero.secondary)} <Arrow />
            </a>
          </div>
          <p className="hx-fade mt-6 text-[14px] text-mute">{t(COPY.hero.langs)}</p>
        </div>

        {/* Desktop: two columns of work drifting in opposite directions */}
        <div className="hx-gallery fade-y relative hidden h-[min(86svh,860px)] grid-cols-2 gap-4 overflow-hidden lg:grid">
          {[COL_A, COL_B].map((col, ci) => (
            <div key={ci} className="overflow-hidden">
              <div className={`marquee-y flex flex-col gap-4 ${ci ? "rev" : ""}`} style={{ ["--d" as any]: ci ? "48s" : "40s" }}>
                {[...col, ...col].map((img, i) => (
                  <Tile key={i} img={img} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: one row of work sliding sideways */}
      <div className="hx-gallery fade-x overflow-hidden pb-14 lg:hidden">
        <div className="marquee-x flex w-max gap-3" style={{ ["--d" as any]: "36s" }}>
          {[...ROW, ...ROW].map((img, i) => (
            <div key={i} className="h-64 shrink-0" style={{ width: `${(16 * img.w) / img.h}rem` }}>
              <Tile img={img} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
