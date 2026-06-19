import { NavLink } from "react-router";
import { usePageMetadata } from "../../../pages/usePageMetadata";
import { EventCard } from "../components/EventCard";
import { getUpcomingEvents } from "../events";

const EVENTS_PAGE_TITLE =
  "Events | Paige Cook Art Markets and Exhibitions | Psychedelic Queen Artistry";
const EVENTS_PAGE_DESCRIPTION =
  "Find upcoming art markets, exhibitions, pop-ups, and in-person appearances for Paige Cook, the greater Chicago area artist behind Psychedelic Queen Artistry.";

export function EventsPage(): React.JSX.Element {
  const events = getUpcomingEvents();
  const hasEvents = events.length > 0;

  usePageMetadata({
    title: EVENTS_PAGE_TITLE,
    description: EVENTS_PAGE_DESCRIPTION,
    canonicalPath: "/events",
    image: "/site/events/hero.webp",
  });

  return (
    <div className="flex w-full grow flex-col bg-[var(--cream)] text-[var(--ink)]">
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--moss)] text-[var(--cream)]">
        <img
          alt="Paige Cook at an outdoor art fair booth with colorful paintings on display"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          src="/site/events/hero.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(75,99,56,0.94)] via-[rgba(75,99,56,0.42)] to-[rgba(75,99,56,0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(75,99,56,0.72)] via-[rgba(75,99,56,0.08)] to-[rgba(75,99,56,0.06)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12">
          <p className="home-kicker text-[var(--acid)]">Events</p>
          <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.4rem,9vw,9rem)] leading-[0.86]">
            Meet Paige in person.
          </h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--cream)]/40 pt-5 lg:flex-row lg:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--cream)]/85 sm:text-xl">
              Follow upcoming art markets, exhibitions, pop-ups, and community
              appearances for Psychedelic Queen Artistry in the greater Chicago
              area and beyond.
            </p>
            <NavLink className="home-button home-button--cream-fill" to="/contact">
              Invite Paige
              <span aria-hidden="true">-&gt;</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="home-kicker text-[var(--moss)]">Upcoming dates</p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              {hasEvents ? "Where to find the work next." : "New dates coming soon."}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {hasEvents ? (
              events.map((event) => <EventCard event={event} key={event.id} />)
            ) : (
              <div className="border-t border-[var(--charcoal)] pt-6">
                <p className="max-w-2xl text-lg leading-relaxed text-[var(--charcoal)]/82">
                  There are no public events listed right now. Paige&apos;s
                  schedule will be updated here as new markets, exhibitions,
                  pop-ups, and community appearances are confirmed.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <NavLink
                    className="home-button home-button--moss-fill"
                    to="/gallery"
                  >
                    Browse available work
                    <span aria-hidden="true">-&gt;</span>
                  </NavLink>
                  <NavLink className="home-button home-button--dark" to="/contact">
                    Ask about events
                    <span aria-hidden="true">-&gt;</span>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[var(--moss)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--cream)]/35 pb-6 lg:flex-row lg:items-end">
            <div>
              <p className="home-kicker text-[var(--acid)]">In person</p>
              <h2 className="mt-3 font-serif text-5xl leading-none sm:text-7xl">
                Markets, pop-ups, and creative gatherings.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[var(--cream)]/78">
              Events are a way to see the texture, scale, and color of Paige
              Cook&apos;s artwork beyond the screen.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="border-t border-[var(--cream)]/35 pt-5">
              <p className="home-kicker text-[var(--acid)]">Shop</p>
              <h3 className="mt-4 font-serif text-3xl">Originals and prints</h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                Browse available artwork, ask about print sizes, and see which
                pieces are ready to collect.
              </p>
            </section>

            <section className="border-t border-[var(--cream)]/35 pt-5">
              <p className="home-kicker text-[var(--acid)]">Connect</p>
              <h3 className="mt-4 font-serif text-3xl">Meet the artist</h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                Talk through the process, materials, custom ideas, and the
                stories behind individual pieces.
              </p>
            </section>

            <section className="border-t border-[var(--cream)]/35 pt-5">
              <p className="home-kicker text-[var(--acid)]">Book</p>
              <h3 className="mt-4 font-serif text-3xl">Invite Paige</h3>
              <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                For markets, vendor opportunities, exhibitions, or creative
                collaborations, use the contact page to start the conversation.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 border-y border-[var(--charcoal)] py-10 lg:flex-row lg:items-center">
          <div>
            <p className="home-kicker text-[var(--coral)]">Plan ahead</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">
              Want Paige at your event?
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <NavLink className="home-button home-button--moss-fill" to="/contact">
              Start an inquiry
              <span aria-hidden="true">-&gt;</span>
            </NavLink>
            <NavLink className="home-button home-button--dark" to="/gallery">
              View gallery
              <span aria-hidden="true">-&gt;</span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
