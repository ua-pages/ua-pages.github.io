import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, 'portfolio');
const PORT = Number(process.env.PORT || 4200);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.xml':  'application/xml',
  '.txt':  'text/plain; charset=utf-8',
  '.ico':  'image/x-icon',
};

const FALLBACK = '/index.html';

const server = createServer((req, res) => {
  let url = new URL(req.url, `http://${req.headers.host}`).pathname;

  if (url === '/') url = FALLBACK;

  const filePath = resolve(PUBLIC, url.slice(1));

  if (!filePath.startsWith(PUBLIC)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    // SPA fallback
    const fallbackPath = resolve(PUBLIC, FALLBACK.slice(1));
    const content = readFileSync(fallbackPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
    return;
  }

  const ext = extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  const content = readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': mime });
  res.end(content);
});

server.listen(PORT, () => {
  console.log(`Portfolio Web is running on http://localhost:${PORT}`);
});
