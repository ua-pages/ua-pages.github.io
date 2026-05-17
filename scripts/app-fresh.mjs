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
  'portfolio-web/node_modules',
  'portfolio-web/package-lock.json',
  'portfolio-web/dist',
  'portfolio-web/.angular',
  'portfolio-web/.cache',
  'portfolio-web/.vite'
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
ensureWorkspacePackage('web', 'portfolio-web');

run('npm', ['cache', 'verify'], root, 'Verifying npm cache');
run('npm', ['install'], path.join(root, 'portfolio-api'), 'Fresh install API dependencies');
run('npm', ['install'], path.join(root, 'portfolio-web'), 'Fresh install Web dependencies');
run('npm', ['run', 'build'], path.join(root, 'portfolio-api'), 'Build API');
run('npm', ['run', 'build'], path.join(root, 'portfolio-web'), 'Build Web');
run('npm', ['run', 'dev:all'], root, 'Start API + Web');
