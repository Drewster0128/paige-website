import { NavLink } from "react-router";
import {
  getGalleryItems,
  getImagePageUrl,
  getThumbnailUrl,
  type GalleryItem,
} from "../features/gallery";
import { getUpcomingEvents } from "../features/events";

const MEDIUM_SHOWCASE_SLUGS = [
  "turtle-still-life",
  "medusa",
  "portrait-study",
  "dragon-eggs",
  "psychedelic-high-tops",
  "totoro-mural",
  "eight-of-clubs",
];

function MediumShowcaseLink({
  item,
  className = "",
  priority = false,
}: {
  item: GalleryItem;
  className?: string;
  priority?: boolean;
}): React.JSX.Element {
  return (
    <NavLink
      className={`group block ${className}`}
      to={getImagePageUrl(item)}
    >
      <div className="overflow-hidden bg-[var(--charcoal)]">
        <img
          alt={item.altText}
          className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading={priority ? "eager" : "lazy"}
          src={getThumbnailUrl(item)}
        />
      </div>
      <div className="flex items-start justify-between gap-4 border-t border-[var(--charcoal)] pt-3">
        <div>
          <h3 className="font-serif text-2xl">{item.medium}</h3>
          <p className="text-sm text-[var(--charcoal)]/70">
            {[item.artPiece, item.material].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="text-xl transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </NavLink>
  );
}

export function Home({ className = "" }: { className?: string }) {
  const galleryItems = getGalleryItems();
  const mediumShowcaseItems = MEDIUM_SHOWCASE_SLUGS.map((slug) =>
    galleryItems.find((item) => item.slug === slug),
  ).filter((item): item is GalleryItem => item !== undefined);
  const events = getUpcomingEvents();

  return (
    <div className={`home-page flex w-full flex-col overflow-hidden ${className}`}>
      <section className="home-hero order-1 relative min-h-[calc(100svh-5rem)] overflow-hidden">
        <img
          alt="Paige Cook painting in her studio"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          src="/site/home/hero.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.96)] via-[rgba(8,10,8,0.24)] to-[rgba(8,10,8,0.08)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--cream)]/80">
            Painter · Illustrator · Maker
          </p>
          <h1 className="max-w-5xl font-serif text-[clamp(3.6rem,10vw,9.5rem)] leading-[0.82] tracking-[-0.055em] text-[var(--cream)]">
            Color without
            <span className="block text-[var(--coral)]">permission.</span>
          </h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--cream)]/40 pt-5 sm:flex-row sm:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-[var(--cream)]/85 sm:text-xl">
              Psychedelic Queen Artistry is a vivid collection of paintings,
              characters, custom objects, and imaginative worlds by Paige Cook.
            </p>
            <NavLink
              className="home-button home-button--hero"
              to="/gallery"
            >
              Enter the gallery
              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section
        className="order-2 scroll-mt-20 bg-[var(--cream)] px-5 py-20 text-[var(--ink)] sm:px-8 sm:py-28 lg:px-12"
        id="selected-work"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[var(--charcoal)] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="home-kicker text-[var(--moss)]">Mediums</p>
              <h2 className="mt-3 font-serif text-5xl tracking-tight sm:text-7xl">
                From the studio
              </h2>
            </div>
            <p className="max-w-sm text-[var(--charcoal)]/75">
              A quick look at the formats Paige works across, with one piece
              representing each medium.
            </p>
          </div>

          {mediumShowcaseItems.length > 0 && (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {mediumShowcaseItems.map((item, index) => (
                <MediumShowcaseLink
                  item={item}
                  key={item.slug}
                  priority={index < 4}
                />
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <NavLink className="home-button home-button--moss-fill" to="/gallery">
              View all projects
              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section
        className="order-3 scroll-mt-20 grid bg-[var(--moss)] text-[var(--cream)] lg:grid-cols-2"
        id="process"
      >
        <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[44rem]">
          <img
            alt="Paige working on a colorful painting"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            src="/site/home/hero.webp"
          />
        </div>
        <div className="flex flex-col justify-between gap-16 px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
          <div>
            <p className="home-kicker text-[var(--acid)]">Inside the work</p>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,6vw,6.3rem)] leading-[0.92] tracking-[-0.04em]">
              Made with curiosity. Finished with nerve.
            </h2>
          </div>
          <div className="border-t border-[var(--cream)]/40 pt-6">
            <p className="max-w-xl text-lg leading-relaxed text-[var(--cream)]/85">
              Each project begins somewhere different: a character, a memory,
              an image, a joke, or a color that refuses to stay quiet. The
              result is work with a playful surface and a point of view
              underneath it.
            </p>
            <NavLink className="home-text-link mt-8" to="/about">
              Read the story <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section
        className="order-4 scroll-mt-20 bg-[var(--cream)] px-5 py-20 text-[var(--ink)] sm:px-8 sm:py-28 lg:px-12"
        id="upcoming"
      >
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="home-kicker text-[var(--coral)]">In person</p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[0.9] tracking-[-0.045em]">
              See what’s coming next.
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-12 border-t border-[var(--charcoal)] pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {events.length > 0 ? (
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--charcoal)]/70">
                  Next appearance
                </p>
                <p className="mt-3 font-serif text-3xl">{events[0].title}</p>
                <p className="mt-2 text-[var(--charcoal)]/75">
                  {events[0].venue} · {events[0].location}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-serif text-3xl">New dates coming soon.</p>
                <p className="mt-3 max-w-lg text-lg text-[var(--charcoal)]/75">
                  Markets, exhibitions, and community appearances will be
                  announced on the events page.
                </p>
              </div>
            )}
            <NavLink className="home-button home-button--dark" to="/events">
              Upcoming events
              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section
        className="home-contact-cta order-5 scroll-mt-20 px-5 py-24 text-[var(--cream)] sm:px-8 sm:py-32 lg:px-12"
        id="inquiries"
      >
        <div className="mx-auto max-w-[1360px] text-center">
          <p className="home-kicker text-[var(--cream)]/70">Commissions · Collaborations · Questions</p>
          <h2 className="mx-auto mt-5 max-w-5xl font-serif text-[clamp(3.4rem,8.5vw,9rem)] leading-[0.88] tracking-[-0.05em]">
            Have an idea worth making loud?
          </h2>
          <NavLink
            className="home-button home-button--cream-fill mx-auto mt-10"
            to="/contact"
          >
            Start a conversation
            <span aria-hidden="true">→</span>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
