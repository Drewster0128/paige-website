import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ROUTES } from "../../../config/routes";
import { ArtworkModal } from "../components/ArtworkModal";
import { GalleryCard } from "../components/GalleryCard";
import { GalleryHeroAccent } from "../components/GalleryHeroAccent";
import { MediumFilterButton } from "../components/MediumFilterButton";
import { getGalleryMediums } from "../gallery";
import {type GalleryItem } from "../../../types"
import { usePageMetadata } from "../../../pages/usePageMetadata";
import { getGalleryData } from "../../../utils/apiService";

const GALLERY_PAGE_TITLE =
  "Gallery | Paige Cook Artwork | Psychedelic Queen Artistry";
const GALLERY_PAGE_DESCRIPTION =
  "Browse Paige Cook's Psychedelic Queen Artistry gallery by medium, including paintings, drawings, sculpture, digital artwork, mixed media, custom objects, originals, and prints.";

export function GalleryPage({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  usePageMetadata({
    title: GALLERY_PAGE_TITLE,
    description: GALLERY_PAGE_DESCRIPTION,
    canonicalPath: ROUTES.gallery,
  });



  //1. LOCAL FILE DATA IMPORT

  

  //2. STATES

  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [status, setStatus] = useState<string>("loading");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  
  //3. DERIVED STATES

  const mediums = items
    ? getGalleryMediums(items)
    : [];

  const selectedMediumSlug = searchParams.get("medium");

  const selectedMedium =
    mediums.find((galleryMedium) => galleryMedium.slug === selectedMediumSlug)
      ?.name ?? "all";

  const heroAccentItems = items
    ? [
      ...items.filter((item) => item.featured),
      ...items.filter((item) => !item.featured),
    ].slice(0, 12)
    : [];

  const filteredItems = items
    ? selectedMedium === "all"
      ? items
      : items.filter((item) => item.medium === selectedMedium)
    : [];


  // 4. HANDLERS

  function clearFilters() 
  {
    selectMedium("all");
  }

  function selectMedium(nextMedium: string) 
  {
    const nextSearchParams = new URLSearchParams(searchParams);
    if(nextMedium === "all")
    {
      nextSearchParams.delete("medium");
    }
    else
    {
      const nextMediumSlug = mediums.find(
        (galleryMedium) => galleryMedium.name === nextMedium,
      )?.slug;
      if(nextMediumSlug)
      {
        nextSearchParams.set("medium", nextMediumSlug);
      }
    }
    setSearchParams(nextSearchParams, { state: { preserveScroll: true } });
  }

  useEffect(() => {
    getGalleryData()
      .then((result) => {
        switch(result.ok)
        {
          case true:
            setItems(result.value);
            setStatus("success");
            break;
          default:
            console.log(result.error);
            setStatus("error");
            break;
        }
      })
  }, []);

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

      if (
        event.key === "Escape" ||
        (event.key === "Backspace" && !isEditableTarget)
      ) {
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


  if(status === "loading")
  {
    return <div>loading</div>;
  }
  else if(status === "error")
  {
    return <div>error</div>
  }
  else
  {
    return (
      <section className={`${className} bg-[var(--cream)] text-[var(--ink)]`}>
        <header className="overflow-hidden bg-[var(--brand-primary)] text-[var(--cream)]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-[1.575rem] sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,23rem)] lg:items-center lg:px-12 lg:py-9 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)]">
            <div className="min-w-0">
              <h1 className="gallery-hero-heading max-w-[calc(100vw-2.5rem)] font-serif text-[clamp(2.7rem,8vw,8rem)] leading-[0.88] text-[var(--cream)] sm:max-w-6xl">
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

        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 pb-12 pt-12 sm:px-8 lg:px-12 lg:pb-16 lg:pt-16">
          <section
            aria-labelledby="gallery-projects"
            className="grid min-h-[60svh] content-start scroll-mt-24 gap-8"
          >
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
                  count={items!.length}
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
              <div className="border-y border-[var(--brand-primary)]/30 py-12 text-center">
                <p className="font-serif text-3xl text-[var(--ink)]">
                  No works found for this filter.
                </p>
                <button
                  className="site-button site-button--primary-fill mt-6"
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

}
