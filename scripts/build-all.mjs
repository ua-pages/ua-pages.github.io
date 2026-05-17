import { apiDir, webDir, ensurePackageJson, ensureProjectDirs, run } from './_utils.mjs';

ensureProjectDirs();
ensurePackageJson(apiDir, 'portfolio-api');
ensurePackageJson(webDir, 'portfolio-web');

run('npm', ['run', 'build'], apiDir, 'Building API');
run('npm', ['run', 'build'], webDir, 'Building Web');

console.log('\n✓ API and Web builds completed.');
