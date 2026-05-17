import fs from 'node:fs';
import { pidsFile, readPids, isRunning } from './_utils.mjs';

const processes = readPids();
if (!processes.length) {
  console.log('No recorded dev processes found.');
  process.exit(0);
}

for (const item of processes) {
  if (!isRunning(item.pid)) {
    console.log(`Already stopped: ${item.name} | pid ${item.pid}`);
    continue;
  }

  try {
    process.kill(-Number(item.pid), 'SIGTERM');
    console.log(`Stopped: ${item.name} | pid ${item.pid}`);
  } catch {
    try {
      process.kill(Number(item.pid), 'SIGTERM');
      console.log(`Stopped: ${item.name} | pid ${item.pid}`);
    } catch (error) {
      console.log(`Could not stop ${item.name} | pid ${item.pid}: ${error.message}`);
    }
  }
}

if (fs.existsSync(pidsFile)) fs.rmSync(pidsFile, { force: true });
console.log('\n✓ Dev services stopped.');
