import { useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import { GalleryCard } from "../components/GalleryCard";
import {
  getGalleryItems,
  getGalleryMediums,
} from "../gallery";
import { getFullImageUrl, getThumbnailUrl } from "../paths";
import type { GalleryItem } from "../types";
import { usePageMetadata } from "../../../pages/usePageMetadata";

const GALLERY_PAGE_TITLE =
  "Gallery | Paige Cook Artwork | Psychedelic Queen Artistry";
const GALLERY_PAGE_DESCRIPTION =
  "Browse Paige Cook's Psychedelic Queen Artistry gallery by medium, including paintings, drawings, sculpture, digital artwork, mixed media, custom objects, originals, and prints.";
const HERO_ACCENT_PARALLAX_DEPTHS = [
  0.7, 1.05, 0.85, 1.15, 0.75, 1.25, 0.9, 1.1, 0.8, 1.2, 0.95, 1,
];
const HERO_ACCENT_BUMP_RADIUS = 130;
const HERO_ACCENT_BUMP_STRENGTH = 1.65;
const HERO_ACCENT_DAMPING = 0.82;
const HERO_ACCENT_MAX_SHIFT = 34;
const HERO_ACCENT_SPRING = 0.065;

type HeroAccentTileMotion = {
  depth: number;
  element: HTMLElement;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

export function GalleryPage({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  usePageMetadata({
    title: GALLERY_PAGE_TITLE,
    description: GALLERY_PAGE_DESCRIPTION,
    canonicalPath: "/gallery",
  });

  const items = getGalleryItems();
  const mediums = getGalleryMediums(items);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMediumSlug = searchParams.get("medium");
  const selectedMedium =
    mediums.find((galleryMedium) => galleryMedium.slug === selectedMediumSlug)
      ?.name ?? "all";
  const heroAccentItems = [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ].slice(0, 12);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const filteredItems =
    selectedMedium === "all"
      ? items
      : items.filter((item) => item.medium === selectedMedium);

  function clearFilters() {
    selectMedium("all");
  }

  function selectMedium(nextMedium: string) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextMedium === "all") {
      nextSearchParams.delete("medium");
    } else {
      const nextMediumSlug = mediums.find(
        (galleryMedium) => galleryMedium.name === nextMedium,
      )?.slug;

      if (nextMediumSlug) {
        nextSearchParams.set("medium", nextMediumSlug);
      }
    }

    setSearchParams(nextSearchParams, { state: { preserveScroll: true } });
  }

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnKeydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (event.key === "Escape" || (event.key === "Backspace" && !isEditableTarget)) {
        event.preventDefault();
        setSelectedItem(null);
      }
    }

    document.addEventListener("keydown", closeOnKeydown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", closeOnKeydown);
    };
  }, [selectedItem]);

  return (
    <section className={`${className} bg-[var(--cream)] text-[var(--ink)]`}>
      <header className="overflow-hidden bg-[var(--moss)] text-[var(--cream)]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-[1.575rem] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,23rem)] lg:items-center lg:px-12 lg:py-9 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)]">
          <div className="min-w-0">
            <p className="home-kicker text-[var(--acid)]">Gallery</p>
            <h1 className="gallery-hero-heading mt-4 max-w-[calc(100vw-2.5rem)] font-serif text-[clamp(2.7rem,8vw,8rem)] leading-[0.88] text-[var(--cream)] sm:max-w-6xl">
              <span className="block">A Collection of</span>
              <span className="gallery-hero-heading__art-line block">
                <span className="gallery-hero-heading__color">Color</span>,{" "}
                <span className="gallery-hero-heading__character">
                  Character,
                </span>{" "}
                and <span className="gallery-hero-heading__chaos">Chaos</span>
              </span>
            </h1>
            <p className="mt-5 w-full max-w-[calc(100vw-2.5rem)] border-t border-[var(--cream)]/30 pt-4 text-lg leading-relaxed text-[var(--cream)]/85 sm:max-w-xl">
              Paintings, drawings, sculpture, and digital work in one place.
            </p>
          </div>

          <GalleryHeroAccent items={heroAccentItems} />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <section aria-labelledby="gallery-projects" className="grid min-h-[60svh] gap-8">
          <div className="grid gap-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2
                  className="font-serif text-4xl text-[var(--ink)] sm:text-5xl"
                  id="gallery-projects"
                >
                  Archive
                </h2>
              </div>
            </div>

            <div
              aria-label="Filter by medium"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
              role="group"
            >
              <MediumFilterButton
                count={items.length}
                isSelected={selectedMedium === "all"}
                label="All"
                onClick={() => selectMedium("all")}
              />
              {mediums.map((galleryMedium) => (
                <MediumFilterButton
                  count={galleryMedium.count}
                  isSelected={selectedMedium === galleryMedium.name}
                  key={galleryMedium.slug}
                  label={galleryMedium.name}
                  onClick={() => selectMedium(galleryMedium.name)}
                />
              ))}
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <article className="grid shrink-0 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredItems.map((item) => (
                <GalleryCard
                  className="relative transition-transform hover:-translate-y-1"
                  item={item}
                  key={item.slug}
                  onSelect={setSelectedItem}
                />
              ))}
            </article>
          ) : (
            <div className="border-y border-[var(--moss)]/30 py-12 text-center">
              <p className="font-serif text-3xl text-[var(--ink)]">
                No works found for this filter.
              </p>
              <button
                className="home-button home-button--moss-fill mt-6"
                onClick={clearFilters}
                type="button"
              >
                Clear filters
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          )}
        </section>
      </div>

      {selectedItem && (
        <ArtworkModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}

function GalleryHeroAccent({
  items,
}: {
  items: GalleryItem[];
}): React.JSX.Element {
  const accentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cursorRef = useRef<{ isActive: boolean; x: number; y: number } | null>(
    null,
  );
  const prefersReducedMotionRef = useRef(false);
  const tileMotionRef = useRef<HeroAccentTileMotion[]>([]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function getTileMotion() {
    const accent = accentRef.current;
    const tileElements = Array.from(
      accent?.querySelectorAll<HTMLElement>(".gallery-hero-accent__tile") ?? [],
    );
    const currentMotionByElement = new Map(
      tileMotionRef.current.map((motion) => [motion.element, motion]),
    );

    tileMotionRef.current = tileElements.map((element) => {
      const currentMotion = currentMotionByElement.get(element);

      if (currentMotion) {
        currentMotion.depth = Number(element.dataset.depth ?? 1);
        return currentMotion;
      }

      return {
        depth: Number(element.dataset.depth ?? 1),
        element,
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
      };
    });

    return tileMotionRef.current;
  }

  function clampShift(value: number) {
    return Math.max(-HERO_ACCENT_MAX_SHIFT, Math.min(HERO_ACCENT_MAX_SHIFT, value));
  }

  function animateTiles() {
    const cursor = cursorRef.current;
    const tileMotion = getTileMotion();
    let shouldContinue = Boolean(cursor?.isActive);

    tileMotion.forEach((motion) => {
      const bounds = motion.element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      if (cursor?.isActive) {
        const distanceX = centerX - cursor.x;
        const distanceY = centerY - cursor.y;
        const distance = Math.hypot(distanceX, distanceY);
        const bumpRadius =
          HERO_ACCENT_BUMP_RADIUS + Math.max(bounds.width, bounds.height) / 2;

        if (distance < bumpRadius) {
          const safeDistance = distance || 1;
          const force =
            (1 - distance / bumpRadius) ** 2 *
            HERO_ACCENT_BUMP_STRENGTH *
            motion.depth;

          motion.vx += (distanceX / safeDistance) * force;
          motion.vy += (distanceY / safeDistance) * force;
        }
      }

      motion.vx += -motion.x * HERO_ACCENT_SPRING;
      motion.vy += -motion.y * HERO_ACCENT_SPRING;
      motion.vx *= HERO_ACCENT_DAMPING;
      motion.vy *= HERO_ACCENT_DAMPING;

      const nextX = clampShift(motion.x + motion.vx);
      const nextY = clampShift(motion.y + motion.vy);

      if (nextX !== motion.x + motion.vx) {
        motion.vx *= -0.25;
      }

      if (nextY !== motion.y + motion.vy) {
        motion.vy *= -0.25;
      }

      motion.x = nextX;
      motion.y = nextY;

      motion.element.style.setProperty(
        "--tile-shift-x",
        `${motion.x.toFixed(2)}px`,
      );
      motion.element.style.setProperty(
        "--tile-shift-y",
        `${motion.y.toFixed(2)}px`,
      );

      if (
        Math.abs(motion.x) > 0.05 ||
        Math.abs(motion.y) > 0.05 ||
        Math.abs(motion.vx) > 0.05 ||
        Math.abs(motion.vy) > 0.05
      ) {
        shouldContinue = true;
      }
    });

    if (shouldContinue) {
      animationFrameRef.current = window.requestAnimationFrame(animateTiles);
    } else {
      animationFrameRef.current = null;
      tileMotion.forEach((motion) => {
        motion.x = 0;
        motion.y = 0;
        motion.vx = 0;
        motion.vy = 0;
        motion.element.style.setProperty("--tile-shift-x", "0px");
        motion.element.style.setProperty("--tile-shift-y", "0px");
      });
    }
  }

  function startTileAnimation() {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(animateTiles);
    }
  }

  function moveAccent(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotionRef.current) {
      return;
    }

    cursorRef.current = {
      isActive: true,
      x: event.clientX,
      y: event.clientY,
    };
    startTileAnimation();
  }

  function resetAccent() {
    cursorRef.current = null;
    startTileAnimation();
  }

  return (
    <div
      aria-hidden="true"
      className="gallery-hero-accent hidden lg:block"
      onPointerLeave={resetAccent}
      onPointerMove={moveAccent}
      ref={accentRef}
    >
      <div className="gallery-hero-accent__grid">
        {items.map((item, index) => (
          <div
            className="gallery-hero-accent__tile"
            data-depth={HERO_ACCENT_PARALLAX_DEPTHS[index] ?? 1}
            key={item.slug}
          >
            <img
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
              loading={index < 4 ? "eager" : "lazy"}
              src={getThumbnailUrl(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MediumFilterButton({
  count,
  isSelected,
  label,
  onClick,
}: {
  count: number;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <button
      aria-pressed={isSelected}
      className={`border px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition ${
        isSelected
          ? "border-[var(--moss)] bg-[var(--moss)] text-[var(--cream)]"
          : "border-[var(--moss)]/40 bg-[var(--cream)] text-[var(--moss)] hover:border-[var(--moss)] hover:bg-[var(--moss)] hover:text-[var(--cream)]"
      } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moss)]`}
      onClick={onClick}
      type="button"
    >
      {label}
      <span className="ml-2 opacity-70">{count}</span>
    </button>
  );
}

function ArtworkModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}): React.JSX.Element {
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const metadataRows = [
    { label: "Price", value: item.price },
    { label: "Availability", value: item.availability },
    { label: "Original size", value: item.originalSize },
    {
      label: "Print sizes",
      value: item.printSizes.length > 0 ? item.printSizes.join(", ") : null,
    },
    { label: "Date created", value: item.dateCreated },
    { label: "Medium", value: item.medium },
    { label: "Material", value: item.material },
    { label: "Genres", value: item.genres.join(", ") },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
  const inquiryUrl = `/contact?artPiece=${encodeURIComponent(item.artPiece)}`;

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () =>
      Array.from(
        modalPanelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ??
          [],
      ).filter((element) => element.offsetParent !== null);
    const firstFocusableElement = getFocusableElements()[0];

    firstFocusableElement?.focus();

    function trapFocus(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", trapFocus);

    return () => {
      document.removeEventListener("keydown", trapFocus);
      previouslyFocusedElement?.focus();
    };
  }, []);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--moss)]/90 p-2 text-[var(--cream)] sm:p-4 lg:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        aria-labelledby="artwork-modal-title"
        className="artwork-modal grid w-full gap-4 overflow-y-auto border border-[var(--moss)]/40 bg-[var(--cream)] p-3 text-[var(--ink)] sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] lg:overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        ref={modalPanelRef}
      >
        <div className="artwork-modal__image-stage flex min-h-0 items-center justify-center overflow-hidden bg-[var(--cream)] p-2 sm:p-3">
          <div className="artwork-modal__image-frame">
            <img
              alt={item.altText}
              className="artwork-modal__image"
              src={getFullImageUrl(item)}
            />
          </div>
        </div>

        <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto lg:pr-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="home-kicker text-[var(--moss)]">{item.medium}</p>
              <h2
                className="mt-2 break-words font-serif text-4xl leading-none"
                id="artwork-modal-title"
              >
                {item.artPiece}
              </h2>
            </div>
            <button
              aria-label="Close artwork"
              className="hidden shrink-0 border border-[var(--moss)] px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--moss)] transition hover:bg-[var(--moss)] hover:text-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moss)] lg:inline-flex"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>

          {item.description && (
            <p className="leading-relaxed text-[var(--charcoal)]/80">
              {item.description}
            </p>
          )}

          {item.provisional && (
            <p className="border-l-4 border-[var(--moss)]/45 pl-4 text-sm leading-relaxed text-[var(--charcoal)]/65">
              Provisional details. Final sizing, pricing, and availability may
              be adjusted before purchase.
            </p>
          )}

          {metadataRows.length > 0 && (
            <dl className="grid gap-3 border-t border-[var(--moss)]/30 pt-4 text-sm">
              {metadataRows.map((row) => (
                <div
                  className="grid gap-1 sm:grid-cols-[8rem_1fr] lg:grid-cols-1"
                  key={row.label}
                >
                  <dt className="uppercase tracking-[0.16em] text-[var(--moss)]">
                    {row.label}
                  </dt>
                  <dd className="capitalize text-[var(--charcoal)]/85">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <NavLink
            aria-label={`Inquire about ${item.artPiece}`}
            className="home-button home-button--moss-fill mt-auto"
            to={inquiryUrl}
          >
            Ask about this piece
            <span aria-hidden="true">-&gt;</span>
          </NavLink>

          <button
            aria-label="Close artwork"
            className="border border-[var(--moss)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--moss)] transition hover:bg-[var(--moss)] hover:text-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--moss)] lg:hidden"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </aside>
      </div>
    </div>
  );
}
