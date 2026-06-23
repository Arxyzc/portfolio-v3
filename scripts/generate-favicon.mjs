import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const logoPath = path.resolve("public/icono.png");
const appDir = path.resolve("src/app");

const iconSize = 512;
const logoMaxSize = 500;

await fs.mkdir(appDir, { recursive: true });

const logoBuffer = await fs.readFile(logoPath);

const logoPngBuffer = await sharp(logoBuffer)
  .png()
  .trim()
  .resize({
    width: logoMaxSize,
    height: logoMaxSize,
    fit: "inside",
    withoutEnlargement: false,
  })
  .png()
  .toBuffer();

const logoMetadata = await sharp(logoPngBuffer).metadata();

const logoWidth = logoMetadata.width ?? logoMaxSize;
const logoHeight = logoMetadata.height ?? logoMaxSize;

const left = Math.round((iconSize - logoWidth) / 2);
const top = Math.round((iconSize - logoHeight) / 2);

const icon512Buffer = await sharp({
  create: {
    width: iconSize,
    height: iconSize,
    channels: 4,
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  },
})
  .composite([
    {
      input: logoPngBuffer,
      left,
      top,
    },
  ])
  .png()
  .toBuffer();

await sharp(icon512Buffer).resize(512, 512).png().toFile(path.join(appDir, "icon.png"));
await sharp(icon512Buffer).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));

const icoSizes = [16, 32, 48, 64, 128, 256];
const temporaryPngPaths = [];

for (const size of icoSizes) {
  const temporaryPath = path.resolve(`.favicon-${size}.png`);

  await sharp(icon512Buffer).resize(size, size).png().toFile(temporaryPath);

  temporaryPngPaths.push(temporaryPath);
}

const icoBuffer = await pngToIco(temporaryPngPaths);

await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);

await Promise.all(
  temporaryPngPaths.map((temporaryPath) =>
    fs.unlink(temporaryPath).catch(() => null)
  )
);

console.log("Favicons generados correctamente con fondo transparente:");
console.log("- src/app/favicon.ico");
console.log("- src/app/icon.png");
console.log("- src/app/apple-icon.png");
