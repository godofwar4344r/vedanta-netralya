/**
 * Generates the clinic's permanent QR codes as labelled, bordered cards.
 *
 * Everything is produced locally by the `qrcode` package — no third-party QR
 * service is involved at generation or scan time, and the encoded URLs are the
 * real destinations rather than a shortener that could expire. That is what
 * makes these permanent: nothing in the chain can be switched off.
 *
 * Each code is written three ways:
 *   <name>-card.svg / .png  labelled card with a border, says what it opens
 *   <name>.svg / .png       the bare code, for placing in your own layouts
 *
 * Every generated PNG is decoded again to prove it scans back to the exact URL
 * it should — including the card versions, so the border and text can't be
 * covering part of the code.
 *
 *   node scripts/generate-qr.mjs
 */
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import { Resvg } from '@resvg/resvg-js';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// From src/data/brandColors.ts
const NAVY = '#0a2640';
const TEAL = '#00abc0';
const CREAM = '#f5f1ea';
const WHITE = '#ffffff';

const CODES = [
  {
    name: 'qr-website',
    heading: 'OUR WEBSITE',
    caption: 'Scan to visit our website',
    // www is canonical — the apex domain 308-redirects, and skipping that hop
    // makes the scan land a step sooner.
    url: 'https://www.vedantanetralya.com',
    display: 'vedantanetralya.com',
  },
  {
    name: 'qr-appointment',
    heading: 'BOOK APPOINTMENT',
    caption: 'Scan to book your appointment',
    url: 'https://www.vedantanetralya.com/appointment',
    display: 'vedantanetralya.com/appointment',
  },
  {
    name: 'qr-review',
    heading: 'REVIEW US ON GOOGLE',
    caption: 'Scan to leave a Google review',
    // Opens the clinic's Google Maps listing (in the Maps app on a phone),
    // where "Write a review" is one tap away. cid is the listing's permanent id.
    url: 'https://www.google.com/maps?cid=14754978886231398408',
    display: 'Google Maps · Vedanta Netralya',
  },
];

// Level H keeps ~30% of the code recoverable, so it still scans when a printed
// sticker is scuffed, curled or partly covered.
const OPTIONS = { errorCorrectionLevel: 'H', margin: 2 };

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Draws the QR modules as one SVG path, sized and positioned on the card. */
const qrPath = (url, x, y, size) => {
  const qr = QRCode.create(url, { errorCorrectionLevel: OPTIONS.errorCorrectionLevel });
  const count = qr.modules.size;
  const data = qr.modules.data;
  const cell = size / count;
  let d = '';
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (data[row * count + col]) {
        // Nudge each module a hair wider to avoid hairline gaps when rasterised
        d += `M${(x + col * cell).toFixed(3)} ${(y + row * cell).toFixed(3)}h${(cell + 0.02).toFixed(3)}v${(cell + 0.02).toFixed(3)}h-${(cell + 0.02).toFixed(3)}z`;
      }
    }
  }
  return d;
};

const cardSvg = ({ heading, caption, url, display }) => {
  const W = 640;
  const H = 820;
  const quiet = 28;           // white quiet zone around the code — required for scanning
  const qrBox = 400;
  const qrX = (W - qrBox) / 2;
  const qrY = 236;   // leaves clear air between the heading and the white panel

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(caption)}">
  <rect width="${W}" height="${H}" rx="40" fill="${NAVY}"/>
  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="30" fill="none" stroke="${TEAL}" stroke-width="3"/>

  <text x="${W / 2}" y="86" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="bold" fill="${CREAM}">Vedanta Netralya</text>
  <text x="${W / 2}" y="118" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="3.5" fill="${TEAL}">EYE HOSPITAL · HALDWANI</text>

  <line x1="${W / 2 - 60}" y1="146" x2="${W / 2 + 60}" y2="146" stroke="${TEAL}" stroke-width="2"/>

  <text x="${W / 2}" y="188" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="bold" letter-spacing="2.5" fill="${CREAM}">${escapeXml(heading)}</text>

  <rect x="${qrX - quiet}" y="${qrY - quiet}" width="${qrBox + quiet * 2}" height="${qrBox + quiet * 2}" rx="22" fill="${WHITE}"/>
  <path d="${qrPath(url, qrX, qrY, qrBox)}" fill="${NAVY}" shape-rendering="crispEdges"/>

  <text x="${W / 2}" y="710" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="bold" fill="${CREAM}">${escapeXml(caption)}</text>
  <text x="${W / 2}" y="748" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${TEAL}">${escapeXml(display)}</text>
  <text x="${W / 2}" y="784" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="1.5" fill="${CREAM}" opacity="0.5">05946-223616</text>
</svg>`;
};

const svgToPng = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true } })
    .render()
    .asPng();

const decodePng = (buffer) => {
  const png = PNG.sync.read(buffer);
  const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return result ? result.data : null;
};

const run = async () => {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  let failures = 0;

  for (const code of CODES) {
    const { name, caption, url } = code;

    // Bare code, for dropping into other layouts
    fs.writeFileSync(path.join(PUBLIC_DIR, `${name}.svg`), await QRCode.toString(url, { ...OPTIONS, type: 'svg' }));
    await QRCode.toFile(path.join(PUBLIC_DIR, `${name}.png`), url, { ...OPTIONS, type: 'png', width: 1024 });

    // Labelled card
    const svg = cardSvg(code);
    fs.writeFileSync(path.join(PUBLIC_DIR, `${name}-card.svg`), svg);
    const cardPng = svgToPng(svg, 1200);
    fs.writeFileSync(path.join(PUBLIC_DIR, `${name}-card.png`), cardPng);

    // Both versions must still scan back to the right URL
    const bare = decodePng(fs.readFileSync(path.join(PUBLIC_DIR, `${name}.png`)));
    const card = decodePng(cardPng);
    const ok = bare === url && card === url;
    if (!ok) failures++;

    console.log(`${ok ? 'OK  ' : 'FAIL'} ${caption}`);
    console.log(`       url        : ${url}`);
    console.log(`       bare code  : ${bare === url ? 'scans correctly' : `MISMATCH -> ${bare}`}`);
    console.log(`       card       : ${card === url ? 'scans correctly' : `MISMATCH -> ${card}`}`);
    console.log(`       files      : ${name}-card.svg/.png (labelled), ${name}.svg/.png (bare)`);
  }

  if (failures) {
    console.error(`\n${failures} code(s) did not decode back to their URL.`);
    process.exit(1);
  }
  console.log('\nAll codes verified: bare and labelled versions both decode back to the exact URL.');
};

run().catch((err) => { console.error(err); process.exit(1); });
