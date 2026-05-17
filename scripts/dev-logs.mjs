import fs from 'node:fs';
import path from 'node:path';
import { logsDir } from './_utils.mjs';

if (!fs.existsSync(logsDir)) {
  console.log('No .dev-logs folder found yet.');
  process.exit(0);
}

for (const file of ['api.log', 'web.log']) {
  const filePath = path.join(logsDir, file);
  console.log(`\n===== ${file} =====`);
  if (!fs.existsSync(filePath)) {
    console.log('No log file yet.');
    continue;
  }
  const lines = fs.readFileSync(filePath, 'utf8').split('\n').slice(-80).join('\n');
  console.log(lines);
}
