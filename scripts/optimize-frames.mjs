/**
 * optimize-frames.mjs
 * Compresses all 160 cinematic frames:
 *   - Resizes from 1280×720 → 854×480
 *   - Re-encodes as JPEG quality 55 (in-place replacement)
 *   - Also produces WebP quality 60 in a /webp subfolder
 * Run: node scripts/optimize-frames.mjs
 */

import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dir   = fileURLToPath(new URL(".", import.meta.url));
const ROOT    = resolve(__dir, "..");
const FRAMES  = join(ROOT, "public", "cinematic", "scene-01", "frames");
const WEBP    = join(FRAMES, "webp");

const TARGET_W  = 854;
const TARGET_H  = 480;
const JPEG_Q    = 55;
const WEBP_Q    = 60;

async function humanBytes(bytes) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  console.log("📂  Reading frames from:", FRAMES);
  await mkdir(WEBP, { recursive: true });

  const all = (await readdir(FRAMES))
    .filter((f) => /^ezgif-frame-\d{3}\.jpg$/.test(f))
    .sort();

  if (!all.length) {
    console.error("❌  No frames found. Check path:", FRAMES);
    process.exit(1);
  }

  let totalBefore = 0;
  let totalAfter  = 0;
  let totalWebp   = 0;

  console.log(`🎞️   Processing ${all.length} frames...\n`);

  const concurrency = 2;
  let idx = 0;

  const worker = async () => {
    while (idx < all.length) {
      const file  = all[idx++];
      const input = join(FRAMES, file);

      // Read metadata to get original size
      const meta  = await sharp(input).metadata();
      const orig  = meta.size ?? 0;
      totalBefore += orig;

      const s = sharp(input, { failOn: "none" }).resize(TARGET_W, TARGET_H, {
        fit:      "cover",
        position: "center",
      });

      // Overwrite JPG: write to a .tmp file first, then rename (avoids read-lock conflict on Windows)
      const tmpJpeg = input + ".tmp";
      await s.clone().jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(tmpJpeg);
      const { rename, stat } = await import("fs/promises");
      const { size: afterSize } = await stat(tmpJpeg);
      totalAfter += afterSize;
      // Remove old + rename
      await import("fs/promises").then(({ unlink }) => unlink(input).catch(() => {}));
      await rename(tmpJpeg, input);

      // Write WebP sibling (new file, no conflict)
      const webpFile = join(WEBP, file.replace(/\.jpg$/, ".webp"));
      const webpBuf  = await s.clone().webp({ quality: WEBP_Q }).toBuffer();
      const { writeFile } = await import("fs/promises");
      await writeFile(webpFile, webpBuf);
      totalWebp += webpBuf.length;

      const pct = Math.round((idx / all.length) * 100);
      process.stdout.write(
        `\r  [${String(idx).padStart(3)}/${all.length}] ${pct}%   `
      );
    }
  };

  await Promise.all(Array.from({ length: concurrency }, worker));

  console.log("\n");
  console.log("✅  Done!");
  console.log(`   Original JPG total : ${await humanBytes(totalBefore)}`);
  console.log(`   Optimized JPG total: ${await humanBytes(totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`);
  console.log(`   WebP total         : ${await humanBytes(totalWebp)} (${Math.round((1 - totalWebp / totalBefore) * 100)}% smaller)`);
  console.log(`\n   WebP frames saved to: ${WEBP}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
