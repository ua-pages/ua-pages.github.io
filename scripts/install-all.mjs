import { apiDir, webDir, ensurePackageJson, ensureProjectDirs, run } from './_utils.mjs';

ensureProjectDirs();
ensurePackageJson(apiDir, 'portfolio-api');
ensurePackageJson(webDir, 'skanda.dev');

run('npm', ['install'], apiDir, 'Installing API dependencies');
run('npm', ['install'], webDir, 'Installing Web dependencies');

console.log('\n✓ Dependencies installed.');
