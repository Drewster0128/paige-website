import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { usePageMetadata } from "./usePageMetadata";

const CONTACT_PAGE_TITLE =
  "Contact Paige Cook | Art Commissions and Inquiries | Psychedelic Queen Artistry";
const CONTACT_PAGE_DESCRIPTION =
  "Contact Paige Cook about original artwork, prints, custom commissions, collaborations, events, and Psychedelic Queen Artistry inquiries in the greater Chicago area.";
const TALLY_EMBED_URL =
  "https://tally.so/embed/MePNX0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export function Contact(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const artPiece = searchParams.get("artPiece");
  const inquiryHeading = artPiece
    ? `Ask about ${artPiece}`
    : "Start an art inquiry";

  usePageMetadata({
    title: CONTACT_PAGE_TITLE,
    description: CONTACT_PAGE_DESCRIPTION,
    canonicalPath: "/contact",
    image: "/site/contact/hero.webp",
  });

  useEffect(() => {
    if (window.location.hash !== "#inquiry-form") {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById("inquiry-form")?.scrollIntoView();
    });
  }, []);

  return (
    <div className="flex w-full grow flex-col bg-[var(--cream)] text-[var(--ink)]">
      <section className="bg-[var(--moss)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="home-kicker text-[var(--acid)]">Contact Paige</p>
          <h1 className="mt-5 max-w-[calc(100vw-2.5rem)] font-serif text-[clamp(3.4rem,9vw,9rem)] leading-[0.86] sm:max-w-6xl">
            {inquiryHeading}
          </h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-[var(--cream)]/40 pt-5 lg:flex-row lg:items-end">
            <p className="w-full max-w-[calc(100vw-2.5rem)] text-lg leading-relaxed text-[var(--cream)]/85 sm:max-w-2xl sm:text-xl">
              Reach out about available originals, prints, custom commissions,
              collaborations, events, or a specific Psychedelic Queen Artistry
              piece by Paige Cook.
            </p>
            <a className="home-button home-button--hero" href="#inquiry-form">
              Open inquiry form
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="home-kicker text-[var(--moss)]">Inquiry details</p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              Make the first message count.
            </h2>
            <div className="mt-8 overflow-hidden border border-[var(--moss)]/35 bg-[var(--cream)]">
              <img
                alt="Paige Cook reviewing colorful artwork and prints in her studio"
                className="aspect-16/9 w-full object-cover"
                loading="lazy"
                src="/site/contact/hero.webp"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 border-t border-[var(--charcoal)] pt-6">
            {artPiece && (
              <div className="border border-[var(--moss)]/40 p-5">
                <p className="home-kicker text-[var(--moss)]">
                  Selected artwork
                </p>
                <p className="mt-3 font-serif text-3xl">{artPiece}</p>
                <p className="mt-3 leading-relaxed text-[var(--charcoal)]/75">
                  Include this title when reaching out so Paige knows which
                  piece you are asking about.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <section className="border-t border-[var(--charcoal)] pt-5">
                <p className="home-kicker text-[var(--moss)]">Artwork</p>
                <h3 className="mt-4 font-serif text-3xl">
                  Originals and prints
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  Ask about availability, pricing, print sizes, pickup or
                  shipping options, and whether a specific piece is still open
                  for purchase.
                </p>
              </section>

              <section className="border-t border-[var(--charcoal)] pt-5">
                <p className="home-kicker text-[var(--moss)]">Commissions</p>
                <h3 className="mt-4 font-serif text-3xl">Custom artwork</h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  Share the idea, subject, preferred size, deadline, budget
                  range, and any visual references that would help Paige
                  understand the direction.
                </p>
              </section>

              <section className="border-t border-[var(--charcoal)] pt-5">
                <p className="home-kicker text-[var(--moss)]">Events</p>
                <h3 className="mt-4 font-serif text-3xl">
                  Markets and exhibitions
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  For vendor opportunities, exhibitions, pop-ups, or community
                  events, include the date, location, expected audience, and
                  booth or display details.
                </p>
              </section>

              <section className="border-t border-[var(--charcoal)] pt-5">
                <p className="home-kicker text-[var(--moss)]">Collaborations</p>
                <h3 className="mt-4 font-serif text-3xl">Creative projects</h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  Share the project goal, timeline, usage needs, and whether
                  the work is personal, commercial, editorial, or event-based.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[var(--moss)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-24 lg:px-12"
        id="inquiry-form"
      >
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p className="home-kicker text-[var(--acid)]">Response ready</p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              Send the details through Paige&apos;s inquiry form.
            </h2>
          </div>

          <div className="border-t border-[var(--cream)]/35 pt-6">
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--cream)]/82">
              Use the form below for original artwork, prints, custom
              commissions, event invitations, and collaboration requests.
              {artPiece
                ? ` Mention "${artPiece}" in the form so Paige can connect your message to the right piece.`
                : " Include the piece title, project type, timeline, and any helpful references."}
            </p>
            <div className="mt-8 overflow-hidden border border-[var(--cream)]/35 bg-[var(--cream)]">
              <iframe
                className="min-h-[44rem] w-full border-0"
                loading="lazy"
                src={TALLY_EMBED_URL}
                title="Psychedelic Queen Artistry inquiry form"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-8 border-y border-[var(--charcoal)] py-10 lg:flex-row lg:items-center">
          <div>
            <p className="home-kicker text-[var(--coral)]">Before you reach out</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">
              Know the piece, size, timeline, and goal.
            </h2>
          </div>
          <a className="home-button home-button--moss-fill" href="#inquiry-form">
            Go to form
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>
    </div>
  );
}
