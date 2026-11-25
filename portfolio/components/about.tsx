import React from "react";
import { ABOUT, NAME } from "../constants";
import CropMarks from "./crop-marks";
import HalftoneImage from "./halftone-image";
import SectionHead from "./section-head";

const About = () => (
  <section id="perfil" className="gutter py-24 md:py-36">
    <SectionHead plate="C" label="Perfil" meta="Quién firma el trabajo" title="Perfil" />
    <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-6">
      <figure className="relative md:col-span-4">
        <HalftoneImage src={ABOUT.photo} alt={`Retrato de ${NAME}`} w={800} h={1000} ink="#0F0F0E" step={7} loupe={false} />
        <CropMarks />
        <figcaption className="slug mt-4">Retrato · reemplazar por foto real</figcaption>
      </figure>
      <div className="md:col-span-7 md:col-start-6">
        {ABOUT.text.map((t, i) => (
          <p key={i} className={`${i === 0 ? "text-3xl md:text-[2.6rem] font-medium leading-[1.08] tracking-tight" : "mt-6 max-w-xl text-lg text-mute"}`}>
            {t}
          </p>
        ))}
        <div className="mt-12 border-t border-ink">
          {ABOUT.timeline.map(([when, what]) => (
            <div key={when} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-rule py-3 md:grid-cols-[11rem_1fr]">
              <span className="font-mono text-xs tabular-nums pt-1" style={{ fontStretch: "85%" }}>{when}</span>
              <span className="text-lg">{what}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
