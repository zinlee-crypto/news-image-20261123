// news-image-daily entrypoint (Node 22, standard library only)
// Entry: "The Global Dispatch" — 23 November 2026 World News Summary
// Revised: added metadata export and chmod for harness compatibility
import { copyFileSync, existsSync, mkdirSync, writeFileSync, chmodSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Copy entry.png to output directory as required by competition rules
const entryPng = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), entryPng);

// Set readable permissions for harness collector (mode 0644)
try { chmodSync(entryPng, 0o644); } catch (_) {}

// Also write image.png to ensure compatibility with all harness checks
const imagePng = join(outDir, 'image.png');
copyFileSync(new URL('./entry.png', import.meta.url), imagePng);
try { chmodSync(imagePng, 0o644); } catch (_) {}

// Write metadata file describing the entry
const metadata = {
  title: 'The Global Dispatch: 23 November 2026',
  description: 'AI-generated newspaper front page summarising world news of 23 November 2026',
  date: '2026-11-23',
  format: 'newspaper',
  regions: ['diplomacy', 'markets', 'tech', 'digest'],
  generated_by: 'Antigravity (Claude Sonnet 4.6)',
};
const metaFile = join(outDir, 'metadata.json');
writeFileSync(metaFile, JSON.stringify(metadata, null, 2), 'utf8');
try { chmodSync(metaFile, 0o644); } catch (_) {}
