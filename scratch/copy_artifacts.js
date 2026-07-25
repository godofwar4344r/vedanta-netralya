import fs from 'fs';
import path from 'path';

const src1 = path.join(process.cwd(), 'public', 'qr-website.png');
const src2 = path.join(process.cwd(), 'public', 'qr-appointment.png');
const targetDir = 'C:\\Users\\91975\\.gemini\\antigravity\\brain\\023443e6-209d-441d-a3e4-7da7670e73cd';

fs.copyFileSync(src1, path.join(targetDir, 'qr-website.png'));
fs.copyFileSync(src2, path.join(targetDir, 'qr-appointment.png'));

console.log("Copied QR images to artifact folder successfully!");
