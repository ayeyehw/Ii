import React from "react";
import { COPY } from "../constants";
import { useT } from "../lib/lang";

/** Only renders once a real client quote is filled in constants.ts. */
const Testimonial = () => {
  const t = useT();
  const q = COPY.testimonial;
  if (!t(q.quote)) return null;
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <figure className="wrap max-w-5xl">
        <blockquote data-reveal className="font-serif text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.15]">“{t(q.quote)}”</blockquote>
        <figcaption data-reveal className="mt-8 text-[16px] text-mute">
          {q.author} · {t(q.role)}
        </figcaption>
      </figure>
    </section>
  );
};

export default Testimonial;
