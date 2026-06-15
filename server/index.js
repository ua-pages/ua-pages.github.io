import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'site');
const DEV = process.env.NODE_ENV === 'development' || process.execArgv.includes('--watch');

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

function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const sep = trimmed.indexOf('=');
      if (sep === -1) continue;
      const key = trimmed.slice(0, sep).trim();
      const val = trimmed.slice(sep + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) {
    // ignore
  }
}

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve(null); }
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatLead(data) {
  const fields = [
    `👤 <b>Ім\u2019я:</b> ${escapeHtml(data.name || '—')}`,
    `📞 <b>Контакт:</b> ${escapeHtml(data.contact || '—')}`,
    `🔧 <b>Послуга:</b> ${escapeHtml(data.service || '—')}`,
    `💰 <b>Бюджет:</b> ${escapeHtml(data.budget || '—')}`,
    `⏱ <b>Терміни:</b> ${escapeHtml(data.timeline || '—')}`,
    `📝 <b>Контекст:</b>\n${escapeHtml(data.message || '—')}`,
  ];
  return `📩 <b>Нова заявка з портфоліо</b>\n\n${fields.join('\n')}`;
}

async function sendTelegram(message) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML' }),
  });
  return res.ok;
}

function validateLead(data) {
  if (!data) return 'Invalid JSON body';
  if (!data.name || data.name.length < 2) return 'Name is required (min 2 chars)';
  if (!data.contact || data.contact.length < 3) return 'Contact is required (min 3 chars)';
  if (!data.message || data.message.length < 12) return 'Message is required (min 12 chars)';
  return null;
}

// Simple in-memory rate map: ip -> [timestamps]
const rateMap = new Map();

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';
  if (origin && (origin === CORS_ORIGIN || CORS_ORIGIN === '*')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

async function handleApiContact(req, res) {
  const data = await parseBody(req);

  // Honeypot anti-spam
  if (data && (data.hp || data.honeypot || data._hp)) {
    console.warn('Honeypot triggered');
    res.writeHead(204);
    res.end();
    return;
  }

  // Rate limiting per IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const WINDOW_MS = 60 * 60 * 1000; // 1 hour
  const MAX_REQUESTS = 10;
  rateMap.set(ip, (rateMap.get(ip) || []).filter(ts => ts > now - WINDOW_MS));
  const attempts = rateMap.get(ip) || [];
  if (attempts.length >= MAX_REQUESTS) { sendJson(res, 429, { error: 'Too many requests' }); return; }
  attempts.push(now);
  rateMap.set(ip, attempts);

  const error = validateLead(data);
  if (error) { sendJson(res, 400, { error }); return; }

  const sent = await sendTelegram(formatLead(data));
  if (sent) sendJson(res, 200, { ok: true }); else sendJson(res, 500, { error: 'Failed to send notification' });
}

function serveStatic(req, res, pathname) {
  let filePath;
  if (pathname === '/') filePath = resolve(PUBLIC, 'index.html');
  else filePath = resolve(PUBLIC, pathname.slice(1));
  if (!filePath.startsWith(PUBLIC)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    const fallbackPath = resolve(PUBLIC, 'index.html');
    const content = readFileSync(fallbackPath, 'utf-8');
    const headers = { 'Content-Type': 'text/html; charset=utf-8' };
    if (DEV) headers['Cache-Control'] = 'no-cache';
    res.writeHead(200, headers); res.end(content); return;
  }
  const ext = extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  const content = readFileSync(filePath);
  const headers = { 'Content-Type': mime };
  if (DEV) headers['Cache-Control'] = 'no-cache';
  res.writeHead(200, headers); res.end(content);
}

loadEnv(resolve(__dirname, '..', '.env'));
const PORT = Number(process.env.PORT || 4200);
const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  setCorsHeaders(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method === 'POST' && pathname === '/api/contact') { handleApiContact(req, res); return; }
  // health endpoint
  if (req.method === 'GET' && pathname === '/health') { res.writeHead(200); res.end('ok'); return; }
  serveStatic(req, res, pathname);
});

server.listen(PORT, () => console.log(`Site server running on http://localhost:${PORT}`));
