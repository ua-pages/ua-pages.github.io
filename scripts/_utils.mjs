import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

export const root = process.cwd();
export const apiDir = path.join(root, 'portfolio-api');
export const webDir = path.join(root, 'skanda.dev');
export const logsDir = path.join(root, '.dev-logs');
export const pidsFile = path.join(root, '.dev-pids.json');

export function ensureProjectDirs() {
  const missing = [];
  if (!fs.existsSync(apiDir)) missing.push('portfolio-api');
  if (!fs.existsSync(webDir)) missing.push('skanda.dev');
  if (missing.length) {
    console.error(`Missing project folder(s): ${missing.join(', ')}`);
    console.error('Run this command from the root folder that contains portfolio-api and skanda.dev.');
    process.exit(1);
  }
}

export function ensurePackageJson(cwd, name) {
  const packageJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`Missing ${name}/package.json.`);
    console.error('This would make npm climb to the root package.json and cause recursive scripts.');
    process.exit(1);
  }
}

// Friendly alias used by app:fresh scripts.
export function ensureWorkspacePackage(label, relativeDir) {
  ensureProjectDirs();
  ensurePackageJson(path.join(root, relativeDir), relativeDir);
}

export function run(command, argsOrOptions = [], cwdMaybe = root, labelMaybe = command) {
  let args = [];
  let cwd = cwdMaybe;
  let label = labelMaybe;

  // Supports both:
  // run('npm', ['install'], webDir, 'Install web')
  // run('npm install', { cwd: 'skanda.dev', label: 'Install web' })
  if (Array.isArray(argsOrOptions)) {
    args = argsOrOptions;
  } else {
    const options = argsOrOptions ?? {};
    const parts = command.split(' ');
    command = parts[0];
    args = parts.slice(1);
    cwd = options.cwd ? path.join(root, options.cwd) : root;
    label = options.label ?? `${command} ${args.join(' ')}`.trim();
  }

  console.log(`\n▶ ${label}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
    env: process.env
  });

  if (result.status !== 0) {
    console.error(`\n✖ Failed: ${label}`);
    process.exit(result.status ?? 1);
  }
}

export function startDevProcess(name, cwd, command, args) {
  fs.mkdirSync(logsDir, { recursive: true });

  const logFile = path.join(logsDir, `${name}.log`);
  const output = fs.openSync(logFile, 'a');

  const child = spawn(command, args, {
    cwd,
    detached: true,
    stdio: ['ignore', output, output],
    shell: false,
    env: process.env
  });

  child.unref();

  console.log(`✓ Started ${name} | pid: ${child.pid} | log: ${path.relative(root, logFile)}`);
  return { name, pid: child.pid, cwd, command, args, logFile };
}

export function readPids() {
  if (!fs.existsSync(pidsFile)) return [];

  try {
    return JSON.parse(fs.readFileSync(pidsFile, 'utf8'));
  } catch {
    return [];
  }
}

export function writePids(processes) {
  fs.writeFileSync(pidsFile, JSON.stringify(processes, null, 2));
}

export function isRunning(pid) {
  try {
    process.kill(Number(pid), 0);
    return true;
  } catch {
    return false;
  }
}
