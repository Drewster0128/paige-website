import { GENERAL_CONTACT_EMAIL } from "../config/site";
import { PageLayout } from "./PageLayout";

export function TermsOfService(): React.JSX.Element {
  return (
    <PageLayout title="Terms of Service">
      <div className="flex flex-col gap-8">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--charcoal)]/60">
          Last updated June 16, 2026
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Use of This Site</h2>
          <p>
            This website presents artwork, event information, and inquiry
            details for Psychedelic Queen Artistry. By using the site, you agree
            not to misuse it, interfere with its operation, or attempt to access
            areas that are not intended for public use.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Artwork and Content</h2>
          <p>
            Artwork, images, written content, and branding on this site belong
            to Paige Cook or their respective owners. Do not copy, reproduce,
            sell, or redistribute site content without permission.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Events and Availability</h2>
          <p>
            Event details, availability, prices, and commission information may
            change. This site may be updated at any time to reflect current
            artwork, appearances, or policies.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Contact</h2>
          <p>
            For questions about these terms, email{" "}
            <a className="underline" href={`mailto:${GENERAL_CONTACT_EMAIL}`}>
              {GENERAL_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
