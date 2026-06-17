import { formatEventDate } from "../events";
import type { Event } from "../types";

export function EventCard({ event }: { event: Event }): React.JSX.Element {
  return (
    <article className="flex flex-col gap-3 border border-[var(--charcoal)] p-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-[var(--acid)]">
          {formatEventDate(event)}
        </p>
        <h2 className="text-2xl">{event.title}</h2>
      </div>

      <div>
        <p>{event.venue}</p>
        <p className="text-[var(--cream)]/65">{event.location}</p>
      </div>

      {event.description && <p>{event.description}</p>}

      {event.url && (
        <a
          className="w-fit underline"
          href={event.url}
          rel="noreferrer"
          target="_blank"
        >
          Event details
        </a>
      )}
    </article>
  );
}
