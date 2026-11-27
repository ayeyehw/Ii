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
import { COPY, Lang, PHONE } from "./copy";

const BG = "#08090A";
const FG = "#EDEFEA";
const BLUE = "#2F6BFF";
const GREEN = "#3FA37C";
const WA = "#25D366";
const FONT = '"Figtree Variable", system-ui, sans-serif';

// Scene timeline (30 fps)
const S = {
  intro: [0, 95],
  markets: [85, 85],
  mimi: [160, 235],
  akiba: [385, 85],
  whatIDo: [460, 120],
  packages: [570, 90],
  cta: [650, 120],
} as const;
export const REEL_FRAMES = 770;

const ease = Easing.bezier(0.2, 0.8, 0.2, 1);

/** Fades each scene in and out with a soft blur, like the portfolio. */
const Scene: React.FC<{ at: readonly [number, number]; children: React.ReactNode }> = ({ at, children }) => {
  const [from, dur] = at;
  return (
    <Sequence from={from} durationInFrames={dur}>
      <Fade dur={dur}>{children}</Fade>
    </Sequence>
  );
};

const Fade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blur = interpolate(f, [0, 12, dur - 12, dur], [12, 0, 0, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: o, filter: blur > 0.1 ? `blur(${blur}px)` : undefined }}>{children}</AbsoluteFill>;
};

