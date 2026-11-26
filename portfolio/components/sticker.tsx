import React, { useEffect, useRef } from "react";
import { makeThrowable } from "../lib/physics";

/** A hand-drawn sticker you can grab and throw; it springs back to its spot. */
const Sticker = ({ name, className = "", style }: { name: string; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => makeThrowable(ref.current!), []);
  return (
    <div ref={ref} data-cursor="drag" className={`sticker select-none ${className}`} style={style}>
      <img src={`/stickers/${name}.svg`} alt="" draggable={false} className="pointer-events-none h-full w-full drop-shadow-[3px_4px_0_rgba(27,20,17,.25)]" />
    </div>
  );
};

export default Sticker;
