import React, { useEffect, useRef } from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";
import { gsap } from "../lib/motion";

/** A blob that trails the pointer and pops open with a word over things you can use. */
const CursorBubble = () => {
  const t = useT();
  const blob = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const words = useRef({ view: "", drag: "", talk: "" });
  words.current = { view: t(COPY.cursor.view), drag: t(COPY.cursor.drag), talk: t(COPY.cursor.talk) };

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("bubble-on");
    const el = blob.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.25 });
    const qx = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let mode = "";
    let lx = 0;

    const onMove = (e: PointerEvent) => {
      qx(e.clientX);
      qy(e.clientY);
      const stretch = gsap.utils.clamp(-0.25, 0.25, (e.clientX - lx) / 120);
      lx = e.clientX;
      const target = (e.target as HTMLElement).closest?.("[data-cursor], a, button") as HTMLElement | null;
      const next = target ? target.dataset.cursor || (target.tagName === "A" || target.tagName === "BUTTON" ? "dot" : "") : "";
      if (next !== mode) {
        mode = next;
        const text = (words.current as any)[mode] || "";
        label.current!.textContent = text;
        gsap.to(el, {
          scale: text ? 1 : mode === "dot" ? 0.5 : 0.25,
          backgroundColor: mode === "talk" ? "#25D366" : mode === "drag" ? "#F3D36B" : "#1B1411",
          color: mode === "drag" || mode === "talk" ? "#1B1411" : "#FFF6EA",
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }
      gsap.to(el, { scaleX: (mode ? 1 : 0.25) * (1 + Math.abs(stretch)), duration: 0.3, overwrite: "auto" });
    };
    const leave = () => gsap.to(el, { scale: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { scale: 0.25, duration: 0.2 });
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.body.classList.remove("bubble-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div
      ref={blob}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-24 w-24 items-center justify-center rounded-full bg-ink text-foam md:flex"
    >
      <span ref={label} className="hand text-[26px] leading-none" />
    </div>
  );
};

export default CursorBubble;
