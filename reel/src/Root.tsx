import React from "react";
import { Composition } from "remotion";
import { Reel, REEL_FRAMES } from "./Reel";
import { TikTok, timeline } from "./TikTok";

export const Root: React.FC = () => (
  <>
    {/* Presentación del portafolio */}
    <Composition id="Reel" component={Reel} durationInFrames={REEL_FRAMES} fps={30} width={1080} height={1920} defaultProps={{ lang: "es" as const }} />
    {/* Versión TikTok: gancho, cortes rápidos, sin precios */}
    <Composition
      id="TikTok"
      component={TikTok}
      durationInFrames={500}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ lang: "es" as const, voice: true }}
      calculateMetadata={({ props }) => ({ durationInFrames: timeline(props.lang, props.voice ?? true).total })}
    />
  </>
);
