// A dependency-free preview server for Next's exported /out website.
// Run `npm run build` once, then `npm run preview`. Not a production application server.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.env.SITE_DIR || 'out');
const basePath = (process.env.PREVIEW_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
};

try {
  await stat(root);
} catch {
  console.error('No exported website found. Run npm run build first.');
  process.exit(1);
}
http
  .createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(new URL(req.url, 'http://preview').pathname);
      if (basePath) {
        if (pathname === basePath) {
          res.writeHead(302, { Location: `${basePath}/` }).end();
          return;
        }
        if (!pathname.startsWith(`${basePath}/`)) {
          res.writeHead(404).end('Not found');
          return;
        }
        pathname = pathname.slice(basePath.length);
      }
      let filename = resolve(root, `.${pathname}`);
      if (filename !== root && !filename.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      const info = await stat(filename);
      if (info.isDirectory()) filename = resolve(filename, 'index.html');
      const body = await readFile(filename);
      res.writeHead(200, {
        'Content-Type': types[extname(filename)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(body);
    } catch {
      const body = await readFile(resolve(root, '404.html')).catch(() => Buffer.from('Not found'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
    }
  })
  .listen(port, '0.0.0.0', () =>
    console.log(`Portfolio preview: http://localhost:${port}${basePath}/`),
  );
