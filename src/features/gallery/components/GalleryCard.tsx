import { getThumbnailUrl } from "../paths";
import type { GalleryItem } from "@types";

export function GalleryCard({
  item,
  className = "",
  onSelect,
}: {
  item: GalleryItem;
  className?: string;
  onSelect: (item: GalleryItem) => void;
}): React.JSX.Element {
  return (
    <article className={`group ${className}`}>
      <button
        aria-label={`View ${item.artPiece}`}
        className="block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)]"
        onClick={() => onSelect(item)}
        type="button"
      >
        <div className="overflow-hidden rounded-md bg-[var(--cream)] transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1">
          <img
            alt={item.altText}
            className="aspect-4/3 w-full object-cover transition duration-300 group-hover:opacity-90 group-focus-within:opacity-90"
            loading="lazy"
            src={getThumbnailUrl(item)}
          />
        </div>
        <div className="flex items-start justify-between gap-4 pt-3">
          <div className="min-w-0">
            <h3 className="animated-title-underline inline break-words font-serif text-2xl text-[var(--ink)]">
              {item.artPiece}
            </h3>
            <p className="mt-1 text-sm capitalize text-[var(--charcoal)]/70">
              {item.medium}
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
