import React from "react";

interface Props {
  items: string[];
  className?: string;
  speed?: string;
  reverse?: boolean;
  separator?: string;
  itemClassName?: string;
}

const Ticker = ({ items, className = "", speed = "35s", reverse, separator = "✦", itemClassName = "" }: Props) => {
  const row = (key: string) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={key === "b"}>
      {items.map((t, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          <span className="px-5">{t}</span>
          <span className="opacity-70">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee ${reverse ? "reverse" : ""}`} style={{ ["--speed" as any]: speed }}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
};

export default Ticker;
