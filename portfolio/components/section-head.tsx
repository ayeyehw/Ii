import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  plate: string;
  label: string;
  meta?: string;
  title: string;
  id?: string;
}

/**
 * Section opener: a proof slug line, then a title that "lands" on the press,
 * going from thin and condensed to full width and weight.
 */
const SectionHead = ({ plate, label, meta, title }: Props) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const t = root.current!.querySelector<HTMLElement>(".sh-title")!;
      const state = { w: 50, wg: 120, ls: 0.25 };
      const apply = () => {
        t.style.setProperty("--w", `${state.w}%`);
        t.style.setProperty("--wg", `${state.wg}`);
        t.style.letterSpacing = `${state.ls}em`;
      };
      apply();
      gsap.to(state, {
        w: 118,
        wg: 850,
        ls: -0.02,
        duration: 1.5,
        ease: "expo.out",
        onUpdate: apply,
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sh-rule", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="slug !text-ink">
          <span className="mr-3 inline-flex h-6 w-6 items-center justify-center border border-ink align-middle">{plate}</span>
          {label}
        </p>
        {meta && <p className="slug hidden text-right sm:block">{meta}</p>}
      </div>
      <div className="sh-rule mt-3 h-px bg-ink" />
      <h2 className="sh-title display mt-6 text-[clamp(3.2rem,11vw,10rem)] uppercase" style={{ ["--w" as any]: "118%", ["--wg" as any]: 850 }}>
        {title}
      </h2>
    </div>
  );
};

export default SectionHead;
