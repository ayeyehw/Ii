import React from "react";
import { Category, SERVICES } from "../constants";
import { scrollToId } from "../lib/motion";
import Title from "./title";

const Services = ({ onPick }: { onPick: (c: Category) => void }) => (
  <section id="rubros" className="bg-cream px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-7xl">
      <Title kicker="Explorá por rubro" big="¿Qué" script="hago?" />
      <ul className="mt-14 border-t-2 border-ink">
        {SERVICES.map((s, i) => (
          <li key={s.title} data-reveal className="border-b-2 border-ink">
            <button
              onClick={() => {
                onPick(s.category);
                scrollToId("#galeria");
              }}
              className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-6 text-left md:gap-10 md:py-8"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-blush transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="relative text-sm font-bold text-ink/40 md:text-base">0{i + 1}</span>
              <span className="relative">
                <span className="font-display text-3xl uppercase transition-transform duration-500 group-hover:translate-x-3 md:text-6xl inline-block">
                  {s.title} <span className="script text-berry normal-case">{s.script}</span>
                </span>
                <span className="mt-1 block max-w-xl overflow-hidden text-sm text-ink/70 transition-all duration-500 md:mt-0 md:max-h-0 md:text-lg md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-24 md:group-hover:opacity-100">
                  {s.description}
                </span>
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-xl transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-lime md:h-14 md:w-14">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;
