import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { HERO_IMAGES } from "../config/assets";
import { GENERAL_CONTACT_EMAIL } from "../config/site";
import { usePageMetadata } from "./usePageMetadata";

const CONTACT_PAGE_TITLE =
  "Contact Paige Cook | Art Commissions and Inquiries | Psychedelic Queen Artistry";
const CONTACT_PAGE_DESCRIPTION =
  "Contact Paige Cook about original artwork, prints, and custom art commissions through Psychedelic Queen Artistry.";
const TALLY_EMBED_URL =
  "https://tally.so/embed/VLWoGN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

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
    image: HERO_IMAGES.contact,
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
      <section
        className="bg-[var(--brand-primary)] px-5 py-20 text-[var(--cream)] sm:px-8 sm:py-28 lg:px-12"
        id="inquiry-form"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h1 className="max-w-[calc(100vw-2.5rem)] font-serif text-[clamp(3.4rem,9vw,9rem)] leading-[0.86] sm:max-w-6xl">
              {inquiryHeading}
            </h1>
            <p className="mt-8 w-full max-w-[calc(100vw-2.5rem)] border-t border-[var(--cream)]/40 pt-5 text-lg leading-relaxed text-[var(--cream)]/85 sm:max-w-2xl sm:text-xl">
              Use this page for available originals, prints, custom commissions,
              or questions about a specific Psychedelic Queen Artistry piece by
              Paige Cook.
            </p>
            <p className="mt-5 w-full max-w-[calc(100vw-2.5rem)] text-base leading-relaxed text-[var(--cream)]/75 sm:max-w-2xl">
              For events, collaborations, press, or anything outside of an art
              inquiry, email{" "}
              <a
                className="underline underline-offset-4 transition hover:text-[var(--acid)]"
                href={`mailto:${GENERAL_CONTACT_EMAIL}`}
              >
                {GENERAL_CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <div>
            <div className="overflow-hidden border border-[var(--cream)]/35 bg-[var(--cream)]">
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
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <h2 className="max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9]">
              Make the first message count.
            </h2>
          </div>

          <div className="flex flex-col gap-8 border-t border-[var(--charcoal)] pt-6">
            {artPiece && (
              <div className="border border-[var(--brand-primary)]/40 p-5">
                <p className="font-serif text-3xl">{artPiece}</p>
                <p className="mt-3 leading-relaxed text-[var(--charcoal)]/75">
                  Include this title when reaching out so Paige knows which
                  piece you are asking about.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <section className="border-t border-[var(--charcoal)] pt-5">
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
                <h3 className="mt-4 font-serif text-3xl">Custom artwork</h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  Share the idea, subject, preferred size, deadline, budget
                  range, and any visual references that would help Paige
                  understand the direction.
                </p>
              </section>

              <section className="border-t border-[var(--charcoal)] pt-5">
                <h3 className="mt-4 font-serif text-3xl">Use email instead</h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  For events, collaborations, press, partnerships, or anything
                  outside of an art inquiry, email{" "}
                  <a
                    className="font-semibold underline underline-offset-4 transition hover:text-[var(--brand-primary)]"
                    href={`mailto:${GENERAL_CONTACT_EMAIL}`}
                  >
                    {GENERAL_CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>

              <section className="border-t border-[var(--charcoal)] pt-5">
                <h3 className="mt-4 font-serif text-3xl">Art inquiry focus</h3>
                <p className="mt-4 leading-relaxed text-[var(--charcoal)]/80">
                  Keep the form focused on artwork, print availability, custom
                  art requests, and questions about pieces in the gallery.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
