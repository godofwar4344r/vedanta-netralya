import fs from 'fs';
import path from 'path';

async function downloadQR(url, outputPath) {
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&margin=20&data=${encodeURIComponent(url)}`;
  console.log(`Downloading QR code for ${url}...`);
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch QR code: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`Saved QR code to ${outputPath}`);
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate for main website
  await downloadQR('https://vedantanetralya.com', path.join(publicDir, 'qr-website.png'));
  
  // Generate for appointment booking
  await downloadQR('https://vedantanetralya.com/appointment', path.join(publicDir, 'qr-appointment.png'));
  
  console.log("All QR codes generated successfully!");
}

main().catch(err => console.error(err));
