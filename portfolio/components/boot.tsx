import React, { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/** Short console-style boot: the wordmark breathes in, then the screen fades open. */
const Boot = () => {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return setDone(true);
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });
    tl.fromTo(".bt-mark", { opacity: 0, scale: 0.92, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" })
      .fromTo(".bt-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.3")
      .to(".bt-mark", { opacity: 0, scale: 1.04, filter: "blur(10px)", duration: 0.5, ease: "power2.in" }, "+=0.15")
      .to(root.current, { opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.15");
    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;
  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <div className="bt-mark text-center">
        <p className="text-[clamp(1.8rem,4vw,2.8rem)] font-light tracking-[-0.03em]">
          alejandro<span className="text-blue">.</span>
        </p>
        <div className="bt-line mx-auto mt-4 h-px w-40 origin-left bg-gradient-to-r from-blue via-fg to-green-lt" />
      </div>
    </div>
  );
};

export default Boot;
