import { GENERAL_CONTACT_EMAIL } from "../config/site";
import { PageLayout } from "./PageLayout";

export function PrivacyPolicy(): React.JSX.Element {
  return (
    <PageLayout title="Privacy Policy">
      <div className="flex flex-col gap-8">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--charcoal)]/60">
          Last updated June 18, 2026
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Overview</h2>
          <p>
            Psychedelic Queen Artistry respects your privacy. This site is an
            artist portfolio for Paige Cook and is intended to share artwork,
            upcoming events, and contact information.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Information We Collect</h2>
          <p>
            This site does not currently collect account information or process
            purchases. If you submit the contact form, the information you
            choose to send may be used to respond to your inquiry about artwork,
            commissions, collaborations, or events.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Contact Form Provider</h2>
          <p>
            The contact form is provided by Tally. Form submissions may be
            processed by Tally according to its own privacy and service terms.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Site Data</h2>
          <p>
            Basic technical information may be handled by hosting providers or
            browser software to deliver the website, protect the service, and
            diagnose performance or security issues.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Contact</h2>
          <p>
            For privacy questions, email{" "}
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
