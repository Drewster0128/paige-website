import { PageLayout } from "./PageLayout";

export function Contact(): React.JSX.Element {
  return (
    <PageLayout title="Contact">
      <div className="flex flex-col gap-6 text-center">
        <p>
          Contact information and inquiry options will be added here soon.
        </p>
        <p className="text-neutral-400">
          This page is ready for an email address, social links, or a contact
          form when those details are available.
        </p>
      </div>
    </PageLayout>
  );
}
