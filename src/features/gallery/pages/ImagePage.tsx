import { Navigate, NavLink, useParams } from "react-router";
import { resolveGalleryItem } from "../gallery";
import { getFullImageUrl, getImagePageUrl } from "../paths";
import { usePageMetadata } from "../../../pages/usePageMetadata";

export function ImagePage(): React.JSX.Element {
  const { identifier } = useParams();
  const resolution = resolveGalleryItem(identifier);
  const metadataItem = resolution?.item;

  usePageMetadata({
    title: metadataItem
      ? `${metadataItem.artPiece} | Artwork by Paige Cook | Psychedelic Queen Artistry`
      : "Artwork Not Found | Psychedelic Queen Artistry",
    description: metadataItem
      ? `${metadataItem.description} View details, availability, original size, print sizes, and inquiry options for this Paige Cook artwork.`
      : "The requested Psychedelic Queen Artistry artwork could not be found. Browse Paige Cook's gallery for available originals, prints, and custom artwork.",
    canonicalPath: metadataItem ? getImagePageUrl(metadataItem) : "/gallery",
    image: metadataItem ? getFullImageUrl(metadataItem) : "/site/home/hero.webp",
    imageAlt: metadataItem?.altText,
    type: metadataItem ? "article" : "website",
  });

  if (!resolution) {
    return (
      <section className="mx-auto flex grow flex-col items-center gap-4 bg-[var(--cream)] px-4 py-16 text-[var(--ink)]">
        <h1 className="text-4xl">Artwork not found</h1>
        <NavLink className="home-text-link text-[var(--moss)]" to="/gallery">
          Return to the gallery
        </NavLink>
      </section>
    );
  }

  const { item, isLegacyId } = resolution;
  if (isLegacyId) {
    return <Navigate replace to={getImagePageUrl(item)} />;
  }

  const metadataRows = [
    { label: "Price", value: item.price },
    { label: "Availability", value: item.availability },
    { label: "Original size", value: item.originalSize },
    {
      label: "Print sizes",
      value: item.printSizes.length > 0 ? item.printSizes.join(", ") : null,
    },
    { label: "Date created", value: item.dateCreated },
    { label: "Genres", value: item.genres.join(", ") },
    { label: "Material", value: item.material },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <section className="flex min-h-full w-full grow bg-[var(--cream)] text-[var(--ink)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse justify-between gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:px-12 lg:py-12">
        <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] self-center lg:w-auto lg:max-w-[80%] lg:self-start">
          <img
            alt={item.altText}
            className="max-h-screen w-full bg-[var(--cream)] object-contain"
            src={getFullImageUrl(item)}
          />
        </div>
        <div className="flex w-full min-w-0 max-w-[calc(100vw-2.5rem)] grow flex-col gap-4 lg:min-w-64 lg:max-w-none">
          <NavLink className="home-text-link text-[var(--moss)]" to="/gallery">
            <span aria-hidden="true">&lt;-</span>
            Gallery
          </NavLink>
          <h1 className="break-words font-serif text-4xl sm:text-5xl">
            {item.artPiece}
          </h1>
          {item.medium && (
            <p className="home-kicker text-[var(--moss)]">{item.medium}</p>
          )}
          {item.description && (
            <p className="break-words leading-relaxed text-[var(--charcoal)]/80">
              {item.description}
            </p>
          )}
          {metadataRows.length > 0 && (
            <dl className="grid gap-3 border-t border-[var(--moss)]/30 pt-4 text-sm">
              {metadataRows.map((row) => (
                <div
                  className="grid gap-1 sm:grid-cols-[8rem_1fr]"
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
          {item.provisional && (
            <p className="border-l-4 border-[var(--moss)]/45 pl-4 text-sm leading-relaxed text-[var(--charcoal)]/65">
              Provisional details. Final sizing, pricing, and availability may
              be adjusted before purchase.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
