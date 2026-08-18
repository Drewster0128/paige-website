import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { HERO_IMAGES } from "../../../config/assets";
import { ROUTES } from "../../../config/routes";
import { GENERAL_CONTACT_EMAIL } from "../../../config/site";
import { usePageMetadata } from "../../../pages/usePageMetadata";
import { EventCard } from "../components/EventCard";
import { getEventData } from "@api";
import {type Event, type Result} from "@types";

const EVENTS_PAGE_TITLE =
  "Events | Paige Cook Art Markets and Exhibitions | Psychedelic Queen Artistry";
const EVENTS_PAGE_DESCRIPTION =
  "Find upcoming art markets, exhibitions, pop-ups, and in-person appearances for Paige Cook, the greater Chicago area artist behind Psychedelic Queen Artistry.";
const EVENTS_CONTACT_MAILTO = `mailto:${GENERAL_CONTACT_EMAIL}`;

export function EventsPage(): React.JSX.Element {

    usePageMetadata({
    title: EVENTS_PAGE_TITLE,
    description: EVENTS_PAGE_DESCRIPTION,
    canonicalPath: "/events",
    image: HERO_IMAGES.events,
  });

  // STATES
  const [events, setEvents] = useState<Event[] | null>(null);
  const [status, setStatus] = useState<string>("loading");

  // DERIVED STATES
  const hasEvents = events
    ? events.length > 0
    : false

  // EFFECTS

  useEffect(() => {

    async function loadData()
    {
      const result : Result<Event[]> = await getEventData();

      switch (result.ok)
      {
        case true:
          setEvents(result.value);
          setStatus("success");
          break;
        default:
          console.log(result.error)
          setStatus("error");
          break;
      }
    }

    loadData();
  }, []);

  if(status === "loading")
  {
    return <div>loading</div>
  }
  else if(status === "error")
  {
    return <div>error</div>
  }
  else
  {
    return (
      <div className="flex w-full grow flex-col bg-[var(--cream)] text-[var(--ink)]">
        <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--brand-primary)] text-[var(--cream)]">
          <img
            alt="Paige Cook at an outdoor art fair booth with colorful paintings on display"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
            src={HERO_IMAGES.events}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(75,99,56,0.94)] via-[rgba(75,99,56,0.42)] to-[rgba(75,99,56,0.08)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(75,99,56,0.72)] via-[rgba(75,99,56,0.08)] to-[rgba(75,99,56,0.06)]" />

          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12">
            <h1 className="max-w-6xl font-serif text-[clamp(3.4rem,9vw,9rem)] leading-[0.86]">
              Meet Paige in person.
            </h1>
            <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--cream)]/40 pt-5 lg:flex-row lg:items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--cream)]/85 sm:text-xl">
                Follow upcoming art markets, exhibitions, pop-ups, and community
                appearances for Psychedelic Queen Artistry in the greater Chicago
                area and beyond.
              </p>
              <a
                className="site-button site-button--cream-fill"
                href={EVENTS_CONTACT_MAILTO}
              >
                Invite Paige
                <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <h2 className="max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
                {hasEvents
                  ? "Where to find the work next."
                  : "New dates coming soon."}
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {hasEvents ? (
                events!.map((event) => <EventCard event={event} key={event.id} />)
              ) : (
                <div className="border-t border-[var(--charcoal)] pt-6">
                  <p className="max-w-2xl text-lg leading-relaxed text-[var(--charcoal)]/82">
                    There are no public events listed right now. Paige&apos;s
                    schedule will be updated here as new markets, exhibitions,
                    pop-ups, and community appearances are confirmed.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <NavLink
                      className="site-button site-button--primary-fill"
                      to={ROUTES.gallery}
                    >
                      Browse available work
                      <span aria-hidden="true">-&gt;</span>
                    </NavLink>
                    <a
                      className="site-button site-button--dark"
                      href={EVENTS_CONTACT_MAILTO}
                    >
                      Ask about events
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[var(--brand-primary)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-[1360px]">
            <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--cream)]/35 pb-6 lg:flex-row lg:items-end">
              <div>
                <h2 className="font-serif text-5xl leading-none sm:text-7xl">
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
                <h3 className="mt-4 font-serif text-3xl">Originals and prints</h3>
                <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                  Browse available artwork, ask about print sizes, and see which
                  pieces are ready to collect.
                </p>
              </section>

              <section className="border-t border-[var(--cream)]/35 pt-5">
                <h3 className="mt-4 font-serif text-3xl">Meet the artist</h3>
                <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                  Talk through the process, materials, custom ideas, and the
                  stories behind individual pieces.
                </p>
              </section>

              <section className="border-t border-[var(--cream)]/35 pt-5">
                <h3 className="mt-4 font-serif text-3xl">Invite Paige</h3>
                <p className="mt-4 leading-relaxed text-[var(--cream)]/78">
                  For markets, vendor opportunities, exhibitions, or creative
                  collaborations, email {GENERAL_CONTACT_EMAIL} to start the
                  conversation.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 border-y border-[var(--charcoal)] py-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-3xl font-serif text-5xl leading-none sm:text-7xl">
                Want Paige at your event?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="site-button site-button--primary-fill"
                href={EVENTS_CONTACT_MAILTO}
              >
                Start an inquiry
                <span aria-hidden="true">-&gt;</span>
              </a>
              <NavLink
                className="site-button site-button--dark"
                to={ROUTES.gallery}
              >
                View gallery
                <span aria-hidden="true">-&gt;</span>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    );
  }

}
