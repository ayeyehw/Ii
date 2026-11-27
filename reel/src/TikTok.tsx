import "@fontsource-variable/figtree/wght.css";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Lang, PHONE, TT } from "./copy";

const BG = "#08090A";
const FG = "#EDEFEA";
const BLUE = "#2F6BFF";
const GREEN = "#3FA37C";
const WA = "#25D366";
const FONT = '"Figtree Variable", "Noto Color Emoji", system-ui, sans-serif';

// Beat grid: cuts land every 14 frames (~128 bpm at 30 fps) so music lines up easily.
const T = {
  hook: [0, 42],
  then: [42, 30],
  cuts: [72, 84],
  count: [156, 72],
  logo: [228, 48],
  more: [276, 62],
  question: [338, 56],
  cta: [394, 96],
} as const;
export const TIKTOK_FRAMES = 490;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Words pop in one by one, like TikTok captions. The highlighted line sits on one blue block. */
const PopWords: React.FC<{ lines: string[]; size: number; highlight?: number; start?: number; gap?: number }> = ({ lines, size, highlight = -1, start = 0, gap = 3 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let w = 0;
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {lines.map((line, li) => {
        const hl = li === highlight;
        const first = w;
        const box = spring({ frame: f - start - first * gap, fps, config: { damping: 12, stiffness: 200, mass: 0.6 } });
        return (
          <div
            key={li}
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: size * 0.22,
              marginTop: li ? size * (hl ? 0.22 : 0.12) : 0,
              padding: hl ? `${size * 0.06}px ${size * 0.26}px ${size * 0.1}px` : 0,
              background: hl ? BLUE : "transparent",
              borderRadius: hl ? size * 0.2 : 0,
              transform: hl ? `scale(${0.5 + 0.5 * box}) rotate(-2deg)` : undefined,
              opacity: hl ? Math.min(1, box * 1.5) : 1,
            }}
          >
            {line.split(" ").map((word, wi) => {
              const s = spring({ frame: f - start - w++ * gap, fps, config: { damping: 11, stiffness: 220, mass: 0.6 } });
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    fontSize: size,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    color: FG,
                    transform: `scale(${0.4 + 0.6 * s})`,
                    opacity: Math.min(1, s * 1.4),
                    textShadow: hl ? "none" : "0 6px 30px rgba(0,0,0,.65)",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/** White flash on a cut. */
const Flash: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const o = interpolate(f - at, [0, 1, 5], [0, 0.85, 0], clamp);
  return o > 0 ? <AbsoluteFill style={{ background: "#fff", opacity: o, pointerEvents: "none" }} /> : null;
};

/** Short camera shake after a slam. */
const useShake = (at: number, strength = 18) => {
  const f = useCurrentFrame();
  const k = interpolate(f - at, [0, 10], [1, 0], clamp);
  return k > 0 ? `translate(${(random(`x${f}`) - 0.5) * strength * k}px, ${(random(`y${f}`) - 0.5) * strength * k}px)` : undefined;
};

const Seq: React.FC<{ at: readonly [number, number]; children: React.ReactNode }> = ({ at, children }) => (
  <Sequence from={at[0]} durationInFrames={at[1]}>
    {children}
  </Sequence>
);

const Glow: React.FC<{ color: string; y?: number }> = ({ color, y = 50 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(70% 45% at 50% ${y}%, ${color}, rgba(8,9,10,0) 70%)` }} />
);

export const TikTok: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = TT[lang];
  const [handle] = useState(() => delayRender("font"));
  useEffect(() => {
    document.fonts.load(`800 80px "Figtree Variable"`).then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, color: FG, overflow: "hidden" }}>
      {/* 1 + 2. Hook over the real product video */}
      <Sequence from={0} durationInFrames={T.then[0] + T.then[1]}>
        <HookVideo />
      </Sequence>
      <Seq at={T.hook}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 70px" }}>
          <PopWords lines={c.hook} size={118} highlight={2} gap={3} />
        </AbsoluteFill>
      </Seq>
      <Seq at={T.then}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 70px" }}>
          <PopWords lines={[c.then]} size={104} gap={2} />
          <Arrow />
        </AbsoluteFill>
      </Seq>

      {/* 3. Rapid cuts of the real pieces */}
      <Seq at={T.cuts}>
        <Cuts />
      </Seq>

      {/* 4. Counter */}
      <Seq at={T.count}>
        <Counter lang={lang} />
      </Seq>

      {/* 5. Mimi logo + what I did */}
      <Seq at={T.logo}>
        <LogoScene lang={lang} />
      </Seq>

      {/* 6. Akiba slam */}
      <Seq at={T.more}>
        <More lang={lang} />
      </Seq>

      {/* 7. Question */}
      <Seq at={T.question}>
        <AbsoluteFill style={{ background: BLUE }} />
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 60px" }}>
          <PopWords lines={c.question} size={104} gap={2} />
        </AbsoluteFill>
      </Seq>

      {/* 8. CTA */}
      <Seq at={T.cta}>
        <Cta lang={lang} />
      </Seq>

      {[T.cuts[0], T.count[0], T.logo[0], T.more[0] + 20, T.question[0], T.cta[0]].map((at) => (
        <Flash key={at} at={at} />
      ))}
    </AbsoluteFill>
  );
};

const HookVideo: React.FC = () => {
  const f = useCurrentFrame();
  // punch-in on the beat when the hook finishes
  const z = interpolate(f, [0, 40, 42, 72], [1.12, 1.18, 1.32, 1.24], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${z})` }}>
        <OffthreadVideo src={staticFile("mimi/rolinho.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "rgba(8,9,10,.45)" }} />
    </AbsoluteFill>
  );
};

const Arrow: React.FC = () => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 3) * 14;
  const o = interpolate(f, [8, 14], [0, 1], clamp);
  return <div style={{ fontSize: 120, marginTop: 40, opacity: o, transform: `translateY(${bob}px)` }}>👇</div>;
};

const PIECES = ["cookie-brownie", "cappuccino", "bubble-waffle", "suco-laranja", "cheesecake-1", "rolinho"];

const Cuts: React.FC = () => {
  const f = useCurrentFrame();
  const per = 14;
  const i = Math.min(PIECES.length - 1, Math.floor(f / per));
  const local = f - i * per;
  const z = interpolate(local, [0, per], [1.22, 1.06], { ...clamp, easing: Easing.out(Easing.cubic) });
  const rot = (i % 2 ? 1 : -1) * interpolate(local, [0, per], [3, 0], clamp);
  const blur = interpolate(local, [0, 3], [14, 0], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter: "blur(40px) brightness(.55)", transform: "scale(1.2)" }}>
        <Img src={staticFile(`mimi/${PIECES[i]}.webp`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Img
          src={staticFile(`mimi/${PIECES[i]}.webp`)}
          style={{ width: 900, borderRadius: 36, transform: `scale(${z}) rotate(${rot}deg)`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, boxShadow: "0 50px 120px -30px rgba(0,0,0,.8)" }}
        />
      </AbsoluteFill>
      {PIECES.map((_, k) => (k ? <Flash key={k} at={k * per} /> : null))}
    </AbsoluteFill>
  );
};

const Counter: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = TT[lang];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.round(interpolate(f, [4, 40], [0, 7000], { ...clamp, easing: Easing.out(Easing.quad) }));
  const text = lang === "en" ? n.toLocaleString("en-US") : n.toLocaleString("de-DE");
  const bump = spring({ frame: f - 40, fps, config: { damping: 8, stiffness: 240 } });
  const shake = useShake(40, 26);
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <Glow color={`rgba(47,107,255,${0.25 + 0.35 * bump})`} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 250, fontWeight: 800, letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums", transform: `scale(${1 + 0.12 * bump - 0.12 * bump * interpolate(f, [40, 60], [0, 1], clamp)})`, textShadow: `0 0 ${60 * bump}px rgba(141,174,255,.9)` }}>
          {text}
        </div>
        <div style={{ fontSize: 58, fontWeight: 600, marginTop: 10, opacity: interpolate(f, [10, 20], [0, 1], clamp) }}>{c.statLabel}</div>
        <div style={{ marginTop: 60, display: "inline-flex", alignItems: "center", gap: 16, padding: "16px 30px", borderRadius: 999, background: "rgba(63,163,124,.18)", border: `2px solid ${GREEN}`, fontSize: 40, opacity: interpolate(f, [44, 52], [0, 1], clamp) }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: GREEN }} /> Mimi Café
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LogoScene: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = TT[lang];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Glow color="rgba(217,56,94,.28)" y={42} />
      <Img src={staticFile("mimi/logo.webp")} style={{ width: 640, borderRadius: "50%", transform: `scale(${0.5 + 0.5 * s}) rotate(${(1 - s) * -20}deg)`, boxShadow: "0 40px 100px -20px rgba(0,0,0,.8)" }} />
      <div style={{ display: "flex", gap: 20, marginTop: 70 }}>
        {c.tags.map((tag, i) => {
          const p = spring({ frame: f - 10 - i * 5, fps, config: { damping: 12, stiffness: 200 } });
          return (
            <span key={tag} style={{ padding: "18px 34px", borderRadius: 999, background: i === 1 ? BLUE : "rgba(237,239,234,.1)", fontSize: 46, fontWeight: 700, transform: `scale(${p})` }}>
              {tag}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const More: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = TT[lang];
  const f = useCurrentFrame();
  const slam = interpolate(f, [20, 26], [1.6, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const o = interpolate(f, [20, 22], [0, 1], clamp);
  const shake = useShake(26, 30);
  return (
    <AbsoluteFill style={{ transform: shake }}>
      {f < 22 ? (
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 70px" }}>
          <PopWords lines={c.more} size={124} highlight={1} gap={3} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Glow color="rgba(179,50,46,.45)" />
          <Img src={staticFile("akiba/cover.webp")} style={{ width: 760, borderRadius: 48, transform: `scale(${slam}) rotate(-3deg)`, opacity: o, boxShadow: "0 0 0 5px rgba(237,239,234,.95), 0 60px 120px -30px rgba(0,0,0,.8)" }} />
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 70, opacity: o }}>Akiba Cookies 🍪</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Cta: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = TT[lang];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 16, fps, config: { damping: 11, stiffness: 160 } });
  const pulse = 1 + Math.sin(f / 5) * 0.025 * Math.min(1, Math.max(0, (f - 30) / 10));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 70px" }}>
      <Glow color="rgba(47,107,255,.35)" y={40} />
      <Glow color="rgba(15,77,58,.45)" y={85} />
      <PopWords lines={[c.cta]} size={130} gap={3} />
      <div style={{ marginTop: 80, transform: `scale(${p * pulse})` }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "36px 58px", borderRadius: 999, background: FG, color: BG, fontSize: 50, fontWeight: 800 }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: WA }} />
          {c.btn}
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, marginTop: 36 }}>{PHONE}</div>
      </div>
      <div style={{ position: "absolute", top: 260, fontSize: 64, fontWeight: 300, letterSpacing: "-0.03em", opacity: interpolate(f, [30, 40], [0, 1], clamp) }}>
        alejandro<span style={{ color: BLUE }}>.</span>
      </div>
    </AbsoluteFill>
  );
};
