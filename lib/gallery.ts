import path from "node:path";
import { scanGalleryDirectory } from "./gallery-core.mjs";

export type GalleryImage = {
  filename: string;
  alt: string;
  src: string;
};

export type GalleryAlbum = {
  name: string;
  images: GalleryImage[];
};

export function getGalleryAlbums(): GalleryAlbum[] {
  const galleryRoot = path.join(process.cwd(), "public", "gallery");
  return scanGalleryDirectory(galleryRoot) as GalleryAlbum[];
}
