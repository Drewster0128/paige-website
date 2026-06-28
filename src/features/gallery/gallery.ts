import galleryData from "./data/gallery.json";
import type {
  GalleryItem,
  GalleryItemResolution,
  GalleryMediumDefinition,
  GalleryMediumSummary,
} from "./types";

const galleryMediumDefinitions: GalleryMediumDefinition[] = [
  {
    name: "Canvas",
    slug: "canvas",
    description:
      "Painted originals and statement pieces where texture, scale, and surface carry the color.",
    showcaseSlug: "turtle-still-life",
  },
  {
    name: "Digital",
    slug: "digital",
    description:
      "Illustrated and painted digital works built for character, atmosphere, and print-ready color.",
    showcaseSlug: "medusa",
  },
  {
    name: "Drawing",
    slug: "drawing",
    description:
      "Hand-rendered pieces led by line, shading, portrait work, and detailed observation.",
    showcaseSlug: "portrait-study",
  },
  {
    name: "Sculpture",
    slug: "sculpture",
    description:
      "Dimensional objects, ornaments, and character forms shaped beyond the flat image plane.",
    showcaseSlug: "dragon-eggs",
  },
  {
    name: "Shoes",
    slug: "shoes",
    description:
      "Wearable custom art that turns everyday objects into painted psychedelic statements.",
    showcaseSlug: "psychedelic-high-tops",
  },
  {
    name: "Painting",
    slug: "painting",
    description:
      "Paint-forward works across murals, studies, expressive scenes, and vivid handmade surfaces.",
    showcaseSlug: "totoro-mural",
  },
  {
    name: "Mixed media",
    slug: "mixed-media",
    description:
      "Hybrid pieces combining materials, surfaces, and dimensional details into one artwork.",
    showcaseSlug: "eight-of-clubs",
  },
];

const galleryItems = (galleryData as GalleryItem[])
  .slice()
  .sort((first, second) => first.displayOrder - second.displayOrder);

export function getGalleryItems(): GalleryItem[] {
  return galleryItems.slice();
}

export function getGalleryGenres(
  items: GalleryItem[] = galleryItems,
): string[] {
  return Array.from(new Set(items.flatMap((item) => item.genres))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getGalleryMediums(
  items: GalleryItem[] = galleryItems,
): GalleryMediumSummary[] {
  const itemsByMedium = new Map<string, GalleryItem[]>();

  items.forEach((item) => {
    const mediumItems = itemsByMedium.get(item.medium) ?? [];
    mediumItems.push(item);
    itemsByMedium.set(item.medium, mediumItems);
  });

  const definedMediumNames = new Set(
    galleryMediumDefinitions.map((medium) => medium.name),
  );
  const extraMediumDefinitions = Array.from(itemsByMedium.keys())
    .filter((medium) => !definedMediumNames.has(medium))
    .sort((first, second) => first.localeCompare(second))
    .map<GalleryMediumDefinition>((medium) => ({
      name: medium,
      slug: slugifyMedium(medium),
      description: `Artwork grouped under the ${medium.toLocaleLowerCase()} medium.`,
      showcaseSlug: itemsByMedium.get(medium)?.[0]?.slug ?? "",
    }));

  return [...galleryMediumDefinitions, ...extraMediumDefinitions]
    .map((medium) => {
      const mediumItems = itemsByMedium.get(medium.name) ?? [];
      const materials = Array.from(
        new Set(
          mediumItems
            .map((item) => item.material)
            .filter((material): material is string => Boolean(material)),
        ),
      ).sort((first, second) => first.localeCompare(second));
      const showcaseItem =
        mediumItems.find((item) => item.slug === medium.showcaseSlug) ??
        mediumItems[0];

      return {
        ...medium,
        count: mediumItems.length,
        items: mediumItems,
        materials,
        showcaseItem,
      };
    })
    .filter((medium) => medium.count > 0);
}

export function filterGalleryItems(
  items: GalleryItem[],
  searchTerm: string,
  genre: string,
): GalleryItem[] {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();

  return items.filter((item) => {
    const matchesGenre = genre === "all" || item.genres.includes(genre);
    const searchableText = [
      item.artPiece,
      item.description,
      item.price ?? "",
      item.originalSize ?? "",
      item.printSizes.join(" "),
      item.dateCreated ?? "",
      item.medium,
      item.material ?? "",
      ...item.genres,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return matchesGenre && searchableText.includes(normalizedSearchTerm);
  });
}

export function resolveGalleryItem(
  identifier: string | undefined,
): GalleryItemResolution | undefined {
  if (!identifier) {
    return undefined;
  }

  const itemBySlug = galleryItems.find((item) => item.slug === identifier);
  if (itemBySlug) {
    return { item: itemBySlug, isLegacyId: false };
  }

  if (!/^\d+$/.test(identifier)) {
    return undefined;
  }

  const legacyId = Number(identifier);
  const itemByLegacyId = galleryItems.find(
    (item) => item.legacyId === legacyId,
  );

  return itemByLegacyId
    ? { item: itemByLegacyId, isLegacyId: true }
    : undefined;
}

export function slugifyMedium(medium: string): string {
  return medium
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
