import sharp from 'sharp';
import fs from 'node:fs';

const root = '/Users/shavkatovff/Desktop/KATOV/My Projects/infogram.uz/';

/**
 * OG rasm — statik va narxsiz.
 * Narx qo'yilmaydi: rasm keshlanadi va ijtimoiy tarmoqlarda uzoq
 * turadi, narx esa har hafta o'zgaradi — eskirgan raqam ishonchni buzadi.
 */
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f1115"/>
  <rect x="0" y="0" width="1200" height="4" fill="#f4f5f7"/>

  <g transform="translate(80, 78)">
    <rect width="52" height="52" rx="13" fill="#f4f5f7"/>
    <g fill="#0f1115">
      <rect x="11.7" y="13"   width="28.6" height="4.7" rx="2.3"/>
      <rect x="11.7" y="23.7" width="19.5" height="4.7" rx="2.3"/>
      <rect x="11.7" y="34.3" width="24.7" height="4.7" rx="2.3"/>
    </g>
  </g>
  <text x="152" y="115" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="600" fill="#f4f5f7" letter-spacing="-1">infogram<tspan fill="#868d99">.uz</tspan></text>

  <text x="80" y="290" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="76" font-weight="600" fill="#f4f5f7" letter-spacing="-3.4">Telegram Stars va Premium</text>
  <text x="80" y="382" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="76" font-weight="500" fill="#868d99" letter-spacing="-3.4">so‘mdagi narxlar</text>

  <line x1="80" y1="452" x2="1120" y2="452" stroke="#2a2e36" stroke-width="1"/>

  <text x="80" y="512" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="26" fill="#b9bec7">Mustaqil narx va reyting nashri — O‘zbekiston</text>
  <text x="80" y="556" font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="22" fill="#868d99">UzCard · HUMO · Click · Payme — Visa kerak emas</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(root + 'public/og-image.png');
await sharp(Buffer.from(fs.readFileSync(root + 'public/favicon.svg')))
  .resize(180, 180).png().toFile(root + 'public/apple-touch-icon.png');
await sharp(Buffer.from(fs.readFileSync(root + 'public/favicon.svg')))
  .resize(32, 32).png().toFile(root + 'public/favicon-32.png');

for (const f of ['og-image.png', 'apple-touch-icon.png', 'favicon-32.png']) {
  console.log(f, (fs.statSync(root + 'public/' + f).size / 1024).toFixed(1) + ' KB');
}
