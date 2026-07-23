import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve('src');
const port = Number.parseInt(process.env.PORT || '4200', 10);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let filePath = resolve(root, `.${pathname}`);

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
      respond(response, 403, 'Forbidden');
      return;
    }

    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) filePath = resolve(filePath, 'index.html');

    const finalStats = fileStats.isDirectory() ? await stat(filePath) : fileStats;
    if (!finalStats.isFile()) throw new Error('Not a file');

    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    respond(response, 404, 'Not found');
  }
}).listen(port, () => {
  console.log(`ua-pages: http://localhost:${port}`);
});

function respond(response, status, message) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}
