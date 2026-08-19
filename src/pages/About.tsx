import { NavLink } from "react-router";
import { HERO_IMAGES } from "../config/assets";
import { ROUTES } from "../config/routes";
import { usePageMetadata } from "./usePageMetadata";

const ABOUT_PAGE_TITLE =
  "About Paige Cook | Greater Chicago Area Artist | Psychedelic Queen Artistry";
const ABOUT_PAGE_DESCRIPTION =
  "Meet Paige Cook, the greater Chicago area artist behind Psychedelic Queen Artistry. Paige creates colorful paintings, illustration, sculpture, prints, and custom artwork.";

export function About(): React.JSX.Element {
  usePageMetadata({
    title: ABOUT_PAGE_TITLE,
    description: ABOUT_PAGE_DESCRIPTION,
    canonicalPath: "/about",
    image: HERO_IMAGES.about,
    type: "profile",
  });

  return (
    <div className="flex w-full grow flex-col bg-[var(--cream)] text-[var(--ink)]">
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--brand-primary)] text-[var(--cream)]">
        <img
          alt="Paige Cook working in the studio"
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={HERO_IMAGES.about}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(75,99,56,0.94)] via-[rgba(75,99,56,0.38)] to-[rgba(75,99,56,0.12)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12">
          <h1 className="max-w-6xl font-serif text-[clamp(3.4rem,9vw,9rem)] leading-[0.86] text-[var(--cream)]">
            About Paige Cook
          </h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--cream)]/40 pt-5 lg:flex-row lg:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--cream)]/85 sm:text-xl">
              Paige Cook is the greater Chicago area artist behind Psychedelic
              Queen Artistry, a colorful studio practice spanning paintings,
              illustration, sculpture, prints, and custom artwork.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <NavLink
                className="site-button site-button--accent"
                to={ROUTES.gallery}
              >
                View artwork
                <span aria-hidden="true">-&gt;</span>
              </NavLink>
              <NavLink
                className="site-button site-button--light"
                to={ROUTES.contact}
              >
                Start an inquiry
                <span aria-hidden="true">-&gt;</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
          <div>
            <h2 className="max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              Color, character, and handmade detail.
            </h2>
          </div>

          <div className="flex flex-col gap-6 border-t border-[var(--charcoal)] pt-6 text-lg leading-relaxed text-[var(--charcoal)]/82">
            <p>
              Paige has been making art since she was a young child. What
              started as a constant pull toward drawing, building, and
              experimenting grew into Psychedelic Queen Artistry, a portfolio
              defined by saturated color, expressive characters, and work that
              moves confidently between mediums.
            </p>
            <p>
              Her practice includes canvas paintings, drawings, digital
              illustration, sculpture, mixed-media pieces, painted objects, and
              custom commissions. Whether she is developing a character,
              painting a surface, or building a small sculptural piece, Paige
              brings a playful visual language and a strong sense of personality
              to the final work.
            </p>
            <p>
              Paige studied at the Milwaukee Institute of Art & Design (MIAD)
              and graduated with a bachelor's degree in 2024. Now based in the
              greater Chicago area, she continues to create original artwork,
              prints, and commissioned pieces for collectors, clients, and
              collaborators looking for work with color, imagination, and a
              distinct point of view.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-primary)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--cream)]/35 pb-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-serif text-5xl leading-none sm:text-7xl">
                Artwork made to feel personal.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[var(--cream)]/78">
              Explore available work, ask about prints, or start a custom
              commission with Paige.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="border-t border-[var(--cream)]/35 pt-5">
              <h3 className="mt-4 font-serif text-3xl">
                Paintings, drawings, and sculpture
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                Paige creates pieces across traditional and digital formats,
                with an archive that includes canvas work, ink drawings,
                character studies, sculpture, and mixed-media objects.
              </p>
            </section>

            <section className="border-t border-[var(--cream)]/35 pt-5">
              <h3 className="mt-4 font-serif text-3xl">
                Accessible ways to collect
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                Select pieces may be available as prints, making it easier to
                bring Paige's color-driven work into a home, studio, office, or
                gift.
              </p>
            </section>

            <section className="border-t border-[var(--cream)]/35 pt-5">
              <h3 className="mt-4 font-serif text-3xl">
                Custom artwork and collaborations
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                For personal pieces, creative gifts, painted objects, or
                collaboration ideas, the contact page is the best place to start
                a conversation about timeline, style, and fit.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h2 className="max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              A Chicago-area practice with MIAD roots.
            </h2>
          </div>

          <dl className="grid gap-6 border-t border-[var(--charcoal)] pt-6 sm:grid-cols-2">
            <div>
              <dt className="meta-label text-[var(--brand-primary)]">Artist</dt>
              <dd className="mt-3 font-serif text-3xl">Paige Cook</dd>
            </div>
            <div>
              <dt className="meta-label text-[var(--brand-primary)]">
                Location
              </dt>
              <dd className="mt-3 font-serif text-3xl">Greater Chicago area</dd>
            </div>
            <div>
              <dt className="meta-label text-[var(--brand-primary)]">
                Education
              </dt>
              <dd className="mt-3 font-serif text-3xl">
                MIAD bachelor's, 2024
              </dd>
            </div>
            <div>
              <dt className="meta-label text-[var(--brand-primary)]">
                Studio focus
              </dt>
              <dd className="mt-3 font-serif text-3xl">
                Originals, prints, commissions
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-[var(--brand-primary)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 border-y border-[var(--cream)]/35 py-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-3xl font-serif text-5xl leading-none sm:text-7xl">
              Find the piece that feels like yours.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--cream)]/78">
              Browse the gallery for available work and prints, or reach out to
              ask about a custom idea, collaboration, or specific artwork.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <NavLink
              className="site-button site-button--accent"
              to={ROUTES.gallery}
            >
              Browse gallery
              <span aria-hidden="true">-&gt;</span>
            </NavLink>
            <NavLink
              className="site-button site-button--light"
              to={ROUTES.contact}
            >
              Contact Paige
              <span aria-hidden="true">-&gt;</span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
