import { apiDir, webDir, ensurePackageJson, ensureProjectDirs, readPids, writePids, isRunning, startDevProcess } from './_utils.mjs';

ensureProjectDirs();
ensurePackageJson(apiDir, 'portfolio-api');
ensurePackageJson(webDir, 'portfolio-web');

const existing = readPids().filter((item) => isRunning(item.pid));
if (existing.length) {
  console.log('Some dev processes are already running:');
  for (const item of existing) console.log(`- ${item.name}: pid ${item.pid}`);
  console.log('\nRun npm run dev:stop first if you want to restart them.');
  process.exit(0);
}

const processes = [
  startDevProcess('api', apiDir, 'npm', ['run', 'start:dev']),
  startDevProcess('web', webDir, 'npm', ['start'])
];

writePids(processes);

console.log('\n✓ Dev services started.');
console.log('Web: http://localhost:4200');
console.log('API: http://localhost:3333/api');
console.log('\nUseful commands: npm run dev:status | npm run dev:logs | npm run dev:stop');
