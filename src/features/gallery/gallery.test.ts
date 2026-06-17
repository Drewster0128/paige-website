import { describe, expect, it } from "vitest";
import {
  filterGalleryItems,
  getGalleryGenres,
  getGalleryItems,
  getGalleryMediums,
  resolveGalleryItem,
} from "./gallery";

describe("gallery data", () => {
  it("returns all items in display order", () => {
    const items = getGalleryItems();

    expect(items).toHaveLength(35);
    expect(items[0]?.slug).toBe("turtle-still-life");
    expect(items.slice(0, 5).map((item) => item.slug)).toEqual([
      "turtle-still-life",
      "supernatural-trio",
      "medusa",
      "dragon-eggs",
      "winter-wonderland",
    ]);
    expect(items.at(-1)?.slug).toBe("extraordinary-woman");
    expect(items.map((item) => item.displayOrder)).toEqual(
      [...items].map((item) => item.displayOrder).sort((a, b) => a - b),
    );
  });

  it("includes client-facing card metadata", () => {
    const items = getGalleryItems();
    const turtle = items.find((item) => item.slug === "turtle-still-life");
    const dragonEggs = items.find((item) => item.slug === "dragon-eggs");

    expect(turtle).toMatchObject({
      availability: "Available",
      material: "Paint on canvas",
      altText: "Purple turtle still life painting with flowers and shell details.",
      featured: true,
    });
    expect(dragonEggs).toMatchObject({
      availability: "Available",
      material: "Painted baked clay",
      featured: true,
    });
    expect(items.every((item) => typeof item.altText === "string" && item.altText.length > 0)).toBe(
      true,
    );
    expect(items.every((item) => typeof item.featured === "boolean")).toBe(true);
  });

  it("derives sorted unique genres", () => {
    const genres = getGalleryGenres();

    expect(genres).toContain("fantasy");
    expect(genres).toContain("sculpture");
    expect(genres).toEqual([...genres].sort((a, b) => a.localeCompare(b)));
  });

  it("derives medium summaries without unknown metadata", () => {
    const mediums = getGalleryMediums();

    expect(mediums.map((medium) => medium.name)).toEqual([
      "Canvas",
      "Digital",
      "Drawing",
      "Sculpture",
      "Shoes",
      "Painting",
      "Mixed media",
    ]);
    expect(mediums.map((medium) => medium.name)).not.toContain("Unknown");
    expect(mediums.find((medium) => medium.slug === "canvas")).toMatchObject({
      count: 5,
      showcaseItem: { slug: "turtle-still-life" },
    });
  });
});

describe("gallery filters", () => {
  const items = getGalleryItems();

  it("searches partial text case-insensitively across fields", () => {
    expect(filterGalleryItems(items, "PURPLE-TONED", "all")).toHaveLength(1);
    expect(filterGalleryItems(items, "baked clay", "all").length).toBeGreaterThan(1);
    expect(filterGalleryItems(items, "dragon", "all").map((item) => item.slug)).toEqual(
      expect.arrayContaining(["dragon-study", "dragon-eggs"]),
    );
  });

  it("combines genre and search filters", () => {
    const results = filterGalleryItems(items, "portrait", "realism");

    expect(results.map((item) => item.slug)).toEqual([
      "portrait-study",
      "green-portrait",
    ]);
  });
});

describe("gallery item resolution", () => {
  it("resolves canonical slugs", () => {
    expect(resolveGalleryItem("sunset-sail")).toMatchObject({
      item: { legacyId: 2 },
      isLegacyId: false,
    });
  });

  it("resolves legacy numeric IDs for redirects", () => {
    expect(resolveGalleryItem("2")).toMatchObject({
      item: { slug: "sunset-sail" },
      isLegacyId: true,
    });
  });

  it("rejects unknown and malformed identifiers", () => {
    expect(resolveGalleryItem("missing")).toBeUndefined();
    expect(resolveGalleryItem("2abc")).toBeUndefined();
    expect(resolveGalleryItem(undefined)).toBeUndefined();
  });
});
