import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url));
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'itens bttelhas');
const LOGO_CANDIDATE_PATHS = [
  path.join(PUBLIC_DIR, 'logo.png'),
  path.join(PUBLIC_DIR, 'favicon.ico'),
  path.join(PUBLIC_DIR, 'favicon.svg'),
];
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.pjeg']);

function toDataUri(content, mimeType) {
  const base64 = Buffer.isBuffer(content) ? content.toString('base64') : Buffer.from(content, 'utf8').toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

function makeOverlaySvg({ width, height, logoDataUri, opacity, left, top, logoWidth, logoHeight }) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <image href="${logoDataUri}" x="${left}" y="${top}" width="${logoWidth}" height="${logoHeight}" opacity="${opacity}" preserveAspectRatio="xMidYMid meet" />
    </svg>`,
    'utf8'
  );
}

function chooseOutput(image, extension) {
  if (extension === '.png') return image.png({ compressionLevel: 9 });
  if (extension === '.webp') return image.webp({ quality: 92 });
  return image.jpeg({ quality: 92, mozjpeg: true });
}

async function resolveLogoDataUri() {
  for (const candidate of LOGO_CANDIDATE_PATHS) {
    try {
      await fs.access(candidate);
      const ext = path.extname(candidate).toLowerCase();
      if (ext === '.svg') {
        const svg = await fs.readFile(candidate, 'utf8');
        return toDataUri(svg, 'image/svg+xml');
      }
      if (ext === '.png') {
        const png = await fs.readFile(candidate);
        return toDataUri(png, 'image/png');
      }
      if (ext === '.ico') {
        const ico = await fs.readFile(candidate);
        return toDataUri(ico, 'image/x-icon');
      }
    } catch {
      // tenta o próximo candidato
    }
  }
  throw new Error('Nenhum arquivo de logo encontrado em public (logo.png, favicon.ico ou favicon.svg).');
}

async function main() {
  const logoDataUri = await resolveLogoDataUri();
  const entries = await fs.readdir(IMAGES_DIR);
  let processed = 0;
  let skipped = 0;

  for (const filename of entries) {
    const extension = path.extname(filename).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      skipped += 1;
      continue;
    }

    const imagePath = path.join(IMAGES_DIR, filename);
    const sourceBuffer = await fs.readFile(imagePath);
    const baseImage = sharp(sourceBuffer);
    const metadata = await baseImage.metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    if (!width || !height) {
      skipped += 1;
      continue;
    }

    const minSide = Math.min(width, height);
    const centerLogoWidth = Math.round(minSide * 0.38);
    const centerLogoHeight = Math.round(minSide * 0.2);
    const centerLeft = Math.round((width - centerLogoWidth) / 2);
    const centerTop = Math.round((height - centerLogoHeight) / 2);

    const cornerLogoWidth = Math.round(minSide * 0.16);
    const cornerLogoHeight = Math.round(minSide * 0.08);
    const cornerLeft = Math.round(width * 0.02);
    const cornerTop = Math.round(height * 0.02);

    const centerOverlay = makeOverlaySvg({
      width,
      height,
      logoDataUri,
      opacity: 0.3, // 70% transparency => 30% opacity
      left: centerLeft,
      top: centerTop,
      logoWidth: centerLogoWidth,
      logoHeight: centerLogoHeight,
    });

    const cornerOverlay = makeOverlaySvg({
      width,
      height,
      logoDataUri,
      opacity: 0.23, // interpreted from requested "230% transparency"
      left: cornerLeft,
      top: cornerTop,
      logoWidth: cornerLogoWidth,
      logoHeight: cornerLogoHeight,
    });

    const output = chooseOutput(
      sharp(await baseImage.composite([{ input: centerOverlay }, { input: cornerOverlay }]).toBuffer()),
      extension
    );
    const outputBuffer = await output.toBuffer();
    await fs.writeFile(imagePath, outputBuffer);
    processed += 1;
  }

  console.log(`Watermark applied to ${processed} files. Skipped ${skipped}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
