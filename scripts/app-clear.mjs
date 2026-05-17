import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'node_modules', 'dist', '.angular', '.dev-logs', '.dev-pids.json', '.DS_Store', '__MACOSX', '.cache', '.vite',
  'portfolio-web/node_modules', 'portfolio-web/dist', 'portfolio-web/.angular', 'portfolio-web/.cache', 'portfolio-web/.vite', 'portfolio-web/.DS_Store',
  'portfolio-api/node_modules', 'portfolio-api/dist', 'portfolio-api/.cache', 'portfolio-api/.vite', 'portfolio-api/.DS_Store'
];

console.log('Cleaning project before archive...\n');
for (const target of targets) {
  const fullPath = path.join(root, target);
  if (!fs.existsSync(fullPath)) continue;
  fs.rmSync(fullPath, { recursive: true, force: true });
  console.log(`Removed: ${target}`);
}
console.log('\nDone. Project is ready to archive.');
