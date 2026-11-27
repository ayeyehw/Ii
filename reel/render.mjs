// Renders a composition in Spanish, Portuguese and English.
// Uso: COMP=TikTok node render.mjs es,pt,en  → out/tiktok-{es,pt,en}.mp4  (COMP por defecto: Reel)
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { renameSync } from "node:fs";

const browserExecutable = process.env.REMOTION_BROWSER || undefined;
const langs = (process.argv[2] || "es,pt,en").split(",");
const id = process.env.COMP || "Reel";

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const lang of langs) {
  const inputProps = { lang };
  const composition = await selectComposition({ serveUrl, id, inputProps, browserExecutable });
  const outputLocation = `out/${id.toLowerCase()}-${lang}.mp4`;
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
  // Loudness for social media (-14 LUFS), video stream untouched
  const tmp = outputLocation.replace(".mp4", ".tmp.mp4");
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", outputLocation, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=9", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", tmp]);
  if (r.status === 0) renameSync(tmp, outputLocation);
  console.log(`\n✔ ${outputLocation}`);
}
