// Placeholder artwork for the concept burger brand, drawn on <canvas>.
// Every piece can be replaced by a real image via CONCEPT.images in constants.ts.
import { CONCEPT, PieceId } from "../constants";

const C = CONCEPT.colors;
const FONT = '"Figtree Variable", "Arial Black", sans-serif';

type Ctx = CanvasRenderingContext2D;

const SIZES: Record<PieceId, [number, number]> = {
  logo: [1024, 1024],
  banner: [1600, 640],
  post: [1080, 1350],
  sign: [1400, 420],
  menuBoard: [1600, 900],
  placemat: [1400, 1000],
  tent: [700, 900],
  carta: [800, 1100],
  box: [800, 800],
  bag: [700, 900],
  cup: [1200, 500],
};

const roundRect = (ctx: Ctx, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Stylised burger, centred at (cx, cy), roughly s wide. */
const BUN = "#D9822B";
const burger = (ctx: Ctx, cx: number, cy: number, s: number) => {
  const w = s, u = s / 10;
  ctx.save();
  ctx.translate(cx - w / 2, cy - s * 0.42);
  // top bun
  ctx.fillStyle = BUN;
  ctx.beginPath();
  ctx.moveTo(0, u * 3.4);
  ctx.bezierCurveTo(0, -u * 0.6, w, -u * 0.6, w, u * 3.4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = C.cream;
  [[2.4, 1.6], [4.6, 1.0], [6.8, 1.5], [3.6, 2.4], [5.8, 2.3]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.ellipse(x * u, y * u, u * 0.32, u * 0.18, -0.4, 0, Math.PI * 2);
    ctx.fill();
  });
  // lettuce
  ctx.fillStyle = "#4CAF50";
  ctx.beginPath();
  ctx.moveTo(-u * 0.3, u * 3.6);
  for (let i = 0; i <= 10; i++) ctx.quadraticCurveTo(i * u - u * 0.5, u * (i % 2 ? 4.6 : 3.6), i * u, u * 3.9);
  ctx.lineTo(w + u * 0.3, u * 3.4);
  ctx.closePath();
  ctx.fill();
  // cheese
  ctx.fillStyle = "#FFC93C";
  ctx.beginPath();
  ctx.moveTo(-u * 0.2, u * 4.1);
  ctx.lineTo(w + u * 0.2, u * 4.1);
  ctx.lineTo(w * 0.72, u * 5.4);
  ctx.lineTo(w * 0.6, u * 4.6);
  ctx.lineTo(w * 0.3, u * 5.6);
  ctx.lineTo(w * 0.2, u * 4.6);
  ctx.closePath();
  ctx.fill();
  // patty
  ctx.fillStyle = "#5A2E1A";
  roundRect(ctx, -u * 0.2, u * 4.4, w + u * 0.4, u * 1.6, u * 0.8);
  ctx.fill();
  // bottom bun
  ctx.fillStyle = BUN;
  roundRect(ctx, 0, u * 6.2, w, u * 1.8, u * 0.7);
  ctx.fill();
  ctx.restore();
};

const wordmark = (ctx: Ctx, cx: number, cy: number, size: number, color: string, sub = true, subColor = color) => {
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${size}px ${FONT}`;
  ctx.fillText(CONCEPT.name, cx, cy);
  if (sub) {
    ctx.font = `700 ${size * 0.22}px ${FONT}`;
    ctx.fillStyle = subColor;
    (ctx as any).letterSpacing = `${size * 0.06}px`;
    ctx.fillText(CONCEPT.tagline.toUpperCase(), cx, cy + size * 0.62);
    (ctx as any).letterSpacing = "0px";
  }
};

const provisional = (ctx: Ctx, w: number, h: number, dark = false) => {
  ctx.font = `600 ${Math.max(14, w * 0.018)}px ${FONT}`;
  ctx.fillStyle = dark ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.35)";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText("provisional", w - w * 0.025, h - h * 0.02);
};

const DRAW: Record<PieceId, (ctx: Ctx, w: number, h: number) => void> = {
  logo: (ctx, w, h) => {
    ctx.fillStyle = C.cream;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.red;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.42, 0, Math.PI * 2);
    ctx.fill();
    burger(ctx, w / 2, h * 0.36, w * 0.34);
    wordmark(ctx, w / 2, h * 0.62, w * 0.16, C.cream, true, C.mustard);
  },
  banner: (ctx, w, h) => {
    ctx.fillStyle = C.red;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.mustard;
    ctx.beginPath();
    ctx.arc(w * 0.78, h * 0.55, h * 0.62, 0, Math.PI * 2);
    ctx.fill();
    burger(ctx, w * 0.78, h * 0.52, h * 0.78);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = C.cream;
    ctx.font = `900 ${h * 0.26}px ${FONT}`;
    ctx.fillText("SMASH", w * 0.06, h * 0.42);
    ctx.fillStyle = C.ink;
    ctx.fillText("IT.", w * 0.06, h * 0.7);
    ctx.fillStyle = C.cream;
    roundRect(ctx, w * 0.06, h * 0.78, w * 0.17, h * 0.12, h * 0.06);
    ctx.fill();
    ctx.fillStyle = C.red;
    ctx.font = `800 ${h * 0.06}px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(CONCEPT.name + " ›", w * 0.145, h * 0.86);
  },
  post: (ctx, w, h) => {
    ctx.fillStyle = C.mustard;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.ink;
    ctx.textAlign = "center";
    ctx.font = `900 ${w * 0.15}px ${FONT}`;
    ctx.fillText("DOUBLE", w / 2, h * 0.17);
    ctx.fillStyle = C.red;
    ctx.fillText("CHEESE", w / 2, h * 0.3);
    burger(ctx, w / 2, h * 0.6, w * 0.62);
    ctx.fillStyle = C.ink;
    roundRect(ctx, w * 0.3, h * 0.84, w * 0.4, h * 0.08, h * 0.04);
    ctx.fill();
    ctx.fillStyle = C.cream;
    ctx.font = `800 ${w * 0.045}px ${FONT}`;
    ctx.fillText("$ 7.90", w / 2, h * 0.895);
  },
  sign: (ctx, w, h) => {
    ctx.fillStyle = C.ink;
    ctx.fillRect(0, 0, w, h);
    ctx.shadowColor = C.mustard;
    ctx.shadowBlur = h * 0.12;
    wordmark(ctx, w * 0.56, h * 0.42, h * 0.48, C.mustard, true, C.cream);
    ctx.shadowBlur = 0;
    burger(ctx, w * 0.16, h * 0.5, h * 0.62);
  },
  menuBoard: (ctx, w, h) => {
    ctx.fillStyle = C.ink;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.red;
    ctx.fillRect(0, 0, w, h * 0.16);
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillStyle = C.cream;
    ctx.font = `900 ${h * 0.09}px ${FONT}`;
    ctx.fillText("MENU", w * 0.04, h * 0.08);
    ctx.textAlign = "right";
    ctx.font = `800 ${h * 0.05}px ${FONT}`;
    ctx.fillText(CONCEPT.name + " · " + CONCEPT.tagline, w * 0.96, h * 0.08);
    const items = [["Classic", "6.90"], ["Double Cheese", "7.90"], ["Bacon Smash", "8.50"], ["Crispy Chicken", "7.50"], ["Fries", "2.90"], ["Shake", "3.50"]];
    items.forEach(([n, p], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = w * (0.05 + col * 0.48), y = h * (0.3 + row * 0.22);
      ctx.textAlign = "left";
      ctx.fillStyle = C.cream;
      ctx.font = `800 ${h * 0.065}px ${FONT}`;
      ctx.fillText(n, x, y);
      ctx.fillStyle = C.mustard;
      ctx.textAlign = "right";
      ctx.fillText("$" + p, x + w * 0.42, y);
      ctx.fillStyle = "rgba(255,243,223,.25)";
      ctx.fillRect(x, y + h * 0.06, w * 0.42, 2);
    });
    burger(ctx, w * 0.5, h * 0.92, h * 0.12);
    provisional(ctx, w, h, true);
  },
  placemat: (ctx, w, h) => {
    ctx.fillStyle = C.cream;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.globalAlpha = 0.18;
    for (let y = 0; y < 6; y++) for (let x = 0; x < 8; x++) burger(ctx, (x + (y % 2) * 0.5) * w / 7, (y + 0.5) * h / 5.4, w * 0.06);
    ctx.restore();
    ctx.strokeStyle = C.red;
    ctx.lineWidth = w * 0.012;
    roundRect(ctx, w * 0.04, h * 0.05, w * 0.92, h * 0.9, w * 0.03);
    ctx.stroke();
    ctx.fillStyle = C.red;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, h * 0.24, 0, Math.PI * 2);
    ctx.fill();
    wordmark(ctx, w / 2, h * 0.47, h * 0.13, C.cream, true, C.mustard);
    provisional(ctx, w, h);
  },
  tent: (ctx, w, h) => {
    ctx.fillStyle = C.red;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.cream;
    ctx.textAlign = "center";
    ctx.font = `900 ${w * 0.13}px ${FONT}`;
    ctx.fillText("COMBO", w / 2, h * 0.2);
    ctx.fillStyle = C.mustard;
    ctx.fillText("DEL DÍA", w / 2, h * 0.34);
    burger(ctx, w / 2, h * 0.6, w * 0.6);
    ctx.fillStyle = C.cream;
    ctx.font = `800 ${w * 0.07}px ${FONT}`;
    ctx.fillText(CONCEPT.name, w / 2, h * 0.9);
  },
  carta: (ctx, w, h) => {
    ctx.fillStyle = C.cream;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.red;
    ctx.fillRect(0, 0, w, h * 0.22);
    wordmark(ctx, w / 2, h * 0.1, w * 0.13, C.cream, true, C.mustard);
    const items = ["Classic", "Double Cheese", "Bacon Smash", "Crispy Chicken", "Veggie", "Fries", "Onion Rings", "Shake"];
    items.forEach((n, i) => {
      const y = h * (0.3 + i * 0.08);
      ctx.textAlign = "left";
      ctx.fillStyle = C.ink;
      ctx.font = `800 ${w * 0.045}px ${FONT}`;
      ctx.fillText(n, w * 0.1, y);
      ctx.textAlign = "right";
      ctx.fillStyle = C.red;
      ctx.fillText("$" + (5.5 + i * 0.6).toFixed(2), w * 0.9, y);
    });
    provisional(ctx, w, h);
  },
  box: (ctx, w, h) => {
    ctx.fillStyle = C.kraft;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.red;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.3, 0, Math.PI * 2);
    ctx.fill();
    burger(ctx, w / 2, h * 0.4, w * 0.24);
    wordmark(ctx, w / 2, h * 0.6, w * 0.11, C.cream, false);
  },
  bag: (ctx, w, h) => {
    ctx.fillStyle = C.kraft;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = C.red;
    ctx.fillRect(0, h * 0.78, w, h * 0.22);
    burger(ctx, w / 2, h * 0.36, w * 0.42);
    wordmark(ctx, w / 2, h * 0.6, w * 0.17, C.ink, true, C.red);
  },
  cup: (ctx, w, h) => {
    ctx.fillStyle = C.red;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 3; i++) {
      const cx = (i + 0.5) * (w / 3);
      burger(ctx, cx, h * 0.38, h * 0.3);
      wordmark(ctx, cx, h * 0.68, h * 0.14, C.cream, false);
    }
  },
};

const fontReady = async () => {
  try {
    await (document as any).fonts?.load(`900 40px "Figtree Variable"`);
  } catch {}
};

/** Returns a canvas (placeholder) or an image (real design) for a piece. */
export const pieceSource = async (id: PieceId): Promise<HTMLCanvasElement | HTMLImageElement> => {
  const src = CONCEPT.images[id];
  if (src) {
    const img = new Image();
    img.src = src;
    await img.decode().catch(() => {});
    if (img.naturalWidth) return img;
  }
  await fontReady();
  const [w, h] = SIZES[id];
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  DRAW[id](c.getContext("2d")!, w, h);
  return c;
};

/** Data URL for use in <img> (brand reveal slides and the no-WebGL fallback). */
export const pieceURL = async (id: PieceId): Promise<string> => {
  const src = CONCEPT.images[id];
  if (src) return src;
  const c = (await pieceSource(id)) as HTMLCanvasElement;
  return c.toDataURL("image/png");
};

export const pieceAspect = (id: PieceId) => SIZES[id][0] / SIZES[id][1];
