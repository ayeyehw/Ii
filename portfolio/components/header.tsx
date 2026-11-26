import React, { useEffect, useRef, useState } from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { scrollToId } from "../lib/motion";
import { wiggle } from "../lib/physics";
import { fireScribble } from "./scribble";

export const LangSwitch = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border-[2.5px] border-ink bg-foam p-0.5 text-[13px] font-bold" role="group" aria-label="Idioma">
      {(["es", "pt"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-3 py-1 uppercase transition-colors ${lang === l ? "bg-ink text-foam" : ""}`}>
          {l}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const t = useT();
  const { lang } = useLang();
  const logo = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => wiggle(logo.current!, 10), []);
  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? "-translate-y-[120%]" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <div className="wrap flex items-center justify-between gap-4 pt-4">
        <a
          ref={logo}
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            fireScribble();
          }}
          className="display inline-block rounded-full border-[2.5px] border-ink bg-caramel px-5 py-2 text-[18px] lowercase"
        >
          alejandro.
        </a>
        <nav className="hidden items-center gap-1 rounded-full border-[2.5px] border-ink bg-foam p-1 lg:flex">
          {COPY.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="rounded-full px-4 py-1.5 text-[15px] font-semibold transition-colors hover:bg-butter">
              {t(n.label)}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitch />
          <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" data-cursor="talk" className="pill pill-ink !py-2">
            {t(COPY.cta)}
          </a>
        </div>
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="pill pill-foam !px-5 !py-2 lg:hidden">
          {open ? "✕" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="wrap mt-3 lg:hidden">
          <div className="grid gap-1 rounded-3xl border-[2.5px] border-ink bg-foam p-4">
            {COPY.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="display rounded-2xl px-3 py-3 text-2xl lowercase hover:bg-butter">
                {t(n.label)}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between px-2">
              <LangSwitch />
              <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="pill pill-ink !py-2">
                {t(COPY.cta)}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
