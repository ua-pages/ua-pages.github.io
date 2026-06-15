import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const targets = [
  'node_modules',
  'dist',
  '.angular',
  '.dev-logs',
  '.dev-pids.json',
  '.DS_Store',
  '__MACOSX',
  '.cache',
  '.vite',
  'skanda.dev/node_modules',
  'skanda.dev/dist',
  'skanda.dev/.angular',
  'skanda.dev/.cache',
  'skanda.dev/.vite',
  'skanda.dev/.DS_Store',
  'portfolio-api/node_modules',
  'portfolio-api/dist',
  'portfolio-api/.cache',
  'portfolio-api/.vite',
  'portfolio-api/.DS_Store',
];

console.log(`Cleaning project before archive: ${root}\n`);

for (const target of targets) {
  const fullPath = path.join(root, target);

  if (!fs.existsSync(fullPath)) {
    continue;
  }

  fs.rmSync(fullPath, { recursive: true, force: true });
  console.log(`Removed: ${target}`);
}

console.log('\nDone. Project is ready to archive.');
