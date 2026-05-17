import { root, run } from './_utils.mjs';

console.log('Starting full portfolio app bootstrap...');
console.log('This will install dependencies, build both services, and start API + Web in dev mode.');

run('npm', ['run', 'install:all'], root, 'Step 1/3: install all dependencies');
run('npm', ['run', 'build'], root, 'Step 2/3: build API + Web');
run('npm', ['run', 'dev:all'], root, 'Step 3/3: start API + Web');

console.log('\n✓ App bootstrap completed.');
