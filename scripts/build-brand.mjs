import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Brend rasmlarini yasovchi yagona skript.
 *
 * MUHIM: belgining geometriyasi shu yerda BIR MARTA ta'riflanadi va
 * src/components/Logo.astro dagi inline SVG bilan bir xil bo'lishi shart.
 * Favicon ham, OG rasm ham shu ta'rifdan scale qilib chiqariladi — shuning
 * uchun ular hech qachon bir-biridan uzilib qololmaydi.
 *
 * Ishga tushirish: node scripts/build-brand.mjs
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public');

// ── Belgi: Logo.astro bilan bir xil, 24×24 viewBox ichida ──────────────
// Ramka markazi (12,12) — viewBox markazi bilan ustma-ust, shuning uchun
// scale markazga nisbatan qilinadi va belgi hech qachon qiyshaymaydi.
const MARK = {
  box: 24,
  rect: { x: 4, y: 3, w: 16, h: 18, rx: 2, stroke: 2.2 },
  lines: 'M8.5 8.5h7M8.5 12h7M8.5 15.5h4.2',
  lineStroke: 2,
};

const COLOR = { ink: '#111111', paper: '#ffffff', muted: '#a3a3a3', soft: '#c4c4c4', line: '#454545' };

/**
 * Belgini berilgan markazga, ramka BALANDLIGI `height` bo'ladigan qilib chizadi.
 * @param {{cx:number, cy:number, height:number, color:string}} o
 */
function markSvg({ cx, cy, height, color }) {
  const k = height / MARK.rect.h;
  const c = MARK.box / 2;
  const { x, y, w, h, rx, stroke } = MARK.rect;
  return `  <g transform="translate(${cx} ${cy}) scale(${k.toFixed(4)}) translate(${-c} ${-c})" fill="none" stroke="${color}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" stroke-width="${stroke}"/>
    <path d="${MARK.lines}" stroke-width="${MARK.lineStroke}" stroke-linecap="round"/>
  </g>`;
}

// ── Favicon: qora plastinka + belgi ────────────────────────────────────
// Belgi balandligi plastinkaning 76% i — 16px'lik tabda ham o'qiladi.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${COLOR.ink}"/>
${markSvg({ cx: 256, cy: 256, height: 512 * 0.76, color: COLOR.paper })}
</svg>
`;

// ── OG rasm ────────────────────────────────────────────────────────────
// So'z belgisi BITTA <text> ichida: ".uz" tspan bo'lgani uchun uning o'rni
// shriftga bog'liq emas. Ilgari u alohida x koordinata bilan qo'yilgani
// sababli, Inter o'rniga fallback shrift ishlaganda orada bo'shliq qolardi.
const FONT = 'Inter, Helvetica, Arial, sans-serif';
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${COLOR.ink}"/>
  <rect x="70" y="70" width="1060" height="490" fill="none" stroke="${COLOR.line}" stroke-width="2"/>
  <text x="130" y="245" font-family="${FONT}" font-size="84" font-weight="700" letter-spacing="-4" fill="${COLOR.paper}">infogram<tspan font-weight="400" fill="${COLOR.muted}">.uz</tspan></text>
  <text x="136" y="326" font-family="${FONT}" font-size="30" fill="${COLOR.soft}">Telegram Stars, Premium va Gifts</text>
  <text x="136" y="372" font-family="${FONT}" font-size="30" fill="${COLOR.soft}">narxlari — O‘zbekiston</text>
  <circle cx="136" cy="465" r="8" fill="${COLOR.paper}"/>
  <text x="160" y="475" font-family="${FONT}" font-size="21" fill="#bdbdbd">Tekshirilgan narxlar va xarid qo‘llanmasi</text>
${markSvg({ cx: 930, cy: 297, height: 300, color: COLOR.paper })}
</svg>
`;

/**
 * ICO konteyneri — ichida PNG kadrlar (Vista+ shakli).
 * Alohida paketga bog'lanmaslik uchun qo'lda yig'iladi.
 * @param {{size:number, png:Buffer}[]} frames
 */
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);            // reserved
  header.writeUInt16LE(1, 2);            // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = [];
  for (const { size, png } of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 = 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2);                      // palette
    e.writeUInt8(0, 3);                      // reserved
    e.writeUInt16LE(1, 4);                   // color planes
    e.writeUInt16LE(32, 6);                  // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
}

// ── Yozish ─────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(OUT, 'favicon-frame.svg'), faviconSvg);
fs.writeFileSync(path.join(OUT, 'og-image-frame.svg'), ogSvg);

const faviconBuf = Buffer.from(faviconSvg);
const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'og-image-frame.png'));
fs.writeFileSync(path.join(OUT, 'favicon-frame-32.png'), await png(faviconBuf, 32));
fs.writeFileSync(path.join(OUT, 'favicon-frame-48.png'), await png(faviconBuf, 48));
fs.writeFileSync(path.join(OUT, 'apple-touch-icon-frame.png'), await png(faviconBuf, 180));

// Brauzerlar va ba'zi crawler'lar `rel="icon"` e'lon qilingan bo'lsa ham
// /favicon.ico ni so'rab ko'radi — 404 qoldirmaymiz.
fs.writeFileSync(
  path.join(OUT, 'favicon.ico'),
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await png(faviconBuf, size) })))),
);

for (const f of [
  'favicon-frame.svg', 'og-image-frame.svg', 'og-image-frame.png',
  'favicon-frame-32.png', 'favicon-frame-48.png', 'apple-touch-icon-frame.png', 'favicon.ico',
]) {
  console.log(f.padEnd(28), (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + ' KB');
}
