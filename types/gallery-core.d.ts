declare module "@/lib/gallery-core.mjs" {
  export const SUPPORTED_IMAGE_EXTENSIONS: Set<string>;
  export function imageAltFromFilename(filename: string): string;
  export function scanGalleryDirectory(galleryRoot: string): Array<{
    name: string;
    images: Array<{ filename: string; alt: string; src: string }>;
  }>;
}

declare module "./gallery-core.mjs" {
  export const SUPPORTED_IMAGE_EXTENSIONS: Set<string>;
  export function imageAltFromFilename(filename: string): string;
  export function scanGalleryDirectory(galleryRoot: string): Array<{
    name: string;
    images: Array<{ filename: string; alt: string; src: string }>;
  }>;
}
