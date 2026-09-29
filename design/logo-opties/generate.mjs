// Generates the four logo options (SVG) and a preview sheet (PNG). Run: node design/logo-opties/generate.mjs
// Text uses Inter/Segoe UI for the preview; the chosen logo gets its text converted to outlines.
import fs from 'node:fs';
import sharp from 'sharp';

const INK = '#141c1a', GREEN = '#1f3d36', ACCENT = '#a8552b', MUTED = '#5d6865', TINT = '#eaf0ee';
const FONT = "Inter, 'Segoe UI', Arial, sans-serif";
const dir = 'design/logo-opties';

// Icons live in a 120x120 box
const icons = {
  // A: clear line - the "H" whose crossbar runs on as a line (passing on)
  a: `<rect width="120" height="120" rx="28" fill="${GREEN}"/>
      <path d="M32 30v60M32 60h26M58 30v60" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
      <path d="M58 60h32" stroke="${ACCENT}" stroke-width="11" stroke-linecap="round"/>`,
  // B: monogram HN sharing the middle stroke
  b: `<rect width="120" height="120" rx="28" fill="${GREEN}"/>
      <path d="M30 32v56M30 60h30M60 88V32l30 56V32" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  // C: rising light over a horizon ("helder")
  c: `<rect width="120" height="120" rx="28" fill="${TINT}"/>
      <path d="M34 76a26 26 0 0 1 52 0z" fill="${ACCENT}"/>
      <path d="M60 30v10M31 43l7 7M89 43l-7 7" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>
      <path d="M22 82h76" stroke="${GREEN}" stroke-width="8" stroke-linecap="round"/>`,
  // D: document with a check ("goed geregeld")
  d: `<rect width="120" height="120" rx="28" fill="${TINT}"/>
      <path d="M36 24h34l18 18v50a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z" fill="#fff" stroke="${GREEN}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M70 24v18h18" fill="none" stroke="${GREEN}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M44 66l10 10 20-22" fill="none" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const names = {
  a: 'A · Heldere lijn',
  b: 'B · Monogram HN',
  c: 'C · Helder licht',
  d: 'D · Goed geregeld',
};

// Wordmark variants per option
const word = (key, x, y, size) => {
  const nal = key === 'd' ? GREEN : INK;
  const tag = `<text x="${x}" y="${y + size * 0.62}" font-family="${FONT}" font-size="${size * 0.3}" fill="${MUTED}">Regel het nu, voor de mensen van wie je houdt.</text>`;
  const main = `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="700" letter-spacing="-1" fill="${INK}">Helder <tspan fill="${nal}"${key === 'd' ? '' : ''}>Nalaten</tspan></text>`;
  return main + tag;
};

const lockup = (key) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 160" width="760" height="160">
  <rect width="760" height="160" fill="#fff"/>
  <g transform="translate(20 20)">${icons[key]}</g>
  ${word(key, 170, 88, 60)}
</svg>`;

const icon = (key) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">${icons[key]}</svg>`;

for (const key of Object.keys(icons)) {
  fs.writeFileSync(`${dir}/optie-${key}-logo.svg`, lockup(key));
  fs.writeFileSync(`${dir}/optie-${key}-icoon.svg`, icon(key));
}

// Preview sheet: per option the lockup, the icon large and at favicon size
const rowH = 260, W = 1200;
const rows = Object.keys(icons).map((key, i) => {
  const y = i * rowH;
  return `<g transform="translate(0 ${y})">
    <rect x="20" y="10" width="${W - 40}" height="${rowH - 20}" rx="16" fill="#fff" stroke="#e5e5e1"/>
    <text x="48" y="50" font-family="${FONT}" font-size="22" font-weight="600" fill="${MUTED}">${names[key]}</text>
    <g transform="translate(40 70)">${lockup(key).replace(/<\/?svg[^>]*>/g, '')}</g>
    <g transform="translate(860 64) scale(1.2)">${icons[key]}</g>
    <g transform="translate(1040 110) scale(0.4)">${icons[key]}</g>
    <g transform="translate(1110 122) scale(0.2667)">${icons[key]}</g>
    <text x="1040" y="190" font-family="${FONT}" font-size="14" fill="${MUTED}">48 px</text>
    <text x="1106" y="190" font-family="${FONT}" font-size="14" fill="${MUTED}">32 px</text>
  </g>`;
}).join('');
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${rowH * 4}"><rect width="100%" height="100%" fill="#f7f7f5"/>${rows}</svg>`;
fs.writeFileSync(`${dir}/overzicht.svg`, sheet);
await sharp(Buffer.from(sheet)).png().toFile(`${dir}/overzicht.png`);
