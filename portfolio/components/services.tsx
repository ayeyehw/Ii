import React from "react";
import { SERVICES } from "../constants";
import SectionHead from "./section-head";

/** Services as a type specimen: hovering a row drives the font's width and weight axes. */
const Services = () => (
  <section id="servicios" className="gutter py-24 md:py-36">
    <SectionHead plate="A" label="Servicios" meta="Cuatro placas, una sola marca" title="Qué hago" />
    <ul className="mt-10 border-t border-ink md:mt-14">
      {SERVICES.map((s) => (
        <li key={s.plate} className="spec-row group grid cursor-default grid-cols-[2.25rem_1fr] items-center gap-x-4 gap-y-2 border-b border-ink py-5 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:gap-8 md:py-6" tabIndex={0}>
          <span className="font-mono text-xs" style={{ fontStretch: "85%" }}>{s.plate}</span>
          <span className="spec-word display block overflow-hidden whitespace-nowrap text-[clamp(2.8rem,9vw,8rem)] uppercase leading-[0.95]">
            {s.name}
          </span>
          <p className="col-start-2 max-w-md text-[15px] leading-snug text-mute transition-colors duration-500 group-hover:text-ink md:col-start-3">
            {s.detail}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default Services;
