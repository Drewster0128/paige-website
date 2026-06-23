import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SUPPORTED_EXTENSIONS = new Set([
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const GALLERY_BACKGROUND_COLOR = "#EEE8D8";

export function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function processGalleryImage({
  sourcePath,
  thumbnailSourcePath = sourcePath,
  outputRoot,
  outputFilename,
}) {
  const fullDirectory = path.join(outputRoot, "full");
  const thumbnailDirectory = path.join(outputRoot, "4x3");
  await Promise.all([
    mkdir(fullDirectory, { recursive: true }),
    mkdir(thumbnailDirectory, { recursive: true }),
  ]);

  await Promise.all([
    sharp(sourcePath)
      .rotate()
      .flatten({ background: GALLERY_BACKGROUND_COLOR })
      .webp({ quality: 85 })
      .toFile(path.join(fullDirectory, outputFilename)),
    sharp(thumbnailSourcePath)
      .rotate()
      .flatten({ background: GALLERY_BACKGROUND_COLOR })
      .resize(800, 600, { fit: "cover", position: "attention" })
      .webp({ quality: 70 })
      .toFile(path.join(thumbnailDirectory, outputFilename)),
  ]);
}

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second));
}

function getOption(name) {
  const optionIndex = process.argv.indexOf(name);
  return optionIndex === -1 ? undefined : process.argv[optionIndex + 1];
}

async function runCli() {
  const inputDirectory = process.argv[2];
  if (!inputDirectory || inputDirectory.startsWith("--")) {
    throw new Error(
      "Usage: npm run gallery:process -- <input-directory> [--output <directory>] [--thumbnail-input <directory>]",
    );
  }

  const outputRoot = getOption("--output") ?? "public/img";
  const thumbnailInputDirectory = getOption("--thumbnail-input");
  const imageNames = await findImages(inputDirectory);
  const thumbnailNames = thumbnailInputDirectory
    ? await findImages(thumbnailInputDirectory)
    : [];
  const thumbnailsByStem = new Map(
    thumbnailNames.map((name) => [path.parse(name).name.toLowerCase(), name]),
  );

  for (const imageName of imageNames) {
    const sourcePath = path.join(inputDirectory, imageName);
    const thumbnailName = thumbnailsByStem.get(
      path.parse(imageName).name.toLowerCase(),
    );
    const thumbnailSourcePath =
      thumbnailInputDirectory && thumbnailName
        ? path.join(thumbnailInputDirectory, thumbnailName)
        : sourcePath;
    const outputFilename = `${slugify(path.parse(imageName).name)}.webp`;

    await processGalleryImage({
      sourcePath,
      thumbnailSourcePath,
      outputRoot,
      outputFilename,
    });
    console.log(`Processed ${imageName} -> ${outputFilename}`);
  }
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
