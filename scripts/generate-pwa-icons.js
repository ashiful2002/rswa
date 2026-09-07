import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceLogo = path.resolve(__dirname, "../src/assets/logo.png");
const publicDir = path.resolve(__dirname, "../public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateIcons() {
  try {
    console.log("Reading source logo from:", sourceLogo);
    const metadata = await sharp(sourceLogo).metadata();
    console.log(`Source image dimensions: ${metadata.width}x${metadata.height}`);

    // Standard 192x192
    await sharp(sourceLogo)
      .resize(192, 192, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, "pwa-192x192.png"));
    console.log("Generated pwa-192x192.png");

    // Standard 512x512
    await sharp(sourceLogo)
      .resize(512, 512, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, "pwa-512x512.png"));
    console.log("Generated pwa-512x512.png");

    // Apple Touch Icon 180x180 (iOS requires solid background or clean padded icon)
    await sharp(sourceLogo)
      .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, "apple-touch-icon-180x180.png"));
    
    await sharp(sourceLogo)
      .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(publicDir, "apple-touch-icon.png"));
    console.log("Generated apple-touch-icon.png");

    // Maskable 192x192 (safe area 80% with solid theme background)
    await sharp(sourceLogo)
      .resize(154, 154, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .extend({
        top: 19,
        bottom: 19,
        left: 19,
        right: 19,
        background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a
      })
      .png()
      .toFile(path.join(publicDir, "pwa-maskable-192x192.png"));

    // Maskable 512x512
    await sharp(sourceLogo)
      .resize(410, 410, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .extend({
        top: 51,
        bottom: 51,
        left: 51,
        right: 51,
        background: { r: 15, g: 23, b: 42, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, "pwa-maskable-512x512.png"));
    console.log("Generated maskable icons");

    // Favicon PNG
    await sharp(sourceLogo)
      .resize(64, 64, { fit: "contain" })
      .png()
      .toFile(path.join(publicDir, "favicon-64x64.png"));
      
    console.log("PWA icon generation complete.");
  } catch (err) {
    console.error("Error generating icons:", err);
  }
}

generateIcons();
