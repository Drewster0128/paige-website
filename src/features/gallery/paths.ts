import type { GalleryItem } from "./types";
import { slugifyMedium } from "./gallery";

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

export function getGalleryMediumUrl(medium: string): string {
  return `${GALLERY_ROOT}?medium=${encodeURIComponent(slugifyMedium(medium))}`;
}
