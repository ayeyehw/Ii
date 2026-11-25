import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/motion";

const PATCHES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

/** Page progress as a printer's colour bar: tint patches fill in as you read. */
const InkMeter = () => {
  const [p, setP] = useState(0);
  const last = useRef(-1);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const v = Math.round(self.progress * 100);
        if (v !== last.current) {
          last.current = v;
          setP(v);
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed bottom-4 right-4 z-50 hidden items-center gap-3 border border-ink bg-sheet px-3 py-2 sm:flex"
      style={{ marginBottom: "env(safe-area-inset-bottom,0px)" }}
    >
      <div className="flex">
        {PATCHES.map((t, i) => (
          <span
            key={t}
            className="h-4 w-3 border-r border-sheet transition-colors duration-300"
            style={{ background: p >= (i + 1) * 10 - 5 ? `color-mix(in srgb, #0F0F0E ${t}%, #F8F7F4)` : "transparent", outline: "1px solid #0F0F0E1a" }}
          />
        ))}
        <span className="ml-1 h-4 w-3" style={{ background: p > 50 ? "#1430E6" : "transparent", outline: "1px solid #0F0F0E1a" }} />
        <span className="h-4 w-3" style={{ background: p > 90 ? "#FF4A1C" : "transparent", outline: "1px solid #0F0F0E1a" }} />
      </div>
      <span className="font-mono text-[11px] tabular-nums" style={{ fontStretch: "85%" }}>
        Tinta {String(p).padStart(2, "0")}%
      </span>
    </div>
  );
};

export default InkMeter;
