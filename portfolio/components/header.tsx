import React, { useEffect, useState } from "react";
import { AVAILABILITY, NAME, NAV } from "../constants";
import { scrollToId } from "../lib/motion";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="gutter sticky top-0 z-40 border-b border-ink bg-paper/90 backdrop-blur-sm" style={{ paddingTop: "env(safe-area-inset-top,0px)" }}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 md:grid-cols-[1fr_auto_1fr]">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="font-display text-lg font-extrabold uppercase" style={{ fontStretch: "72%" }}>
          {NAME}
        </a>
        <nav className="hidden gap-7 md:flex">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="link-draw text-[15px] font-medium">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center justify-end gap-3 md:flex">
          <span className="slug !text-ink">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-flame align-middle" />
            {AVAILABILITY}
          </span>
          <span className="slug tabular-nums">BRT {time}</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menú"
          className="font-mono text-xs md:hidden"
          style={{ fontStretch: "85%" }}
        >
          {open ? "Cerrar ×" : "Menú +"}
        </button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-ink py-4 md:hidden">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="display py-1 text-5xl uppercase" style={{ ["--w" as any]: "70%" }}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
