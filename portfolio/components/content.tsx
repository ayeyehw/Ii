import React from "react";
import { CONTENT_LINK, CONTENT_VIDEOS } from "../constants";
import Title from "./title";

const Content = () => (
  <section className="pink-band px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-7xl">
      <Title kicker="Redes & creación" big="Mi propio" script="contenido" align="center" />
      <p data-reveal className="mx-auto mt-6 max-w-xl text-center text-lg text-ink/70">
        Comparto procesos, tips y el detrás de cámara de cada proyecto.
      </p>
      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
        {CONTENT_VIDEOS.map((v, i) => (
          <a
            key={v.title}
            href={CONTENT_LINK.href}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className={`group block ${i % 2 ? "md:mt-12" : ""}`}
          >
            <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-ink bg-ink shadow-[6px_6px_0_#16121a] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
              <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
              <img src={v.image} alt={v.title} loading="lazy" className="block aspect-[9/16] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <p className="mt-4 text-center font-bold">{v.title}</p>
            <p className="text-center text-sm text-ink/60">{v.caption}</p>
          </a>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href={CONTENT_LINK.href} target="_blank" rel="noreferrer" className="btn btn-lime">
          {CONTENT_LINK.label} ↗
        </a>
      </div>
    </div>
  </section>
);

export default Content;
