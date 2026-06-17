import { NavLink } from "react-router";
import { PageLayout } from "./PageLayout";

export function PrivacyPolicy(): React.JSX.Element {
  return (
    <PageLayout title="Privacy Policy">
      <div className="flex flex-col gap-8">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--cream)]/60">
          Last updated June 16, 2026
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
            This site does not currently collect account information, process
            purchases, or host a contact form. If contact options are added in
            the future, any information you choose to send will be used to
            respond to your inquiry.
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
            For privacy questions, use the{" "}
            <NavLink className="underline" to="/contact">
              contact page
            </NavLink>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
