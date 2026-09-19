// One-off / repeatable video optimizer for public/media.
// Re-encodes to H.264 (universally playable), caps width at 1280px, CRF 26.
// Run: node scripts/optimize-videos.mjs
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import { readdir, stat, rm, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
const files = (await readdir(dir)).filter((f) => /\.mp4$/i.test(f));

for (const file of files) {
  const path = join(dir, file);
  const before = (await stat(path)).size;
  const tmp = path + ".tmp.mp4";

  const args = [
    "-y",
    "-i", path,
    "-vf", "scale='min(1280,iw)':-2",
    "-c:v", "libx264",
    "-crf", "26",
    "-preset", "medium",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "160k",
    "-movflags", "+faststart",
    tmp,
  ];

  console.log(`encoding ${file} (${(before / 1e6).toFixed(1)}MB)...`);
  const res = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (res.status !== 0) {
    console.log(`FAILED ${file}`);
    await rm(tmp, { force: true });
    continue;
  }
  const after = (await stat(tmp)).size;
  await rm(path);
  await rename(tmp, path);
  console.log(
    `${file}: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB`,
  );
}

console.log("done");
