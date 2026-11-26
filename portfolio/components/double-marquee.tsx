import React from "react";
import { COPY } from "../constants";
import { useLang } from "../lib/lang";

const CHIP = ["bg-caramel", "bg-mint text-foam", "bg-sky", "bg-berry text-foam", "bg-butter", "bg-cocoa text-foam"];

/** Colors assigned so no two neighbours repeat, including across the loop seam. */
const colorize = (n: number, offset: number) => {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    let c = CHIP[(i * 2 + offset) % CHIP.length];
    if (out[i - 1] === c) c = CHIP[(i * 2 + offset + 1) % CHIP.length];
    out.push(c);
  }
  return out;
};

const Row = ({ items, offset, rev }: { items: string[]; offset: number; rev?: boolean }) => {
  const colors = colorize(items.length, offset);
  const row = (k: string) => (
    <div key={k} className="flex shrink-0 gap-4 pr-4" aria-hidden={k === "b"}>
      {items.map((it, i) => (
        <span key={it} className={`display whitespace-nowrap rounded-full border-[3px] border-ink px-8 py-4 text-[clamp(1.4rem,3vw,2.6rem)] lowercase ${colors[i]}`}>
          {it}
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden">
      <div className={`marquee flex w-max ${rev ? "rev" : ""}`} style={{ ["--d" as any]: rev ? "46s" : "38s" }}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
};

const DoubleMarquee = () => {
  const { lang } = useLang();
  return (
    <section className="overflow-hidden py-16" aria-label={COPY.marquee.top[lang].join(", ")}>
      <div className="grid -rotate-2 gap-4">
      <Row items={COPY.marquee.top[lang]} offset={0} />
      <Row items={COPY.marquee.bottom[lang]} offset={3} rev />
      </div>
    </section>
  );
};

export default DoubleMarquee;
