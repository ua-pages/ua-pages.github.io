import { readPids, isRunning } from './_utils.mjs';

const processes = readPids();
if (!processes.length) {
  console.log('No recorded dev processes found.');
  process.exit(0);
}

for (const item of processes) {
  console.log(`${isRunning(item.pid) ? 'Running' : 'Stopped'}: ${item.name} | pid ${item.pid}`);
}
