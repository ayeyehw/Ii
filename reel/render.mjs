// Renders the portfolio reel in Spanish, Portuguese and English: out/reel-{es,pt,en}.mp4
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";

const browserExecutable = process.env.REMOTION_BROWSER || undefined;
const langs = (process.argv[2] || "es,pt,en").split(",");

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const lang of langs) {
  const inputProps = { lang };
  const composition = await selectComposition({ serveUrl, id: "Reel", inputProps, browserExecutable });
  const outputLocation = `out/reel-${lang}.mp4`;
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    crf: 20,
    pixelFormat: "yuv420p",
    outputLocation,
    inputProps,
    browserExecutable,
    chromiumOptions: { gl: "swangle" },
    onProgress: ({ progress }) => process.stdout.write(`\r${lang}: ${Math.round(progress * 100)}%   `),
  });
  console.log(`\n✔ ${outputLocation}`);
}
