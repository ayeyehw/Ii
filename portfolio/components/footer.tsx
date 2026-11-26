import React, { useEffect, useRef } from "react";
import { COPY, EMAIL, NAME, SOCIAL, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { wiggle } from "../lib/physics";
import { fireScribble } from "./scribble";

const PILES = [
  { n: "cup", c: "left-[4%] top-[8%] w-24 md:w-36" },
  { n: "star", c: "right-[6%] top-[4%] w-20 md:w-32" },
  { n: "heart", c: "left-[12%] bottom-[22%] w-16 md:w-24" },
  { n: "smile", c: "right-[14%] bottom-[30%] w-20 md:w-28" },
  { n: "bean", c: "left-[44%] top-[2%] w-14 md:w-20" },
  { n: "hand", c: "left-[24%] top-[12%] w-16 md:w-24" },
];

/** Big call to action. Swipe the mouse fast near the stickers and they get knocked away. */
const Footer = () => {
  const t = useT();
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const offs = Array.from(el.querySelectorAll<HTMLElement>("[data-wig]")).map((w) => wiggle(w, 12));
    if (prefersReducedMotion()) return () => offs.forEach((o) => o());
    const stickers = Array.from(el.querySelectorAll<HTMLElement>(".ft-st"));
    let lx = 0, ly = 0, lt = performance.now();
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lt);
      const vx = (e.clientX - lx) / dt;
      const vy = (e.clientY - ly) / dt;
      lx = e.clientX; ly = e.clientY; lt = now;
      const speed = Math.hypot(vx, vy);
      if (speed < 0.6) return;
      stickers.forEach((s) => {
        const r = s.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        if (d > 170) return;
        const k = (1 - d / 170) * Math.min(speed, 4);
        gsap.timeline({ overwrite: true })
          .to(s, { x: `+=${vx * 60 * k}`, y: `+=${vy * 60 * k}`, rotate: `+=${vx * 40 * k}`, duration: 0.35, ease: "power3.out" })
          .to(s, { x: 0, y: 0, rotate: 0, duration: 1.6, ease: "elastic.out(1, 0.35)" }, "+=0.2");
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      offs.forEach((o) => o());
    };
  }, []);

  return (
    <footer id="contacto" ref={root} className="relative overflow-hidden rounded-t-[48px] border-t-[3px] border-ink bg-caramel pb-8 pt-28">
      {PILES.map((p) => (
        <img key={p.n} src={`/stickers/${p.n}.svg`} alt="" aria-hidden className={`ft-st pointer-events-none absolute ${p.c}`} />
      ))}
      <div className="wrap relative text-center">
        <p className="hand -rotate-2 text-[32px]">{lang === "pt" ? "e aí, bora?" : "¿y si empezamos?"}</p>
        <h2 className="display mx-auto mt-2 max-w-5xl text-[clamp(2.8rem,9vw,8.5rem)]">{t(COPY.contact.title)}</h2>
        <p className="mx-auto mt-6 max-w-xl text-[19px] font-medium">{t(COPY.contact.sub)}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" data-cursor="talk" className="pill bg-wa !px-8 !py-4 text-[18px]">
            {t(COPY.whatsapp)} ↗
          </a>
          <a href={`mailto:${EMAIL}`} className="pill pill-foam !px-8 !py-4 text-[18px]">
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="wrap relative mt-24 flex flex-col items-center justify-between gap-6 border-t-[3px] border-ink pt-6 md:flex-row">
        <button onClick={fireScribble} className="display text-[22px] lowercase" data-wig>
          alejandro.
        </button>
        <ul className="flex flex-wrap justify-center gap-3">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" data-wig className="pill pill-foam inline-block !px-4 !py-1.5 text-[14px]">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[14px] font-semibold">© {new Date().getFullYear()} {NAME}</p>
      </div>
    </footer>
  );
};

export default Footer;