/** Text that rises in after `delay` frames. */
const Rise: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay = 0, children, style }) => {
  const f = useCurrentFrame();
  const p = interpolate(f - delay, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 50}px)`, filter: `blur(${(1 - p) * 8}px)`, ...style }}>{children}</div>;
};

const Background: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dots = Array.from({ length: 46 }, (_, i) => {
    const x = random(`x${i}`) * 1080;
    const speed = 8 + random(`s${i}`) * 18;
    const y = (((random(`y${i}`) * 2100 - t * speed) % 2100) + 2100) % 2100 - 90;
    const r = 1.5 + random(`r${i}`) * 3;
    const a = 0.25 + 0.35 * Math.sin(t * 1.3 + i);
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, borderRadius: "50%", background: `rgba(220,232,255,${a})`, boxShadow: `0 0 ${r * 4}px rgba(141,174,255,${a})` }} />;
  });
  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 1500, height: 1500, left: 200 + Math.sin(t * 0.25) * 140, top: -500 + Math.cos(t * 0.2) * 120, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(47,107,255,.42), rgba(47,107,255,0))" }} />
      <div style={{ position: "absolute", width: 1400, height: 1400, left: -700 + Math.cos(t * 0.18) * 120, top: 1000 + Math.sin(t * 0.22) * 140, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(15,77,58,.6), rgba(15,77,58,0))" }} />
      {dots}
    </AbsoluteFill>
  );
};

const Pill: React.FC<{ children: React.ReactNode; dot?: string; style?: React.CSSProperties }> = ({ children, dot, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 18, padding: "18px 34px", borderRadius: 999, border: "2px solid rgba(237,239,234,.16)", background: "rgba(16,18,20,.55)", fontSize: 36, color: FG, ...style }}>
    {dot && <span style={{ width: 16, height: 16, borderRadius: "50%", background: dot }} />}
    {children}
  </div>
);

const Wordmark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div style={{ fontSize: size, fontWeight: 300, letterSpacing: "-0.03em", color: FG }}>
    alejandro<span style={{ color: BLUE }}>.</span>
  </div>
);

export const Reel: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = COPY[lang];
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender("font"));
  useEffect(() => {
    document.fonts.load(`300 80px "Figtree Variable"`).then(() => document.fonts.load(`700 80px "Figtree Variable"`)).then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: FG }}>
      <Background />

      {/* 1. Intro */}
      <Scene at={S.intro}>
        <AbsoluteFill style={{ padding: "0 90px", justifyContent: "center" }}>
          <Rise delay={0}><Wordmark /></Rise>
          <div style={{ marginTop: 70 }}>
            {c.lines.map((l, i) => (
              <Rise key={l} delay={12 + i * 7}>
                <div style={{ fontSize: 132, lineHeight: 1.02, letterSpacing: "-0.04em", fontWeight: i === 1 ? 650 : 300 }}>{l}</div>
              </Rise>
            ))}
          </div>
          <Rise delay={42} style={{ marginTop: 70 }}>
            <Pill dot={GREEN}>{c.status}</Pill>
          </Rise>
        </AbsoluteFill>
      </Scene>

      {/* 2. Markets & languages */}
      <Scene at={S.markets}>
        <AbsoluteFill style={{ padding: "0 90px", justifyContent: "center" }}>
          <Rise><div style={{ fontSize: 44, opacity: 0.6 }}>{c.marketsTitle}</div></Rise>
          {c.markets.map((m, i) => (
            <Rise key={m} delay={8 + i * 8}>
              <div style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 104, fontWeight: 600, letterSpacing: "-0.035em", marginTop: 26 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: BLUE, boxShadow: `0 0 30px ${BLUE}` }} />
                {m}
              </div>
            </Rise>
          ))}
          <Rise delay={40} style={{ marginTop: 80 }}><Pill>{c.langs}</Pill></Rise>
        </AbsoluteFill>
      </Scene>

      {/* 3. Mimi Café */}
      <Scene at={S.mimi}>
        <MimiScene lang={lang} />
      </Scene>

      {/* 4. Akiba */}
      <Scene at={S.akiba}>
        <AkibaScene lang={lang} />
      </Scene>

      {/* 5. What I do */}
      <Scene at={S.whatIDo}>
        <AbsoluteFill style={{ padding: "0 90px", justifyContent: "center" }}>
          <Rise><div style={{ fontSize: 108, fontWeight: 300, letterSpacing: "-0.045em", marginBottom: 50 }}>{c.doTitle}</div></Rise>
          {c.doItems.map(([title, sub], i) => (
            <Rise key={title} delay={10 + i * 9}>
              <div style={{ display: "flex", alignItems: "center", gap: 34, padding: "34px 0", borderTop: "2px solid rgba(237,239,234,.12)" }}>
                <span style={{ fontSize: 34, opacity: 0.45, fontVariantNumeric: "tabular-nums", width: 60 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontSize: 60, fontWeight: 600, letterSpacing: "-0.03em" }}>{title}</div>
                  <div style={{ fontSize: 36, opacity: 0.62, marginTop: 6 }}>{sub}</div>
                </div>
              </div>
            </Rise>
          ))}
        </AbsoluteFill>
      </Scene>

      {/* 6. Packages */}
      <Scene at={S.packages}>
        <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center" }}>
          <Rise><div style={{ fontSize: 96, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 60 }}>{c.packagesTitle}</div></Rise>
          {c.packages.map(([name, price], i) => (
            <Rise key={name} delay={10 + i * 9}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "44px 48px", marginBottom: 26, borderRadius: 40, border: `2px solid ${i === 1 ? "rgba(47,107,255,.55)" : "rgba(237,239,234,.12)"}`, background: i === 1 ? "rgba(47,107,255,.16)" : "rgba(16,18,20,.6)" }}>
                <span style={{ fontSize: 50, fontWeight: 600 }}>{name}</span>
                <span style={{ fontSize: 40, opacity: 0.8 }}>{price}</span>
              </div>
            </Rise>
          ))}
        </AbsoluteFill>
      </Scene>

      {/* 7. CTA */}
      <Scene at={S.cta}>
        <CtaScene lang={lang} fps={fps} />
      </Scene>
    </AbsoluteFill>
  );
};

const MimiScene: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = COPY[lang];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round(interpolate(f, [24, 80], [0, 7000], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const countText = lang === "en" ? count.toLocaleString("en-US") : count.toLocaleString("de-DE");
  const dim = interpolate(f, [100, 130], [0.62, 0.22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cards = ["cookie-brownie", "cappuccino", "bubble-waffle"];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: dim }}>
        <OffthreadVideo src={staticFile("mimi/rolinho.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,9,10,.2) 0%, rgba(8,9,10,0) 35%, rgba(8,9,10,.92) 78%, #08090A 100%)" }} />
      {/* product pieces fan in over the video */}
      {cards.map((k, i) => {
        const s = spring({ frame: f - 108 - i * 7, fps, config: { damping: 16, stiffness: 90 } });
        const rot = [-9, 0, 9][i];
        const x = [-250, 0, 250][i];
        return (
          <div key={k} style={{ position: "absolute", left: 540 - 190 + x * s, top: 260 + (i === 1 ? -30 : 20), width: 380, transform: `rotate(${rot * s}deg) scale(${0.6 + 0.4 * s})`, opacity: s, zIndex: i === 1 ? 3 : 2 }}>
            <Img src={staticFile(`mimi/${k}.webp`)} style={{ width: "100%", borderRadius: 32, boxShadow: "0 40px 80px -20px rgba(0,0,0,.7)" }} />
          </div>
        );
      })}
      <AbsoluteFill style={{ padding: "0 90px 150px", justifyContent: "flex-end" }}>
        <Rise delay={4}><Pill dot={GREEN} style={{ fontSize: 32, padding: "14px 28px" }}>{c.real}</Pill></Rise>
        <Rise delay={10}><div style={{ fontSize: 140, fontWeight: 300, letterSpacing: "-0.045em", marginTop: 30, lineHeight: 1 }}>Mimi Café</div></Rise>
        <Rise delay={16}><div style={{ fontSize: 40, opacity: 0.7, marginTop: 16 }}>{c.mimiSub} · {c.mimiRole}</div></Rise>
        <Rise delay={22} style={{ marginTop: 56 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
            <span style={{ fontSize: 150, fontWeight: 650, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>{countText}</span>
            <span style={{ fontSize: 40, opacity: 0.75, maxWidth: 380, lineHeight: 1.2 }}>{c.statLabel}</span>
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const AkibaScene: React.FC<{ lang: Lang }> = ({ lang }) => {
  const c = COPY[lang];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 4, fps, config: { damping: 15, stiffness: 80 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: 1100, height: 1100, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(179,50,46,.45), rgba(179,50,46,0))" }} />
      <div style={{ width: 640, transform: `scale(${0.7 + 0.3 * s}) rotate(${(1 - s) * -8}deg)`, opacity: s }}>
        <Img src={staticFile("akiba/cover.webp")} style={{ width: "100%", borderRadius: 44, boxShadow: "0 50px 100px -30px rgba(0,0,0,.8), 0 0 0 3px rgba(237,239,234,.9)" }} />
      </div>
      <Rise delay={14} style={{ marginTop: 70, textAlign: "center" }}>
        <Pill dot={GREEN} style={{ fontSize: 30, padding: "12px 26px" }}>{c.real}</Pill>
        <div style={{ fontSize: 112, fontWeight: 300, letterSpacing: "-0.045em", marginTop: 26 }}>Akiba Cookies</div>
        <div style={{ fontSize: 40, opacity: 0.7, marginTop: 10 }}>{c.akibaSub}</div>
      </Rise>
    </AbsoluteFill>
  );
};

const CtaScene: React.FC<{ lang: Lang; fps: number }> = ({ lang, fps }) => {
  const c = COPY[lang];
  const f = useCurrentFrame();
  const pop = spring({ frame: f - 26, fps, config: { damping: 12, stiffness: 110 } });
  const pulse = 1 + Math.sin(f / 7) * 0.015 * Math.min(1, Math.max(0, (f - 50) / 10));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 80px" }}>
      {c.cta.map((l, i) => (
        <Rise key={l} delay={i * 8}>
          <div style={{ fontSize: 128, lineHeight: 1.02, letterSpacing: "-0.045em", fontWeight: i === 1 ? 650 : 300 }}>{l}</div>
        </Rise>
      ))}
      <div style={{ marginTop: 90, transform: `scale(${(0.6 + 0.4 * pop) * pulse})`, opacity: pop }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "34px 56px", borderRadius: 999, background: FG, color: BG, fontSize: 46, fontWeight: 650 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: WA }} />
          {c.ctaBtn}
        </div>
        <div style={{ fontSize: 52, marginTop: 34, fontWeight: 600, letterSpacing: "0.01em" }}>{PHONE}</div>
      </div>
      <Rise delay={44} style={{ position: "absolute", bottom: 150 }}>
        <Wordmark size={58} />
      </Rise>
    </AbsoluteFill>
  );
};
