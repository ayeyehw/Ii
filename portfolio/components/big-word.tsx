import React, { useEffect, useRef } from "react";
import { COPY } from "../constants";
import { useLang, useT } from "../lib/lang";
import { gsap, prefersReducedMotion } from "../lib/motion";

const COLORS = ["text-ink", "text-caramel", "text-ink", "text-mint", "text-ink", "text-berry", "text-ink", "text-sky"];
const STICK = ["cup", "star", "heart", "smile", "bean"];

/** Pinned section: a giant word slides across while its letters bounce in one by one. */
const BigWord = () => {
  const t = useT();
  const { lang } = useLang();
  const pin = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const move = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".bw-item").forEach((el) => {
        gsap.from(el, {
          yPercent: gsap.utils.random(-70, 70),
          rotate: gsap.utils.random(-25, 25),
          scale: 0.6,
          duration: 1,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: { trigger: el, containerAnimation: move, start: "left 95%", toggleActions: "play none none reverse" },
        });
      });
    }, pin);
    return () => ctx.revert();
  }, [lang]);

  const letters = t(COPY.big).split("");
  let s = 0;

  return (
    <section ref={pin} className="relative flex h-[100svh] items-center overflow-hidden bg-bg" aria-label={t(COPY.big)}>
      <div ref={track} className="flex w-max items-center gap-[1vw] pl-[60vw] pr-[20vw]" aria-hidden>
        {letters.map((ch, i) =>
          ch === " " ? (
            <img key={i} src={`/stickers/${STICK[s++ % STICK.length]}.svg`} alt="" className="bw-item mx-[3vw] h-[16vw] w-[16vw] max-h-[260px] max-w-[260px]" />
          ) : (
            <span key={i} className={`bw-item display inline-block text-[34vw] leading-none lg:text-[28vw] ${COLORS[i % COLORS.length]}`}>
              {ch}
            </span>
          )
        )}
      </div>
    </section>
  );
};

export default BigWord;
