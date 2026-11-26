import { gsap } from "./motion";

/**
 * Makes an element draggable with a throw: it follows the pointer, flies off with the
 * release velocity, then springs back home with an elastic bounce.
 */
export const makeThrowable = (el: HTMLElement, opts: { home?: boolean } = {}) => {
  let dragging = false;
  let sx = 0, sy = 0, ox = 0, oy = 0;
  let lx = 0, ly = 0, lt = 0, vx = 0, vy = 0;

  const down = (e: PointerEvent) => {
    dragging = true;
    el.setPointerCapture(e.pointerId);
    gsap.killTweensOf(el);
    sx = e.clientX; sy = e.clientY;
    ox = Number(gsap.getProperty(el, "x")); oy = Number(gsap.getProperty(el, "y"));
    lx = e.clientX; ly = e.clientY; lt = performance.now(); vx = vy = 0;
    gsap.to(el, { scale: 1.12, rotate: "+=" + (Math.random() * 16 - 8), duration: 0.3, ease: "back.out(3)" });
    el.style.zIndex = "30";
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lt);
    vx = vx * 0.6 + ((e.clientX - lx) / dt) * 0.4;
    vy = vy * 0.6 + ((e.clientY - ly) / dt) * 0.4;
    lx = e.clientX; ly = e.clientY; lt = now;
    gsap.set(el, { x: ox + e.clientX - sx, y: oy + e.clientY - sy, rotate: gsap.utils.clamp(-25, 25, vx * 12) });
  };
  const up = () => {
    if (!dragging) return;
    dragging = false;
    el.style.zIndex = "";
    const x = Number(gsap.getProperty(el, "x")) + vx * 220;
    const y = Number(gsap.getProperty(el, "y")) + vy * 220;
    const tl = gsap.timeline();
    tl.to(el, { x, y, rotate: vx * 30, scale: 1, duration: 0.55, ease: "power3.out" });
    if (opts.home !== false) tl.to(el, { x: 0, y: 0, rotate: 0, duration: 1.4, ease: "elastic.out(1, 0.45)" }, "+=0.35");
  };

  el.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  el.style.touchAction = "none";
  return () => {
    el.removeEventListener("pointerdown", down);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
  };
};

/** Gentle random rotation on hover, like a sticker being nudged. */
export const wiggle = (el: HTMLElement, amount = 8) => {
  const on = () =>
    gsap.fromTo(el, { rotate: 0 }, { keyframes: [{ rotate: amount }, { rotate: -amount * 0.7 }, { rotate: amount * 0.4 }, { rotate: 0 }], duration: 0.6, ease: "sine.inOut", overwrite: true });
  el.addEventListener("mouseenter", on);
  return () => el.removeEventListener("mouseenter", on);
};
