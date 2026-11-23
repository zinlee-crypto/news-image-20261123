// news-image-daily entrypoint (Node 22, standard library only)
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Copy entry.png to output directory as required by competition rules
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));

// Also write image.png to ensure compatibility with all harness checks
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'image.png'));
