/**
 * Generates the clinic's permanent QR codes.
 *
 * Everything is produced locally by the `qrcode` package — no third-party QR
 * service is involved at generation or scan time, and the encoded URLs are the
 * real destinations rather than a shortener that could expire. That is what
 * makes these permanent: nothing in the chain can be switched off.
 *
 * Each code is written as SVG (vector, for print at any size) and PNG (1024px,
 * for web and messaging), then decoded again to prove it scans back to the
 * exact URL it should.
 *
 *   node scripts/generate-qr.mjs
 */
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const CODES = [
  {
    name: 'qr-website',
    label: 'Website',
    // www is canonical — the apex domain 308-redirects, and skipping that hop
    // makes the scan land a step sooner.
    url: 'https://www.vedantanetralya.com',
  },
  {
    name: 'qr-appointment',
    label: 'Book appointment',
    url: 'https://www.vedantanetralya.com/appointment',
  },
  {
    name: 'qr-review',
    label: 'Google review',
    // Opens the clinic's Google Maps listing (in the Maps app on a phone),
    // where "Write a review" is one tap away. cid is the listing's permanent id.
    url: 'https://www.google.com/maps?cid=14754978886231398408',
  },
];

// Level H keeps ~30% of the code recoverable, so it still scans when a printed
// sticker is scuffed, curled or partly covered.
const OPTIONS = { errorCorrectionLevel: 'H', margin: 2 };

const decodePng = (file) => {
  const png = PNG.sync.read(fs.readFileSync(file));
  const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return result ? result.data : null;
};

const run = async () => {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  let failures = 0;

  for (const { name, label, url } of CODES) {
    const svgPath = path.join(PUBLIC_DIR, `${name}.svg`);
    const pngPath = path.join(PUBLIC_DIR, `${name}.png`);

    fs.writeFileSync(svgPath, await QRCode.toString(url, { ...OPTIONS, type: 'svg' }));
    await QRCode.toFile(pngPath, url, { ...OPTIONS, type: 'png', width: 1024 });

    const decoded = decodePng(pngPath);
    const ok = decoded === url;
    if (!ok) failures++;

    console.log(`${ok ? 'OK  ' : 'FAIL'} ${label.padEnd(18)} ${name}`);
    console.log(`       encodes : ${url}`);
    console.log(`       decodes : ${decoded ?? '<could not decode>'}`);
    console.log(`       files   : ${path.basename(svgPath)} (vector), ${path.basename(pngPath)} (${Math.round(fs.statSync(pngPath).size / 1024)} KB)`);
  }

  if (failures) {
    console.error(`\n${failures} code(s) did not decode back to their URL.`);
    process.exit(1);
  }
  console.log('\nAll codes verified: each one decodes back to exactly the URL it encodes.');
};

run().catch((err) => { console.error(err); process.exit(1); });
