// Generates poster images (still frames) for the Off-the-Clock videos.
// Run: node scripts/generate-posters.mjs
import { execFileSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import { readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");

const videos = (await readdir(dir)).filter((f) => f.endsWith(".mp4"));

for (const file of videos) {
  const name = file.replace(/\.mp4$/, "");
  const tmp = join(dir, `${name}-poster.jpg`);
  const out = join(dir, `${name}-poster.webp`);

  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-ss",
      "0.5",
      "-i",
      join(dir, file),
      "-frames:v",
      "1",
      "-vf",
      "scale=1280:-2",
      tmp,
    ],
    { stdio: "ignore" },
  );

  await sharp(tmp)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  await rm(tmp);
  console.log(`${name}-poster.webp generated`);
}
console.log("done");
