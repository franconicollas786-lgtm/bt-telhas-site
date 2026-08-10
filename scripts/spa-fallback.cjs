/**
 * Copia index.html para 404.html após o build (fallback para GitHub Pages e similares).
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(dist, 'index.html');
const notFoundHtml = path.join(dist, '404.html');

if (!fs.existsSync(indexHtml)) {
  console.warn('[spa-fallback] dist/index.html não encontrado — build ignorado.');
  process.exit(0);
}

fs.copyFileSync(indexHtml, notFoundHtml);
console.log('[spa-fallback] dist/404.html criado a partir de index.html');
