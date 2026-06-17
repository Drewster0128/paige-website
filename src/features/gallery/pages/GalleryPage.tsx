import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { GalleryCard } from "../components/GalleryCard";
import {
  getGalleryItems,
  getGalleryMediums,
} from "../gallery";
import { getFullImageUrl } from "../paths";
import type { GalleryItem } from "../types";

export function GalleryPage({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  const items = getGalleryItems();
  const mediums = getGalleryMediums(items);
  const [medium, setMedium] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const filteredItems =
    medium === "all" ? items : items.filter((item) => item.medium === medium);

  function clearFilters() {
    setMedium("all");
  }

  function selectMedium(nextMedium: string) {
    setMedium(nextMedium);
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
      <header className="bg-[var(--moss)] text-[var(--cream)]">
        <div className="mx-auto max-w-[1440px] px-5 py-[1.575rem] sm:px-8 lg:px-12 lg:py-9">
          <p className="home-kicker text-[var(--acid)]">Gallery</p>
          <h1 className="mt-4 max-w-6xl font-serif text-[clamp(3.2rem,8vw,8rem)] leading-[0.88] text-[var(--cream)]">
            Explore the work by medium.
          </h1>
          <p className="mt-5 max-w-xl border-t border-[var(--cream)]/30 pt-4 text-lg leading-relaxed text-[var(--cream)]/85">
            Paintings, drawings, sculpture, and digital work in one place.
          </p>
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
                isSelected={medium === "all"}
                label="All"
                onClick={() => selectMedium("all")}
              />
              {mediums.map((galleryMedium) => (
                <MediumFilterButton
                  count={galleryMedium.count}
                  isSelected={medium === galleryMedium.name}
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/90 p-4 text-[var(--cream)]"
      onClick={onClose}
      role="dialog"
    >
      <div
        aria-labelledby="artwork-modal-title"
        className="grid max-h-[calc(100svh-2rem)] w-full max-w-[1320px] gap-5 overflow-y-auto border border-[var(--moss)]/40 bg-[var(--cream)] p-4 text-[var(--ink)] sm:p-5 lg:grid-cols-[minmax(0,1fr)_22rem]"
        onClick={(event) => event.stopPropagation()}
        ref={modalPanelRef}
      >
        <div className="flex min-h-0 items-center justify-center bg-[var(--charcoal)]">
          <img
            alt={item.altText}
            className="max-h-[75svh] w-full object-contain"
            src={getFullImageUrl(item)}
          />
        </div>

        <aside className="flex flex-col gap-5">
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
