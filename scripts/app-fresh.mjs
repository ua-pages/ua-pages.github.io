import fs from 'node:fs';
import path from 'node:path';
import { root, run, ensureWorkspacePackage } from './_utils.mjs';

const targets = [
  'node_modules',
  'package-lock.json',
  '.dev-logs',
  '.dev-pids.json',
  'portfolio-api/node_modules',
  'portfolio-api/package-lock.json',
  'portfolio-api/dist',
  'skanda.dev/node_modules',
  'skanda.dev/package-lock.json',
  'skanda.dev/dist',
  'skanda.dev/.angular',
  'skanda.dev/.cache',
  'skanda.dev/.vite'
];

console.log('Preparing a completely fresh local install...');

for (const target of targets) {
  const fullPath = path.join(root, target);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Removed: ${target}`);
  }
}

ensureWorkspacePackage('api', 'portfolio-api');
ensureWorkspacePackage('web', 'skanda.dev');

run('npm', ['cache', 'verify'], root, 'Verifying npm cache');
run('npm', ['install'], path.join(root, 'portfolio-api'), 'Fresh install API dependencies');
run('npm', ['install'], path.join(root, 'skanda.dev'), 'Fresh install Web dependencies');
run('npm', ['run', 'build'], path.join(root, 'portfolio-api'), 'Build API');
run('npm', ['run', 'build'], path.join(root, 'skanda.dev'), 'Build Web');
run('npm', ['run', 'dev:all'], root, 'Start API + Web');
