import type { GalleryItem } from "./types";
import { slugifyMedium } from "./gallery";
import { GALLERY_IMAGE_ROOT } from "../../config/assets";
import { ROUTES } from "../../config/routes";

export function getFullImageUrl(item: GalleryItem): string {
  return `${GALLERY_IMAGE_ROOT}/full/${item.filename}`;
}

export function getThumbnailUrl(item: GalleryItem): string {
  return `${GALLERY_IMAGE_ROOT}/4x3/${item.filename}`;
}

export function getImagePageUrl(item: GalleryItem): string {
  return `/images/${item.slug}`;
}

export function getGalleryMediumUrl(medium: string): string {
  return `${ROUTES.gallery}?medium=${encodeURIComponent(slugifyMedium(medium))}`;
}
