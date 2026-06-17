import type { GalleryItem } from "./types";

const GALLERY_ROOT = "/gallery";

export function getFullImageUrl(item: GalleryItem): string {
  return `${GALLERY_ROOT}/full/${item.filename}`;
}

export function getThumbnailUrl(item: GalleryItem): string {
  return `${GALLERY_ROOT}/thumbnails/${item.filename}`;
}

export function getImagePageUrl(item: GalleryItem): string {
  return `/images/${item.slug}`;
}
