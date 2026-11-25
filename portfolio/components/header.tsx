import React, { useEffect, useState } from "react";
import { AVAILABILITY, NAME, NAV } from "../constants";
import { scrollToId } from "../lib/motion";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  const [first, ...rest] = NAME.split(" ");

  return (
    <>
      <div className="relative z-50 bg-ink py-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-lime">
        <span className="inline-block h-2 w-2 rounded-full bg-lime mr-2 animate-pulse align-middle" />
        {AVAILABILITY}
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-cream/80 backdrop-blur-md shadow-[0_1px_0_#16121a1a]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="leading-none">
            <span className="script text-3xl">{first.toLowerCase()}</span>
            <span className="font-display text-xl uppercase ml-1">{rest.join(" ")}</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="group relative text-xs font-bold uppercase tracking-[0.18em]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-berry transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contacto" onClick={(e) => go(e, "#contacto")} className="btn btn-lime !py-2 !px-5">
              Contáctame
            </a>
          </div>
          <button
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-lime lg:hidden"
          >
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </nav>
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-blush transition-all duration-500 lg:hidden ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {[...NAV, { label: "Contáctame", href: "#contacto" }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className={`font-display text-4xl uppercase transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 70}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
