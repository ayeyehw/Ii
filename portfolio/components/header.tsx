import React, { useEffect, useState } from "react";
import { COPY, whatsappHref } from "../constants";
import { useLang, useT } from "../lib/lang";
import { scrollToId } from "../lib/motion";

export const LangSwitch = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-line p-1 text-[13px] font-semibold" role="group" aria-label="Idioma">
      {(["es", "pt"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-3 py-1 uppercase transition-colors duration-300 ${lang === l ? "bg-fg text-bg" : "text-mute hover:text-fg"}`}>
          {l}
        </button>
      ))}
    </div>
  );
};

const Header = () => {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [solid, setSolid] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString(lang === "pt" ? "pt-BR" : "es", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [lang]);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    ["inicio", ...COPY.nav.map((n) => n.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-bg/60 backdrop-blur-xl" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top,0px)" }}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="text-[20px] font-light tracking-[-0.03em]">
          alejandro<span className="text-blue">.</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {COPY.nav.map((n) => {
            const on = active === n.href;
            return (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className={`relative rounded-full px-4 py-2 text-[15px] transition-all duration-500 ${on ? "font-semibold text-fg" : "text-mute hover:text-fg"}`}>
                {t(n.label)}
                <span className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-fg transition-all duration-500 ${on ? "opacity-100" : "scale-x-0 opacity-0"}`} />
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch />
          <span className="text-[15px] tabular-nums text-mute">{time}</span>
          <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="pill pill-light !py-2.5">
            {t(COPY.cta)}
          </a>
        </div>
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="pill pill-line !px-5 !py-2 lg:hidden">
          {open ? "✕" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="wrap grid gap-1 pb-6 lg:hidden">
          {COPY.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="py-3 text-3xl font-light tracking-tight">
              {t(n.label)}
            </a>
          ))}
          <div className="mt-3 flex items-center justify-between">
            <LangSwitch />
            <a href={whatsappHref(lang)} target="_blank" rel="noreferrer" className="pill pill-light !py-2.5">
              {t(COPY.cta)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
