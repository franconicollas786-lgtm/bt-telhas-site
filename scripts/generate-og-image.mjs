import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 48;

/** Logo original enviada pelo cliente (não usar og-image.png gerado como fonte). */
const SOURCE_LOGO = path.join(publicDir, 'OG image.PNG');

async function main() {
  const meta = await sharp(SOURCE_LOGO).metadata();
  const maxLogoWidth = WIDTH - PADDING * 2;
  const maxLogoHeight = HEIGHT - PADDING * 2;
  const scale = Math.min(maxLogoWidth / meta.width, maxLogoHeight / meta.height);
  const logoWidth = Math.round(meta.width * scale);
  const logoHeight = Math.round(meta.height * scale);
  const left = Math.round((WIDTH - logoWidth) / 2);
  const top = Math.round((HEIGHT - logoHeight) / 2);

  const resizedLogo = await sharp(SOURCE_LOGO)
    .resize(logoWidth, logoHeight, { fit: 'inside' })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toBuffer();

  const canvas = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  }).composite([{ input: resizedLogo, left, top }]);

  const pngPath = path.join(publicDir, 'og-image.png');
  const jpgPath = path.join(publicDir, 'og-image.jpg');

  await canvas.clone().png({ compressionLevel: 9 }).toFile(pngPath);
  await canvas.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(jpgPath);

  const jpgSize = (await sharp(jpgPath).metadata()).size;
  console.log(`OG images: ${pngPath}, ${jpgPath} (${WIDTH}x${HEIGHT}, jpg ~${Math.round(jpgSize / 1024)}KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
