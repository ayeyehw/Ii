import React, { useEffect, useState } from "react";
import { COPY, NAME, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { scrollToId } from "../lib/motion";

export const LangSwitch = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-line p-1 text-[13px] font-medium" role="group" aria-label="Idioma / Idioma">
      {(["es", "pt"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase transition-colors ${lang === l ? "bg-fg text-bg" : "text-mute hover:text-fg"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const t = useT();
  const { lang } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30);
    on();
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="text-[17px] font-semibold tracking-tight">
          {NAME}
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {COPY.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="text-[15px] text-mute transition-colors hover:text-fg">
              {t(n.label)}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="btn btn-light !py-2.5 !px-5 text-[15px]">
            {t(COPY.cta)}
          </a>
        </div>
        <button className="text-[15px] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "✕" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="wrap grid gap-5 pb-8 pt-2 lg:hidden">
          {COPY.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="text-3xl font-semibold tracking-tight">
              {t(n.label)}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4">
            <LangSwitch />
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="btn btn-light !py-2.5">
              {t(COPY.cta)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
