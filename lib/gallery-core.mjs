import fs from "node:fs";
import path from "node:path";

export const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const numericSort = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export function imageAltFromFilename(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function scanGalleryDirectory(galleryRoot) {
  if (!fs.existsSync(galleryRoot)) return [];

  return fs
    .readdirSync(galleryRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => numericSort.compare(a.name, b.name))
    .map((directory) => {
      const directoryPath = path.join(galleryRoot, directory.name);
      const images = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isFile() &&
            SUPPORTED_IMAGE_EXTENSIONS.has(
              path.extname(entry.name).toLowerCase(),
            ),
        )
        .sort((a, b) => numericSort.compare(a.name, b.name))
        .map((entry) => ({
          filename: entry.name,
          alt: imageAltFromFilename(entry.name),
          src: `/gallery/${encodeURIComponent(directory.name)}/${encodeURIComponent(entry.name)}`,
        }));

      return {
        name: directory.name,
        images,
      };
    });
}
