// Brand assets from logo option A ("Heldere lijn", chosen by the owner 2026-09-30).
// Writes favicon.svg, favicon.ico, apple-touch-icon.png, logo.png and og-image.png to public/.
// Run after changing the mark: node design/logo/generate-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const GREEN = '#1f3d36', ACCENT = '#a8552b', INK = '#141c1a', MUTED = '#5d6865';
const FONT = "Inter, 'Segoe UI', Arial, sans-serif";

// Keep in sync with src/components/layout/LogoMark.astro
const mark = (rx = 28) => `<rect width="120" height="120" rx="${rx}" fill="${GREEN}"/>
  <path d="M32 30v60M32 60h26M58 30v60" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
  <path d="M58 60h32" stroke="${ACCENT}" stroke-width="11" stroke-linecap="round"/>`;
const svg = (body, w = 120, h = 120, vb = '0 0 120 120') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">${body}</svg>`;

const png = (s, size) => sharp(Buffer.from(s)).resize(size, size).png().toBuffer();

fs.writeFileSync('public/favicon.svg', svg(mark()));
// iOS rounds the corners itself: square background
fs.writeFileSync('public/apple-touch-icon.png', await png(svg(mark(0)), 180));
fs.writeFileSync('public/logo.png', await png(svg(mark()), 512));

// favicon.ico with PNG-encoded images (16, 32, 48)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(svg(mark()), s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...images]));

// Share image 1200x630
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g transform="translate(96 150) scale(1.1)">${mark()}</g>
  <text x="96" y="390" font-family="${FONT}" font-size="96" font-weight="700" letter-spacing="-1" fill="${INK}">Helder Nalaten</text>
  <text x="96" y="460" font-family="${FONT}" font-size="40" fill="${MUTED}">Regel het nu, voor de mensen van wie je houdt.</text>
  <text x="96" y="560" font-family="${FONT}" font-size="30" fill="${GREEN}">heldernalaten.nl</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-image.png');
