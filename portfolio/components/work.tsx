import React from "react";
import { COPY, WORK_IMAGES } from "../constants";
import { useLang, useT } from "../lib/lang";
import { Arrow } from "./icons";

const W = COPY.work;
const I = WORK_IMAGES;

const Shot = ({ k, className = "" }: { k: keyof typeof I; className?: string }) => {
  const t = useT();
  const img = I[k];
  const caption = t(W.captions[k]);
  return (
    <figure className={className}>
      <div data-clip className="group overflow-hidden rounded-3xl bg-panel" style={{ aspectRatio: `${img.w}/${img.h}` }}>
        <img
          data-parallax
          src={img.src}
          alt={`Mimi Café: ${caption}`}
          loading="lazy"
          className="h-full w-full scale-[1.06] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.1]"
        />
      </div>
      <figcaption data-reveal className="mt-4 text-[15px] text-mute">{caption}</figcaption>
    </figure>
  );
};

const Work = () => {
  const t = useT();
  const { lang } = useLang();

  return (
    <section id="trabajo" className="py-24 lg:py-36">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 lg:flex-row lg:items-end">
          <div>
            <p data-reveal className="kicker mb-4">{t(W.kicker)}</p>
            <h2 data-reveal className="h-display text-[clamp(3.4rem,10vw,9rem)]">{W.client}</h2>
          </div>
          <div data-reveal className="lg:text-right">
            <p className="text-[17px]">{t(W.place)}</p>
            <a href={W.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-[15px] text-mute transition-colors hover:text-fg">
              {t(W.linkLabel)} <Arrow />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Shot k="logo" />
          <Shot k="cappuccino" className="md:mt-24" />
        </div>

        <div className="my-20 grid gap-12 lg:my-28 lg:grid-cols-3 lg:gap-10">
          {W.blocks.map((b) => (
            <div key={b.title.es} data-reveal>
              <h3 className="mb-4 text-[22px] font-semibold tracking-tight">{t(b.title)}</h3>
              <p className="text-[17px] leading-relaxed text-mute">{t(b.text)}</p>
            </div>
          ))}
          <div data-reveal>
            <h3 className="mb-4 text-[22px] font-semibold tracking-tight">{t(W.deliverablesTitle)}</h3>
            <ul className="flex flex-wrap gap-2">
              {W.deliverables[lang].map((d) => (
                <li key={d} className="rounded-full border border-line px-4 py-1.5 text-[15px]">{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          <Shot k="cheesecake1" />
          <Shot k="waffle" className="md:mt-32" />
          <Shot k="cheesecake2" className="md:mt-12" />
        </div>
      </div>
    </section>
  );
};

export default Work;
