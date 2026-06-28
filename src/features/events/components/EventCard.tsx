import { formatEventDate } from "../events";
import type { Event } from "../types";

export function EventCard({ event }: { event: Event }): React.JSX.Element {
  return (
    <article className="grid gap-6 border-t border-[var(--charcoal)] pt-6 sm:grid-cols-[12rem_1fr]">
      <div>
        <p className="meta-label text-[var(--brand-primary)]">
          {formatEventDate(event)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-3xl text-[var(--ink)]">
            {event.title}
          </h2>
          <p className="mt-2 text-[var(--charcoal)]/75">
            {event.venue} - {event.location}
          </p>
        </div>

        {event.description && (
          <p className="max-w-2xl leading-relaxed text-[var(--charcoal)]/80">
            {event.description}
          </p>
        )}

        {event.url && (
          <a
            className="site-text-link w-fit text-[var(--brand-primary)]"
            href={event.url}
            rel="noreferrer"
            target="_blank"
          >
            Event details <span aria-hidden="true">-&gt;</span>
          </a>
        )}
      </div>
    </article>
  );
}
