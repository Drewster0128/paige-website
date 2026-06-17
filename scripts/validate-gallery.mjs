import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const metadataPath = "src/features/gallery/data/gallery.json";
const galleryRoot = "public/gallery";
const items = JSON.parse(await readFile(metadataPath, "utf8"));
const errors = [];

function findDuplicates(values) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

if (!Array.isArray(items) || items.length === 0) {
  errors.push("Gallery metadata must be a non-empty array.");
}

for (const [index, item] of items.entries()) {
  const label = `Record ${index + 1}`;
  if (!Number.isInteger(item.legacyId) || item.legacyId < 1) {
    errors.push(`${label} has an invalid legacyId.`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug ?? "")) {
    errors.push(`${label} has an invalid slug.`);
  }
  if (item.filename !== `${item.slug}.webp`) {
    errors.push(`${label} filename must be <slug>.webp.`);
  }
  if (typeof item.artPiece !== "string" || item.artPiece.trim() === "") {
    errors.push(`${label} must have an artPiece.`);
  }
  if (typeof item.description !== "string") {
    errors.push(`${label} description must be a string.`);
  }
  if (item.price !== null && typeof item.price !== "string") {
    errors.push(`${label} price must be null or a string.`);
  }
  if (item.originalSize !== null && typeof item.originalSize !== "string") {
    errors.push(`${label} originalSize must be null or a string.`);
  }
  if (
    !Array.isArray(item.printSizes) ||
    item.printSizes.some((size) => typeof size !== "string")
  ) {
    errors.push(`${label} printSizes must be an array of strings.`);
  }
  if (
    item.dateCreated !== null &&
    !/^\d{4}-\d{2}-\d{2}$/.test(item.dateCreated ?? "")
  ) {
    errors.push(`${label} dateCreated must be null or YYYY-MM-DD.`);
  }
  if (!Array.isArray(item.genres) || item.genres.length === 0) {
    errors.push(`${label} must have at least one genre.`);
  }
  if (
    item.genres?.some(
      (genre) =>
        typeof genre !== "string" ||
        genre.trim() === "" ||
        genre !== genre.toLowerCase(),
    )
  ) {
    errors.push(`${label} genres must be non-empty lowercase strings.`);
  }
  if (typeof item.medium !== "string") {
    errors.push(`${label} medium must be a string.`);
  }
  if (item.material !== null && typeof item.material !== "string") {
    errors.push(`${label} material must be null or a string.`);
  }
  if (!["landscape", "portrait", "square"].includes(item.orientation)) {
    errors.push(`${label} orientation must be landscape, portrait, or square.`);
  }
  if (item.availability !== null && typeof item.availability !== "string") {
    errors.push(`${label} availability must be null or a string.`);
  }
  if (typeof item.altText !== "string" || item.altText.trim() === "") {
    errors.push(`${label} must have non-empty altText.`);
  }
  if (typeof item.featured !== "boolean") {
    errors.push(`${label} featured must be a boolean.`);
  }
  if (!Number.isInteger(item.displayOrder) || item.displayOrder < 0) {
    errors.push(`${label} has an invalid displayOrder.`);
  }
  if (typeof item.provisional !== "boolean") {
    errors.push(`${label} provisional must be a boolean.`);
  }
}

for (const [field, values] of [
  ["legacyId", items.map((item) => item.legacyId)],
  ["slug", items.map((item) => item.slug)],
  ["filename", items.map((item) => item.filename)],
  ["displayOrder", items.map((item) => item.displayOrder)],
]) {
  const duplicates = [...new Set(findDuplicates(values))];
  if (duplicates.length > 0) {
    errors.push(`Duplicate ${field}: ${duplicates.join(", ")}`);
  }
}

const expectedFiles = new Set(items.map((item) => item.filename));
for (const directoryName of ["full", "thumbnails"]) {
  const directoryPath = path.join(galleryRoot, directoryName);
  let actualFiles = [];
  try {
    actualFiles = await readdir(directoryPath);
  } catch {
    errors.push(`Missing directory: ${directoryPath}`);
    continue;
  }

  for (const filename of expectedFiles) {
    if (!actualFiles.includes(filename)) {
      errors.push(`Missing ${directoryName} image: ${filename}`);
    }
  }

  for (const filename of actualFiles) {
    if (path.extname(filename).toLowerCase() !== ".webp") {
      errors.push(`Non-WebP file in ${directoryName}: ${filename}`);
    } else if (!expectedFiles.has(filename)) {
      errors.push(`Unreferenced ${directoryName} image: ${filename}`);
    } else {
      const metadata = await sharp(path.join(directoryPath, filename)).metadata();
      if (metadata.format !== "webp") {
        errors.push(`Invalid WebP image in ${directoryName}: ${filename}`);
      }
      if (
        directoryName === "thumbnails" &&
        (metadata.width !== 800 || metadata.height !== 600)
      ) {
        errors.push(`Thumbnail must be 800x600: ${filename}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${items.length} gallery records and image pairs.`);
}
