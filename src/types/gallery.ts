export interface GalleryItem {
  legacyId: number;
  slug: string;
  artPiece: string;
  filename: string;
  description: string;
  price: string | null;
  originalSize: string | null;
  printSizes: string[] | null;
  dateCreated: string | null;
  genres: string[];
  medium: string;
  material: string | null;
  availability: string | null;
  altText: string;
  featured: boolean;
  displayOrder: number;
  provisional: boolean;
}

export interface GalleryItemResolution {
  item: GalleryItem;
  isLegacyId: boolean;
}

export interface GalleryMediumDefinition {
  name: string;
  slug: string;
  description: string;
  showcaseSlug: string;
}

export interface GalleryMediumSummary extends GalleryMediumDefinition {
  count: number;
  items: GalleryItem[];
  materials: string[];
  showcaseItem: GalleryItem | undefined;
}