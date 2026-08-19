import { useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { getFullImageUrl } from "../paths";
import type { GalleryItem } from "@types";

export function ArtworkModal({
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
      value: item.printSizes ? item.printSizes.join(", ") : null,
    },
    { label: "Date created", value: item.dateCreated },
    { label: "Medium", value: item.medium },
    { label: "Material", value: item.material },
  ].filter((row): row is { label: string; value: string } =>
    Boolean(row.value),
  );
  const inquiryUrl = `/contact?artPiece=${encodeURIComponent(item.artPiece)}`;

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () =>
      Array.from(
        modalPanelRef.current?.querySelectorAll<HTMLElement>(
          focusableSelector,
        ) ?? [],
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-primary)]/90 p-2 text-[var(--cream)] sm:p-4 lg:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        aria-labelledby="artwork-modal-title"
        className="artwork-modal grid w-full gap-4 overflow-y-auto border border-[var(--brand-primary)]/40 bg-[var(--cream)] p-3 text-[var(--ink)] sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] lg:overflow-hidden"
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
              <p className="meta-label text-[var(--brand-primary)]">
                {item.medium}
              </p>
              <h2
                className="mt-2 break-words font-serif text-4xl leading-none"
                id="artwork-modal-title"
              >
                {item.artPiece}
              </h2>
            </div>
            <button
              aria-label="Close artwork"
              className="hidden shrink-0 rounded-md border border-[var(--brand-primary)] px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)] transition hover:bg-[var(--brand-primary)] hover:text-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)] lg:inline-flex"
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
            <p className="border-l-4 border-[var(--brand-primary)]/45 pl-4 text-sm leading-relaxed text-[var(--charcoal)]/65">
              Provisional details. Final sizing, pricing, and availability may
              be adjusted before purchase.
            </p>
          )}

          {metadataRows.length > 0 && (
            <dl className="grid gap-3 border-t border-[var(--brand-primary)]/30 pt-4 text-sm">
              {metadataRows.map((row) => (
                <div
                  className="grid gap-1 sm:grid-cols-[8rem_1fr] lg:grid-cols-1"
                  key={row.label}
                >
                  <dt className="uppercase tracking-[0.16em] text-[var(--brand-primary)]">
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
            className="site-button site-button--primary-fill mt-auto"
            to={inquiryUrl}
          >
            Ask about this piece
            <span aria-hidden="true">-&gt;</span>
          </NavLink>

          <button
            aria-label="Close artwork"
            className="rounded-md border border-[var(--brand-primary)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)] transition hover:bg-[var(--brand-primary)] hover:text-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)] lg:hidden"
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
