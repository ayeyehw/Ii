import React from "react";

interface Props {
  kicker?: string;
  big: string;
  script: string;
  className?: string;
  light?: boolean;
  align?: "left" | "center";
}

/** Título editorial: palabra en mayúsculas + palabra en cursiva. */
const Title = ({ kicker, big, script, className = "", light, align = "left" }: Props) => (
  <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
    {kicker && (
      <p
        data-reveal
        className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${
          light ? "text-cream/60" : "text-ink/50"
        }`}
      >
        {kicker}
      </p>
    )}
    <h2
      data-reveal
      className={`font-display uppercase leading-[0.9] text-[10vw] sm:text-6xl md:text-7xl ${
        light ? "text-cream" : "text-ink"
      }`}
    >
      {big}
      <span className="script block text-berry text-[13vw] sm:text-7xl md:text-8xl -mt-1 md:-mt-3 ml-6 md:ml-14">
        {script}
      </span>
    </h2>
  </div>
);

export default Title;
