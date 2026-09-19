// One-off / repeatable image optimizer for public/media.
// Resizes to a max 1600px edge and re-encodes as WebP (replacing the original).
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, rm, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
const MAX = 1600;
const QUALITY = 80;
const SKIP_BELOW = 1_000_000; // skip already-optimized webp files (< 1MB)

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const file of files) {
  const input = join(dir, file);
  const base = basename(file, extname(file));
  const output = join(dir, base + ".webp");
  const before = (await stat(input)).size;

  // skip files already converted to webp and small enough
  if (file.toLowerCase().endsWith(".webp") && before < SKIP_BELOW) {
    console.log(`skip (already webp + small): ${file}`);
    continue;
  }

  try {
    await sharp(input, { failOn: "none" })
      .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output + ".tmp");
    const after = (await stat(output + ".tmp")).size;
    await rename(output + ".tmp", output);
    if (input.toLowerCase() !== output.toLowerCase()) {
      await rm(input); // remove the original jpg/png after converting
    }
    console.log(
      `${file} -> ${base}.webp: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`,
    );
  } catch (err) {
    console.log(`FAILED ${file}: ${err.message}`);
    await rm(output + ".tmp", { force: true });
  }
}

console.log("done");
